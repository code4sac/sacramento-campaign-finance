import { sum } from 'd3-array'

import config from '$lib/../../config.js'
import { data, generated } from '$lib/data.json'

export function load() {
    const totals = config.bodies.map(b => {
        const { body, legislators, name } = b
        const legislatorsCommitteeIds = legislators.map(legislator => {
            return legislator.committees.map(d => d.id)
        }).flat()
        const matching = data.filter(d => legislatorsCommitteeIds.includes(d.fppcId))
        const total = sum(matching, d => d.amount)
        let offices = ['Mayor', 'City councilmembers']

        if (body === 'sac-county') {
            offices = ['Supervisors']
        }
        return {
            body,
            href: `/body/${body}`,
            name,
            total,
            offices,
        }
    })

    const upcomingElection = config.elections.find(d => d.year === 2024)
    const allElectionCommitteeIds = upcomingElection.contests.map(contest => {
        const candidateIds = contest.candidates.map(d => d.committee.id)
        return candidateIds
    }).flat()

    const electionData = data.filter(d => {
        return allElectionCommitteeIds.includes(d.fppcId)
    })
    const electionTotal = sum(electionData, d => d.amount)

    const election = {
        body: '',
        href: `/election/2024`,
        name: 'Upcoming election',
        total: electionTotal,
        offices: ['Mayor', 'City councilmembers (D2, D4, D6, D8)']
    }

    return {
        generated,
        totals: [election, ...totals]
    }
}