// Imports ====================================================================
var path = require("path"),
    config = require("build/config"),
    docs = require("build/docs"),
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
    RELEASE_PATH = "release";

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
    docs.build();
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

desc("Default task");
task("default", ["clean", "demos:debug"], function() {
});

desc("Build bundles");
task("bundles", ["clean", "themes", "merge-scripts"], function() {
    bundles.buildAllBundles(complete);
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
    var v = JSON.parse(kendoBuild.readText("VERSION.json"));
    return kendoBuild.buildVersion(v.year, v.release);
}
