// Imports ====================================================================
var fs = require("fs"),
    sys = require("sys"),
    kendoBuild = require("./kendo-build.js");

// Configuration ==============================================================
var multipartScripts = [
    { output: "kendo.chart.js",
      inputs: ["chart/docs.js",
               "chart/main.js",
               "chart/themes.js"]
    }
];

function mergeScripts(scriptsRoot) {
    multipartScripts.forEach(function(script) {
        var result = "";

        console.log("\t" + script.output + ": " + script.inputs.join(" "));

        script.inputs.forEach(function(module) {
            result += kendoBuild.readText(scriptsRoot + module);
        });

        kendoBuild.writeText(scriptsRoot + script.output, result);
    });
}

// Exports / Execute =====================================================
if (require.main !== module) {
    exports.mergeScripts = mergeScripts;
} else {
    console.log("merging multipart scripts...");
    mergeScripts("./src/");
}
