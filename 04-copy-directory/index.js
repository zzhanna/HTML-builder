const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

projectDist();

async function projectDist() {
   await fs.rmdir(path.join(__dirname, 'files-copy'), { recursive: true, force: true }, err => {
      if (err) throw err;
      dir();
   });
   await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
      if (err) throw err;
   });

}

async function dir() {
   await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
      if (err) throw err;
   });
   await fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
         if (file.isFile()) {
            fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
               if (err) throw err;
            });
         };
      });
      stdout.write('Your files have been copied in new directory files-copy \n');
   });
}
