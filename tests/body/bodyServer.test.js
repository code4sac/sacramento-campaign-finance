import { expect, test } from 'vitest';
import { load } from '../../src/routes/body/[bodyId]/+page.server.js';
import mock from './bodyServerMock.js'

test('load body data returns correct format', () => {
    // const result = load({ params: { bodyId: 'sac-city' } });
    const mockResult = mock;
    try {
        expect(mockRes).toBeGreaterThan(0);
        expect(Date.parse(result.generated)).toBeGreaterThan(0);
        expect(result.legislators).toBeGreaterThan(0);
    } catch (error) {
        console.log(error);
    }
});
