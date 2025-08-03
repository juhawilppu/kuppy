// build.js
const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Ensure dist folder exists
fs.mkdirSync('dist', { recursive: true });

// JS bundle
esbuild.buildSync({
  entryPoints: ['src/kuppy.js'],
  bundle: true,
  outfile: 'dist/kuppy.js',
  format: 'esm',
  minify: true,
});

// Copy CSS file
fs.copyFileSync('src/kuppy.css', 'dist/kuppy.css');

