const fs = require('node:fs');
const path = require('node:path');

function mergeStyles(folderPath, from, into, newFileName) {
  const bundlePath = path.join(folderPath, into, newFileName);

  const streamWrite = fs.createWriteStream(bundlePath);
  const stylesPath = path.join(folderPath, from);

  fs.promises.readdir(stylesPath, { withFileTypes: true }).then((files) => {
    for (let file of files) {
      if (path.extname(file.name) === '.css') {
        const filePath = path.join(file.path, file.name);
        const streamRead = fs.createReadStream(filePath);
        streamRead.pipe(streamWrite);
      }
    }
  });
}

const folderPath = path.basename(__dirname);
mergeStyles(folderPath, 'styles', 'project-dist', 'bundle.css');

module.exports.mergeStyles = mergeStyles;
