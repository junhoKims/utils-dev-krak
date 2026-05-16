/**
 * 값이 존재하지 않을 수 있는(null/undefined) 상황을 안전하게 처리하기 위한 모나드 클래스
 *
 * @example
 * const value = MayBe.of({ a: 1 }).map(x => x.a).join(); // 1
 */
export class MayBe<T> {
  value: T;

  constructor(val: T) {
    this.value = val;
  }


  static of<T>(val: T) {
    return new MayBe(val);
  }


  isNothing(): boolean {
    return this.value === undefined || this.value === null;
  }


  map<U>(fn: (value: NonNullable<T>) => U): MayBe<U> {
    if (this.isNothing()) throw new Error('MayBe Parsing map Fail');
    return MayBe.of<U>(fn(this.value as NonNullable<T>))
  }


  join() {
    if (this.isNothing()) throw new Error('MayBe Parsing join Fail');
    return this.value
  }

  chain<U>(fn: (value: NonNullable<T>) => U) {
    return this.map(fn).join();
  }
}
