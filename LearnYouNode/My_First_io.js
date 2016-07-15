var fs=require('fs');

var file=fs.readFileSync(process.argv[2]);
file=file.toString();
var newlines=file.match(/\n/g)
console.log(newlines.length);
