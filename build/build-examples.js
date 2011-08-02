/* requries */
var fs = require("fs"),
    sys = require("sys"),
    wrench = require("./wrench"),
    jsdoctoolkit = require("./node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit,
    uglify = require("./uglify-js").uglify,
    parser = require("./uglify-js").parser,
    cssmin = require("./lib/cssmin").cssmin,

/* options  */
    examplesLocation = "demos/examples",
    outputPath = "live",
    KENDOCDN,
    DEBUG = false,
    jQueryCDN = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js",

/* globals  */
    rowSeparator = /[\r\n]+\s+/,
    isLive = /<script[^>]*?>\s*var\slive\s*=\s*false;*\s*<\/script>\s+/im,
    baseRegions = {},
    regionRegex = {
        description: getRegionRegex("description"),
        script: getRegionRegex("script"),
        css: getRegionRegex("css"),
        helpTabs: getRegionRegex("help-tabs"),
        helpData: getRegionRegex("help-data"),
        configuration: getRegionRegex("configuration"),
        properties: getRegionRegex("properties"),
        methods: getRegionRegex("methods"),
        events: getRegionRegex("events")
    }
    spaces = "        ",
    newRow = "\r\n";

function getRegionRegex(regionName) {
    return new RegExp("\\s*<!--\\s*" + regionName + "\\s*-->(([\\r\\n]|.)*?)<!--\\s*" + regionName + "\\s*-->", "im");
}

function removeDuplicateResources(resource, target) {
    var scriptTag = resource.replace(/(\.\.\/)+/g, "[\.\/]*").replace(/\//g, "\\/").replace(/\./g, "\\."),
        rex = new RegExp("[\\r\\n]+\\s+" + scriptTag, "i");

    return target.replace(rex, "");
}

var i = 2;

function splitScriptRegion(exampleHTML, base) {
    var allScripts,
        baseScripts = baseRegions.script.html,
        scriptMatches = regionRegex.script.exec(exampleHTML),
        currentPageScripts = scriptMatches ? scriptMatches[1].trimLeft() : "",
        scriptStripper1 = /"(.*?)src/g,
        scriptStripper2 = /src="(?!.\/)([.\/]*)([^"]*)([^\.min]*)\.js"/g,
        jsExtension = KENDOCDN ? ".min.js" : ".js",
        rebaser = function (match, g1, g2) {
            return 'src="' + ( (g1 != "./" ) ? base : g1 ) + g2 + jsExtension + '"';
        };

    if (!currentPageScripts)
        return false;

    currentPageScripts.trim().split(rowSeparator).forEach(function(item) {
        baseScripts = removeDuplicateResources(item, baseScripts);
    });

    currentPageScripts = currentPageScripts.replace(scriptStripper1, '"js');
    currentPageScripts = currentPageScripts.replace(scriptStripper2, rebaser);
    baseScripts = baseScripts.replace(scriptStripper1, '"js');
    baseScripts = baseScripts.replace(scriptStripper2, rebaser);

    allScripts = currentPageScripts + baseScripts;

    allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)js\/people(\.min)*\.js"><\/script>/g, "");
    allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)js\/kendo.console(\.min)*\.js"><\/script>/g, "");

    if (KENDOCDN) {
        allScripts = allScripts.replace(/<script src="([..\/]*)js\/jquery\.min\.js"><\/script>/g, "");
        allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)js\/kendo.(?!examples)(\w)+(\.\w+)*(\.min)*.js"><\/script>/g, "");
        allScripts = allScripts.replace(/([..\/]*)js\/prettify\.min\.js/g, KENDOCDN + "/js/prettify.min.js");
        allScripts = allScripts.replace(/([..\/]*)js\/kendo\.examples\.min\.js/g, KENDOCDN + "/js/kendo.example.min.js");

        allScripts = spaces + '<script src="' + KENDOCDN + '/js/kendo.all.min.js"></script>' + allScripts;
        allScripts = '<script src="' + jQueryCDN + '"></script>\r\n' + allScripts;
    }

    return allScripts;
}

