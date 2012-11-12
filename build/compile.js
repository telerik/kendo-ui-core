#! /usr/bin/env node

var fs = require("fs");
var sys = require("util");
var u2 = require("uglify-js2");
var path = require("path");
var OPT = require("optimist");
var ARGV = OPT
    .describe("amd", "Wrap for RequireJS")
    .describe("deps", "List dependencies")
    .describe("decl", "Add the component declarations in the source code")
    .boolean("amd")
    .boolean("deps")
    .wrap(80)
    .argv;

var KENDO_SRCDIR = path.join(path.dirname(fs.realpathSync(__filename)), "..");

var get_wrapper = (function(wrapper){
    var code = '((typeof define == "function" && define.amd) ? define : function(a, b){ return b() })($DEPS, $CONT)';
    return function() {
        if (wrapper) return wrapper;
        wrapper = u2.parse(code);
        wrapper.wrap = function(deps, cont) {
            return wrapper.transform(new u2.TreeTransformer(
                null,           // need no 'before'
                function after(node){
                    if (node instanceof u2.AST_SymbolRef) switch (node.name) {
                      case "$DEPS":
                        return new u2.AST_Array({
                            elements: deps.map(function(x){
                                return new u2.AST_String({ value: x });
                            })
                        });
                      case "$CONT":
                        cont = cont.clone();
                        cont.argnames = [];
                        return new u2.AST_Function(cont);
                        break;
                    }
                }
            ));
        };
        return wrapper;
    };
})();

var files = ARGV._.slice();

var deps_file = path.join(KENDO_SRCDIR, "download-builder/config/kendo-config.VERSION_NUMBER.json");
deps_file = fs.readFileSync(deps_file, "utf8");
deps_file = JSON.parse(deps_file);

if (ARGV.decl) {
    deps_file.components.forEach(function(c){
        if (!c.source) {
            sys.error("No source declaration for component " + c.id);
            return;
        }
        var orig = c.source.replace(/\.min/, "");
        var orig_full = path.join(KENDO_SRCDIR, "src", orig);
        sys.error(c.id + ": " + orig);
        if (!fs.existsSync(orig_full)) {
            sys.error("File " + orig + " not found for component " + c.id);
            return;
        }
        var orig_code = fs.readFileSync(orig_full, "utf8");
        var ast = u2.parse(orig_code, {
            filename: orig
        });
        var component_stat = null;
        try {
            ast.walk(new u2.TreeWalker(function(node){
                if (node instanceof u2.AST_Lambda) return true;
                if (node instanceof u2.AST_SimpleStatement
                    && node.body instanceof u2.AST_Call
                    && node.body.expression instanceof u2.AST_SymbolRef
                    && node.body.expression.name == "KENDO_COMPONENT") {
                    component_stat = node;
                    throw "ok";
                }
            }));
        } catch(ex) {
            if (ex !== "ok") throw ex;
        }
        delete c.source;        // no point keeping that in the file itself
        var comp = u2.parse("KENDO_COMPONENT(" + JSON.stringify(c) + ")"), code;
        if (component_stat) {
            code = orig_code.substring(0, component_stat.start.pos) +
                comp.body[0].print_to_string({ beautify: true }) +
                orig_code.substr(component_stat.end.endpos).replace(/^[\n\t\s;]*/, "\n\n");
        } else {
            code = comp.body[0].print_to_string({ beautify: true }) +
                orig_code.replace(/^[\n\t\s;]*/, "\n\n");
        }
        fs.writeFileSync(orig_full, code);
    });
    process.exit(0);
}

files.forEach(function(file){
    var code = fs.readFileSync(file, "utf8");
    var deps = fetch_dependencies(file);
    if (ARGV.deps) {
        sys.puts(file + ": " + deps.join(", "));
        return;
    }
    deps = deps.map(function(dep){
        return "./" + dep.replace(/\.js$/, "");
    });
    var ast = u2.parse(code, { filename: file });
    if (ARGV.amd) {
        ast = get_wrapper().wrap(deps, ast);
    }
    var compressor = u2.Compressor({ warnings: false });
    ast.figure_out_scope();
    ast = ast.transform(compressor);
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names();
    var output = ast.print_to_string();
    sys.print(output);
});

function assert(cond, msg) {
    if (!cond) throw new Error(msg || "Failed assertion");
};

function fetch_dependencies(file) {
    var deps = {};
    var done = {};

    function add_component(c) {
        if (done[c.id]) return;
        done[c.id] = true;
        if (c.source) deps[c.source] = true;
    }

    var comp = find_component_by_source(file);
    comp.forEach(function(c){
        add_component(c);
        if (c.depends) c.depends.forEach(function(id){
            add_component(find_component(id));
        });
        if (c.features) c.features.forEach(function(c){
            if (c.depends) c.depends.forEach(function(id){
                add_component(find_component(id));
            });
        });
    });

    return Object.keys(deps).slice(1); // because the first is `file` itself.
};

function find_component(id) {
    return deps_file.components.filter(function(c){ return c.id == id })[0];
};

function find_component_by_source(source) {
    source = path.basename(source);
    return deps_file.components.filter(function(c){
        var src = c.source;
        if (src) {
            src = src.toLowerCase().replace(/\.min/g, "");
            return src == source;
        }
    });
};
