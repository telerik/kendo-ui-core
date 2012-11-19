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
    .describe("bundle", "Create a bundle")
    .boolean("amd")
    .boolean("deps")
    .wrap(80)
    .argv;

if (ARGV.bundle) {
    var files = ARGV._.slice();
    var destination = files.shift();
    var destination_min = destination.replace(/\.js$/i, ".min.js");
    var toplevel = new u2.AST_Toplevel({ body: [] });
    files.forEach(function(file){
        var ast = compile_one_file(file, ast);
        toplevel.body = toplevel.body.concat(ast.body);
    });
    fs.writeFileSync(destination, toplevel.print_to_string({ beautify: true }));
    toplevel = squeeze(toplevel);
    toplevel.figure_out_scope();
    toplevel.compute_char_frequency();
    toplevel.mangle_names();
    fs.writeFileSync(destination_min, toplevel.print_to_string());
    process.exit(0);
}

var KENDO_SRCDIR = path.join(path.dirname(fs.realpathSync(__filename)), "..");

var get_wrapper = (function(wrapper){
    var code = '((typeof define == "function" && define.amd) ? define : function(id, deps, body){ return body() })($ID, $DEPS, $CONT)';
    return function() {
        if (wrapper) return wrapper;
        wrapper = u2.parse(code);
        wrapper.wrap = function(id, deps, cont) {
            return wrapper.transform(new u2.TreeTransformer(
                null,           // need no 'before'
                function after(node){
                    if (node instanceof u2.AST_SymbolRef) switch (node.name) {
                      case "$ID":
                        return new u2.AST_String({ value: id });
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
    throw new Error("Don't run this.");
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

function compile_one_file(file) {
    var code = fs.readFileSync(file, "utf8");
    var ast = u2.parse(code, { filename: file });
    ast = extract_deps(ast, file);
    if (!ast.is_bundle) {
        var deps = ast.deps;
        var id = "kendo." + ast.component.id;
        if (ARGV.deps) {
            sys.puts(file + ": " + deps.join(", "));
            return;
        }
        deps = deps.map(function(dep){
            return "./kendo." + dep + ".min";
        });
        if (ARGV.amd) {
            ast = get_wrapper().wrap(id, deps, ast);
        }
    } else if (ARGV.deps) {
        sys.puts(file + " is a bundle");
        return;
    }
    return ast;
}

function squeeze(ast) {
    var compressor = u2.Compressor({ warnings: false });
    ast.figure_out_scope();
    ast = ast.transform(compressor);
    return ast;
}

files.forEach(function (file){
    var output = file.replace(/\.js$/i, ".min.js");
    if (output == file)
        throw new Error("Won't overwrite " + file);
    var ast = compile_one_file(file);
    ast = squeeze(ast);
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names();
    code = ast.print_to_string();
    fs.writeFileSync(output, code);
});

function extract_deps(ast, comp_filename) {
    var component, is_bundle = false;
    var tt = new u2.TreeTransformer(function before(node, descend){
        if (node !== ast) {
            if (node instanceof u2.AST_Lambda) return node; // don't search subscopes
            if (node instanceof u2.AST_SimpleStatement &&
                node.body instanceof u2.AST_Call
                && node.body.expression instanceof u2.AST_SymbolRef
                && node.body.expression.name == "KENDO_COMPONENT")
            {
                if (component) is_bundle = true;
                component = node.body.args[0].print_to_string();
                component = (1, eval)("(" + component + ")");

                // discard KENDO_COMPONENT calls
                if (!component.files || component.files.length == 0)
                    return new u2.AST_EmptyStatement(node);

                // however, if we have a split component, better load those files now.
                var block = new u2.AST_BlockStatement({ body: [] });
                component.files.forEach(function(file){
                    var full = path.join(path.dirname(comp_filename), file);
                    var code = fs.readFileSync(full, "utf8");
                    u2.parse(code, {
                        filename: file,
                        toplevel: block
                    });
                });
                return block;
            }
            if (node instanceof u2.AST_Var && node.definitions[0].name.name == "KENDO_COMPONENT") {
                // discard the KENDO_COMPONENT function
                return new u2.AST_EmptyStatement(node);
            }
            return node;
        }
    });
    ast = ast.transform(tt);
    ast.is_bundle = is_bundle;
    if (!component && !is_bundle) {
        ast.is_bundle = true;
        return ast;
    }
    if (!is_bundle) {
        var deps = component.depends ? component.depends.slice() : [];
        if (component.features) component.features.forEach(function(f){
            if (f.depends) deps = deps.concat(f.depends);
        });
        ast.deps = deps;
        ast.component = component;
    }
    return ast;
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
