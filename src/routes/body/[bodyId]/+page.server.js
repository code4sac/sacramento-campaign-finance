import { error } from '@sveltejs/kit';
import d from '$lib/data.json'
import config from '$lib/../../config.js'

export async function load({ params }) {
    const { bodyId } = params
    const configBody = config.bodies.find(d => d.body === bodyId)

    if (!configBody) throw error(404)

    const data = configBody.legislators.map(legislator => {
        const match = d.data.find(dd => {
            const doNamesMatch = dd.name === legislator.name
            const doTitlesMatch = dd.title === legislator.title
            return doNamesMatch && doTitlesMatch
        })
        return match
    })

    return {
        bodyId,
        generated: d.generated,
        legislators: data
    }
}