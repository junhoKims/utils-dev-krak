import { defineConfig } from 'vite-plus';

export default defineConfig({
  staged: {
    '*': 'vp check --fix',
  },
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    ignorePatterns: ['dist/**'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    singleQuote: true,
    printWidth: 100,
  },
  test: {
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
  },
  run: {
    tasks: {
      'check:fix:cache': {
        command: 'vp check --fix',
      },
      'pack:cache': {
        command: 'vp pack',
      },
      'test:cache': {
        command: 'vp test',
      },
    },
  },
});
