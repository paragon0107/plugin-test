// build-helper.js
const { execSync } = require('child_process');
const path = require('path');
const esbuild = require('esbuild');
const pkg = require('./package.json');

const siteUrl = pkg.config.siteURL;
console.log('Using site URL:', siteUrl);

async function build() {
  try {
    // Build the plugin with esbuild JS API
    console.log('Building plugin...');
    
    // Define object for esbuild
    const define = {
      'SITE_URL': JSON.stringify(siteUrl)
    };
    
    console.log('esbuild define:', define);
    
    // Use esbuild JS API directly
    await esbuild.build({
      entryPoints: ['plugin/code.ts'],
      bundle: true,
      target: 'es6',
      loader: { '.svg': 'text' },
      outfile: 'plugin/dist/code.js',
      define: define
    });
    
    console.log('Plugin build completed successfully!');
    
    // Build Next.js
    console.log('Building Next.js...');
    execSync('npm run build:next', { 
      stdio: 'inherit' 
    });
    
    console.log('Build completed successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
