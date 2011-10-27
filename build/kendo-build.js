var fs = require("fs"),
    parser = require("./lib/parse-js"),
    uglify = require("./lib/process");

function rmdirSyncRecursive(path) {
    if (!existsSync(path)) {
        return;
    }

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

function existsSync(path) {
    try {
        fs.lstatSync(path);
        return true;
    } catch(e) {
        return false;
    }
}

function copyFileSync(source, destination) {
    fs.writeFileSync(destination, fs.readFileSync(source));
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

function merge(files) {
    var result = "";

    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf("*") > -1) {
            var dir = files[i].substring(0, files[i].indexOf("*")),
                dirContents = fs.readdirSync(dir).map(function(file) {
                    return dir + file;
                });

            result += merge(dirContents);
        } else {
            result += fs.readFileSync(files[i], "utf8");
        }
    }

    return result.replace("\ufeff", "");
}

function generateVersion() {
    var date = new Date(),
        day = date.getDate();

    if (day < 10) {
        day = "0" + day;
    }

    return date.getFullYear() + ".2." + (date.getMonth() + 1) + "" + day;
}

function template(template) {
    var paramName = "data",
        useWithBlock = true,
        functionBody = "var o;",
        encodeRegExp = /\${([^}]*)}/g,
        parts,
        part,
        idx;

    functionBody += useWithBlock ? "with(" + paramName + "){" : "";

    functionBody += "o=";

    parts = template
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t')
        .replace(encodeRegExp, "#=e($1)#")
        .replace(/\\#/g, "__SHARP__")
        .split("#");

    for (idx = 0; idx < parts.length; idx ++) {
      part = parts[idx];

      if (idx % 2 === 0) {
        functionBody += "\'" + part.split("'").join("\\'") + "'";
      } else {
        if (part.charAt(0) === "=") {
          functionBody += "+(" + part.substring(1) + ")+";
        } else {
          functionBody += ";" + part + "o+=";
        }
      }
    }

    functionBody += useWithBlock ? ";}" : ";";

    functionBody += "return o;";

    functionBody = functionBody.replace(/__SHARP__/g, '#');

    return new Function(paramName, functionBody);
}

function processFilesRecursive(dir, filterRegex, callback) {
    var files = fs.readdirSync(dir),
        fileName,
        stat;

    for (var i = 0; i < files.length; i++) {
        var fileName = dir + "/" + files[i];
        var stat = fs.statSync(fileName);

        if (!stat.isFile()) {
            processFilesRecursive(fileName, filterRegex, callback);
        } else if (filterRegex.test(fileName)) {
            callback(fileName);
        }
    }
}

function copyTextFile(src, dest) {
    writeText(dest, readText(src));
}

function readText(fileName) {
    return fs.readFileSync(fileName, "utf8");
}

function writeText(fileName, text) {
    fs.writeFileSync(fileName, text, "utf8");
}

exports.merge = merge;
exports.generateVersion = generateVersion;
exports.rmdirSyncRecursive = rmdirSyncRecursive;
exports.copyDirSyncRecursive = copyDirSyncRecursive;
exports.minifyJs = function(source) {
    var ast = parser.parse(source);
    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);
    return uglify.gen_code(ast);
};
exports.template = template;
exports.processFilesRecursive = processFilesRecursive;
exports.copyTextFile = copyTextFile;
exports.readText = readText;
exports.writeText = writeText;

