var less = require("./less-js/lib/less"),
    fs = require("fs");

function generateThemes(themesFolder) {
    var template = fs.readFileSync(themesFolder + "template.less", "utf8"),
        themes = fs.readdirSync(themesFolder)
                    .filter(function(file) {
                        return file != "template.less" && /\.less$/i.test(file);
                    })
                    .map(function(file) {
                        return themesFolder + file;
                    });

    themes.forEach(function(theme) {
        var constants = fs.readFileSync(theme, "utf8"),
            themeName = /\/([^\/]+)\.less/i.exec(theme)[1];

        less.render(constants + template, function (e, css) {
            if (e) {
                console.log("ERROR: `" + theme + "` theme generation failed: " + e.message);
            } else {
                fs.writeFileSync(themesFolder + "kendo." + themeName + ".css", css, "utf8");

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
