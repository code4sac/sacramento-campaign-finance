import { promises as fs } from 'fs'
import Queue from 'p-queue'

import config from "../config.js"
import aggregate from './aggregate.js'
import download from "./download.js"
import extract from "./extract.js"
import transform from "./transform.js"
import load from "./load.js"

const queue = new Queue({ concurrency: 1 })
const startTime = new Date()
console.log(`Starting at ${startTime}`)

config.bodies.forEach((site) => {
    const { name: agencyName, vendorId: agencyId } = site
    queue.add(async() => {
        const year = "2023"
        const opts = { agencyName, agencyId, year }

        const f = `${agencyName} (${agencyId} - ${year})`

        console.log(`Ok, running for ${f}`)
        await fs.mkdir('tmp', { recursive: true })

        console.log(`Downloading ${f}...`)
        await download(opts)
        console.log(`Downloaded ${f}`)

        console.log(`Extracting ${f}...`)
        try {
            await extract(opts)
            console.log(`Extracted ${f}`)
        } catch (e) {
            if (e.code === 9) {
                console.log(`Problem extracting ${f}, skipping it`, e)
            } else {
                console.error(`Error with extraction`, e.code)
            }
            return
        }

        await fs.mkdir('data', { recursive: true })
        console.log(`Transforming ${f}...`)
        await transform(opts)
        console.log(`Transformed ${f}`)

        console.log(`Done with ${f}`)
        return
    })
})

queue.onIdle().then(async() => {
    console.log(`Aggregating across all JSON files`)
    const allData = await load()

    const aggregated = []
    const secondQueue = new Queue({ concurrency: 2 })

    config.bodies.forEach((site) => {
        const { body, legislators } = site
        secondQueue.add(async() => {
            const a = await aggregate(allData, legislators, body)
            aggregated.push(...a)
        })
    })

    await secondQueue.onIdle()

    const endTime = new Date()
    const durationMs = endTime - startTime
    const durationSec = durationMs / 1000
    const durationMin = durationSec / 60

    await fs.writeFile(`src/lib/data.json`, JSON.stringify({
        generated: startTime,
        data: aggregated
    }))

    console.log(
        `Finished at ${endTime}, took about ${Math.ceil(durationMin)} minute${
      Math.ceil(durationMin) !== 1 ? "s" : ""
    }`
    )

    process.exit(0)
})