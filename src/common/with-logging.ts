export function withLogging<TArgs extends unknown[], TResult>(
	fn: (...args: TArgs) => TResult,
): (...args: TArgs) => TResult {
	return (...args: TArgs): TResult => {
		console.log(`@Call: ${fn.name}(${args.join(', ')})`);
		const result = fn(...args);
		console.log(`@Result: ${result}`);
		return result;
	};
}
