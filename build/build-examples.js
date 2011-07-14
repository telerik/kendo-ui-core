var fs = require("fs"),
    sys = require("sys"),
    wrench = require("./wrench"),
    uglify = require("./uglify-js").uglify,
    parser = require("./uglify-js").parser,
    cssmin = require("./lib/cssmin").cssmin,
    regions = {},
    PATH = "live",
    MINIFY = false,
    jQueryCDN = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js";

function processfile(file) {
    if (/\.html$/.test(file)) {
        var data = fs.readFileSync(file, "utf8"),
            jsExtention = MINIFY ? '.min.js' : '.js',
            cssExtention = MINIFY ? '.min.css' : '.css',
            descRE = /\s*<!--\s*description\s*-->([\u000a\u000d\u2028\u2029]|.)*?<!--\s*description\s*-->/g,
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
            jQueryStripper = /src="js\/jquery\.min\.js"/g,
            scriptStripper1 = /"(.*?)src/g,
            scriptStripper2 = /src="[.\/]*([^"]*)([^\.min]*)\.js"/g,
            cssStripper = /href="[.\/]*([^"]*)\.css"/g;

        selfScripts.trim().split(rowSeparator).forEach(function(item) {
            scripts = scripts.replace(new RegExp('[\\r\\n]+\\s+'+item.replace(/(\.\.\/)+/, '[\\.\/]*').replace(/\//g, '\\/').replace(/\./g, '\\.'), 'i'), '');
        });

        selfScripts = selfScripts.replace(scriptStripper1, '"js');
        selfScripts = selfScripts.replace(scriptStripper2, 'src="' + base + '$1' + jsExtention + '"');
        scripts = scripts.replace(scriptStripper1, '"js');
        scripts = scripts.replace(scriptStripper2, 'src="' + base + '$1' + jsExtention + '"');

        if (MINIFY) {
            selfScripts = selfScripts.replace(jQueryStripper, 'src="' + jQueryCDN + '"');
        }

        selfCSS.trim().split(rowSeparator).forEach(function(item) {
            css = css.replace(new RegExp('[\\r\\n]+\\s+'+item.replace(/(\.\.\/)+/g, '[\\.\/]*').replace(/\//g, '\\/').replace(/\./g, '\\.'), 'i'), '');
        });

        selfCSS = selfCSS.replace(cssStripper, 'href="' + base + '$1' + cssExtention + '"');
        css = css.replace(cssStripper, 'href="' + base + '$1' + cssExtention + '"');

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

        fs.writeFileSync(file, data, "utf8");
    }
}

function processdir(dir) {
    var children = fs.readdirSync(dir);
    for (var i = 0; i < children.length; i++) {
        var name = dir + "/" + children[i];
        var stat = fs.statSync(name);

        if (stat.isFile()) {
            processfile(name);
        } else {
            processdir(name);
        }
    }
}

exports.build = function(orig, dest, min) {
    MINIFY = min;

    if (dest) {
        PATH = dest;
    }

    try {
        fs.statSync(PATH)
    } catch(e) {
        fs.mkdirSync(PATH, fs.statSync("./").mode);
    }

    var originJS = "src",
        originStyles = "styles";

    if (orig) {
        originJS = orig + "/js";
        originStyles = orig + "/styles";
    }

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

    wrench.copyDirSyncRecursive("demos/examples", PATH);
    wrench.copyDirSyncRecursive(originJS, PATH + "/js");
    wrench.copyDirSyncRecursive(originStyles, PATH + "/styles");
    fs.unlinkSync(PATH + "/template.html");

    if (!MINIFY) {
        var data = fs.readFileSync("src/jquery.js", "utf8");
        fs.writeFileSync(PATH + "/js/jquery.js", data, "utf8");
    }

    fs.readdirSync("demos/examples/styles")
        .forEach(function(file) {
            var data = fs.readFileSync("demos/examples/styles/" + file, "utf8");
            if (MINIFY) {
                data = cssmin(data);
                file = file.replace(".css", ".min.css");
            }

            fs.writeFileSync(PATH + "/styles/" + file, data, "utf8");
        });


    fs.readdirSync("demos/examples/js")
        .forEach(function(file) {
            var data = fs.readFileSync("demos/examples/js/" + file, "utf8");
            if (MINIFY) {
                var ast = parser.parse(data);
                ast = uglify.ast_mangle(ast);
                ast = uglify.ast_squeeze(ast);
                data = uglify.gen_code(ast);

                file = file.replace(".js", ".min.js");
            }
            fs.writeFileSync(PATH + "/js/" + file, data, "utf8");
        });

    processdir(PATH);
}
