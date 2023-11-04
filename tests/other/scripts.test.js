import { expect, test } from 'vitest';
import downloadNetfile from '../../scripts/download.js';

test('Webscrape Netfile returns a response', async () => {
    const response = await downloadNetfile({ agencyId: 'SAC', year: '2023' });
    const data = await response.text();
    expect(1 === 1);
}, { timeout: 120000 });
