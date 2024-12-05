import _ from 'lodash'
import { rollup, sum } from 'd3-array';

import config from '$lib/../../config.js';
import createContributorId from '$lib/contributorId.js';
import { data, generated } from '$lib/data.json';
import { formatLegislatorAnchorId } from '$lib/format';


export function load() {
    const totals = config.bodies.map((b) => {
        const { body, legislators, name } = b;
        const legislatorsCommitteeIds = legislators
            .map((legislator) => {
                return legislator.committees.map((d) => d.id);
            })
            .flat();
        const matching = data.filter((d) =>
            legislatorsCommitteeIds.includes(d.fppcId)
        );
        const total = sum(matching, (d) => d.amount);
        let offices = ['Mayor', 'City councilmembers'];

        if (body === 'sac-county') {
            offices = ['Supervisors'];
        }
        return {
            body,
            href: `/body/${body}`,
            name,
            total,
            offices
        };
    });
    const contributors = [];
    const rolled = rollup(
        data,
        (values) => {
            const {
                contributorCommitteeId,
                contributorFirstName,
                contributorLastName,
                contributorCity,
                contributorZip,
                contributorState
            } = values[0];
            const amount = sum(values, (d) => d.amount);
            const dates = values.map(d => {
                return {
                    amount: d.amount,
                    date: d.date
                }
            })

            return {
                contributorCommitteeId,
                contributorFirstName,
                contributorLastName,
                contributorZip,
                contributorCity,
                contributorState,
                amount,
                dates
            };
        },
        createContributorId
    );

    rolled.forEach((d) => {
        contributors.push(d);
    });

    const upcomingElection = config.elections.find((d) => d.year === 2024);
    const allElectionCommitteeIds = upcomingElection.contests
        .map((contest) => {
            const candidateIds = contest.candidates.map((d) => d.committee.id);
            return candidateIds;
        })
        .flat();

    const electionData = data.filter((d) => {
        return allElectionCommitteeIds.includes(d.fppcId);
    });
    const electionTotal = sum(electionData, (d) => d.amount);

    const election = {
        body: '',
        href: `/election/2024`,
        name: 'Most recent election',
        total: electionTotal,
        offices: ['Mayor', 'City councilmembers (D2)']
    };

    const officials = config.bodies
        .map((d) => {
            const { body, legislators } = d;
            return legislators.map((l) => {
                const { name: legislatorName, title } = l;
                const encoded = formatLegislatorAnchorId(title);

                return {
                    name: legislatorName,
                    title,
                    link: `/body/${body}#${encoded}`
                };
            });
        })
        .flat();

    return {
        generated,
        officials,
        totals: [election, ...totals],
        contributors: _.orderBy(contributors, ['amount'], ['desc']).slice(0, 10)
    };
}
