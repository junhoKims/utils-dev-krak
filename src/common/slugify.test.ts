import { slugify } from '@/common/slugify.js';


describe('slugify', () => {
  test('대문자는 소문자로 치환된다', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  })

  test('문자열 사이의 띄어쓰기는 "-"로 치환된다', () => {
    expect(slugify('Hello World')).toBe('hello-world');
    expect(slugify('utils dev krak')).toBe('utils-dev-krak');
  })

  test('"+", "-" 같은 특수문자는 제거된다.', () => {
    expect(slugify('Hello+World')).toBe('helloworld');
    expect(slugify('utils-dev-krak')).toBe('utils-dev-krak');
  })
})