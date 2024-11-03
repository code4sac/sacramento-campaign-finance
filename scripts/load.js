import fs from "fs/promises";
import Queue from "p-queue";
import { rollup } from "d3-array";
import _ from "lodash";

const years = [
    2014,
    2015,
    2016,
    2017,
    2018,
    2019,
    2020,
    2021,
    2022,
    2023,
    2024,
];
const schedules = ["schedule-a", "schedule-c", '497'];

export default async function load() {
    const data = [];
    const queue = new Queue({ concurrency: 1 });

    years.forEach((year) => {
        schedules.forEach((schedule) => {
            let type = null;

            if (schedule === "schedule-a") {
                type = "monetary";
            } else if (schedule === "schedule-c") {
                type = "non-monetary";
            } else if (schedule === "497") {
                type = "late-contribution";
            }

            const fileName = `data/${schedule}-${year}.json`;
            queue.add(async () => {
                try {
                    const d = await fs.readFile(fileName);
                    const j = JSON.parse(d.toString());
                    const withSchedule = j.map((d) => {
                        return {
                            ...d,
                            type,
                        };
                    });
                    data.push(...withSchedule);
                } catch (e) {
                    console.error(`Problem with ${fileName}`);
                }
            });
        });
    });

    await queue.onIdle();

    const rolled = rollup(
        data,
        (values) => {
            const sorted = _.orderBy(values, ["reportDate"], ["desc"]);
            return sorted[0];
        },
        (d) =>
            `${d.fppcId} ${d.transactionId} ${d.date} ${d.amount} ${d.contributorLastName}`,
    );
    const arr = []
    rolled.forEach((d, key) => {
        arr.push(d)
    })

    // tested out this apporach in this
    // notebook: https://observablehq.com/d/4d3ee045f9885b59
    const withThroughDate = arr.filter(d => d.reportThruDate)
    const latestThroughDateByFiler = rollup(withThroughDate, values => {
        const throughDates = _.uniq(values.map((d) => d.reportThruDate)).sort();
        return throughDates.pop();
    }, d => d.fppcId)
    const onlyInclude497AfterLatestThroughDate = arr.filter(d => {
        if (d.type !== 'late-contribution') return true
        const latestThroughDate = latestThroughDateByFiler.get(d.fppcId);
        return d.date > latestThroughDate;
    })
    return onlyInclude497AfterLatestThroughDate;
}
