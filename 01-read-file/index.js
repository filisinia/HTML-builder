const path = require('node:path');
const fs = require('node:fs');

const stream = fs.createReadStream(
  path.join(path.basename(__dirname), 'text.txt'),
);

stream.on('data', (data) => {
  console.log(data.toString());
});
