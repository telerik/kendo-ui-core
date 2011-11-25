// Imports ====================================================================
var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    docs = require("./docs"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    template = kendoBuild.template,
    kendoScripts = require("./kendo-scripts"),
    cssmin = require("./lib/cssmin").cssmin;

// Configuration ==============================================================
var VERSION = kendoBuild.generateVersion(),
    CDN_URL = process.argv[2] || "http://cdn.kendostatic.com/" + VERSION,

    SOURCE_ROOT = "src",
    STAGING_ROOT = "live",
    STAGING_SOURCE = "#= parentFolder(depth + 1) #",
    STAGING_SCRIPTS_ROOT = "js-deploy",
    STAGING_SCRIPTS = template("#= parentFolder(depth) #/" + STAGING_SCRIPTS_ROOT),
    STAGING_STYLES = template(STAGING_SOURCE + "/styles"),
    STAGING_SHARED_ROOT = "#= parentFolder(depth) #/shared",
    STAGING_SHARED_SCRIPTS = template(STAGING_SHARED_ROOT + "/js"),
    STAGING_SHARED_STYLES = template(STAGING_SHARED_ROOT + "/styles"),
    STAGING_SUITE_SCRIPTS = template("#= parentFolder(depth - 1) #/js"),
    STAGING_THEMEBUILDER_ROOT = "/kendo/themebuilder/src",
    LIVE_SCRIPTS = template(CDN_URL + "/js"),
    LIVE_STYLES = template(CDN_URL + "/styles"),
    LIVE_SHARED_ROOT = CDN_URL + "/examples/shared",
    LIVE_SHARED_SCRIPTS = template(LIVE_SHARED_ROOT + "/js"),
    LIVE_SHARED_STYLES = template(LIVE_SHARED_ROOT + "/styles"),
    LIVE_THEMEBUILDER_ROOT = "http://themebuilder.kendoui.com",
    LIVE_SUITE_SCRIPTS = template(CDN_URL + "/examples/#= suiteName #/js"),
    SOURCE_SCRIPTS_MARKER = /SOURCE_SCRIPTS/g,
    THEMEBUILDER_ROOT_MARKER = /THEMEBUILDER_DEPLOY_ROOT/g,
    SOURCE_STYLES_MARKER = /SOURCE_STYLES/g,
    SHARED_SCRIPTS_MARKER = /SHARED_SCRIPTS/g,
    SHARED_STYLES_MARKER = /SHARED_STYLES/g,
    SUITE_SCRIPTS_MARKER = /SUITE_SCRIPTS/g,

    examplesLocation = "demos/examples",
    outputPath = "live",
    KENDOCDN,
    DEBUG = false,
    jQueryCDN = "http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js",

    rowSeparator = /[\r\n]+/,
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

// Implementation ==============================================================
function parentFolder(depth) {
    var result = [];

    if (depth == 0) {
        return ".";
    } else {
        for (var i = 0; i < depth; i++) {
            result.push("..");
        }

        return result.join("/");
    }
}

function getRegionRegex(regionName) {
    return new RegExp("\\s*<!--\\s*" + regionName + "\\s*-->(([\\r\\n]|.)*?)<!--\\s*" + regionName + "\\s*-->", "im");
}

function formatRegion(exampleInfo, regionType, deployConfig) {
    var result,
        baseResources = resolveResources(baseRegions[regionType].html, deployConfig, exampleInfo);

        result = baseResources.replace(/.*?(examples-offline\.css|console\.js|people\.js|prettify\.js).*/g, "");

        if (!exampleInfo.hasNavigation) {
            result = result.replace(/.*?examples\.nav\.js.*/g, "");
        }

    return result;
}

function resolveResources(text, deployConfig, exampleInfo) {
    var pathInfo = {
            depth: exampleInfo.depth,
            suiteName: exampleInfo.suite,
            parentFolder: parentFolder
    };

    text = replaceReference(text, "/shared/js", SHARED_SCRIPTS_MARKER.source);
    text = replaceReference(text, "/shared/styles", SHARED_STYLES_MARKER.source);
    text = replaceReference(text, "/js", SUITE_SCRIPTS_MARKER.source);
    text = replaceReference(text, "/src", SOURCE_SCRIPTS_MARKER.source);
    text = replaceReference(text, "/styles", SOURCE_STYLES_MARKER.source);

    text = text.replace(SOURCE_SCRIPTS_MARKER, deployConfig.scripts(pathInfo));
    text = text.replace(SOURCE_STYLES_MARKER, deployConfig.styles(pathInfo));
    text = text.replace(SHARED_SCRIPTS_MARKER, deployConfig.sharedScripts(pathInfo));
    text = text.replace(SHARED_STYLES_MARKER, deployConfig.sharedStyles(pathInfo));
    text = text.replace(SUITE_SCRIPTS_MARKER, deployConfig.suiteScripts(pathInfo));

    if (deployConfig.useMinified) {
        text = text.replace(/(.*?)\.(css|js)/g, "$1.min.$2");
        text = text.replace(/min\.min/g, "min");
    }

    return text;
}

function replaceReference(text, path, newPath) {
    var regex = new RegExp("[\.\/]+" + path.replace(/\//g, "\\/") + "(.*?)\"", "g");

    return text.replace(regex, newPath + "$1\"");
}

function updateBaseLocation(html, base) {
    return html.replace(/href="([^"]*)"/g, function(match, url) {
        if (url.indexOf("http://") > -1) {
            return match;
        }
        return 'href="' + base + url + '"';
    });
}

