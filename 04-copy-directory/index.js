const fs = require('node:fs/promises');
const path = require('node:path');

function copyDir(folderPath, fromName, toName) {
  const from = path.join(folderPath, fromName);
  const to = path.join(folderPath, toName);

  fs.mkdir(to, { recursive: true });

  fs.readdir(from, { withFileTypes: true }).then((files) => {
    for (const file of files) {
      const filePath = path.join(from, file.name);
      const newFilePath = path.join(to, file.name);
      fs.copyFile(filePath, newFilePath);
    }
  });
}

const folderPath = path.basename(__dirname);
copyDir(folderPath, 'files', 'files-copy');

module.exports.copyDir = copyDir;
