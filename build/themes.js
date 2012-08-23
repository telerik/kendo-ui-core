var less = require("./less-js/lib/less"),
    execSync = require("execSync"),
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
            var code = execSync.code("./build/less-js/bin/lessc " + file + " " + output);
            console.log("Built theme ", theme, " (", code, ")");
            cache[file] = kendoBuild.readText(output);
        }
    });
}

exports.buildThemes = buildThemes;
