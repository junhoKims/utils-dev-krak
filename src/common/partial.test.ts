import {partial} from '@/common/partial.js';
import {describe, expect, test} from 'vitest';

describe('partial', () => {
  test('first', () => {
    const obj = {foo: 'bar', col: 'sec'};
    const cleanPrintJSON = partial(JSON.stringify, undefined, null, 0);
    const value = cleanPrintJSON(obj);
    expect(value).toBe('{"foo":"bar","col":"sec"}');
  });
});
