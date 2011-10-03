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
        begin =  "<#",
        end = "#>",
        useWithBlock = true,
        functionBody = "var o;",
        evalRegExp = /<#=(.+?)#>/g,
        quoteRegExp = /'(?=[^<"]*#>)/g;

    functionBody += useWithBlock ? "with(" + paramName + "){" : "";

    functionBody += "o='";

    functionBody += template
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "")
        .replace(/\t/g, "\\t")
        .replace(quoteRegExp,"\t")
        .split("'").join("\\'")
        .split("\t").join("'")
        .replace(evalRegExp, "'+($1)+'")
        .split(begin).join("';")
        .split(end).join("o+='");

    functionBody += useWithBlock ? "';}" : "';";

    functionBody += "return o;";

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
    fs.writeFileSync(dest, fs.readFileSync(src, "utf8"), "utf8");
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

