const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  stdout.write("\nFiles in directory secret-folder:\n");
  files.forEach(file => {
    if (file.isFile()) {
      fs.stat(path.join(__dirname, 'secret-folder', file.name), { withFileTypes: true }, (err, statFile) => {
        if (err) throw err;
        stdout.write(path.parse(file.name).name + ' - ' + path.extname(file.name).slice(1) + ' - ' + statFile.size + 'b' + '\n');
      }
      )
    }
  })
})