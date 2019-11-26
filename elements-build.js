const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const applicationName = 'TODO WRITE APPLICATION NAME';

  const files = [
    './dist/'+ applicationName + '/runtime-es2015.js',
    './dist/'+ applicationName + '/polyfills-es2015.js',
    './dist/'+ applicationName + '/scripts.js',
    './dist/'+ applicationName + '/main-es2015.js'
  ];

  await fs.ensureDir('elements');

  await concat(files, 'elements/'+ applicationName + '.js');

})()
