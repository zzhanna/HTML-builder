const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;
const stdout = process.stdout;



compProj();
 async function compProj() {
   await fsPromises.rmdir(path.join(__dirname, 'project-dist'), { recursive: true, force: true }, err => {
              if (err) throw err;
           });
        await fsPromises.mkdir(path.join(__dirname, 'project-dist'), { recursive: true }, (err) => {
      if (err) throw err;
   });
   const pathAssets = await path.join(__dirname, 'assets');
   const pathProject = await path.join(__dirname, 'project-dist', 'assets');
    await copyDir(pathAssets, pathProject);
    await copyHtml();
     await style();
     stdout.write('Your project is composed!')
}


async function style() {
   const writeStream = await fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
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
}

async function copyDir(pathFrom, pathWhere) {
   await fs.mkdir(pathWhere, { recursive: true }, (err) => {
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



async function copyHtml(template, components) {
   template = await path.join(__dirname, 'template.html');
   components = await path.join(__dirname, 'components');
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
                  fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), html, (err) => {
                     if (err) throw err;
                  });
               });
            }
         });
      });
   });
}

