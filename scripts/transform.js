import { promises as fs } from 'fs';

import excelToJson from 'convert-excel-to-json';
import { timeFormat } from 'd3-time-format';
import _ from 'lodash';
import Queue from 'p-queue';

const entityTypeMapping = {
    COM: 'committee',
    RCP: 'recipient-committee',
    IND: 'individual',
    OTH: 'other',
    PTY: 'political-party',
    SCC: 'small-contributor-committee'
};

const formatDate = timeFormat('%Y-%m-%d');

/**
 * Get transaction ID.
 * @param {{}} params
 * @returns { string } ID string.
 */
function getTransactionId({
    fppcId,
    reportNumber,
    reportDate,
    transactionId,
    agencyId
}) {
    const id = [fppcId, agencyId, reportNumber, reportDate, transactionId]
        .join('-')
        .replace('#', '');
    return id;
}

/**
 * Coerce Schedule C.
 * @param {{}} contribution Contribution by donor.
 * @returns {{}} Schedule C object.
 */
function coerceScheduleC(contribution) {
    const {
        A: fppcId,
        B: filerName,
        C: reportNumber,
        D: committeeType,
        E: reportDate,
        F: reportFromDate,
        G: reportThruDate,
        M: transactionId,
        N: contributorType,
        AB: date,
        AD: amount,
        AF: description,
        AG: contributorCommitteeId,
        O: contributorLastName,
        P: contributorFirstName,
        // Q: contributorPrefix,
        // R: contributorSuffix,
        S: contributorAddress1,
        T: contributorAddress2,
        U: contributorCity,
        V: contributorState,
        W: contributorZip,
        Y: contributorOccupation,
        X: contributorEmployer,
        Z: contributorSelfEmployed
    } = contribution;

    return {
        fppcId,
        transactionId,
        filerName,
        committeeType,
        date: formatDate(date),
        amount,
        description,
        contributorType: entityTypeMapping[contributorType],
        contributorLastName: normalizeContributorLastName(contributorLastName),
        contributorFirstName,
        contributorAddress1,
        contributorAddress2,
        contributorCity,
        contributorState,
        contributorZip: contributorZip.replace(/-$/, ''),
        contributorOccupation,
        contributorEmployer,
        contributorSelfEmployed: contributorSelfEmployed === 'y',
        contributorCommitteeId,
        reportNumber: +reportNumber,
        reportDate: formatDate(reportDate),
        reportFromDate: formatDate(reportFromDate),
        reportThruDate: formatDate(reportThruDate)
    };
}

/**
 * Normalize contributor last name.
 * @param {string} name Original name.
 * @returns {string} Normalized name.
 */
function normalizeContributorLastName(name) {
    if (name.includes('AT&T')) return 'AT&T';
    if (name.includes('California Apartment Association'))
        return 'California Apartment Association';
    if (
        name.includes(
            'California Correctional Peace Officers Association Political Action Committee'
        )
    )
        return 'California Correctional Peace Officers Association';
    if (name.includes('CCPOA Local PAC'))
        return 'California Correctional Peace Officers Association';
    if (name.includes('California Association Of Realtors'))
        return 'California Association Of Realtors';
    if (name.includes('CREPAC')) return 'California Association of Realtors';
    if (name.includes('California Real Estate Political Action Committee'))
        return 'California Association of Realtors';
    if (name.includes('California Nurses Association'))
        return 'California Nurses Association';
    if (name.includes('Electrical Workers Local 340'))
        return 'International Brotherhood of Electrical Workers Local 340';
    if (name.includes('Pipefitters Local Union 447'))
        return 'Plumbers & Pipefitters Local Union 447';
    if (name.includes('Pipefitters Local Union No. 447'))
        return 'Plumbers & Pipefitters Local Union 447';
    if (name.includes('Plumbers & Pipefitters Local 447 Federal PAC'))
        return 'Plumbers & Pipefitters Local Union 447';
    if (name.includes('Sacramento Area Fire Fighters Local 522'))
        return 'Sacramento Area Fire Fighters Local 522';
    if (name.includes('Sacramento Area Firefighters Local 522 PAC'))
        return 'Sacramento Area Fire Fighters Local 522';
    if (name.includes('Sacramento Area Firefighters (SAFF) Local 522'))
        return 'Sacramento Area Fire Fighters Local 522';
    if (name.includes('Sacramento City Teachers Association'))
        return 'Sacramento City Teachers Association';
    if (name.includes('Sac City Teachers Association'))
        return 'Sacramento City Teachers Association';
    if (name.includes('Sacramento County Deputy Sheriffs Association'))
        return 'Sacramento County Deputy Sheriffs Association';
    if (name.includes('Sacramento Police Officers Association'))
        return 'Sacramento Police Officers Association';
    if (name.includes('Charter Public Schools PAC'))
        return 'California Charter Schools Association';
    if (name.includes('SEIU') && name.includes('1000'))
        return 'Service Employees International Union Local 1000';
    if (name.includes('Service Employees International Union Local 1000'))
        return 'Service Employees International Union Local 1000';
    return name;
}

