fs=require('fs');

var directory=process.argv[2];
var ext=process.argv[3];

fs.readdir(directory, function(err, files){
	for (i=0; i<files.length; i++){
		if (files[i].search("."+ext)!=-1){
			console.log(files[i]);
		}
	}
});