function splitCSSRegion(exampleHTML, base) {
    var allCSS,
        baseCSS = baseRegions.css.html,
        cssMatches = regionRegex.css.exec(exampleHTML),
        currentPageCSS = cssMatches ? cssMatches[1].trimLeft() : "",
        cssStripper = /href="[.\/]*([^"]*)\.css"/g,
        cssExtension = KENDOCDN ? ".min.css" : ".css",
        rebasedHref = 'href="' + base + '$1' + cssExtension + '"';

    if (!currentPageCSS)
        return false;

    currentPageCSS.trim().split(rowSeparator).forEach(function(item) {
        baseCSS = removeDuplicateResources(item, baseCSS);
    });

    currentPageCSS = currentPageCSS.replace(cssStripper, rebasedHref);
    baseCSS = baseCSS.replace(cssStripper, rebasedHref);

    allCSS = currentPageCSS + baseCSS;

    if (KENDOCDN) {
        allCSS = allCSS.replace(/([..\/]*)styles\/examples\.min\.css/g, KENDOCDN + "/styles/examples.min.css");
        allCSS = allCSS.replace(/([..\/]*)styles\/kendo\.common\.min\.css/g, KENDOCDN + "/styles/kendo.common.min.css");
        allCSS = allCSS.replace(/([..\/]*)styles\/kendo\.kendo\.min\.css/g, KENDOCDN + "/styles/kendo.kendo.min.css");
    }

    return allCSS;
}

function updateBaseLocation(html, base) {
    return html.replace(/href="([^"]*)"/g, function(match, url) {
        if (url.indexOf("http://") > -1) {
            return match;
        }
        return 'href="' + base + url + '"';
    });
}

function componentFromFilename(file) {
    var candidate = file.split("/");
    candidate = candidate[candidate.length - 2];

    if (candidate == "overview" || candidate === undefined) {
        return;
    }

    return candidate;
}

function importComponentHelp(exampleHTML, component) {
    if (!component)
        return exampleHTML;

    var helpFiles = {
        "templates": "kendo.Template",
        "datasource": "kendo.data.DataSource",
        //"dragdrop": "kendo.ui.Draggable",
        "animation": "kendo.Animation"
    };

    // merge documentation for multiple components
    var relatedComponents = {
        "slider": ["slider", "rangeslider"],
        "dragdrop": ["draggable", "droptarget"]
    }[component];

    function helpFileFor(component) {
        var result = "";

        try {
            var helpSymbol = (helpFiles[component] || "kendo.ui." + component),
                helpFile = "docs/symbols/" + helpSymbol + ".html",

            result = fs.readFileSync(helpFile, "utf8");
        } catch (e) {
            // file does not exist.
        }

        return result;
    }

    var description = "", tabs = "", data = "",
        configuration = "", methods = "", events = "";


    function getRegion(regionName) {
        var matches = regionRegex[regionName].exec(helpHTML);

        if (matches) {
            return matches[1];
        }

        return "None";
    }

    function formatComponentRegion(component, region, expanded) {
        return '<div class="detailHandle' + (expanded ? ' detailHandleExpanded' : '') + '">' +
                    '<div class="' + (expanded ? 'detailExpanded' : 'detailCollapsed') + '"></div>' + component +
                '</div>' +
                '<div class="detailBody"' + (expanded ? ' style="display:block;"' : '') + '>' + region + '</div>';
    }

    if (relatedComponents) {
        var hasMethods = false,
            hasConfiguration = false,
            hasEvents = false;

        for (var c in relatedComponents) {
            helpHTML = helpFileFor(relatedComponents[c]);

            description = description || getRegion("description");
            tabs = tabs || getRegion("helpTabs");

            configuration += formatComponentRegion(relatedComponents[c], getRegion("configuration"), c == 0);
            methods += formatComponentRegion(relatedComponents[c], getRegion("methods"), c == 0);
            events += formatComponentRegion(relatedComponents[c], getRegion("events"), c == 0);

            if (!hasMethods) {
                hasMethods = getRegion("methods") !== "None";
            }

            if (!hasConfiguration) {
                hasConfiguration = getRegion("configuration") !== "None";
            }

            if (!hasEvents) {
                hasEvents = getRegion("events") !== "None";
            }
        }

        data = (hasConfiguration ? '<div class="optionsContainer">' + configuration + '</div>' : "") +
               (hasMethods ? '<div class="methodsContainer">' + methods + '</div>' : "") +
               (hasEvents ? '<div class="eventsContainer">' + events + '</div>' : "");

        if (relatedComponents.length > 1) {
            // remove stats from tabs
            tabs = tabs.replace(/\s+\([\s\d]+\)/g, "");
        }
    } else {
        helpHTML = helpFileFor(component);

        description = getRegion("description") === "None" ? "" : getRegion("description");
        tabs = getRegion("helpTabs") === "None" ? "" : getRegion("helpTabs");
        data = getRegion("helpData") === "None" ? "" : getRegion("helpData");
    }

    // could be improved if example has appropriate markers, or better yet, if loaded through AJAX (and not importing at all)
    if (description) {
        description = fixNewLines(description);
        exampleHTML = exampleHTML.replace(regionRegex.description, "<!-- description -->" + description + "<!-- description -->");
    }

    tabs = fixNewLines(tabs);
    data = fixNewLines(data);

    exampleHTML = exampleHTML.replace(regionRegex.helpTabs, "<!-- help-tabs -->" + tabs + "<!-- help-tabs -->");
    exampleHTML = exampleHTML.replace(regionRegex.helpData, "<!-- help-data -->" + data + "<!-- help-data -->");

    return exampleHTML;
}

