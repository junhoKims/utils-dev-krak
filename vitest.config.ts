import path from 'node:path';
import { configDefaults, defineConfig } from 'vitest/config';

export const COVERAGE_EXCLUDES = [
	'**/{postcss,tailwind}.config.*',
	'**/index.?(c|m)[jt]s?(x)',
	'**/{constants,types}.?(c|m)[jt]s?(x)',
];

export default defineConfig({
	test: {
		setupFiles: ['./tests/setup-tests.ts'],
		environment: 'jsdom',
		globals: true,
		coverage: {
			enabled: false,
			extension: ['.js', '.cjs', '.mjs', '.ts', '.cts', '.mts'],
			exclude: [
				...(configDefaults.coverage.exclude ?? []),
				...COVERAGE_EXCLUDES,
			],
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
});
