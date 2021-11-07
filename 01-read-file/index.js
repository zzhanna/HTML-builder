const fs = require('fs');
const path = require('path');
const stdout = process.stdout;
let stream = new fs.ReadStream(path.join(__dirname, 'text.txt'));
stream.on('readable', function (err, data) {
   if (err) throw err;
   data = stream.read();
   stdout.write(data);
   process.exit();
});




