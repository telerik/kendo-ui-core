// Imports ====================================================================
var fs = require("fs"),
    path = require("path"),
    kendoBuild = require("./kendo-build.js");

// Configuration ==============================================================
var SCRIPTS = "src",
    CULTURES = "cultures",
    CULTURE_SCRIPTS = path.join(SCRIPTS, CULTURES);

var multipartScripts = [{
    output:   "kendo.editor.js",
    inputs: [ path.join("editor", "main.js"),
              path.join("editor", "dom.js"),
              path.join("editor", "serializer.js"),
              path.join("editor", "range.js"),
              path.join("editor", "system.js"),
              path.join("editor", "inlineformat.js"),
              path.join("editor", "formatblock.js"),
              path.join("editor", "linebreak.js"),
              path.join("editor", "lists.js"),
              path.join("editor", "link.js"),
              path.join("editor", "image.js"),
              path.join("editor", "components.js"),
              path.join("editor", "indent.js"),
              path.join("editor", "viewhtml.js"),
              path.join("editor", "pendingformats.js")]
      }, {
      output:   "kendo.aspnetmvc.js",
      inputs: [ path.join("aspnetmvc", "kendo.data.aspnetmvc.js"),
                path.join("aspnetmvc", "kendo.combobox.aspnetmvc.js"),
                path.join("aspnetmvc", "kendo.imagebrowser.aspnetmvc.js"),
                path.join("aspnetmvc", "kendo.validator.aspnetmvc.js") ]
}];

var suiteScripts = {
    "web": [
        "kendo.core.js",
        "kendo.fx.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.data.js",
        "kendo.binder.js",
        "kendo.validator.js",
        "kendo.userevents.js",
        "kendo.draganddrop.js",
        "kendo.mobile.scroller.js",
        "kendo.groupable.js",
        "kendo.reorderable.js",
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
        "kendo.columnmenu.js",
        "kendo.grid.js",
        "kendo.listview.js",
        "kendo.imagebrowser.js",
        "kendo.editor.js",
        "kendo.numerictextbox.js",
        "kendo.menu.js",
        "kendo.editable.js",
        "kendo.filtermenu.js",
        "kendo.panelbar.js",
        "kendo.tabstrip.js",
        "kendo.timepicker.js",
        "kendo.datetimepicker.js",
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
        "kendo.data.js",
        "kendo.binder.js",
        "kendo.dataviz.core.js",
        "kendo.dataviz.themes.js",
        "kendo.dataviz.chart.js",
        "kendo.dataviz.gauge.js",
        "kendo.dataviz.svg.js",
        "kendo.dataviz.vml.js"
    ],
    "mobile": [
        "kendo.core.js",
        "kendo.fx.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.data.js",
        "kendo.binder.js",
        "kendo.validator.js",
        "kendo.history.js",
        "kendo.userevents.js",
        "kendo.draganddrop.js",
        "kendo.popup.js",
        "kendo.touch.js",
        "kendo.mobile.popover.js",
        "kendo.mobile.loader.js",
        "kendo.mobile.scroller.js",
        "kendo.mobile.shim.js",
        "kendo.mobile.view.js",
        "kendo.mobile.modalview.js",
        "kendo.mobile.splitview.js",
        "kendo.mobile.pane.js",
        "kendo.mobile.application.js",
        "kendo.mobile.actionsheet.js",
        "kendo.mobile.button.js",
        "kendo.mobile.buttongroup.js",
        "kendo.mobile.listview.js",
        "kendo.mobile.navbar.js",
        "kendo.mobile.scrollview.js",
        "kendo.mobile.switch.js",
        "kendo.mobile.tabstrip.js"
    ],
    "winjs": [
        "kendo.core.js",
        "kendo.fx.js",
        "kendo.data.odata.js",
        "kendo.data.xml.js",
        "kendo.data.js",
        "kendo.binder.js",
        "kendo.validator.js",
        "kendo.userevents.js",
        "kendo.draganddrop.js",
        "kendo.mobile.scroller.js",
        "kendo.groupable.js",
        "kendo.reorderable.js",
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
        "kendo.listview.js",
        "kendo.numerictextbox.js",
        "kendo.editable.js",
        "kendo.filtermenu.js",
        "kendo.timepicker.js",
        "kendo.slider.js",
        "kendo.dataviz.core.js",
        "kendo.dataviz.themes.js",
        "kendo.dataviz.chart.js",
        "kendo.dataviz.gauge.js",
        "kendo.dataviz.svg.js"
    ],
    aspnetmvc: [
        "kendo.aspnetmvc.js"
    ]
};

var deployCache = { },
    mergeCache = { };

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
            output = kendoBuild.stripBOM(output) + ";";

            deployCache[cacheKey] = output;
        }

        kendoBuild.writeText(path.join(outputRoot, outName), header + output);
    });

    console.log("\t" + scriptOutName(suiteScript, compress));
    mergeMultipartScript(scripts, suiteScript, outputRoot, header, compress);
}

function buildCombinedScript(name, suites, outputRoot, header, compress) {
    var scripts = [],
        combinedScript = "kendo." + name + ".js";

    suites.forEach(function(suite) {
        scripts = scripts.concat(
            suiteScripts[suite].filter(function(script) {
                return scripts.indexOf(script) === -1;
            })
        );
    });

    mergeMultipartScript(scripts, combinedScript, outputRoot, header, compress);
}

function buildCultures(outputRoot, header, compress) {
    var culturesDest = path.join(outputRoot, CULTURES);

    kendoBuild.copyDirSyncRecursive(CULTURE_SCRIPTS, culturesDest);
    kendoBuild.processFilesRecursive(culturesDest, /\.js$/, function(fileName) {
        var content = kendoBuild.readText(fileName),
            output = compress ? kendoBuild.minifyJs(content) : content,
            outName = scriptOutName(fileName, compress);

        // Cultures are UTF-8 with BOM
        output = kendoBuild.addBOM(header + output) + ";";

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
            result = kendoBuild.minifyJs(result) + ";";
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
    exports.buildCombinedScript = buildCombinedScript;
    exports.buildCultures = buildCultures;
} else {
    console.log("merging multipart scripts...");
    mergeScripts();
}
