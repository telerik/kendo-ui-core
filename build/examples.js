#!/usr/bin/env node

// Imports ====================================================================
var fs = require("fs"),
    os = require("os"),
    sys = require("sys"),
    path = require("path"),
    docs = require("./docs"),
    themes = require("./themes"),
    spawn = require('child_process').spawn,
    kendoScripts = require("./kendo-scripts");

// Configuration ==============================================================
var SOURCE_ROOT = "src",
    PROJECT = "demos/mvc/Kendo.csproj";

// Implementation ==============================================================
function buildDebug() {
    console.log("Building themes");
    themes.build();

    console.log("Merging multipart scripts");
    kendoScripts.mergeScripts(SOURCE_ROOT);

    docs.build();

    console.log("Building examples application");
    var buildExe,
        osName = os.type();

    if (osName == "Linux" || osName == "Darwin") {
        buildExe = spawn("xbuild", [ PROJECT ]);
    } else {
        buildExe = spawn("/cygdrive/c/Windows/Microsoft.NET/Framework64/v4.0.30319/msbuild.exe", [ PROJECT ]);
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

if (require.main === module) {
    buildDebug();
}
