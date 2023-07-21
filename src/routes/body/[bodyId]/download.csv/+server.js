import { csvFormat } from 'd3-dsv'
import { error } from '@sveltejs/kit'
import config from "../../../../../config.js";
import data from "$lib/data.json";

export function GET({ params }) {
    const { bodyId } = params
    const politicians = config.bodies.find(d => d.body === bodyId).legislators.map(legislator => legislator.name)

    if (!politicians) throw error(404)

    const rows = data.data.map(d => {
        const { name, title, contributors } = d
        return contributors.map(c => {
            return { politician: name, title, ...c }
        })
    }).flat().filter(row => politicians.includes(row.politician))
    const csv = csvFormat(rows)
    return new Response(csv)
}