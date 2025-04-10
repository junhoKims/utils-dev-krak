import { createRequire } from 'node:module';
import { parse, resolve } from 'node:path';
import { globSync } from 'glob';
import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'utils-dev-krak',
	description: 'Typescript로 작성된 javascript, react 유틸리티 패키지',
	rewrites: {
		'docs/:page1': ':page1',
		'docs/:page1/:page2': ':page1/:page2',
	},
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Common', link: '/common/introdution' },
			{ text: 'React', link: '/react/introdution' },
		],
		sidebar: [
			{
				text: 'common',
				items: [
					{
						text: 'introdution',
						link: '/common/introdution',
					},
					...getMdItems('common'),
				],
			},
			{
				text: 'react',
				items: [
					{
						text: 'introdution',
						link: '/react/introdution',
					},
					...getMdItems('react'),
				],
			},
		],

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/junhoKims/utils-dev-krak' },
			{ icon: 'npm', link: 'https://github.com/junhoKims/utils-dev-krak' },
		],
	},
});

function getMdItems(genre: string) {
	const curPath = resolve(import.meta.dirname, `../${genre}`);

	return globSync(resolve(curPath, '**/*.md'))
		.filter((file: string) => {
			const { name } = parse(file);
			return name !== 'introdution';
		})
		.map((file: string) => {
			const { name } = parse(file);
			const relativePath = file.split('/docs')[1]?.replace(/\.md$/, '');

			if (!relativePath) {
				throw new Error(`"relativePath" is not found: ${name}`);
			}

			return {
				text: name,
				link: relativePath,
			};
		});
}
