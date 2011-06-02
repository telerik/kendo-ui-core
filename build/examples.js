var fs = require("fs");
var path = require("path");
var sys = require("sys");
var wrench = require("./wrench");

var navRe = /<!--\s*nav\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*nav\s*-->/g;
var codeRe = /<!--\s*code\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*code\s*-->/g;
var scriptRe = /<!--\s*script\s*-->(([\u000a\u000d\u2028\u2029]|.)*)<!--\s*script\s*-->/g;

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

            data = data.replace(navRe, navHtml)
                       .replace(codeRe, codeHtml);

            var base = file === "live/index.html" ? "" : "../";

            data = data.replace(scriptRe, scriptHtml.replace(/src=\"([^"]*)\"/g, 'src="' + base + '$1"'));

            fs.writeFile(file, data);
        });
    }
}

var indexHtml = fs.readFileSync("demos/examples/index.html", "utf8");
var navHtml = navRe.exec(indexHtml)[1].trim();
var codeHtml = codeRe.exec(indexHtml)[1].trim();
var scriptHtml = scriptRe.exec(indexHtml)[1].trim();

wrench.copyDirSyncRecursive("demos/examples", "live");

processdir("live");
