var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var fs = require("fs");

var html = fs.readFileSync("demos/aeroviewr/index.html", "utf8");

function fileGroup(group, path, matcher) {
    var script = "";
    var scriptTags = html.split("<!-- " + group + " -->")[1].split("\n");

    for (var idx = 0; idx < scriptTags.length ; idx++) {
        var scriptTag = scriptTags[idx].trim();

        if (scriptTag) {
            var src = matcher.exec(scriptTag)[1];
            var text = fs.readFileSync(path + src, "utf8");

            if (text.charCodeAt(0) == 0xfeff) {
                text = text.substring(1);
            }

            script += text;
        }
    }

    fs.writeFileSync("demos/aeroviewr/js/" + group + ".all.js", script);

    var ast = parser.parse(script);

    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);

    script = uglify.gen_code(ast);
    fs.writeFileSync("demos/aeroviewr/js/" + group + ".all.min.js", script);
}

fileGroup("kendo","", /src="..\/..\/([^"]*)/);
fileGroup("aeroviewr", "demos/aeroviewr/", /src="([^"]*)/);

var sections = html.split("<!-- kendo -->");
html = sections[0] + '<script src="js/kendo.all.min.js" ></script>' + sections[2];

sections = html.split("<!-- aeroviewr -->");
fs.writeFileSync("index.html", sections[0] + '<script src="js/aeroviewr.all.min.js" ></script>' + sections[2]);
