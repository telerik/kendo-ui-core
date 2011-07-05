var fs = require("fs");
var path = require("path");
var sys = require("sys");
var wrench = require("./wrench");
//minifiers
var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var cssmin = require("./lib/cssmin").cssmin;

var PATH = "live";
var regions = {};

function processfile(file) {
    if (/\.html$/.test(file)) {
        fs.readFile(file, "utf8", function(err, data) {
            if (err) throw err;

            var descRE = /\s*<!--\s*description\s*-->([\u000a\u000d\u2028\u2029]|.)*?<!--\s*description\s*-->/g,
                scriptRE = /\s*<!--\s*script\s*-->(([\u000a\u000d\u2028\u2029]|.)*?)<!--\s*script\s*-->/g,
                cssRE = /\s*<!--\s*css\s*-->(([\u000a\u000d\u2028\u2029]|.)*?)<!--\s*css\s*-->/g,
                base = file === PATH + "/index.html" ? "" : "../",
                scripts = regions.script.html,
                scriptMatches = scriptRE.exec(data),
                selfScripts = scriptMatches ? scriptMatches[1].trimLeft() : '',
                css = regions.css.html,
                cssMatches = cssRE.exec(data),
                selfCSS = cssMatches ? cssMatches[1].trimLeft() : '',
                rowSeparator = /[\r\n]+\s+/,
                scriptStripper1 = /"(.*?)src/g,
                scriptStripper2 = /src="[.\/]*([^"]*)"/g,
                cssStripper = /href="[.\/]*([^"]*)"/g;

            selfScripts.trim().split(rowSeparator).forEach(function(item) {
                scripts = scripts.replace(new RegExp('[\\r\\n]+\\s+'+item.replace(/(\.\.\/)+/, '[\\.\/]*').replace(/\//g, '\\/').replace(/\./g, '\\.'), 'i'), '');
            });

            selfScripts = selfScripts.replace(scriptStripper1, '"js');
            selfScripts = selfScripts.replace(scriptStripper2, 'src="' + base + '$1"');
            scripts = scripts.replace(scriptStripper1, '"js');
            scripts = scripts.replace(scriptStripper2, 'src="' + base + '$1"');

            selfCSS.trim().split(rowSeparator).forEach(function(item) {
                css = css.replace(new RegExp('[\\r\\n]+\\s+'+item.replace(/(\.\.\/)+/g, '[\\.\/]*').replace(/\//g, '\\/').replace(/\./g, '\\.'), 'i'), '');
            });

            selfCSS = selfCSS.replace(cssStripper, 'href="' + base + '$1"');
            css = css.replace(cssStripper, 'href="' + base + '$1"');

            data = regions.meta.exec(data, regions.meta.html.replace(cssStripper, 'href="' + base + '$1"'));

            data = regions.script.exec(data, selfScripts + scripts);

            data = regions.css.exec(data, selfCSS + css);

            data = regions.nav.exec(data, regions.nav.html.replace(/href="([^"]*)"/g, 'href="' + base + '$1"'));

            var description = descRE.exec(data);
            data = data.replace(descRE, '');

            if (description)
                data = regions.tools.exec(data, regions.tools.html.replace(descRE, description[0]));
            else
                data = regions.tools.exec(data);

            fs.writeFile(file, data);
        });
    }
}

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

exports.build = function(destination) {
    PATH = destination;

    var indexHtml = fs.readFileSync("demos/examples/index.html", "utf8");

    "nav,script,tools,css,meta".split(",").forEach(function(region) {
        var re = new RegExp("<!--\\s*" + region + "\\s*-->([\\u000a\\u000d\\u2028\\u2029]|.)*<!--\\s*" + region + "\\s*-->", "g");
        var html = re.exec(indexHtml)[0].trim();

        regions[region] = {
            html: html,
            exec: function(data, value) {
                value = value || html;

                return data.replace(re, value);
            }
        };
    });

    wrench.copyDirSyncRecursive("demos/examples", destination);
    wrench.copyDirSyncRecursive("src", destination + "/js");
    wrench.copyDirSyncRecursive("styles", destination + "/styles");
    fs.unlinkSync(destination + "/template.html");

    fs.readdir("demos/examples/styles", function(err, files) {
        files.forEach(function(file) {
            wrench.copyFile("demos/examples/styles/" + file, destination + "/styles/" + file);
        });
    });

    fs.readdir("demos/examples/js", function(err, files) {
        files.forEach(function(file) {
            wrench.copyFile("demos/examples/js/" + file, destination + "/js/" + file);
        });
    });

    processdir(destination);
}

exports.onlineExamples = function(origin, destination) {
    PATH = destination;

    var indexHtml = fs.readFileSync("demos/examples/index.html", "utf8");

    "nav,script,tools,css,meta".split(",").forEach(function(region) {
        var re = new RegExp("<!--\\s*" + region + "\\s*-->([\\u000a\\u000d\\u2028\\u2029]|.)*<!--\\s*" + region + "\\s*-->", "g");
        var html = re.exec(indexHtml)[0].trim();

        regions[region] = {
            html: html,
            exec: function(data, value) {
                value = value || html;

                return data.replace(re, value);
            }
        };
    });

    wrench.copyDirSyncRecursive("demos/examples", destination);
    wrench.copyDirSyncRecursive(origin + "/js", destination + "/js");
    wrench.copyDirSyncRecursive(origin + "/styles", destination + "/styles");
    fs.unlinkSync(destination + "/template.html");

    fs.readdir("demos/examples/styles", function(err, files) {
        files.forEach(function(file) {
            wrench.copyFile("demos/examples/styles/" + file, destination + "/styles/" + file);
        });
    });

    fs.readdir("demos/examples/js", function(err, files) {
        files.forEach(function(file) {
            wrench.copyFile("demos/examples/js/" + file, destination + "/js/" + file);
        });
    });

    processdir(destination);
}
