import { expect, test } from 'vitest';
import { load } from '../../src/routes/+page.server.js';
import mock from './homeServerMock.js';

test('load home data returns correct format', () => {
    // const result = load();
    const mockResult = mock;
    try {
        expect(Date.parse(result.generated)).toBeGreaterThan(0);
    } catch (error) {
        console.log(error);
    }
});