function exampleInfo(fileName, rootPath) {
    var parts = fileName.substring(rootPath.length + 1).split("/"),
        suite = parts[0],
        component = parts[1],
        hasNavigation = true;

    if (component == "overview" || component == "integration") {
        component = "";
    }

    if (suite == "mobile" || suite == "themebuilder") {
        component = "";
        hasNavigation = false;
    }

    return {
        fileName: fileName,
        suite: suite,
        depth: exampleDepth(fileName, rootPath),
        component: component,
        hasNavigation: hasNavigation
    };
}

function importComponentHelp(exampleSource, component) {
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
        "timepicker": "kendo.ui.TimePicker",
        "templates": "kendo.Template",
        "globalization": "kendo.Globalization",
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
        exampleSource = exampleSource.replace(regionRegex.description, "<!-- description -->" + description + "<!-- description -->");
    }

    tabs = fixNewLines(tabs);
    data = fixNewLines(data);

    exampleSource = exampleSource.replace(regionRegex.helpTabs, "<!-- help-tabs -->" + tabs + "<!-- help-tabs -->");
    exampleSource = exampleSource.replace(regionRegex.helpData, "<!-- help-data -->" + data + "<!-- help-data -->");

    return exampleSource;
}

function fixNewLines(text) {
    return text.replace(/\s+$/mg, "").replace(/\n/mg, "\r\n");
}

function exampleDepth(fileName, root) {
    var relativeName = fileName.substring(root.length + 1),
        match = relativeName.match(/[\/\\]/g) || [];

    return match.length;
}

