/*  wrench.js
 *
 *  A collection of various utility functions I've found myself in need of
 *  for use with Node.js (http://nodejs.org/). This includes things like:
 *
 *  - Recursively deleting directories in Node.js (Sync, not Async)
 *  - Recursively copying directories in Node.js (Sync, not Async)
 *  - Recursively chmoding a directory structure from Node.js (Sync, not Async)
 *  - Other things that I'll add here as time goes on. Shhhh...
 *
 *  These are all developed due to my work on Luno (http://github.com/ryanmcgrath/luno).
 *
 *  ~ Ryan McGrath (ryan [at] venodesigns.net)
 */

var fs = require("fs");

/*  wrench.rmdirSyncRecursive("directory_path");
 *
 *  Recursively dives through directories and obliterates everything about it. This is a
 *  Sync-function, which blocks things until it's done. No idea why anybody would want an
 *  Asynchronous version. :\
 */
exports.rmdirSyncRecursive = function(path) {
    var files = fs.readdirSync(path),
        currDir = path;

    /*  Loop through and delete everything in the sub-tree after checking it */
    for(var i = 0; i < files.length; i++) {
        var currFile = fs.statSync(currDir + "/" + files[i]);

        if(currFile.isDirectory()) // Recursive function back to the beginning
            exports.rmdirSyncRecursive(currDir + "/" + files[i]);

        else if(currFile.isSymbolicLink()) // Unlink symlinks
            fs.unlinkSync(currDir + "/" + files[i]);

        else // Assume it's a file - perhaps a try/catch belongs here?
            fs.unlinkSync(currDir + "/" + files[i]);
    }

    /*  Now that we know everything in the sub-tree has been deleted, we can delete the main
        directory. Huzzah for the shopkeep. */
    return fs.rmdirSync(path);
};

/*  wrench.copyDirSyncRecursive("directory_to_copy", "new_directory_location", opts);
 *
 *  Recursively dives through a directory and moves all its files to a new location. This is a
 *  Synchronous function, which blocks things until it's done. If you need/want to do this in
 *  an Asynchronous manner, look at wrench.copyDirRecursively() below.
 *
 *  Note: Directories should be passed to this function without a trailing slash.
 */
exports.copyDirSyncRecursive = function(sourceDir, newDirLocation, skipClean) {
    /*  Copying over something is... tricky. The user should know what they're doing at this point, so...
     *  blow any existing directory away!
     */
    try {
        if(!skipClean && fs.statSync(newDirLocation).isDirectory()) exports.rmdirSyncRecursive(newDirLocation);
    } catch(e) { }

    /*  Create the directory where all our junk is moving to; read the mode of the source directory and mirror it */
    var checkDir = fs.statSync(sourceDir);
    if (!skipClean) {
        fs.mkdirSync(newDirLocation, checkDir.mode);
    }

    var files = fs.readdirSync(sourceDir);

    for(var i = 0; i < files.length; i++) {
        var currFile = fs.statSync(sourceDir + "/" + files[i]);

        if(currFile.isDirectory()) {
            /*  Create a new directory in our copied version... */
            fs.mkdirSync(newDirLocation + "/" + files[i], currFile.mode);

            /*  ...and then recursion this thing right on back. */
            exports.copyDirSyncRecursive(sourceDir + "/" + files[i], newDirLocation + "/" + files[i]);
        } else if(currFile.isSymbolicLink()) {
            var symlinkFull = fs.readlinkSync(sourceDir + "/" + files[i]);
            fs.symlinkSync(symlinkFull, newDirLocation + "/" + files[i]);
        } else {
            /*  At this point, we've hit a file actually worth copying... so copy it on over. */
            var contents = fs.readFileSync(sourceDir + "/" + files[i]);
            fs.writeFileSync(newDirLocation + "/" + files[i], contents);
        }
    }
};

/*  wrench.chmodSyncRecursive("directory", filemode);
 *
 *  Recursively dives through a directory and chmods everything to the desired mode. This is a
 *  Synchronous function, which blocks things until it's done.
 *
 *  Note: Directories should be passed to this function without a trailing slash.
 */
exports.chmodSyncRecursive = function(sourceDir, filemode) {
    var files = fs.readdirSync(sourceDir);

    for(var i = 0; i < files.length; i++) {
        var currFile = fs.statSync(sourceDir + "/" + files[i]);

        if(currFile.isDirectory()) {
            /*  ...and recursion this thing right on back. */
            exports.chmodSyncRecursive(sourceDir + "/" + files[i], filemode);
        } else {
            /*  At this point, we've hit a file actually worth copying... so copy it on over. */
            fs.chmod(sourceDir + "/" + files[i], filemode);
        }
    }

    /*  Finally, chmod the parent directory */
    fs.chmod(sourceDir, filemode);
};



/*  wrench.rmdirRecursive("directory_path", callback);
 *
 *  Recursively dives through directories and obliterates everything about it.
 */
exports.rmdirRecursive = function rmdirRecursive(dir, clbk){
    fs.readdir(dir, function(err, files){
        if (err) return clbk(err);
        (function rmFile(err){
            if (err) return clbk(err);

            var filename = files.shift();
            if (filename === null || typeof filename == 'undefined')
                return fs.rmdir(dir, clbk);

            var file = dir+'/'+filename;
            fs.stat(file, function(err, stat){
                if (err) return clbk(err);
                if (stat.isDirectory())
                    rmdirRecursive(file, rmFile);
                else
                    fs.unlink(file, rmFile);
            });
        })();
    });
};

exports.copyFile = function(file, newFile) {
    fs.readFile(file, function(err, data) {
        fs.writeFile(newFile, data);
    });
}

/*  wrench.copyDirRecursive("directory_to_copy", "new_location", callback);
 *
 *  Recursively dives through a directory and moves all its files to a new
 *  location.
 *
 *  Note: Directories should be passed to this function without a trailing slash.
 */
exports.copyDirRecursive = function copyDirRecursive(srcDir, newDir, clbk) {
    fs.stat(newDir, function(err, newDirStat){
        if (!err) return exports.rmdirRecursive(newDir, function(err){
            copyDirRecursive(srcDir, newDir, clbk);
        });

        fs.stat(srcDir, function(err, srcDirStat){
            if (err) return clbk(err);
            fs.mkdir(newDir, srcDirStat.mode, function(err){
                if (err) return clbk(err);
                fs.readdir(srcDir, function(err, files){
                    if (err) return clbk(err);
                    (function copyFiles(err){
                        if (err) return clbk(err);

                        var filename = files.shift();
                        if (filename === null || typeof filename == 'undefined')
                            return clbk();

                        var file = srcDir+'/'+filename,
                            newFile = newDir+'/'+filename;

                        fs.stat(file, function(err, fileStat){
                            if (fileStat.isDirectory())
                                copyDirRecursive(file, newFile, copyFiles);
                            else if (fileStat.isSymbolicLink())
                                fs.readlink(file, function(err, link){
                                    fs.symlink(link, newFile, copyFiles);
                                });
                            else
                                fs.readFile(file, function(err, data){
                                    fs.writeFile(newFile, data, copyFiles);
                                });
                        });
                    })();
                });
            });
        });
    });
};
