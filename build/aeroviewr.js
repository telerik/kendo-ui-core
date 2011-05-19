var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var fs = require("fs");
var path = require("path");
var sys = require("sys");

var html = fs.readFileSync("demos/aeroviewr/index.html", "utf8");

function copytree(src, dst) {
    if(!path.existsSync(src)) {
        throw new Error(src + ' does not exists. Nothing to be copied');
    }

    if(!fs.statSync(src).isDirectory()) {
        throw new Error(src + ' must be a directory');
    }

    var filenames = fs.readdirSync(src);
    var basedir = src;

    if(!path.existsSync(dst)) {
        fs.mkdirSync(dst, 0755);
    }

    for(name in filenames) {
        var file = basedir + '/' + filenames[name];
        var newdst = dst + '/' + filenames[name];

        if(fs.statSync(file).isDirectory()) {
            copytree(file, newdst);
        } else {
            var reader = fs.createReadStream(file);
            var writer = fs.createWriteStream(newdst);
            sys.pump(reader, writer);
        }
    }
}

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

    fs.writeFileSync("live/js/" + group + ".all.js", script);

    var ast = parser.parse(script);

    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);

    script = uglify.gen_code(ast);
    fs.writeFileSync("live/js/" + group + ".all.min.js", script);
}

copytree("demos/aeroviewr", "live");

fileGroup("kendo","", /src="..\/..\/([^"]*)/);
fileGroup("aeroviewr", "live/", /src="([^"]*)/);

var sections = html.split("<!-- kendo -->");
html = sections[0] + '<script src="js/kendo.all.min.js" ></script>' + sections[2];

sections = html.split("<!-- aeroviewr -->");

html = sections[0] + '<script src="js/aeroviewr.all.min.js" ></script>' + sections[2];

sections = html.split("<!-- jquery -->");

html = sections[0] + '<script src="//ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js" ></script>' + sections[2];

fs.unlinkSync("live/index.html");
fs.writeFileSync("live/index.html", html);
