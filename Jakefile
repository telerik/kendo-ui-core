// Imports ====================================================================
var path = require("path"),
    fs = require("fs"),
    jsdoctoolkit = require("build/node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit,
    bundles = require("build/bundles"),
    themebuilder = require("build/themebuilder"),
    kendoBuild = require("build/kendo-build"),
    copyDir = kendoBuild.copyDirSyncRecursive,
    mkdir = kendoBuild.mkdir,
    zip = kendoBuild.zip,
    kendoScripts = require("build/kendo-scripts");

// Configuration ==============================================================
var CDN_ROOT = "http://cdn.kendostatic.com/",
    STAGING_ROOT = "http://mvc-kendobuild/staging",
    SOURCE_PATH = "src",
    DOCS_PATH = path.join(SOURCE_PATH, "docs"),
    STYLES_PATH = "styles",
    SCRIPTS_PATH = "js",
    DEPLOY_PATH = "deploy",
    SITEFINITY_HELP_PATH = "sitefinity-docs",
    DEMOS_PATH = path.join("demos", "mvc"),
    DEMOS_PROJECT = "Kendo.csproj",
    DEMOS_LIVE_PATH = path.join(DEPLOY_PATH, "live"),
    DEMOS_LIVE_PACKAGE = path.join(DEPLOY_PATH, "online-examples.zip"),
    DEMOS_STAGING_PATH = path.join(DEPLOY_PATH, "staging"),
    DEMOS_STAGING_CONTENT_PATH = path.join(DEMOS_STAGING_PATH, "content", "cdn"),
    DOCS_DEPLOY_PATH = path.join(DEMOS_PATH, "content", "docs"),
    BUILDER_PATH = "download-builder",
    BUILDER_STAGING_PATH = path.join(DEPLOY_PATH, "download-builder-staging"),
    BUILDER_STAGING_SERVICE = STAGING_ROOT + "/download-builder-service",
    BUILDER_SERVICE_PATH = "service",
    BUILDER_PROJECT = path.join(BUILDER_SERVICE_PATH, "Download.csproj"),
    BUILDER_CONFIG_NAME = path.join("config", "kendo-config.VERSION_NUMBER.json"),
    THEMEBUILDER_LIVE_PATH = path.join(DEPLOY_PATH, "themebuilder.telerik.com"),
    THEMEBUILDER_LIVE_PACKAGE = path.join(DEPLOY_PATH, "themebuilder.zip"),
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
    buildDocs();
});

desc("Build sitefinity documentation");
task("sitefinity-docs", function() {
    buildDocs(SITEFINITY_HELP_PATH);
});

