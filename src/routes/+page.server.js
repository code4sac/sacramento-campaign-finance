import { sum } from 'd3-array'

import config from '$lib/../../config.js'
import { data, generated } from '$lib/data.json'
import { formatLegislatorAnchorId } from '$lib/format'

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

    const officials = config.bodies.map(d => {
        const { body, legislators } = d
        return legislators.map(l => {
            const { name: legislatorName, title } = l
            const encoded = formatLegislatorAnchorId(title)

            return {
                name: legislatorName,
                title,
                link: `/body/${body}#${encoded}`
            }
        })
    }).flat()

    return {
        generated,
        officials,
        totals
    }
}