function processExample(fileName, deployConfig) {
    var info = exampleInfo(fileName, deployConfig.root),
        depth = info.depth,
        component = info.component,
        exampleSource = kendoBuild.readText(fileName),
        isLandingPage = fileName === outputPath + "/index.html",
        base = isLandingPage ? "" : parentFolder(depth) + "/",
        scriptRegion = formatRegion(info, "script", deployConfig),
        cssRegion;

    if (isLandingPage) {
        cssRegion = regionRegex.css.exec(exampleSource)[1];
        cssRegion = resolveResources(cssRegion, deployConfig, info);
        exampleSource = exampleSource.replace(regionRegex.css, cssRegion);
    } else {
        cssRegion = formatRegion(info, "css", deployConfig);
        exampleSource = baseRegions.meta.exec(exampleSource, baseRegions.meta.html);
        exampleSource = baseRegions.css.exec(exampleSource, cssRegion);
        exampleSource = baseRegions.script.exec(exampleSource, scriptRegion);
        exampleSource = baseRegions.nav.exec(exampleSource, updateBaseLocation(baseRegions.nav.html, base));

        if (!info.hasNavigation) {
            exampleSource = exampleSource.replace(/\s+hasNavigation/g, "");
        }

        exampleSource = exampleSource.replace(THEMEBUILDER_ROOT_MARKER, deployConfig.themeBuilderRoot);

        var description = regionRegex.description.exec(exampleSource);
        exampleSource = exampleSource.replace(regionRegex.description, '');

        if (description) {
            exampleSource = baseRegions.tools.exec(exampleSource, baseRegions.tools.html.replace(regionRegex.description, description[0]));
        } else {
            // overview has no description
            exampleSource = baseRegions.tools.exec(exampleSource);
        }

        if (component) {
            exampleSource = importComponentHelp(exampleSource, component);
        }
    }

    kendoBuild.writeText(fileName, exampleSource);
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

function build(deployConfig) {
    outputPath = deployConfig.root;

    try {
        fs.statSync(outputPath)
    } catch(e) {
        fs.mkdirSync(outputPath, fs.statSync("./").mode);
    }

    var originJS = "src",
        originStyles = "styles";

    console.log("parsing master page...");
    var indexHtml = kendoBuild.readText("build/templates/online-demo-template.html");

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

    console.log("copying resources...");
    kendoBuild.copyDirSyncRecursive(examplesLocation, outputPath);

    if (deployConfig.useMinified) {
        kendoBuild.processFilesRecursive(path.join(outputPath, "shared"), /\.css$/, function(fileName) {
            var css = kendoBuild.readText(fileName),
                minified = cssmin(css);

            kendoBuild.writeText(fileName, minified);
            fs.renameSync(fileName, fileName.replace(".css", ".min.css"));
        });

        kendoBuild.processFilesRecursive(path.join(outputPath), /\.js$/, function(fileName) {
            var content = kendoBuild.readText(fileName),
                output = kendoBuild.minifyJs(content);

            kendoBuild.writeText(fileName, output);

            fs.renameSync(fileName, fileName.replace(".js", ".min.js"));
        });
    }

    fs.unlinkSync(outputPath + "/template.html");

    kendoBuild.writeText(
        path.join(outputPath, "web.config"),
        kendoBuild.readText(path.join(examplesLocation, "web.config"))
    );

    docs.build();

    console.log("processing examples...");
    kendoBuild.processFilesRecursive(outputPath, /\.html$/, function(fileName) {
        processExample(fileName, deployConfig);
    });
};

function buildStaging() {
    build({
        root: STAGING_ROOT,
        scripts: STAGING_SCRIPTS,
        styles: STAGING_STYLES,
        sharedScripts: STAGING_SHARED_SCRIPTS,
        sharedStyles: STAGING_SHARED_STYLES,
        suiteScripts: STAGING_SUITE_SCRIPTS,
        themeBuilderRoot: STAGING_THEMEBUILDER_ROOT,
        useMinified: false
    });

    console.log("Building themes");
    themes.build();

    console.log("Merging multipart scripts");
    kendoScripts.mergeScripts(SOURCE_ROOT);

    var jsRoot = path.join(STAGING_ROOT, STAGING_SCRIPTS_ROOT);
    kendoBuild.mkdir(jsRoot);

    console.log("Building deploy scripts");
    kendoScripts.deployScripts(SOURCE_ROOT, jsRoot);
}

function buildLive(deployRoot) {
    build({
        root: deployRoot,
        scripts: LIVE_SCRIPTS,
        styles: LIVE_STYLES,
        sharedScripts: LIVE_SHARED_SCRIPTS,
        sharedStyles: LIVE_SHARED_STYLES,
        suiteScripts: LIVE_SUITE_SCRIPTS,
        themeBuilderRoot: LIVE_THEMEBUILDER_ROOT,
        useMinified: true
    });
}

if (require.main === module) {
    buildStaging();
} else {
    exports.buildLive = buildLive;
}
