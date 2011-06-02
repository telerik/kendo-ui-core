var fs = require("fs");
var path = require("path");
var sys = require("sys");
var wrench = require("./wrench");

var navRe = /<!--\s*nav\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*nav\s*-->/g;
var codeRe = /<!--\s*code\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*code\s*-->/g;
var scriptRe = /<!--\s*script\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*script\s*-->/g;
var cssRe = /<!--\s*css\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*css\s*-->/g;

function processdir(dir) {
    fs.readdir(dir, function(err, children) {
        if (err) throw err;

        for (var i = 0; i < children.length; i++) {
            var name = dir + "/" + children[i];
            var stat = fs.statSync(name);

            if (stat.isFile()) {
                processfile(name);
            } else {
                processdir(name);
            }
        }
    });
}

function processfile(file) {
    if (/\.html$/.test(file)) {
        fs.readFile(file, "utf8", function(err, data) {
            if (err) throw err;

            var base = file === "live/index.html" ? "" : "../";

            var scripts = regions.script.html;

            scripts = scripts.replace(/"(.*?)src/g, '"' + base + "js");

            scripts = scripts.replace(/src="([^"]*)"/g, 'src="' + base + '$1"');

            data = regions.script.exec(data, scripts);

            data = regions.css.exec(data, regions.css.html.replace(/href="([^"]*)"/g, 'href="' + base + '$1"'));;

            data = regions.nav.exec(data);
            data = regions.code.exec(data);

            fs.writeFile(file, data);
        });
    }
}

var indexHtml = fs.readFileSync("demos/examples/index.html", "utf8");

var regions = {};

"nav,script,code,css".split(",").forEach(function(region) {
    var re = new RegExp("<!--\\s*" + region + "\\s*-->(([\\u000a\\u000d\\u2028\\u2029]|.)*)<!--\\s*" + region + "\\s*-->", "g");
    var html = re.exec(indexHtml)[1].trim();

    regions[region] = {
        html: html,
        exec: function(data, value) {
            value = value || html;

            return data.replace(re, value);
        }
    };
});

wrench.copyDirSyncRecursive("demos/examples", "live");
wrench.copyDirSyncRecursive("src", "live/js");

fs.readdir("demos/examples/js", function(err, files) {
    files.forEach(function(file) {
        wrench.copyFile("demos/examples/js/" + file, "live/js/" + file);
    });
});

fs.unlink("live/template.html");

processdir("live");
