#!/usr/bin/env node

var fs = require("fs"),
    path = require("path"),
    kendoBuild = require("./kendo-build");

//========== Configuration ==============
var mappings = {
        "slider": ["slider", "rangeslider"],
        "dragdrop": ["draggable", "droptarget"]
    },
    sections = ["description", "configuration", "methods", "events"],
    DOCS_ROOT = path.join("demos", "mvc", "content", "docs");

function combine() {
    var files = fs.readdirSync(DOCS_ROOT);
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
                var text = kendoBuild.readText(DOCS_ROOT + "/" + fileToMerge);

                if (sectionName != "description" && text.length > 10) {
                    text = wrap(text, fileToMerge);
                }
                cache += text;
            });

            if (cache.length > 15) {
                kendoBuild.writeText(DOCS_ROOT + "/kendo.ui." + key + "." + sectionName + ".html", cache);
            }
        });
    }
}

function wrap(text, fileToMerge) {
    fileToMerge = fileToMerge.split(".");
    fileToMerge = fileToMerge[fileToMerge.length - 3];

    return '<div class="detailHandle detailHandleExpanded"> <div class="detailExpanded"></div>' + fileToMerge + '</div><div style="display: block;" class="detailBody">' + text + "</div>";
}

function build() {
    var jsdoctoolkit = require("./node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit;

    console.log("Building documentation");

    var params = [
        // output directory
        "-d=" + (process.argv[3] || "demos/mvc/content/docs"),

        // template
        "-t=build/node-jsdoc-toolkit/" + (process.argv[2] || "template"),

        // constants
        "-D=\"copyright:2011\"",
        "-D=\"title:Kendo UI Documentation\""
    ]

    var sourceFiles = fs.readdirSync("src").filter(function(file) { return file.indexOf(".js") > -1 && file.indexOf("jquery") === -1 } );
    for (var i = 0; i < sourceFiles.length; i++) {
        params.push(path.join("src", sourceFiles[i]));
    }

    params.push("src/chart/docs.js");

    jsdoctoolkit.run(params);

    combine();
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
