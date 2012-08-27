var less = require("./less-js/lib/less"),
    execSync = require("exec-sync"),
    kendoBuild = require("./kendo-build"),
    fs = require("fs"),
    path = require("path"),
    cache = {};

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
            var error = execSync("node \"build/less-js/bin/lessc\" " + file + " " + output, true).stderr;
            if (error) {
                throw new Error(error);
            }
            console.log("Built theme ", theme);
            cache[file] = kendoBuild.readText(output);
        }
    });
}

exports.buildThemes = buildThemes;
