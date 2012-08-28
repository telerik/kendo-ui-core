// Imports ====================================================================
var less = require("./less-js/lib/less"),
    kendoBuild = require("./kendo-build"),
    fs = require("fs"),
    path = require("path"),
    ffi = require("ffi"),
    libc = new ffi.Library(null, {
        "system": ["int32", ["string"]]
    }),
    cache = {};

// Configuration ==============================================================
var lessCmd = path.join("build", "less-js", "bin", "lessc");

// Implementation =============================================================
function buildThemes(themesFolder, outputFolder) {
    kendoBuild.processFilesRecursive(themesFolder, /kendo\..+\.less/, function(file) {
        var parser = new(less.Parser)({
                paths: [ themesFolder ]
            }),
            theme = path.basename(file, ".less"),
            output = path.join(outputFolder, theme + ".css"),
            cacheEntry = cache[file];

        if (cacheEntry) {
            kendoBuild.writeText(output, cacheEntry);
        } else {
            var errorLevel = execSync("node " + lessCmd + " " + file + " " + output);
            if (errorLevel) {
                throw new Error("lessc exited with error level " + errorLevel);
            }
            console.log("Built theme ", theme);
            cache[file] = kendoBuild.readText(output);
        }
    });
}

function execSync(cmd) {
    return libc.system(cmd);
}

// Exports ====================================================================
exports.buildThemes = buildThemes;
