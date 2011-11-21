// Imports ====================================================================
var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    kendoBuild = require("./kendo-build.js");

// Configuration ==============================================================
var multipartScripts = [{
    output:   "kendo.chart.js",
    inputs: [ "chart/main.js",
              "chart/svg.js",
              "chart/vml.js",
              "chart/themes.js"
    ]
}];

var allScripts = [
    "kendo.core.js",
    "kendo.fx.js",
    "kendo.data.odata.js",
    "kendo.data.xml.js",
    "kendo.model.js",
    "kendo.data.js",
    "kendo.draganddrop.js",
    "kendo.groupable.js",
    "kendo.resizable.js",
    "kendo.sortable.js",
    "kendo.selectable.js",
    "kendo.scroller.js",
    "kendo.pageable.js",
    "kendo.popup.js",
    "kendo.list.js",
    "kendo.calendar.js",
    "kendo.datepicker.js",
    "kendo.autocomplete.js",
    "kendo.dropdownlist.js",
    "kendo.combobox.js",
    "kendo.grid.js",
    "kendo.menu.js",
    "kendo.panelbar.js",
    "kendo.tabstrip.js",
    "kendo.treeview.js",
    "kendo.slider.js",
    "kendo.splitter.js",
    "kendo.upload.js",
    "kendo.window.js",
    "kendo.chart.js"
];

var deployScripts = [{
    output: "kendo.all.js",
    inputs: allScripts
}, {
    output: "kendo.web.js",
    inputs: allScripts.filter(function(scriptName) {
                return scriptName.indexOf("chart") == -1;
            })
}, {
    output: "kendo.dataviz.js",
    inputs: [
        "kendo.core.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.model.js",
        "kendo.data.js",
        "kendo.chart.js"
    ]
}];

var thirdPartyScripts = [
    "jquery.min.js"
];

var CULTURES_ROOT = "cultures",
    deployCache = { },
    mergeCache = { };

// Implementation =============================================================
function deploy(scriptsRoot, outputRoot, header, compress) {
    deployScripts.forEach(function(script) {
        console.log("\t" + scriptOutName(script.output, compress));
        mergeMultipartScript(script, scriptsRoot, outputRoot, header, compress);
    });

    allScripts.forEach(function(scriptName) {
        var cacheKey = scriptsRoot + compress + scriptName,
            output = deployCache[cacheKey],
            outName = scriptOutName(scriptName, compress);

        if (!output) {
            var content = kendoBuild.readText(path.join(scriptsRoot, scriptName));
            output = compress ? kendoBuild.minifyJs(content) : content;

            deployCache[cacheKey] = output;
        }

        kendoBuild.writeText(path.join(outputRoot, outName), header + output);
    });

    thirdPartyScripts.forEach(function(scriptName) {
        kendoBuild.copyFileSync(
            path.join(scriptsRoot, scriptName),
            path.join(outputRoot, scriptName)
        );
    });

    var culturesRoot = path.join(scriptsRoot, CULTURES_ROOT),
        culturesDest = path.join(outputRoot, CULTURES_ROOT);

    kendoBuild.copyDirSyncRecursive(culturesRoot, culturesDest);
    kendoBuild.processFilesRecursive(culturesDest, /\.js$/, function(fileName) {
        var content = kendoBuild.readText(fileName),
            output = compress ? kendoBuild.minifyJs(content) : content,
            outName = scriptOutName(fileName, compress);

        kendoBuild.writeText(fileName, header + output);

        if (outName !== fileName) {
            fs.renameSync(fileName, outName);
        }
    });
}

function mergeScripts(scriptsRoot) {
    multipartScripts.forEach(function(script) {
        console.log("\t" + script.output + ": " + script.inputs.length + " files");
        mergeMultipartScript(script, scriptsRoot, scriptsRoot, "", false);
    });
}

function mergeMultipartScript(script, srcDir, outDir, header, compress) {
    var outFile = script.output,
        cacheKey = srcDir + compress + outFile,
        result = mergeCache[cacheKey] || "";

    if (!result) {
        script.inputs.forEach(function(module) {
            result += kendoBuild.readText(
                path.join(srcDir, module)
            );
        });

        if (compress) {
            outFile = outFile.replace(".js", ".min.js");
            result = kendoBuild.minifyJs(result);
        }

        mergeCache[cacheKey] = result;
    }

    kendoBuild.writeText(
        path.join(outDir, outFile),
        header + result
    );
}

function scriptOutName(scriptName, compress) {
    return compress ? scriptName.replace(".js", ".min.js") : scriptName;
}

// Exports / Execute =====================================================
if (require.main !== module) {
    exports.mergeScripts = mergeScripts;
    exports.deployScripts = deploy;
} else {
    console.log("merging multipart scripts...");
    mergeScripts("./src/");
}
