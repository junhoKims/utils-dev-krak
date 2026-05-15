import {curry} from './curry.js';

describe('curry', () => {
  test('first', () => {
    function logger(
      mode: 'DEBUG' | 'ERROR' | 'WARN',
      initMsg: string,
      errMsg: string,
      lineNo: number,
    ) {
      if (mode === 'DEBUG')
        console.debug(initMsg, `${errMsg}at lint: ${lineNo}`);
      else if (mode === 'ERROR')
        console.error(initMsg, `${errMsg}at lint: ${lineNo}`);
      else if (mode === 'WARN')
        console.warn(initMsg, `${errMsg}at lint: ${lineNo}`);
      else throw 'Wrong';
    }

    const debugLogger = curry(logger)('DEBUG')('Init Debug Error');
    const errLogger = curry(logger)('ERROR')('Init Error Error');
    debugLogger('debug show')(21); // Init Debug Error dbug showat lint: 21
    errLogger('error show')(31); // Init Error Error error showat lint: 42
  });

  test('second', () => {
    vi.useFakeTimers();
    const logSpy = vi.fn();

    const setTimeoutPegDelay = (time: number, fn: () => void) => {
      setTimeout(fn, time);
    };

    const setTimeout10 = curry(setTimeoutPegDelay)(10);
    setTimeout10(() => logSpy('setTimeout 10!'));

    const setTimeout2000 = curry(setTimeoutPegDelay)(2000);
    setTimeout2000(() => logSpy('setTimeout 2000!'));

    vi.advanceTimersByTime(10);
    expect(logSpy).toHaveBeenCalledWith('setTimeout 10!');
    expect(logSpy).not.toHaveBeenCalledWith('setTimeout 2000!');

    vi.advanceTimersByTime(1990);
    expect(logSpy).toHaveBeenCalledWith('setTimeout 2000!');

    vi.useRealTimers();
  });
});
