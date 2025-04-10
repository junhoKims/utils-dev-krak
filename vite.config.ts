import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import { defineConfig } from 'vite';

const packageDir = path.dirname(fileURLToPath(import.meta.url));
const packagePath = path.join(packageDir, 'package.json');
const packageJSON = JSON.parse(
	await readFile(new URL(packagePath, import.meta.url), 'utf8'),
);

const isFileExcluded = (filePath: string, exclude?: RegExp[]) => {
	return [
		/vite-env\.d\.ts$/,
		/\.stories\.[t|j]sx?$/,
		/\.test\.[t|j]sx?$/,
		/\.spec\.[t|j]sx?$/,
		/__storybook__\/?$/,
		/\.md$/,
		...(exclude || []),
	].some((pattern) => pattern.test(filePath));
};

// https://vite.dev/config/
export default defineConfig({
	build: {
		outDir: 'dist',
		emptyOutDir: false,
		lib: {
			name: 'utils-dev-krak',
			formats: ['es', 'cjs'],
			entry: Object.fromEntries(
				globSync('src/**/*.{js,jsx,ts,tsx}').reduce<string[][]>((acc, file) => {
					const excluded = isFileExcluded(path.join(packageDir, file));
					if (excluded) return acc;

					return [
						...acc,
						[
							path.relative(
								'src',
								file.slice(0, file.length - path.extname(file).length),
							),
							`${packageDir}/${file}`,
						],
					];
				}, []),
			),
		},
		rollupOptions: {
			external: (source) => {
				const dependencies = Object.keys(packageJSON.dependencies || {});
				const peerDependencies = Object.keys(
					packageJSON.peerDependencies || {},
				);
				return [...dependencies, ...peerDependencies].some((externalPkg) =>
					source.startsWith(externalPkg),
				);
			},
		},
	},
});
