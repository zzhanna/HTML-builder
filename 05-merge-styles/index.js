const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
fs.readdir(path.join(__dirname, 'styles'), { withFileTypes: true }, (err, files) => {
   if (err) throw err;
   files.forEach(file => {
      if (file.isFile()) {
         const readStream = fs.createReadStream(path.join(__dirname, 'styles', file.name));
         if (path.parse(file.name).ext === '.css') {
            readStream.on('data', function (data) {
               writeStream.write(`${data.toString()}\n`);
            });
         }
      }
   });
});
stdout.write('Your files have been copied in new file bundle.css\n');

