import { assert, expect, test } from 'vitest';
import config from '../../config.js';

test('Config has correct values', () => {
    assert(config.title === "Sacramento campaign cash");
})