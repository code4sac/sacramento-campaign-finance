import { promises as fs } from 'fs';
import Queue from 'p-queue';

import config from '../config.js';
import download from './download.js';
import extract from './extract.js';
import load from './load.js';
import transform from './transform.js';

// Node app starting point.
const queue = new Queue({ concurrency: 1 });
const startTime = new Date();
console.log(`Starting at ${startTime}`);

config.bodies.forEach((site) => {
    const { name: agencyName, vendorId: agencyId } = site;
    queue.add(async () => {
        const year = '2024';
        const opts = { agencyName, agencyId, year };

        const f = `${agencyName} (${agencyId} - ${year})`;

        console.log(`Ok, running for ${f}`);
        await fs.mkdir('tmp', { recursive: true });

        console.log(`Downloading ${f}...`);
        await download(opts);
        console.log(`Downloaded ${f}`);

        console.log(`Extracting ${f}...`);
        try {
            await extract(opts);
            console.log(`Extracted ${f}`);
        } catch (e) {
            if (e.code === 9) {
                console.log(`Problem extracting ${f}, skipping it`, e);
            } else {
                console.error(`Error with extraction`, e.code);
            }
            return;
        }

        await fs.mkdir('data', { recursive: true });
        console.log(`Transforming ${f}...`);
        await transform(opts);
        console.log(`Transformed ${f}`);

        console.log(`Done with ${f}`);
        return;
    });
});

queue.onIdle().then(async () => {
    console.log(`Aggregating across all JSON files`);
    const allData = await load();
    const relevantCommitteeIds = [];

    config.bodies.forEach((body) => {
        const bodyCommitteeIds = body.legislators
            .map((d) => {
                return d.committees.map((dd) => dd.id);
            })
            .flat();

        relevantCommitteeIds.push(...bodyCommitteeIds);
    });

    config.elections.forEach((election) => {
        const electionContestCommitteeIds = election.contests
            .map((contest) => {
                return contest.candidates.map((d) => d.committee.id);
            })
            .flat();

        relevantCommitteeIds.push(...electionContestCommitteeIds);
    });

    const filtered = allData.filter((d) => {
        return relevantCommitteeIds.includes(d.fppcId);
    });

    const endTime = new Date();
    const durationMs = endTime - startTime;
    const durationSec = durationMs / 1000;
    const durationMin = durationSec / 60;

    await fs.writeFile(
        `src/lib/data.json`,
        JSON.stringify({
            generated: startTime,
            data: filtered
        })
    );

    console.log(
        `Finished at ${endTime}, took about ${Math.ceil(durationMin)} minute${
            Math.ceil(durationMin) !== 1 ? 's' : ''
        }`
    );

    process.exit(0);
});
