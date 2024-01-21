const fs = require('node:fs');
const readline = require('node:readline');
const path = require('node:path');

const writeStream = fs.createWriteStream(
  path.join(path.basename(__dirname), 'text.txt'),
);

const readLine = readline.createInterface(process.stdin, process.stdout);
readLine.setPrompt('Hello, tell me your favorite dish :) \n');
readLine.prompt();

function endLine() {
  console.log('Great, bye!');
  readLine.close();
  writeStream.end();
}

readLine.on('line', (answer) => {
  if (answer === 'exit') {
    endLine();
  } else {
    console.log('Your favorite dish is: ', answer);
    writeStream.write(answer + '\n');
  }
});

readLine.on('SIGINT', endLine);
