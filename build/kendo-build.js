var fs = require("fs"),
    parser = require("./lib/parse-js"),
    uglify = require("./lib/process");

function rmdirSyncRecursive(path) {
    var files = fs.readdirSync(path)
        .map(function(fileName) { return path + "/" + fileName });

    for (var i = 0; i < files.length; i++) {
        var fileInfo = fs.statSync(files[i]);

        if (fileInfo.isDirectory()) {
            rmdirSyncRecursive(files[i]);
        } else {
            fs.unlinkSync(files[i]);
        }
    }

    return fs.rmdirSync(path);
}

function copyDirSyncRecursive(sourceDir, newDirLocation, skipClean, filter) {
    try {
        if (!skipClean && fs.statSync(newDirLocation).isDirectory()) {
            exports.rmdirSyncRecursive(newDirLocation);
        }
    } catch(e) { }

    var checkDir = fs.statSync(sourceDir);

    if (!skipClean) {
        fs.mkdirSync(newDirLocation, checkDir.mode);
    }

    var files = fs.readdirSync(sourceDir);

    for (var i = 0; i < files.length; i++) {
        var sourcePath = sourceDir + "/" + files[i],
            destinationPath = newDirLocation + "/" + files[i],
            fileInfo = fs.statSync(sourcePath);

        if (fileInfo.isDirectory()) {
            fs.mkdirSync(destinationPath, fileInfo.mode);
            copyDirSyncRecursive(sourcePath, destinationPath);

            if (!fs.readdirSync(destinationPath).length) {
                fs.rmdirSync(destinationPath);
            }
        } else if (fileInfo.isSymbolicLink()) {
            fs.symlinkSync(fs.readlinkSync(sourcePath), destinationPath);
        } else {
            if (filter && !filter.test(files[i])) {
                continue;
            }

            fs.writeFileSync(destinationPath, fs.readFileSync(sourcePath));
        }
    }
}

exports.rmdirSyncRecursive = rmdirSyncRecursive;
exports.copyDirSyncRecursive = copyDirSyncRecursive;
exports.minifyJs = function(source) {
    var ast = parser.parse(source);
    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);
    return uglify.gen_code(ast);
};

