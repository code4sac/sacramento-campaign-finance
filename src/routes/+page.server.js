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
        return {
            body,
            name,
            total,
            officials: []
        }
    })

    return {
        generated,
        totals
    }
}