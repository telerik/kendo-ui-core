/* requries */
var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    docs = require("./docs"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    kendoScripts = require("./kendo-scripts"),
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
    },
    spaces = "        ",
    newRow = "\r\n";

function getRegionRegex(regionName) {
    return new RegExp("\\s*<!--\\s*" + regionName + "\\s*-->(([\\r\\n]|.)*?)<!--\\s*" + regionName + "\\s*-->", "im");
}

function removeDuplicateResources(resource, target) {
    var scriptTag = resource.replace(/(\.\.\/)+/g, "[\.\/]*").replace(/\//g, "\\/").replace(/\./g, "\\.").replace(/\s+/g, "\\s*"),
        rex = new RegExp("[\\r\\n]+\\s+" + scriptTag, "i");

    return target.replace(rex, "");
}

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

    currentPageScripts = currentPageScripts.replace(scriptStripper1, '"shared/js');
    currentPageScripts = currentPageScripts.replace(scriptStripper2, rebaser);
    baseScripts = baseScripts.replace(scriptStripper1, '"shared/js');
    baseScripts = baseScripts.replace(scriptStripper2, rebaser);

    allScripts = currentPageScripts + baseScripts;

    allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)shared\/js\/people\.js"><\/script>/g, "");
    allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)shared\/js\/kendo\.console\.js"><\/script>/g, "");

    if (KENDOCDN) {
        allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)shared\/js\/people\.min\.js"><\/script>/g, "");
        allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)shared\/js\/kendo\.console\.min\.js"><\/script>/g, "");

        allScripts = allScripts.replace(/<script src="([..\/]*)shared\/js\/jquery\.min\.js"><\/script>/g, "");
        allScripts = allScripts.replace(/[\r\n]+\s+<script src="([..\/]*)shared\/js\/kendo.(?!examples)(\w)+(\.\w+)*(\.min)*.js"><\/script>/g, "");
        allScripts = allScripts.replace(/([..\/]*)shared\/js\/prettify\.min\.js/g, KENDOCDN + "/js/prettify.min.js");
        allScripts = allScripts.replace(/([..\/]*)shared\/js\/kendo\.examples\.min\.js/g, KENDOCDN + "/js/kendo.examples.min.js");

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

    baseCSS = baseCSS.replace(/href="(.*?)styles/g, 'href="shared/styles');

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
    var parts = file.substring(outputPath.length).split("/"),
        candidate = parts[0] || parts[1];

    var exceptions = [
        "animation",
        "integration",
        "overview"
    ];

    if (parts.length > 2 && exceptions.indexOf(candidate) == -1) {
        return candidate;
    }
}

function importComponentHelp(exampleHTML, component) {
    if (!component)
        return exampleHTML;

    var helpFiles = {
        "animation": "kendo.Animation",
        "autocomplete": "kendo.ui.AutoComplete",
        "combobox": "kendo.ui.ComboBox",
        "datepicker": "kendo.ui.DatePicker",
        "dropdownlist": "kendo.ui.DropDownList",
        "droptarget": "kendo.ui.DropTarget",
        "datasource": "kendo.data.DataSource",
        "numerictextbox": "kendo.ui.NumericTextBox",
        "panelbar": "kendo.ui.PanelBar",
        "rangeslider": "kendo.ui.RangeSlider",
        "tabstrip": "kendo.ui.TabStrip",
        "templates": "kendo.Template",
        "treeview": "kendo.ui.TreeView"
    };

    // merge documentation for multiple components
    var relatedComponents = {
        "slider": ["slider", "rangeslider"],
        "dragdrop": ["draggable", "droptarget"]
    }[component];

    function helpFileFor(component) {
        var result = "",
            helpSymbol,
            helpFile,
            canonicalName = component[0].toUpperCase() + component.slice(1).toLowerCase();

        try {
            helpSymbol = (helpFiles[component] || "kendo.ui." + canonicalName);
            helpFile = "docs/symbols/" + helpSymbol + ".html";

            result = fs.readFileSync(helpFile, "utf8");
        } catch (e) {
            console.log("Unable to find help file for " + component + ". Tried " + helpFile);
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
    return text.replace(/\s+$/mg, "").replace(/\n/mg, "\r\n");
}

function processExample(fileName) {
    var exampleHTML = kendoBuild.readText(fileName),
        base = fileName === outputPath + "/index.html" ? "" : "../../",
        scriptRegion = splitScriptRegion(exampleHTML, base),
        cssRegion = splitCSSRegion(exampleHTML, base),
        component = componentFromFilename(fileName);

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

    kendoBuild.writeText(fileName, exampleHTML);
}

function copyResources(source, destination, processCallback, filterRegExp) {
    processCallback = processCallback || function(data) { return data; };

    fs.readdirSync(source)
        .forEach(function(file) {
            if (file.match(filterRegExp) && fs.statSync(source + file).isFile()) {
                var data = fs.readFileSync(source + file, "utf8");

                data = processCallback(data, file);

                if (data) {
                    if (KENDOCDN) {
                        file = file.replace(/\.(css|js)$/, ".min.$1");
                    }

                    fs.writeFileSync(destination + file, data, "utf8");
                }
            }
        });
}

function build(origin, destination, kendoCDN) {
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

    console.log("parsing master page...");
    var indexHtml = kendoBuild.readText("build/templates/buildTemplate.html");

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

    themes.build();

    console.log("merging multipart scripts...");
    kendoScripts.mergeScripts("src/");

    console.log("copying resources...");
    kendoBuild.copyDirSyncRecursive(examplesLocation, outputPath);
    kendoBuild.copyDirSyncRecursive(originJS, outputPath + "/shared/js");
    kendoBuild.copyDirSyncRecursive(originStyles, outputPath + "/shared/styles", true, /\.(css|png|jpg|jpeg|gif)$/i);
    fs.unlinkSync(outputPath + "/template.html");

    if (!kendoCDN) {
        fs.writeFileSync(outputPath + "/shared/js/jquery.min.js", fs.readFileSync("src/jquery.min.js", "utf8"), "utf8");
    } else {
        fs.writeFileSync(outputPath + "/web.config", fs.readFileSync("web.config", "utf8"), "utf8");
    }

    copyResources(
        examplesLocation + "/shared/styles/",
        outputPath + "/shared/styles/",
        function(data, file) {
            if (kendoCDN) {
                console.log("minifiying " + file + "...");
                fs.unlinkSync(outputPath + "/shared/styles/" + file);

                data = cssmin(data);
            }

            return data;
        }, /\.css$/);

    var exampleScripts = ["kendo.console.js", "people.js"];
    copyResources(
        examplesLocation + "/shared/js/",
        outputPath + "/shared/js/",
        function(data, file) {
            if (file === "kendo.examples.js") {
                exampleScripts.forEach(function(script) {
                    data += ";" + kendoBuild.readText(examplesLocation + "/shared/js/" + script);
                });
            }

            if (exampleScripts.indexOf(file) == -1)
            {
                if (kendoCDN) {
                    console.log("compressing " + file + "...");
                    data = kendoBuild.minifyJs(data);
                }

                return data;
            }
        }, /\.js$/);

    docs.build();

    console.log("processing examples...");
    kendoBuild.processFilesRecursive(outputPath, /\.html$/, processExample);

    var index = kendoBuild.readText(path.join(examplesLocation, "index.html"));
    kendoBuild.writeText(
        path.join(outputPath, "index.html"),
        index.replace(isLive, "")
    );
};

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
