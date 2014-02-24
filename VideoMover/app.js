var walk = require('walk'),
    mv = require('mv');

console.log("\nUsing Source Directory : \n\t" + process.argv[2]);

var sourceDir = process.argv[2],
    destDir = "H:\Movies",
    fileCount = 0,
    validExtensions = [".mkv", ".mp4", ".avi"];


// Walker options
var walker = walk.walk(sourceDir, { followLinks: false });

walker.on('file', function(root, stat, next) {
    validExtensions.forEach(function(extension) {
        if (stat.name.toLowerCase().indexOf(extension.toLowerCase()) >= 0) {
            var filePath = root + '/' + stat.name;

            mv(filePath, destDir + '/' + stat.name, function(err) {
                if (err) {
                    console.log(err);
                } else {
					console.log("\n\t" + stat.name + " moved...");
					fileCount++;
				}
            });
        }
    });

    next();
});


walker.on('error', function(er, entry, stat) {
    console.log('Got error ' + er + ' on entry ' + entry);
});