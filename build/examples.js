#!/usr/bin/env node

// Imports ====================================================================
var fs = require("fs"),
    os = require("os"),
    sys = require("sys"),
    path = require("path"),
    docs = require("./docs"),
    themes = require("./themes"),
    spawn = require('child_process').spawn,
    kendoBuild = require("./kendo-build"),
    kendoScripts = require("./kendo-scripts"),
    copyDir = kendoBuild.copyDirSyncRecursive,
    mkdir = kendoBuild.mkdir;

// Configuration ==============================================================
var SOURCE_ROOT = "src",
    STYLES_ROOT = "styles",
    RELEASE = "Release",
    DEBUG = "Debug",
    PROJECT_ROOT = path.join("demos", "mvc"),
    PROJECT = "Kendo.csproj";

// Implementation ==============================================================
function buildProject(project, configuration) {
    var buildExe,
        osName = os.type(),
        configuration = configuration || DEBUG,
        params = [ "/t:Clean;Build", "/p:Configuration=" + configuration, project ];

    if (osName == "Linux" || osName == "Darwin") {
        buildExe = spawn("xbuild", params);
    } else {
        buildExe = spawn("/cygdrive/c/Windows/Microsoft.NET/Framework64/v4.0.30319/msbuild.exe", params);
    }

    buildExe.stderr.on('data', function (data) {
        sys.print('stderr: ' + data);
    });

    buildExe.on('exit', function (code) {
        if (code !== 0) {
            console.log("Build error: " + code);
        } else {
            console.log("Success.");
        }
    });
}

function buildPrerequisites() {
    console.log("Building themes");
    themes.build();

    console.log("Merging multipart scripts");
    kendoScripts.mergeScripts(SOURCE_ROOT);

    docs.build();
}

function buildDebug() {
    buildPrerequisites();

    console.log("Building examples application");
    buildProject(path.join(PROJECT_ROOT, PROJECT));
}

function buildStaging(outputRoot) {
    var contentDest = path.join(outputRoot, "content", "cdn"),
        scriptsDest = path.join(contentDest, "js"),
        stylesDest = path.join(contentDest, "styles"),
        webConfig = path.join(outputRoot, "Web.config");

    buildPrerequisites();

    kendoBuild.rmdirSyncRecursive(outputRoot);
    copyDir(PROJECT_ROOT, outputRoot);

    buildProject(path.join(outputRoot, PROJECT), RELEASE);

    mkdir(contentDest);

    mkdir(scriptsDest);
    kendoScripts.deployScripts(SOURCE_ROOT, scriptsDest, "", true);

    mkdir(stylesDest);
    kendoBuild.deployStyles(STYLES_ROOT, stylesDest, "", true);

    kendoBuild.writeText(webConfig, kendoBuild
        .readText(webConfig)
        .replace("$CDN_ROOT", "~/content/cdn")
    );
}

function buildProduction() {
}

if (require.main === module) {
    buildDebug();
} else {
    exports.buildStaging = buildStaging;
    exports.buildProduction = buildProduction;
}
