var fs = require("fs"),
    sys = require("sys"),
    wrench = require("./wrench"),
    uglify = require("./uglify-js").uglify,
    parser = require("./uglify-js").parser,
    cssmin = require("./lib/cssmin").cssmin,
    regions = {},
    PATH = "live",
    MINIFY = false,
    jQueryCDN = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js",
    jsExtension = MINIFY ? '.min.js' : '.js',
    cssExtension = MINIFY ? '.min.css' : '.css',
    rowSeparator = /[\r\n]+\s+/,
    regionRegex = {
        description: getRegionRegex("description"),
        script: getRegionRegex("script"),
        css: getRegionRegex("css")
    };

function getRegionRegex(regionName) {
    return new RegExp("\\s*<!--\\s*" + regionName + "\\s*-->(([\\r\\n]|.)*?)<!--\\s*" + regionName + "\\s*-->", "im");
}

function removeDuplicate(resource, target) {
    var scriptTag = resource.replace(/(\.\.\/)+/g, '[\.\/]*').replace(/\//g, '\\/').replace(/\./g, '\\.'),
        rex = new RegExp('[\\r\\n]+\\s+' + scriptTag, 'i');

    return target.replace(rex, '');
}

function splitScriptRegion(exampleHTML, base) {
    var baseScripts = regions.script.html,
        scriptMatches = regionRegex.script.exec(exampleHTML),
        jQueryStripper = /src="js\/jquery\.min\.js"/g,
        scriptStripper1 = /"(.*?)src/g,
        scriptStripper2 = /src="[.\/]*([^"]*)([^\.min]*)\.js"/g,
        currentPageScripts = scriptMatches ? scriptMatches[1].trimLeft() : '';

    if (!currentPageScripts)
        return false;

    currentPageScripts.trim().split(rowSeparator).forEach(function(item) {
        baseScripts = removeDuplicate(item, baseScripts);
    });

    currentPageScripts = currentPageScripts.replace(scriptStripper1, '"js');
    currentPageScripts = currentPageScripts.replace(scriptStripper2, 'src="' + base + '$1' + jsExtension + '"');
    baseScripts = baseScripts.replace(scriptStripper1, '"js');
    baseScripts = baseScripts.replace(scriptStripper2, 'src="' + base + '$1' + jsExtension + '"');

    if (MINIFY) {
        currentPageScripts = currentPageScripts.replace(jQueryStripper, 'src="' + jQueryCDN + '"');
    }

    return currentPageScripts + baseScripts;
}

function splitCSSRegion (exampleHTML, base) {
    var baseCSS = regions.css.html,
        cssMatches = regionRegex.css.exec(exampleHTML),
        currentPageCSS = cssMatches ? cssMatches[1].trimLeft() : '',
        cssStripper = /href="[.\/]*([^"]*)\.css"/g;

    if (!currentPageCSS)
        return false;

    currentPageCSS.trim().split(rowSeparator).forEach(function(item) {
        baseCSS = removeDuplicate(item, baseCSS);
    });

    currentPageCSS = currentPageCSS.replace(cssStripper, 'href="' + base + '$1' + cssExtension + '"');
    baseCSS = baseCSS.replace(cssStripper, 'href="' + base + '$1' + cssExtension + '"');

    return currentPageCSS + baseCSS;
}

function processExample(file) {
    var exampleHTML = fs.readFileSync(file, "utf8"),
        base = file === PATH + "/index.html" ? "" : "../",
        scriptRegion = splitScriptRegion(exampleHTML, base),
        cssRegion = splitCSSRegion(exampleHTML, base);

    if (!scriptRegion || ! cssRegion) {
        console.warn("Skipping file " + file + ": Empty script or CSS region.");
        return;
    }

    exampleHTML = regions.meta.exec(exampleHTML, regions.meta.html);

    exampleHTML = regions.script.exec(exampleHTML, scriptRegion);

    exampleHTML = regions.css.exec(exampleHTML, cssRegion);

    exampleHTML = regions.nav.exec(exampleHTML, regions.nav.html.replace(/href="([^"]*)"/g, 'href="' + base + '$1"'));

    var description = regionRegex.description.exec(exampleHTML);
    exampleHTML = exampleHTML.replace(regionRegex.description, '');

    if (description)
        exampleHTML = regions.tools.exec(exampleHTML, regions.tools.html.replace(regionRegex.description, description[0]));
    else
        exampleHTML = regions.tools.exec(exampleHTML);

    fs.writeFileSync(file, exampleHTML, "utf8");
}

function processdir(dir) {
    var children = fs.readdirSync(dir);
    for (var i = 0; i < children.length; i++) {
        var name = dir + "/" + children[i];
        var stat = fs.statSync(name);

        if (stat.isFile()) {
            if (/\.html$/.test(name))
                processExample(name);
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
        var re = new RegExp("<!--\\s*" + region + "\\s*-->([\\u000a\\u000d\\u2028\\u2029]|.)*<!--\\s*" + region + "\\s*-->", "ig");
        var html = re.exec(indexHtml)[0].trim();

        regions[region] = {
            rex: re,
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