/**
 * Coerce Schedule A.
 * @param {{}} contribution Contribution
 * @returns
 */
function coerceScheduleA(contribution) {
    const {
        A: fppcId,
        B: filerName,
        C: reportNumber,
        D: committeeType,
        E: reportDate,
        F: reportFromDate,
        G: reportThruDate,
        M: transactionId,
        N: contributorType,
        AB: date,
        AD: amount,
        AF: description,
        AG: contributorCommitteeId,
        O: contributorLastName,
        P: contributorFirstName,
        // Q: contributorPrefix,
        // R: contributorSuffix,
        S: contributorAddress1,
        T: contributorAddress2,
        U: contributorCity,
        V: contributorState,
        W: contributorZip,
        Y: contributorOccupation,
        X: contributorEmployer,
        Z: contributorSelfEmployed
    } = contribution;

    return {
        fppcId: fppcId.replace('#', '').replace('SCO', ''),
        filerName,
        committeeType,
        transactionId,
        date: formatDate(date),
        amount,
        description,
        contributorType: entityTypeMapping[contributorType],
        contributorCommitteeId,
        contributorLastName: normalizeContributorLastName(contributorLastName),
        contributorFirstName,
        contributorAddress1,
        contributorAddress2,
        contributorCity,
        contributorState,
        contributorZip: contributorZip.replace(/-$/, ''),
        contributorOccupation,
        contributorEmployer,
        contributorSelfEmployed: contributorSelfEmployed === 'y',
        reportNumber: +reportNumber,
        reportDate: formatDate(reportDate),
        reportFromDate: formatDate(reportFromDate),
        reportThruDate: formatDate(reportThruDate)
    };
}

/**
 * Load Netfile.
 * @param {{}} params Options
 */
export default async function loadNetfile({ agencyName, agencyId, year }) {
    const excelFile = `./tmp/efile_newest_${agencyId}_${year}.xlsx`;

    const sheets = [
        {
            sheet: 'A-Contributions',
            file: 'schedule-a',
            coerce: coerceScheduleA
        },
        {
            sheet: 'C-Contributions',
            file: 'schedule-c',
            coerce: coerceScheduleC
        },
        {
            sheet: 'E-Expenditure',
            file: 'schedule-e'
        },
        {
            sheet: '496',
            file: 'independent-expenditures'
        }
    ];

    const data = excelToJson({
        sourceFile: excelFile,
        header: {
            rows: 1
        },
        sheets: sheets.map((s) => s.sheet)
    });

    const q = new Queue({ concurrency: 1 });

    sheets.forEach((s) => {
        q.add(async () => {
            const { coerce, sheet, file } = s;
            const rows = data[sheet];
            if (!coerce) return;
            const coerced = rows.map((d, i) => {
                const c = coerce(d);
                const { fppcId, reportNumber, reportDate, transactionId } = c;

                const id = getTransactionId({
                    fppcId,
                    reportNumber,
                    reportDate,
                    transactionId,
                    agencyId
                });

                return {
                    id,
                    year,
                    agencyName,
                    agencyId,
                    ...c
                };
            });
            const path = `./data/${file}-${year}.json`;
            let toKeep = [];

            try {
                const f = await fs.readFile(path);
                toKeep = JSON.parse(f.toString());
            } catch (e) {
                if (e.code !== 'ENOENT') {
                    console.log(e);
                }
            }

            const toAdd = coerced.filter((d) => {
                const match = toKeep.find((dd) => dd.id === d.id);
                if (match) return false;
                return true;
            });
            const toKeepAndCoerced = [...toKeep, ...toAdd];
            const uniqById = _.uniqBy(toKeepAndCoerced, (d) => d.id);
            const sorted = _.sortBy(uniqById, [
                'year',
                'agencyId',
                'fppcId',
                'id'
            ]);
            await fs.writeFile(path, JSON.stringify(sorted, null, 2));
        });
    });

    await q.onIdle();
}
