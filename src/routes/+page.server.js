import { sum } from 'd3-array'

import config from '$lib/../../config.js'
import data from '$lib/data.json'

function totalInDataset(dataset) {
    const total = sum(dataset, d => {
        return sum(d.contributors, dd => dd.amount)
    })

    return total
}

export function load() {
    const totals = config.bodies.map(b => {
        const { body, name } = b
        const matching = data.data.filter(d => d.body === body)
        const total = totalInDataset(matching)
        return {
            body,
            name,
            total,
            officials: matching
        }
    })

    return {
        generated: data.generated,
        totals
    }
}