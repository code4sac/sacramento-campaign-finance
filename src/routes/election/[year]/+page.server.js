import { error } from '@sveltejs/kit';
import { rollup, sum } from 'd3-array';

import config from '$lib/../../config.js';
import createContributorId from '$lib/contributorId.js';
import { data, generated } from '$lib/data.json';

/**
 * Aggregate.
 * @param {{}} contributions
 * @returns
 */
function aggregate(contributions) {
    const rolled = rollup(
        contributions,
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
            const dates = values.map((d) => d.dates).flat();

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

    const arr = [];
    rolled.forEach((d) => {
        arr.push(d);
    });

    return arr;
}

export function load({ params }) {
    const { year } = params;
    const configElection = config.elections.find((d) => d.year === +year);

    if (!configElection) throw error(404);

    const contests = configElection.contests.map((contest) => {
        const { bodyId, candidates, district, title } = contest;
        const byCandidate = candidates.map((candidate) => {
            const { name, committee } = candidate;
            const contributions = data.filter((d) => d.fppcId === committee.id);
            const aggregated = aggregate(contributions);
            const total = sum(contributions, (d) => d.amount);
            return {
                name,
                committee,
                contributors: aggregated,
                total
            };
        });

        return {
            bodyId,
            district,
            title,
            candidates: byCandidate
        };
    });

    return {
        races: contests,
        year,
        generated
    };
}
