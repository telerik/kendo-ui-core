#!/usr/bin/env node

var fs = require("fs"),
    path = require("path");

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
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
