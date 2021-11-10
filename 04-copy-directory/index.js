const fs = require('fs');
const path = require('path');
const stdout = process.stdout;

fs.access(path.join(__dirname, 'files-copy'), err => {
   if (!err) {
      fs.rmdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
           if (err) throw err;
      });
       setTimeout(() => {dir()}, 500 ) ;
    } else if (err) {
           dir();
   }
});

function dir() {
   fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, err => {
      if (err) throw err;
   });
   fs.readdir(path.join(__dirname, 'files'), { withFileTypes: true }, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
         if (file.isFile()) {
            fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), (err) => {
               if (err) throw err;
            });
         };
         console.log('1')
      });
      stdout.write('Your files have been copied in new directory files-copy \n')
   });
}
