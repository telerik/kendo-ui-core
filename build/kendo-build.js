var fs = require("fs"),
    util = require("util"),
    os = require("os"),
    path = require("path"),
    parser = require("./lib/parse-js"),
    spawn = require('child_process').spawn,
    uglify = require("./lib/process"),
    cssmin = require("./lib/cssmin").cssmin,
    themes = require("build/themes");

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
            if (!existsSync(destinationPath)) {
                fs.mkdirSync(destinationPath, fileInfo.mode);
            }

            copyDirSyncRecursive(sourcePath, destinationPath, skipClean, filter);

            if (!fs.readdirSync(destinationPath).length) {
                fs.rmdirSync(destinationPath);
            }
        } else if (fileInfo.isSymbolicLink()) {
            fs.symlinkSync(fs.readlinkSync(sourcePath), destinationPath);
        } else {
            if (filter && !filter.test(files[i])) {
                continue;
            }

            copyFileSync(sourcePath, destinationPath);
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

function buildVersion(year, release) {
    var date = new Date(),
        currentYear = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();

    if (currentYear > year) {
        month += (currentYear - year) * 12;
    }

    return year + "." + release + "." + (month * 100 + day);
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

function processDirs(path, callback) {
    var entries = fs.readdirSync(path), dir;

    for (var idx = 0; idx < entries.length; idx ++) {
        dir = path + "/" + entries[idx];

        if (fs.statSync(dir).isDirectory()) {
           callback(entries[idx]);
        }
    }
}

function processFilesRecursive(dir, filterRegex, callback) {
    var files = fs.readdirSync(dir),
        fileName,
        stat;

    for (var i = 0; i < files.length; i++) {
        fileName = dir + "/" + files[i];
        stat = fs.statSync(fileName);

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

var BOM = 0xfeff;
function stripBOM(text) {
    return hasBOM(text) ? text.substring(1) : text;
}

function addBOM(text) {
    return hasBOM(text) ? text : String.fromCharCode(BOM) + text;
}

function hasBOM(text) {
    return text.charCodeAt(0) == BOM;
}

function minifyJs(source) {
    var ast = parser.parse(source);
    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);
    return ";" + uglify.gen_code(ast);
}

function zip(name, filesPath, onSuccess) {
    var archive,
        osName = os.type();

    var success = function() {
        console.log("Package created: " + name);

        if (onSuccess) {
            onSuccess();
        }
    };

    if (osName == "Linux" || osName == "Darwin") {
        archive = spawnSilent("7z", [ "a", "-tzip", path.resolve(name), '*' ], { cwd: path.resolve(filesPath) }, success);
    } else {
        archive = spawnSilent("./build/lib/7z/7z", [ "a", "-tzip", name, path.join(filesPath, '*') ], {}, success);
    }
}

function spawnSilent(name, params, options, onSuccess, onError) {
    var proc,
        output = "";

    proc = spawn(name, params, options);

    var logger = function(data) {
        output += data;
    };

    proc.stderr.on('data', logger);
    proc.stdout.on('data', logger);

    proc.on('exit', function (code) {
        if (code === 0) {
            if (onSuccess) {
                onSuccess();
            }
        } else {
            util.print(name + " ", params.join(" "));
            util.print(output);
            if (onError) {
                onError();
            }
        }
    });
}

function mkdir(newDir) {
    try {
        fs.statSync(newDir)
    } catch(e) {
        fs.mkdirSync(newDir, fs.statSync("./").mode);
    }
}

function deployStyles(stylesRoot, outputRoot, header, compress) {
    var resourcesRegex = compress ? /\.(png|jpg|jpeg|gif|svg|ttf|woff)$/i : /\.(png|jpg|jpeg|gif|svg|ttf|woff)$/i,
        lessTemp = path.join(outputRoot, "_less");

    mkdir(outputRoot);
    mkdir(lessTemp);

    copyDirSyncRecursive(stylesRoot, outputRoot, true, resourcesRegex);

    processStyles(stylesRoot, outputRoot, header, compress);

    themes.buildThemes(stylesRoot, lessTemp);
    processStyles(lessTemp, outputRoot, header, compress);

    rmdirSyncRecursive(lessTemp);
}

function processStyles(stylesRoot, outputRoot, header, compress) {
    var stylesRegex = compress ? /\.css$/ : /\.(less|css)$/;

    processFilesRecursive(stylesRoot, stylesRegex, function(fileName) {
        var css = stripBOM(readText(fileName)),
            output = compress ? cssmin(css) : css,
            outputFileName = (compress ? fileName.replace(".css", ".min.css") : fileName);

        outputFileName = outputFileName.substr(stylesRoot.length, outputFileName.length);
        outputFileName = path.join(outputRoot, outputFileName);
        writeText(outputFileName, header + output);
    });
}

function msBuild(project, params, onSuccess, onError) {
    var build,
        osName = os.type(),
        buildParams = params.concat([project]);

    var success = function() {
        console.log("Built MSBuild project", project);
        if (onSuccess) {
            onSuccess();
        }
    };

    if (osName == "Linux" || osName == "Darwin") {
        build = spawnSilent("xbuild", buildParams, {}, success, onError);
    } else {
        build = spawnSilent(
            "c:\\Windows\\Microsoft.NET\\Framework64\\v4.0.30319\\msbuild.exe",
            buildParams,
            {},
            success,
            onError
        );
    }
}

function grep(items, condition) {
    var result = [];
    items.forEach(function(item) {
        if (condition(item)) {
            result.push(item);
        }
    });
    return result;
}

// Exports ====================================================================
exports.addBOM = addBOM;
exports.copyDirSyncRecursive = copyDirSyncRecursive;
exports.copyFileSync = copyFileSync;
exports.copyTextFile = copyTextFile;
exports.deployStyles = deployStyles;
exports.buildVersion = buildVersion;
exports.grep = grep;
exports.hasBOM = hasBOM;
exports.merge = merge;
exports.minifyJs = minifyJs;
exports.mkdir = mkdir;
exports.msBuild = msBuild;
exports.spawnSilent = spawnSilent;
exports.processFilesRecursive = processFilesRecursive;
exports.processDirs = processDirs;
exports.readText = readText;
exports.rmdirSyncRecursive = rmdirSyncRecursive;
exports.stripBOM = stripBOM;
exports.template = template;
exports.writeText = writeText;
exports.zip = zip;
