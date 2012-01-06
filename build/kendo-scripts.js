// Imports ====================================================================
var fs = require("fs"),
    path = require("path"),
    kendoBuild = require("./kendo-build.js");

// Configuration ==============================================================
var SCRIPTS = "src",
    CULTURES = "cultures",
    CULTURE_SCRIPTS = path.join(SCRIPTS, CULTURES);

var multipartScripts = [{
    output:   "kendo.chart.js",
    inputs: [ path.join("chart", "main.js"),
              path.join("chart", "svg.js"),
              path.join("chart", "vml.js"),
              path.join("chart", "themes.js")]
    }
];

var suiteScripts = {
    "web": [
        "kendo.core.js",
        "kendo.fx.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.model.js",
        "kendo.binder.js",
        "kendo.data.js",
        "kendo.validator.js",
        "kendo.draganddrop.js",
        "kendo.groupable.js",
        "kendo.resizable.js",
        "kendo.sortable.js",
        "kendo.selectable.js",
        "kendo.pager.js",
        "kendo.popup.js",
        "kendo.list.js",
        "kendo.calendar.js",
        "kendo.datepicker.js",
        "kendo.autocomplete.js",
        "kendo.dropdownlist.js",
        "kendo.combobox.js",
        "kendo.grid.js",
        "kendo.numerictextbox.js",
        "kendo.menu.js",
        "kendo.editable.js",
        "kendo.filtermenu.js",
        "kendo.panelbar.js",
        "kendo.tabstrip.js",
        "kendo.timepicker.js",
        "kendo.treeview.js",
        "kendo.slider.js",
        "kendo.splitter.js",
        "kendo.upload.js",
        "kendo.window.js"
    ],
    "dataviz": [
        "kendo.core.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.model.js",
        "kendo.data.js",
        "kendo.chart.js"
    ],
    "mobile": [
        "kendo.core.js",
        "kendo.model.js",
        "kendo.fx.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.data.js",
        "kendo.history.js",
        "kendo.mobile.core.js",
        "kendo.mobile.view.js",
        "kendo.mobile.application.js",
        "kendo.mobile.button.js",
        "kendo.mobile.listview.js",
        "kendo.mobile.navbar.js",
        "kendo.mobile.radiogroup.js",
        "kendo.mobile.scroller.js",
        "kendo.mobile.switch.js",
        "kendo.mobile.tabstrip.js"
    ]
};

var allScripts = [],
    deployCache = { },
    mergeCache = { };

for (var suite in suiteScripts) {
    allScripts = allScripts.concat(
        suiteScripts[suite].filter(function(script) {
            return allScripts.indexOf(script) === -1;
        })
    );
}

suiteScripts.all = allScripts;


// Implementation =============================================================
function buildSuiteScripts(suite, outputRoot, header, compress) {
    var scripts = suiteScripts[suite],
        suiteScript = "kendo." + suite + ".js";

    scripts.forEach(function(scriptName) {
        var cacheKey = SCRIPTS + compress + scriptName,
            output = deployCache[cacheKey],
            outName = scriptOutName(scriptName, compress);

        if (!output) {
            var content = kendoBuild.readText(path.join(SCRIPTS, scriptName));
            output = compress ? kendoBuild.minifyJs(content) : content;

            deployCache[cacheKey] = kendoBuild.stripBOM(output);
        }

        kendoBuild.writeText(path.join(outputRoot, outName), header + output);
    });

    console.log("\t" + scriptOutName(suiteScript, compress));
    mergeMultipartScript(scripts, suiteScript, outputRoot, header, compress);
}

function buildCultures(outputRoot, header, compress) {
    var culturesDest = path.join(outputRoot, CULTURES);

    kendoBuild.copyDirSyncRecursive(CULTURE_SCRIPTS, culturesDest);
    kendoBuild.processFilesRecursive(culturesDest, /\.js$/, function(fileName) {
        var content = kendoBuild.readText(fileName),
            output = compress ? kendoBuild.minifyJs(content) : content,
            outName = scriptOutName(fileName, compress);

        // Cultures are UTF-8 with BOM
        output = kendoBuild.addBOM(header + output);

        kendoBuild.writeText(fileName, output);

        if (outName !== fileName) {
            fs.renameSync(fileName, outName);
        }
    });
}

function mergeScripts() {
    multipartScripts.forEach(function(script) {
        console.log("\t" + script.output + ": " + script.inputs.length + " files");
        mergeMultipartScript(script.inputs, script.output, SCRIPTS, "", false);
    });
}

function mergeMultipartScript(inputs, output, outDir, header, compress) {
    var outFile = scriptOutName(output, compress),
        cacheKey = compress + outFile,
        result = mergeCache[cacheKey] || "",
        moduleText;

    if (!result) {
        inputs.forEach(function(module, index) {
            moduleText = kendoBuild.readText(
                path.join(SCRIPTS, module)
            );

            if (index > 0) {
                moduleText = kendoBuild.stripBOM(moduleText);
            }

            result += moduleText;
        });

        if (compress) {
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
    exports.buildSuiteScripts = buildSuiteScripts;
} else {
    console.log("merging multipart scripts...");
    mergeScripts();
}
