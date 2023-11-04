import { expect, test, beforeAll, assert } from 'vitest';
import { GET } from '../../src/routes/body/[bodyId]/download.csv/+server.js';

const result = GET({ params: { bodyId: 'sac-city' } });
const csvText = await result.text();

test('download CSV returns at least some rows', async () => {
    assert(result.split("\n")[1] > 0);
});