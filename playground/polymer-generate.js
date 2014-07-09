#! /usr/bin/env node

var TARGET_DIR = process.argv[2];
if (!TARGET_DIR) {
    console.error("Specify target directory as first argument");
    process.exit(1);
}

var COMPONENTS = [
    "kendo.calendar.js",
    "kendo.menu.js",
    "kendo.window.js"
];

var PATH = require("path");
var FS = require("fs");
var META = require("../build/kendo-meta.js");
var U2 = require("uglify-js");
var YAJET = require("./yajet.js");

var yajet = new YAJET({
    reader_char: "#",
    with_scope: true,
    filters: {
        json: function(x) {
            return JSON.stringify(x);
        }
    }
});

var prefer_tags = {
    Editor         : "textarea",
    NumericTextBox : "input",
    DatePicker     : "input",
    DateTimePicker : "input",
    TimePicker     : "input",
    AutoComplete   : "input",
    ColorPicker    : "input",
    MaskedTextBox  : "input",
    MultiSelect    : "input",
    Upload         : "input",
    Validator      : "form",
    Button         : "button",
    ListView       : "ul",
    TreeView       : "ul",
    Menu           : "ul",
    ContextMenu    : "ul",
};

var template = FS.readFileSync("./polymer-template.html", "utf8");

template = yajet.compile(template);

function makeComponent(filename) {
    var comp = META.getKendoFile(filename);
    var meta = comp.getMeta();
    meta.widgets.forEach(function(w){
        var widgetName = w.name; // e.g. ContextMenu
        var constructor = "kendo" + widgetName;
        var attributes = w.options.filter(function(opt){
            return !/^(name)$/.test(opt);
        });
        if (attributes.indexOf("dataSource") < 0)
            attributes.push("dataSource");
        var component_name = "k-" + widgetName.toLowerCase(); // no moar dashes

        var code = template({
            component_name       : component_name,
            component_attributes : attributes,
            widget_constructor   : constructor,
            tag                  : prefer_tags[widgetName] || "div",
        });

        var dest = PATH.join(TARGET_DIR, component_name + ".html");
        FS.writeFileSync(dest, code);
    });
}

COMPONENTS.forEach(makeComponent);
