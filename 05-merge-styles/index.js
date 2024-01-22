const fs = require('node:fs');
const path = require('node:path');

const bundlePath = path.join(
  path.basename(__dirname),
  'project-dist',
  'bundle.css',
);

const streamWrite = fs.createWriteStream(bundlePath);
const stylesPath = path.join(path.basename(__dirname), 'styles');

fs.promises.readdir(stylesPath, { withFileTypes: true }).then((files) => {
  for (let file of files) {
    if (path.extname(file.name) === '.css') {
      const filePath = path.join(file.path, file.name);
      const streamRead = fs.createReadStream(filePath);
      streamRead.pipe(streamWrite);
    }
  }
});
