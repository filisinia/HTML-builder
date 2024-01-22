const fs = require('node:fs/promises');
const path = require('node:path');
const dirPath = path.join(path.basename(__dirname), 'secret-folder');

fs.readdir(dirPath, { withFileTypes: true }).then(async (files) => {
  for (const file of files) {
    if (file.isFile()) {
      const filePath = path.join(dirPath, file.name);
      const name = path.parse(file.name).name;
      const ext = path.extname(file.name).slice(1);
      const stats = await fs.stat(filePath);
      const size = stats.size;

      const result = name + ' - ' + ext + ' - ' + size + 'b';
      console.log(result);
    }
  }
});
