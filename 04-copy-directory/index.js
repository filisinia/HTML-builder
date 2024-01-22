const fs = require('node:fs/promises');
const path = require('node:path');

function copyDir() {
  const from = path.join(path.basename(__dirname), 'files');
  const to = path.join(path.basename(__dirname), 'files-copy');

  fs.mkdir(to, { recursive: true });

  fs.readdir(from, { withFileTypes: true }).then((files) => {
    for (const file of files) {
      const filePath = path.join(from, file.name);
      const newFilePath = path.join(to, file.name);
      fs.copyFile(filePath, newFilePath);
    }
  });
}

copyDir();
