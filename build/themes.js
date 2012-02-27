var less = require("./less-js/lib/less"),
    kendoBuild = require("./kendo-build"),
    fs = require("fs"),
    path = require("path"),
    cache = {};

function buildThemes(themesFolder, outputFolder) {
    kendoBuild.processFilesRecursive(themesFolder, /kendo\..+\.less/, function(file) {
        var parser = new(less.Parser)({
                paths: [ themesFolder ]
            }),
            source = kendoBuild.readText(file),
            theme = path.basename(file, ".less"),
            output = path.join(outputFolder, theme + ".css"),
            cacheEntry = cache[file];

        if (cacheEntry) {
            kendoBuild.writeText(output, cacheEntry);
        } else {
            parser.parse(source, function (error, ast) {
                if (error) {
                    console.log("ERROR: `" + theme + "` theme generation failed: " + error.message);
                } else {
                    cache[file] = ast.toCSS();
                    kendoBuild.writeText(output, cache[file]);
                    console.log("Built theme", theme);
                }
            });
        }
    });
}

exports.buildThemes = buildThemes;
