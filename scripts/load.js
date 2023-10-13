import _ from 'lodash'
import fs from 'fs/promises'
import Queue from "p-queue"

const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023]
const schedules = ['schedule-a', 'schedule-c']

export default async function load() {
    const data = []
    const queue = new Queue({ concurrency: 1 })

    years.forEach(year => {
        schedules.forEach(schedule => {
            let type = null

            if (schedule === 'schedule-a') {
                type = 'monetary'
            } else if (schedule === 'schedule-c') {
                type = 'non-monetary'
            }

            queue.add(async() => {
                const d = await fs.readFile(`data/${schedule}-${year}.json`)
                const j = JSON.parse(d.toString())
                const withSchedule = j.map(d => {
                    return {
                        ...d,
                        type
                    }
                })
                data.push(...withSchedule)
            })
        })
    })

    await queue.onIdle()

    return data
}   