namespace("themebuilder", function() {
    desc("Builds the generated themebuilder sources");
    task("source", function() {
        themebuilder.buildGeneratedSources();
    });

    desc("Builds the themebuilder for live deployment");
    task("production", ["themebuilder:source"], function() {
        themebuilder.deploy(
            THEMEBUILDER_LIVE_PATH,
            CDN_ROOT + version()
        );

        zip(THEMEBUILDER_LIVE_PACKAGE, THEMEBUILDER_LIVE_PATH, complete);
    });
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
    task("staging", ["merge-scripts", "docs", "themebuilder:source"], function () {
        var scriptsDest = path.join(DEMOS_STAGING_CONTENT_PATH, "js"),
            stylesDest = path.join(DEMOS_STAGING_CONTENT_PATH, "styles");

        console.log("Building demos");
        deployDemos({
            outputPath: DEMOS_STAGING_PATH,
            cdnRoot: "~/content/cdn",
            themebuilderRoot: "~/content/cdn/themebuilder",
            onSuccess: function() {
                mkdir(DEMOS_STAGING_CONTENT_PATH);

                kendoBuild.rmdirSyncRecursive(CDN_BUNDLE_PATH);
                bundles.buildBundle(CDN_BUNDLE, version(), function() {
                    copyDir(path.join(CDN_BUNDLE_PATH, STYLES_PATH),
                            path.join(DEMOS_STAGING_CONTENT_PATH, STYLES_PATH)
                    );

                    copyDir(path.join(CDN_BUNDLE_PATH, SCRIPTS_PATH),
                            path.join(DEMOS_STAGING_CONTENT_PATH, SCRIPTS_PATH)
                    );

                    themebuilder.deploy(
                        path.join(DEMOS_STAGING_CONTENT_PATH, "themebuilder"),
                        STAGING_ROOT + "/content/cdn/"
                    );
                });
            }
        });
    });

    desc("Build demos site for live deployment");
    task("production", ["merge-scripts", "docs"], function () {
        deployDemos({
            outputPath: DEMOS_LIVE_PATH,
            cdnRoot: CDN_ROOT + version(),
            themebuilderRoot: "http://themebuilder.kendoui.com",
            onSuccess: complete
        });
    }, true);

    desc("Pack online-demos.zip");
    task("pack-production", ["demos:production"], function() {
        copyDir(path.join("resources", "live", "bin"), path.join(DEMOS_LIVE_PATH, "bin"), true);
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

namespace("download-builder", function() {
    desc("Build staging download builder site");
    task("staging", ["merge-scripts"], function() {
        var indexPath = path.join(BUILDER_STAGING_PATH, "index.html"),
            appDataPath = path.join(BUILDER_STAGING_PATH, BUILDER_SERVICE_PATH, "App_Data"),
            sourcePath = path.join(appDataPath, version());

        copyDir(BUILDER_PATH, BUILDER_STAGING_PATH);

        kendoBuild.rmdirSyncRecursive(CDN_BUNDLE_PATH);
        bundles.buildBundle(CDN_BUNDLE, version(), function() {
            mkdir(appDataPath);
            mkdir(sourcePath);
            copyDir(CDN_BUNDLE_PATH, sourcePath);
        });

        kendoBuild.writeText(indexPath,
            kendoBuild.readText(indexPath)
                .replace(/SERVICE_ROOT/g, BUILDER_STAGING_SERVICE)
                .replace(/VERSION_NUMBER/g, version())
        );

        fs.renameSync(path.join(BUILDER_STAGING_PATH, BUILDER_CONFIG_NAME),
                      path.join(BUILDER_STAGING_PATH,
                                BUILDER_CONFIG_NAME.replace("VERSION_NUMBER", version)
                      )
        );

        kendoBuild.msBuild(
            path.join(BUILDER_STAGING_PATH, BUILDER_PROJECT),
            [ "/t:Clean;Build", "/p:Configuration=Release" ]
        );
    });
});

// Helpers ====================================================================
function buildDocs(sitefinity_path) {
    var mappings = {
            "ui.slider": ["ui.slider", "ui.rangeslider"],
            "mobile.ui.button": ["mobile.ui.button", "mobile.ui.backbutton", "mobile.ui.detailbutton"],
            "ui.dragdrop": ["ui.draggable", "ui.droptarget", "drag", "dragaxis"]
        },
        sections = ["description", "configuration", "methods", "events"];

    function combine() {
        var files = fs.readdirSync(outputPath),
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
                    var text = kendoBuild.readText(outputPath + "/" + fileToMerge);

                    if (sectionName != "description" && hasValue(text)) {
                        text = wrap(text, fileToMerge);
                    }
                    cache += text;
                });

                if (hasValue(cache)) {
                    kendoBuild.writeText(path.join(outputPath, "kendo." + key + "." + sectionName + ".html"), cache);
                }
            });
        }
    }

    function hasValue(text) {
        return text.replace(/^\s*|\s*$/g, '').replace("<!-- help-data -->", "").length > 0;
    }

    function wrap(text, fileToMerge) {
        fileToMerge = fileToMerge.split(".");
        fileToMerge = fileToMerge[fileToMerge.length - 3];

        return '<div class="detailHandle detailHandleExpanded"> <div class="detailExpanded"></div>' + fileToMerge + '</div><div style="display: block;" class="detailBody">' + text + "</div>";
    }

    // output directory
    var outputPath = DOCS_DEPLOY_PATH;

    sitefinity = false; //create global variable
    if (sitefinity_path) {
        outputPath = sitefinity_path;
        sitefinity = true;
    }

    var params = [
        "-d=" + outputPath,
        // template
        "-t=build/node-jsdoc-toolkit/template",
        // constants
        "-D=\"copyright:" + new Date().getFullYear() + "\"",
        "-D=\"title:Kendo UI Documentation\""
    ];

    kendoBuild.rmdirSyncRecursive(outputPath);

    function enumerateSourceFiles(sourcePath) {
        var files = fs.readdirSync(sourcePath).filter(function(file) { return file.indexOf(".js") > -1 && file.indexOf("jquery") === -1 } ),
            paths = [];

        for (var i = 0; i < files.length; i++) {
            paths.push(path.join(sourcePath, files[i]));
        }

        return paths;
    }

    params = params
                .concat(enumerateSourceFiles(SOURCE_PATH))
                .concat(enumerateSourceFiles(DOCS_PATH));

    jsdoctoolkit.run(params);

    combine();
}

function deployDemos(options) {
    var outputPath = options.outputPath,
        webConfig = path.join(outputPath, "Web.config");

    kendoBuild.rmdirSyncRecursive(outputPath);
    copyDir(DEMOS_PATH, outputPath);

    kendoBuild.writeText(webConfig, kendoBuild
        .readText(webConfig)
        .replace("$CDN_ROOT", options.cdnRoot)
        .replace("$THEMEBUILDER_ROOT", options.themebuilderRoot)
    );

    kendoBuild.msBuild(
        path.join(outputPath, DEMOS_PROJECT),
        [ "/t:Clean;Build", "/p:Configuration=Release" ],
        options.onSuccess
    );
}

function version() {
    var v = JSON.parse(kendoBuild.readText("VERSION"));
    return kendoBuild.buildVersion(v.year, v.release);
}

// vim:ft=javascript
