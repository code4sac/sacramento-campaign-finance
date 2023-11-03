import { assert, expect, test } from 'vitest';
import { Body } from '../../config.js';
import { Candidate } from '../../config.js';

test('Body type has required fields', () => {
    const result = load();
    const body = {
      body: "",
      name: "",
      legislators: [],
      committees: []
    }
    assert(typeof body === Body);
})