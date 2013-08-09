#!/usr/local/bin/node

var FS = require("fs");
var PATH = require("path");
var SYS = require("util");

var U2 = require("uglify-js");
var YAJET = require("./yajet.js").YAJET;

var OPTIMIST = require("optimist");
var ARGS = OPTIMIST
    .describe("c", "Limit usage count")
    .string("c")
    .argv;

var SRCDIR = PATH.join(__dirname, "..", "..", "src");
function ADD_PATH(filename){
    return PATH.join(SRCDIR, filename);
};

var files = ARGS._;

Array.prototype.find_if = function(test) {
    for (var i = this.length; --i >= 0;)
        if (test(this[i])) return true;
    return false;
};

var BUNDLES = [
    "kendo.editor.js",
    "kendo.aspnetmvc.js",
    "kendo.all.js",
    "kendo.web.js",
    "kendo.dataviz.js",
    "kendo.mobile.js",
    "kendo.winjs.js",
];

if (files.length == 0) {

    files = FS.readdirSync(SRCDIR).filter(function(filename){
        if (BUNDLES.indexOf(filename) >= 0) return false;
        return /^kendo.*\.js$/i.test(filename) && !/\.min\.js$/i.test(filename);
    }).map(ADD_PATH);

    // add editor and aspnetmvc
    files.push.apply(files, [
        "editor/main.js",
        "editor/dom.js",
        "editor/serializer.js",
        "editor/range.js",
        "editor/system.js",
        "editor/inlineformat.js",
        "editor/formatblock.js",
        "editor/linebreak.js",
        "editor/lists.js",
        "editor/link.js",
        "editor/image.js",
        "editor/components.js",
        "editor/indent.js",
        "editor/viewhtml.js",
        "editor/formatting.js",
        "editor/toolbar.js",
        "editor/tables.js"
    ].map(ADD_PATH));

    files.push.apply(files, [
        "aspnetmvc/kendo.data.aspnetmvc.js",
        "aspnetmvc/kendo.combobox.aspnetmvc.js",
        "aspnetmvc/kendo.multiselect.aspnetmvc.js",
        "aspnetmvc/kendo.imagebrowser.aspnetmvc.js",
        "aspnetmvc/kendo.validator.aspnetmvc.js"
    ].map(ADD_PATH));

}

var TOTAL_PARSED = 0;

var toplevel = null;
files.forEach(function(file){
    SYS.error("Parsing " + PATH.relative(SRCDIR, file));
    var code = FS.readFileSync(file, "utf8");
    TOTAL_PARSED += code.length;
    toplevel = U2.parse(code, {
        filename: PATH.relative(SRCDIR, file),
        toplevel: toplevel
    });
});

toplevel.figure_out_scope();

var PROPERTIES = {};
var WARNINGS = [];

function add_prop(name, node, type) {
    var token = node.start;
    var p = PROPERTIES[name] || (PROPERTIES[name] = {
        name: name,
        seen: [],
    });
    p.seen.push({
        type: type,
        file: token.file,
        line: token.line,
    });
}

function is_object_prop(node) {
    return (node instanceof U2.AST_ObjectProperty && /^_/.test(node.key));
}

function is_dot_prop(node) {
    return (node instanceof U2.AST_Dot && /^_/.test(node.property));
}

function is_access_prop(node) {
    return (node instanceof U2.AST_Sub &&
            node.property instanceof U2.AST_String &&
            /^_/.test(node.property.value));
}

// take one: figure out visible properties.
(function(){
    var walker = new U2.TreeWalker(function(node, descend){
        if (is_object_prop(node)) {
            add_prop(node.key, node, node.value instanceof U2.AST_Lambda ? "method" : "property");
        }
        else if (is_dot_prop(node)) {
            var p = walker.parent();
            var type = p instanceof U2.AST_Assign && p.left === node ? "assign" : "access";
            add_prop(node.property, node, type);
        }
        else if (is_access_prop(node)) {
            var p = walker.parent();
            var type = p instanceof U2.AST_Assign && p.left === node ? "assign" : "access";
            add_prop(node.property.value, node, type);
        }
        else if (node instanceof U2.AST_Call && node.expression instanceof U2.AST_Sub) {
            WARNINGS.push(node);
        }
    });
    toplevel.walk(walker);
})();

// take two: locate known properties in strings
(function(){
    var walker = new U2.TreeWalker(function(node, descend){
        if (node instanceof U2.AST_String && node.value in PROPERTIES) {
            add_prop(node.value, node, "string");
        }
    });
    toplevel.walk(walker);
}());

(function(){
    var tmpl = FS.readFileSync(PATH.join(__dirname, "tmpl", "internals.html"), "utf8");
    tmpl = new YAJET().compile(tmpl);
    var files = {};
    function get_file(name) {
        return files[name] || (files[name] = {
            name: name,
            internals: [],
            warnings: [],
        });
    }
    //FS.writeFileSync("/tmp/properties.json", JSON.stringify(PROPERTIES, null, 2));

    var totals = {
        properties: 0,
        use_count: 0,
        bytes: 0
    };

    var properties = [];

    Object.keys(PROPERTIES).sort().forEach(function(name){
        // XXX:
        // console.log("REMOVE THIS");
        // if (totals.properties > 5) return;

        var prop = PROPERTIES[name];
        var use_count = prop.seen.length;

        if (ARGS.c && use_count > ARGS.c) return;

        properties.push(prop);

        ++totals.properties;
        totals.use_count += use_count;
        totals.bytes += use_count * name.length;

        prop.seen.forEach(function(q){
            var file = get_file(q.file);
            if (file.internals.find_if(function(x){ return x.prop === prop }))
                return;
            var p = {
                file: q.file,
                type: q.type,
                prop: prop,
                here: prop.seen.filter(function(p){ return p.file == q.file }),
                other: prop.seen.filter(function(p){ return p.file != q.file }),
            };
            file.internals.push(p);
        });
    });

    files = Object.keys(files).sort().map(function(key){
        return files[key];
    });

    properties = properties.sort(function(a, b){
        if (a.seen.length == b.seen.length) {
            return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        }
        // sort by number of occurrences.
        return a.seen.length - b.seen.length;
    });

    var html = tmpl({
        files      : files,
        properties : properties,
        totals     : totals,
        warnings   : WARNINGS,
        in_string  : properties.filter(function(p){
            return p.seen.find_if(function(p){ return p.type == "string" });
        }),
        total_parsed : TOTAL_PARSED,
    });
    FS.writeFileSync(PATH.join(__dirname, "internals.html"), html);

})();
