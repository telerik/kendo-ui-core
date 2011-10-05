var less = require("./less-js/lib/less"),
    fs = require("fs");

function generateThemes(themesFolder) {
    var themes = fs.readdirSync(themesFolder)
                    .filter(function(file) {
                        return file != "template.less" && /\.less$/i.test(file);
                    })
                    .map(function(file) {
                        return themesFolder + file;
                    });

    themes.forEach(function(theme) {
        var skinTemplate = fs.readFileSync(theme, "utf8"),
            themeName = /\/([^\/]+)\.less/i.exec(theme)[1];

        var parser = new(less.Parser)({
            paths: ['styles'] // Specify search paths for @import directives
        });

        parser.parse(skinTemplate, function (e, tree) {
            if (e) {
                console.log("ERROR: `" + theme + "` theme generation failed: " + e.message);
            } else {
                fs.writeFileSync(themesFolder + "kendo." + themeName + ".css", tree.toCSS(/* { compress: true } */), "utf8");

                console.log("theme `" + themeName + "` generated successfully.");
            }
        });
    });
}

function build() {
    generateThemes("styles/");
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