function fixNewLines(text) {
    return text.replace(/\s+$/mg, "").replace(/\n/mg, "\r\n")
}

function processExample(file) {
    var exampleHTML = fs.readFileSync(file, "utf8"),
        base = file === outputPath + "/index.html" ? "" : "../",
        scriptRegion = splitScriptRegion(exampleHTML, base),
        cssRegion = splitCSSRegion(exampleHTML, base),
        component = componentFromFilename(file);

    exampleHTML = baseRegions.meta.exec(exampleHTML, baseRegions.meta.html);

    exampleHTML = baseRegions.script.exec(exampleHTML, scriptRegion);

    exampleHTML = baseRegions.css.exec(exampleHTML, cssRegion);

    exampleHTML = baseRegions.nav.exec(exampleHTML, updateBaseLocation(baseRegions.nav.html, base));

    var description = regionRegex.description.exec(exampleHTML);
    exampleHTML = exampleHTML.replace(regionRegex.description, '');

    if (description) {
        exampleHTML = baseRegions.tools.exec(exampleHTML, baseRegions.tools.html.replace(regionRegex.description, description[0]));
    } else {
        // overview has no description
        exampleHTML = baseRegions.tools.exec(exampleHTML);
    }

    exampleHTML = importComponentHelp(exampleHTML, component);

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

            if (KENDOCDN) {
                file = file.replace(/\.(css|js)$/, ".min.$1");
            }

            fs.writeFileSync(destination + file, data, "utf8");
        });
}

exports.build = function(origin, destination, kendoCDN) {
    KENDOCDN = kendoCDN;

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

    console.log("Parsing master page...");
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

    console.log("Copying resources...");
    wrench.copyDirSyncRecursive(examplesLocation, outputPath);
    wrench.copyDirSyncRecursive(originJS, outputPath + "/js");
    wrench.copyDirSyncRecursive(originStyles, outputPath + "/styles");
    fs.writeFileSync(outputPath + "/index.html", indexHtml.replace(isLive, ""), "utf8");
    fs.unlinkSync(outputPath + "/template.html");

    if (!kendoCDN) {
        fs.writeFileSync(outputPath + "/js/jquery.js", fs.readFileSync("src/jquery.js", "utf8"), "utf8");
    } else {
        fs.writeFileSync(outputPath + "/web.config", fs.readFileSync("web.config", "utf8"), "utf8");
    }

    copyResources(
        examplesLocation + "/styles/",
        outputPath + "/styles/",
        function(data) {
            if (kendoCDN) {
                data = cssmin(data);
            }

            return data;
        });

    copyResources(
        examplesLocation + "/js/",
        outputPath + "/js/",
        function(data) {
            if (kendoCDN) {
                var ast = parser.parse(data);
                ast = uglify.ast_mangle(ast);
                ast = uglify.ast_squeeze(ast);
                data = uglify.gen_code(ast);
            }

            return data;
        });

    console.log("Building documentation...");
    jsdoctoolkit.run(["-c=build/docs.conf"]);

    console.log("Processing examples...");
    processExamplesDirectory(outputPath);
};
