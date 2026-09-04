#!/usr/bin/env node

// Suppress deprecation warnings for specific packages
process.noDeprecation = true;

// Import and run ESLint
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { spawn } = require('child_process');
const eslintPath = require.resolve('eslint');

spawn('node', [eslintPath, ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: true
}).on('exit', (code) => {
  process.exit(code);
});
