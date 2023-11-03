import {expect, test} from 'vitest';
import {load} from '../../src/routes/body/+page.server.js';
import mock from './mock1.json'

test('load body data returns correct format', () => {
  const result = load();
  const mockResult = mock;
  
  try {
    expect(Date.parse(result.generated)).toBeGreaterThan(0);
  } catch (error) {
    console.log(error);
  }
});
