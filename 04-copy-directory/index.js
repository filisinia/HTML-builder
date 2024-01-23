const fs = require('node:fs');
const path = require('node:path');

function copyDir(from, to) {
  fs.promises.mkdir(to, { recursive: true });

  fs.promises.readdir(from, { withFileTypes: true }).then((files) => {
    for (const file of files) {
      const filePath = path.join(from, file.name);
      const newFilePath = path.join(to, file.name);
      fs.promises.copyFile(filePath, newFilePath);
    }
  });
}

const from = path.join(path.basename(__dirname), 'files');
const to = path.join(path.basename(__dirname), 'files-copy');
copyDir(from, to);

module.exports.copyDir = copyDir;
