var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var fs = require("fs");
var path = require("path");
var sys = require("sys");
var wrench = require("./wrench");

var html = fs.readFileSync("demos/aeroviewr/index.html", "utf8");

function processFileGroup(group, path, matcher) {
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

    var ast = parser.parse(script);

    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);

    script = uglify.gen_code(ast);
    fs.writeFileSync("live/js/" + group + ".all.min.js", script);
}

function replaceBlock(block, replace) {
    var sections = html.split("<!-- " + block + " -->");
    return sections[0] + replace + sections[2];
}

wrench.copyDirSyncRecursive("demos/aeroviewr", "live");
fs.unlinkSync("live/js/aeroviewr.js");
fs.unlinkSync("live/js/visitor.js");
fs.unlinkSync("live/js/upload.js");
fs.unlinkSync("live/js/user.js");
fs.unlinkSync("live/js/data.js");
fs.unlinkSync("live/js/flickr.js");
fs.unlinkSync("live/js/slideshow.js");

processFileGroup("kendo","", /src="..\/..\/([^"]*)/);
processFileGroup("aeroviewr", "demos/aeroviewr/", /src="([^"]*)/);

html = replaceBlock("jquery",  '<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js"></script>');
html = replaceBlock("kendo",  '<script src="js/kendo.all.min.js"></script>');
html = replaceBlock("aeroviewr",  '<script src="js/aeroviewr.all.min.js"></script>');

fs.unlinkSync("live/index.html");
fs.unlinkSync("live/FlickrAuth.html");
fs.unlinkSync("live/img/icons.psd");
fs.unlinkSync("live/img/scroll-arrows.psd");
fs.writeFileSync("live/index.html", html);
