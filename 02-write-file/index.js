const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
const stdin = process.stdin;
fs.writeFile(path.join(__dirname, 'text.txt'), '', (err) => {
   if (err) throw err;
   stdout.write('Hello, friend! Write your text\n');
});

stdin.on('data', (data) => {
   let dataUser = data.toString().trim();
   dataUser === 'exit' ? exit() : fs.appendFile(path.join(__dirname, 'text.txt'), data, err => {
      if (err) throw err;
   });
});
function exit() {
   stdout.write('Your file text.txt in directory. Bye, friend!\n');
   process.exit();
}
process.on('SIGINT', exit);