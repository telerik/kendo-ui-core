/* requries */
var fs = require("fs"),
    sys = require("sys"),
    wrench = require("./wrench"),
    uglify = require("./uglify-js").uglify,
    parser = require("./uglify-js").parser,
    cssmin = require("./lib/cssmin").cssmin,

/* options  */
    examplesLocation = "demos/examples",
    outputPath = "live",
    MINIFY = false,
    DEBUG = false,
    jQueryCDN = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js",

/* globals  */
    rowSeparator = /[\r\n]+\s+/,
    baseRegions = {},
    regionRegex = {
        description: getRegionRegex("description"),
        script: getRegionRegex("script"),
        css: getRegionRegex("css")
    };

function getRegionRegex(regionName) {
    return new RegExp("\\s*<!--\\s*" + regionName + "\\s*-->(([\\r\\n]|.)*?)<!--\\s*" + regionName + "\\s*-->", "im");
}

function removeDuplicateResources(resource, target) {
    var scriptTag = resource.replace(/(\.\.\/)+/g, '[\.\/]*').replace(/\//g, '\\/').replace(/\./g, '\\.'),
        rex = new RegExp('[\\r\\n]+\\s+' + scriptTag, 'i');

    return target.replace(rex, '');
}

function splitScriptRegion(exampleHTML, base) {
    var baseScripts = baseRegions.script.html,
        jsExtension = MINIFY ? '.min.js' : '.js',
        scriptMatches = regionRegex.script.exec(exampleHTML),
        jQueryStripper = /src="js\/jquery\.min\.js"/g,
        scriptStripper1 = /"(.*?)src/g,
        scriptStripper2 = /src="[.\/]*([^"]*)([^\.min]*)\.js"/g,
        currentPageScripts = scriptMatches ? scriptMatches[1].trimLeft() : '';

    if (!currentPageScripts)
        return false;

    currentPageScripts.trim().split(rowSeparator).forEach(function(item) {
        baseScripts = removeDuplicateResources(item, baseScripts);
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

function splitCSSRegion(exampleHTML, base) {
    var baseCSS = baseRegions.css.html,
        cssExtension = MINIFY ? '.min.css' : '.css',
        cssMatches = regionRegex.css.exec(exampleHTML),
        currentPageCSS = cssMatches ? cssMatches[1].trimLeft() : '',
        cssStripper = /href="[.\/]*([^"]*)\.css"/g;

    if (!currentPageCSS)
        return false;

    currentPageCSS.trim().split(rowSeparator).forEach(function(item) {
        baseCSS = removeDuplicateResources(item, baseCSS);
    });

    currentPageCSS = currentPageCSS.replace(cssStripper, 'href="' + base + '$1' + cssExtension + '"');
    baseCSS = baseCSS.replace(cssStripper, 'href="' + base + '$1' + cssExtension + '"');

    return currentPageCSS + baseCSS;
}

function updateBaseLocation(html, base) {
    return html.replace(/href="([^"]*)"/g, 'href="' + base + '$1"');
}

function processExample(file) {
    var exampleHTML = fs.readFileSync(file, "utf8"),
        base = file === outputPath + "/index.html" ? "" : "../",
        scriptRegion = splitScriptRegion(exampleHTML, base),
        cssRegion = splitCSSRegion(exampleHTML, base);

    if (!scriptRegion || ! cssRegion) {
        if (DEBUG) {
            console.warn("Skipping file " + file + ": Empty script or CSS region.");
        }

        return;
    }

    exampleHTML = baseRegions.meta.exec(exampleHTML, baseRegions.meta.html);

    exampleHTML = baseRegions.script.exec(exampleHTML, scriptRegion);

    exampleHTML = baseRegions.css.exec(exampleHTML, cssRegion);

    exampleHTML = baseRegions.nav.exec(exampleHTML, updateBaseLocation(baseRegions.nav.html, base));

    var description = regionRegex.description.exec(exampleHTML);
    exampleHTML = exampleHTML.replace(regionRegex.description, '');

    exampleHTML = baseRegions.tools.exec(exampleHTML, baseRegions.tools.html.replace(regionRegex.description, description[0]));

    fs.writeFileSync(file, exampleHTML, "utf8");
}

function processExamplesDirectory(dir) {
    var children = fs.readdirSync(dir);

    for (var i = 0; i < children.length; i++) {
        var name = dir + "/" + children[i];
        var stat = fs.statSync(name);

        if (!stat.isFile()) {
            processExamplesDirectory(name);
        } else if (/\.html$/.test(name)) {
            processExample(name);
        }
    }
}

function copyResources(source, destination, processCallback) {
    processCallback = processCallback || function(data) { return data; };

    fs.readdirSync(source)
        .forEach(function(file) {
            var data = fs.readFileSync(source + file, "utf8");

            data = processCallback(data);

            if (MINIFY) {
                file = file.replace(/\.(css|js)$/, ".min.$1");
            }

            fs.writeFileSync(destination + file, data, "utf8");
        });
}

exports.build = function(origin, destination, minify) {
    MINIFY = minify;

    if (destination) {
        outputPath = destination;
    }

    try {
        fs.statSync(outputPath)
    } catch(e) {
        fs.mkdirSync(outputPath, fs.statSync("./").mode);
    }

    var originJS = "src",
        originStyles = "styles";

    if (origin) {
        originJS = origin + "/js";
        originStyles = origin + "/styles";
    }

    var indexHtml = fs.readFileSync(examplesLocation + "/index.html", "utf8");

    "nav,script,tools,css,meta".split(",").forEach(function(region) {
        var re = new RegExp("<!--\\s*" + region + "\\s*-->([\\u000a\\u000d\\u2028\\u2029]|.)*<!--\\s*" + region + "\\s*-->", "ig");
        var html = re.exec(indexHtml)[0].trim();

        baseRegions[region] = {
            rex: re,
            html: html,
            exec: function(data, value) {
                value = value || html;

                return data.replace(re, value);
            }
        };
    });

    wrench.copyDirSyncRecursive(examplesLocation, outputPath);
    wrench.copyDirSyncRecursive(originJS, outputPath + "/js");
    wrench.copyDirSyncRecursive(originStyles, outputPath + "/styles");
    fs.unlinkSync(outputPath + "/template.html");

    if (!MINIFY) {
        var data = fs.readFileSync("src/jquery.js", "utf8");
        fs.writeFileSync(outputPath + "/js/jquery.js", data, "utf8");
    }

    copyResources(
        examplesLocation + "/styles/",
        outputPath + "/styles/",
        function(data) {
            if (MINIFY) {
                data = cssmin(data);
            }

            return data;
        });

    copyResources(
        examplesLocation + "/js/",
        outputPath + "/js/",
        function(data) {
            if (MINIFY) {
                var ast = parser.parse(data);
                ast = uglify.ast_mangle(ast);
                ast = uglify.ast_squeeze(ast);
                data = uglify.gen_code(ast);
            }

            return data;
        });

    processExamplesDirectory(outputPath);
}
