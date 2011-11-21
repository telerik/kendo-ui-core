function build() {
    var jsdoctoolkit = require("./node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit;

    console.log("building documentation...");

    jsdoctoolkit.run([
        // output directory
        "-d=docs",

        // template
        "-t=build/node-jsdoc-toolkit/template",

        // constants
        "-D=\"copyright:2011\"",
        "-D=\"title:Kendo UI Documentation\"",

        // source files
        "src/kendo.core.js",
        "src/kendo.data.js",
        "src/kendo.draganddrop.js",
        "src/kendo.list.js",
        "src/kendo.autocomplete.js",
        "src/kendo.dropdownlist.js",
        "src/kendo.combobox.js",
        "src/kendo.calendar.js",
        "src/kendo.datepicker.js",
        "src/kendo.menu.js",
        "src/kendo.numerictextbox.js",
        "src/kendo.slider.js",
        "src/kendo.splitter.js",
        "src/kendo.panelbar.js",
        "src/kendo.tabstrip.js",
        "src/kendo.timepicker.js",
        "src/kendo.treeview.js",
        "src/kendo.validatable.js",
        "src/kendo.window.js",
        "src/kendo.upload.js",
        "src/chart/docs.js",
        "src/kendo.grid.js"
    ]);
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
