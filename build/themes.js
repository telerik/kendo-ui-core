var less = require("./less-js/lib/less"),
    fs = require("fs"),
    path = require("path");

function buildThemes(themesFolder, outputFolder, success) {
    var themes = fs.readdirSync(themesFolder)
                    .filter(function(file) {
                        return file != "template.less" && /\.less$/i.test(file);
                    })
                    .map(function(file) {
                        return path.join(themesFolder, file);
                    }),
        themesRemaining = themes.length;

    themes.forEach(function(theme) {
        var skinTemplate = fs.readFileSync(theme, "utf8"),
            themeName = /\/([^\/]+)\.less/i.exec(theme)[1];

        var parser = new(less.Parser)({
            paths: [ themesFolder ] // Specify search paths for @import directives
        });

        parser.parse(skinTemplate, function (e, tree) {
            if (e) {
                console.log("ERROR: `" + theme + "` theme generation failed: " + e.message);
            } else {
                fs.writeFileSync(path.join(outputFolder, themeName + ".css"), tree.toCSS(/* { compress: true } */), "utf8");
                console.log("Built theme", themeName);

                if (success && --themesRemaining === 0) {
                    success();
                }
            }
        });
    });
}

exports.buildThemes = buildThemes;
