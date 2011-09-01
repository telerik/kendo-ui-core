var less = require("./less-js/lib/less"),
    fs = require("fs");

function generateSkins(skinsFolder) {
    var template = fs.readFileSync(skinsFolder + "template.less", "utf8"),
        themes = fs.readdirSync(skinsFolder)
                    .filter(function(file) {
                        return file != "template.less" && /\.less$/i.test(file);
                    })
                    .map(function(file) {
                        return skinsFolder + file;
                    });

    themes.forEach(function(theme) {
        var constants = fs.readFileSync(theme, "utf8"),
            themeName = /\/([^\/]+)\.less/i.exec(theme)[1];

        less.render(constants + template, function (e, css) {
            if (e) {
                console.log("ERROR: `" + theme + "` theme generation failed: " + e.message);
            } else {
                fs.writeFile(skinsFolder + "kendo." + themeName + ".css", css, "utf8", function(err) {
                    if (err) {
                        throw err;
                    }

                    console.log("theme `" + themeName + "` generated successfully.");
                });
            }
        });
    });
}

function build() {
    generateSkins("styles/");
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
