import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  files: ['src/**/*.test.ts'],
  nodeResolve: true,
  testFramework: {
    config: {
      timeout: '5000',
    },
  },
  plugins: [
    // Use the project tsconfig so decorators stay enabled for Lit elements
    esbuildPlugin({ ts: true, target: 'auto', tsconfig: 'tsconfig.json' }),
  ],
};