import { capitalize } from '@/common/capitalize.js';

describe('capitalize', () => {
  test('문자열의 각 첫 문자를 대문자로 변경', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('hello world')).toBe('Hello World');
  });
});