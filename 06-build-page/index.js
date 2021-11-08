const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
const stdin = process.stdin;

fs.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, err => {
   if (err) throw err;
});

const writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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

const pathAssets = path.join(__dirname, 'assets');
const pathProject = path.join(__dirname, 'project-dist', 'assets');
function copyDir(pathFrom, pathWhere) {
   fs.mkdir(pathWhere, { recursive: true }, (err) => {
      if (err) throw err;
   });
   fs.readdir(pathFrom, { withFileTypes: true }, (err, files) => {
      files.forEach((file) => {
         let pathFromNew = path.join(pathFrom, file.name);
         let pathWhereNew = path.join(pathWhere, file.name);
         if (!file.isFile()) {
            copyDir(pathFromNew, pathWhereNew, (err) => {
               if (err) throw err;
            });
         } else {
            fs.copyFile(pathFromNew, pathWhereNew, (err) => {
               if (err) throw err;
            });
         }
      });
   });
};
copyDir(pathAssets, pathProject);

const template = path.join(__dirname, 'template.html');
const components = path.join(__dirname, 'components');
function copyHtml(template, components) {
   fs.readFile(template, (err, template) => {
      if (err) throw err;
      let html = template.toString();
      fs.readdir(components, (err, files) => {
         if (err) throw err;
         files.forEach((file) => {
            if (path.extname(file) === '.html') {               
               const tag = new RegExp(`{{${file.split('.')[0]}}}`);
               fs.readFile(path.join(components, file), (err, data) => {
                  if (err) throw err;
                  html = html.replace(tag, data);
                  setTimeout(() => fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html, (err) => {
                     if (err) throw err;
                  }), 0);
               });
            }
         });
      });
   });
}
copyHtml(template, components);