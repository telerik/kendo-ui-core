// Imports ====================================================================
var path = require("path"),
    fs = require("fs"),
    jsdoctoolkit = require("build/node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit,
    bundles = require("build/bundles"),
    kendoBuild = require("build/kendo-build"),
    copyDir = kendoBuild.copyDirSyncRecursive,
    mkdir = kendoBuild.mkdir,
    zip = kendoBuild.zip,
    kendoScripts = require("build/kendo-scripts"),
    themes = require("build/themes");

// Configuration ==============================================================
var CDN_ROOT = "http://cdn.kendostatic.com/",
    SOURCE_PATH = "src",
    STYLES_PATH = "styles",
    DEPLOY_PATH = "deploy",
    DEMOS_PATH = path.join("demos", "mvc"),
    DEMOS_PROJECT = "Kendo.csproj",
    DEMOS_LIVE_PATH = path.join(DEPLOY_PATH, "live"),
    DEMOS_LIVE_PACKAGE = path.join(DEPLOY_PATH, "online-examples.zip"),
    DEMOS_STAGING_PATH = path.join(DEPLOY_PATH, "staging"),
    DEMOS_STAGING_CONTENT_PATH = path.join(DEMOS_STAGING_PATH, "content", "cdn"),
    DOCS_DEPLOY_PATH = path.join(DEMOS_PATH, "content", "docs"),
    RELEASE_PATH = "release";

// Configuration ===============================================================
var CDN_PROJECT = path.join("build", "cdn.proj"),
    CDN_BUNDLE = bundles.bundles.filter(function(bundle) { return bundle.name === "kendoui.complete" })[0],
    CDN_BUNDLE_PATH = path.join("..", DEPLOY_PATH, "kendoui.complete.commercial");

// Tasks ======================================================================
desc("Clean deploy working directory");
task("clean", function() {
    kendoBuild.rmdirSyncRecursive(DEPLOY_PATH);

    mkdir(DEPLOY_PATH);
    mkdir(RELEASE_PATH);
});

desc("Build themes from LESS source");
task("themes", function() {
    themes.build();
});

desc("Merge multi-part source scripts");
task("merge-scripts", function() {
    kendoScripts.mergeScripts(SOURCE_PATH);
});

desc("Build documentation");
task("docs", function() {
    var mappings = {
            "slider": ["slider", "rangeslider"],
            "dragdrop": ["draggable", "droptarget"]
        },
        sections = ["description", "configuration", "methods", "events"];

    function combine() {
        var files = fs.readdirSync(DOCS_DEPLOY_PATH);
        for (var key in mappings) {
            var mapping = mappings[key],
            filesToMerge = kendoBuild.grep(files, function(fileName) {
                var flag = false;
                for (var i = 0, length = mapping.length; i < length; i++) {
                    if (fileName.indexOf(mapping[i]) > -1) {
                        flag = true;
                        break;
                    }
                }
                return flag;
            });

            sections.forEach(function(sectionName) {
                var cache = "";
                kendoBuild.grep(filesToMerge, function(fileName) {
                    return fileName.indexOf(sectionName) > -1;
                }).forEach(function(fileToMerge) {
                    var text = kendoBuild.readText(DOCS_DEPLOY_PATH + "/" + fileToMerge);

                    if (sectionName != "description" && text.length > 10) {
                        text = wrap(text, fileToMerge);
                    }
                    cache += text;
                });

                if (cache.length > 15) {
                    kendoBuild.writeText(DOCS_DEPLOY_PATH + "/kendo.ui." + key + "." + sectionName + ".html", cache);
                }
            });
        }
    }

    function wrap(text, fileToMerge) {
        fileToMerge = fileToMerge.split(".");
        fileToMerge = fileToMerge[fileToMerge.length - 3];

        return '<div class="detailHandle detailHandleExpanded"> <div class="detailExpanded"></div>' + fileToMerge + '</div><div style="display: block;" class="detailBody">' + text + "</div>";
    }

    var params = [
        // output directory
        "-d=demos/mvc/content/docs",
        // template
        "-t=build/node-jsdoc-toolkit/template",
        // constants
        "-D=\"copyright:" + new Date().getFullYear() + "\"",
        "-D=\"title:Kendo UI Documentation\""
    ];

    var sourceFiles = fs.readdirSync(SOURCE_PATH).filter(function(file) { return file.indexOf(".js") > -1 && file.indexOf("jquery") === -1 } );
    for (var i = 0; i < sourceFiles.length; i++) {
        params.push(path.join(SOURCE_PATH, sourceFiles[i]));
    }

    params.push("src/chart/docs.js");

    jsdoctoolkit.run(params);

    combine();
});

namespace("demos", function() {
    desc("Build debug demos site");
    task("debug", ["themes", "merge-scripts", "docs"], function () {
        kendoBuild.msBuild(
            path.join(DEMOS_PATH, DEMOS_PROJECT),
            [ "/t:Clean;Build", "/p:Configuration=Debug" ],
            complete
        );
    }, true);

    desc("Build staging demos site");
    task("staging", ["themes", "merge-scripts", "docs"], function () {
        var scriptsDest = path.join(DEMOS_STAGING_CONTENT_PATH, "js"),
            stylesDest = path.join(DEMOS_STAGING_CONTENT_PATH, "styles");

        deployDemos(DEMOS_STAGING_PATH, "~/content/cdn", function() {
            mkdir(DEMOS_STAGING_CONTENT_PATH);

            mkdir(scriptsDest);
            kendoScripts.buildCombinedScript(
                "all", ["web", "mobile", "dataviz"],
                scriptsDest, "", true
            );

            mkdir(stylesDest);
            kendoBuild.deployStyles(STYLES_PATH, stylesDest, "", true);
        });
    }, true);

    desc("Build demos site for live deployment");
    task("production", ["themes", "merge-scripts", "docs"], function () {
        deployDemos(DEMOS_LIVE_PATH, CDN_ROOT + version(), complete);
    }, true);

    desc("Pack online-demos.zip");
    task("pack-production", ["demos:production"], function() {
        zip(DEMOS_LIVE_PACKAGE, DEMOS_LIVE_PATH, complete);
    }, true);
});

desc("Build debug demos site");
task("default", ["clean", "demos:debug"], function() {
});

desc("Build bundles");
task("bundles", ["clean", "themes", "merge-scripts"], function() {
    bundles.buildAllBundles(version(), complete);
}, true);

desc("Deploy scripts to CDN");
task("cdn", ["clean", "themes", "merge-scripts"], function() {
    bundles.buildBundle(CDN_BUNDLE, version(), function() {
        kendoBuild.msBuild(CDN_PROJECT, ["/p:Version=" + version(), "/p:BundleRoot=" + CDN_BUNDLE_PATH]);
    });
}, true);

// Helpers ====================================================================
function deployDemos(outputPath, cdnRoot, onSuccess) {
    var webConfig = path.join(outputPath, "Web.config");

    kendoBuild.rmdirSyncRecursive(outputPath);
    copyDir(DEMOS_PATH, outputPath);

    kendoBuild.writeText(webConfig, kendoBuild
        .readText(webConfig)
        .replace("$CDN_ROOT", cdnRoot)
    );

    kendoBuild.msBuild(
        path.join(outputPath, DEMOS_PROJECT),
        [ "/t:Clean;Build", "/p:Configuration=Release" ],
        onSuccess
    );
}

function version() {
    var v = JSON.parse(kendoBuild.readText("VERSION"));
    return kendoBuild.buildVersion(v.year, v.release);
}
