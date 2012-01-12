// Imports ====================================================================
var path = require("path"),
    fs = require("fs"),
    jsdoctoolkit = require("build/node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit,
    bundles = require("build/bundles"),
    kendoBuild = require("build/kendo-build"),
    copyDir = kendoBuild.copyDirSyncRecursive,
    mkdir = kendoBuild.mkdir,
    zip = kendoBuild.zip,
    kendoScripts = require("build/kendo-scripts");

// Configuration ==============================================================
var CDN_ROOT = "http://cdn.kendostatic.com/",
    SOURCE_PATH = "src",
    STYLES_PATH = "styles",
    SCRIPTS_PATH = "js",
    DEPLOY_PATH = "deploy",
    DEMOS_PATH = path.join("demos", "mvc"),
    DEMOS_PROJECT = "Kendo.csproj",
    DEMOS_LIVE_PATH = path.join(DEPLOY_PATH, "live"),
    DEMOS_LIVE_PACKAGE = path.join(DEPLOY_PATH, "online-examples.zip"),
    DEMOS_STAGING_PATH = path.join(DEPLOY_PATH, "staging"),
    DEMOS_STAGING_CONTENT_PATH = path.join(DEMOS_STAGING_PATH, "content", "cdn"),
    DOCS_DEPLOY_PATH = path.join(DEMOS_PATH, "content", "docs"),
    RELEASE_PATH = "release",
    SUITES = ["web", "mobile", "dataviz"];

// CDN Configuration ===========================================================
var CDN_PROJECT = path.join("build", "cdn.proj"),
    CDN_BUNDLE = bundles.cdnBundle,
    CDN_BUNDLE_PATH = path.join(DEPLOY_PATH, "kendoui.cdn.commercial");

// Tasks ======================================================================
desc("Clean deploy working directory");
task("clean", function() {
    kendoBuild.rmdirSyncRecursive(DEPLOY_PATH);

    mkdir(DEPLOY_PATH);
    mkdir(RELEASE_PATH);
});

desc("Merge multi-part source scripts");
task("merge-scripts", function() {
    kendoScripts.mergeScripts(SOURCE_PATH);
});

desc("Build documentation");
task("docs", function() {
    var mappings = {
            "ui.slider": ["ui.slider", "ui.rangeslider"],
            "mobile.ui.button": ["mobile.ui.button", "mobile.ui.backbutton", "mobile.ui.detailbutton"],
            "ui.dragdrop": ["ui.draggable", "ui.droptarget"]
        },
        sections = ["description", "configuration", "methods", "events"];

    function combine() {
        var files = fs.readdirSync(DOCS_DEPLOY_PATH),
            filesToMerge;
        for (var key in mappings) {
            var mapping = mappings[key];
            filesToMerge = [];

            sections.forEach(function(section) {
                mapping.forEach(function(source) {
                    var fileName = "kendo." + source + "." + section + ".html";
                    if (files.indexOf(fileName) > -1) {
                        filesToMerge.push(fileName);
                    }
                });
            });

            sections.forEach(function(sectionName) {
                var cache = "";
                kendoBuild.grep(filesToMerge, function(fileName) {
                    return fileName.indexOf(sectionName) > -1;
                }).forEach(function(fileToMerge) {
                    var text = kendoBuild.readText(DOCS_DEPLOY_PATH + "/" + fileToMerge);

                    if (sectionName != "description") {
                        text = wrap(text, fileToMerge);
                    }
                    cache += text;
                });

                kendoBuild.writeText(path.join(DOCS_DEPLOY_PATH, "kendo." + key + "." + sectionName + ".html"), cache);
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
    desc("Build less.js for demo site");
    task("less-js", function() {
        var lessPath = path.join("build", "less-js");
        var distPath = path.join(lessPath, "dist");

        kendoBuild.spawnSilent("make", [ "less" ], { cwd: path.resolve(lessPath) }, function() {
            kendoBuild.processFilesRecursive(distPath, /.*/, function(fileName) {
                kendoBuild.copyFileSync(fileName, path.join(DEMOS_PATH, "content", "shared", "js", "less.js"));
            });

            kendoBuild.rmdirSyncRecursive(distPath);

            complete();
        });
    }, true);

    desc("Build debug demos site");
    task("debug", ["demos:less-js", "merge-scripts", "docs"], function () {
        kendoBuild.msBuild(
            path.join(DEMOS_PATH, DEMOS_PROJECT),
            [ "/t:Clean;Build", "/p:Configuration=Debug" ],
            complete
        );
    }, true);

    desc("Build staging demos site");
    task("staging", ["merge-scripts", "docs"], function () {
        var scriptsDest = path.join(DEMOS_STAGING_CONTENT_PATH, "js"),
            stylesDest = path.join(DEMOS_STAGING_CONTENT_PATH, "styles");

        deployDemos(DEMOS_STAGING_PATH, "~/content/cdn", function() {
            mkdir(DEMOS_STAGING_CONTENT_PATH);

            kendoBuild.rmdirSyncRecursive(CDN_BUNDLE_PATH);
            bundles.buildBundle(CDN_BUNDLE, version(), function() {
                copyDir(path.join(CDN_BUNDLE_PATH, STYLES_PATH),
                        path.join(DEMOS_STAGING_CONTENT_PATH, STYLES_PATH)
                );

                copyDir(path.join(CDN_BUNDLE_PATH, SCRIPTS_PATH),
                        path.join(DEMOS_STAGING_CONTENT_PATH, SCRIPTS_PATH)
                );
            });
        });
    });

    desc("Build demos site for live deployment");
    task("production", ["merge-scripts", "docs"], function () {
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
task("bundles", ["clean", "merge-scripts"], function() {
    bundles.buildAllBundles(version(), complete);
}, true);

desc("Deploy scripts to CDN");
task("cdn", ["clean", "merge-scripts"], function() {
    bundles.buildBundle(CDN_BUNDLE, version(), function() {
        kendoBuild.msBuild(CDN_PROJECT, ["/p:Version=" + version(), "/p:BundleRoot=" + path.join("..", CDN_BUNDLE_PATH)]);
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
