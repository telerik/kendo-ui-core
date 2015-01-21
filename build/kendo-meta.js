var PATH  = require("path");
var FS    = require("fs");
var SYS   = require("util");
var U2    = require("uglify-js");

var SRCDIR = PATH.join(__dirname, "..", "src");

var AMD_WRAPPER = "(function(f, define){\n\
    define($DEPS, f);\n\
})(function(){\n\
\n\
$CODE\n\
\n\
return window.kendo;\n\
\n\
}, typeof define == 'function' && define.amd ? define : function(_, f){ f(); });";

var getKendoFile = (function() {

    function KendoFile(filename) {
        this._filename = filename;
    }

    KendoFile.prototype = {

        filename: function() {
            return this._filename;
        },

        dirname: cachedProperty("dirname", function(){
            return PATH.dirname(this.getFullFileName());
        }),

        getFullFileName: cachedProperty("getFullFileName", function() {
            return PATH.join(SRCDIR, this.filename());
        }),

        getOrigCode: cachedProperty("getOrigCode", function(){
            var code = FS.readFileSync(this.getFullFileName(), "utf8");
            code = code.replace(/\r/g, ""); // <sigh>
            return code;
        }),

        getOrigAST: cachedProperty("getOrigAST", function(){
            return U2_parse(this.getOrigCode(), {
                filename: this.filename()
            });
        }),

        isBundle: cachedProperty("isBundle", function(){
            var ast = this.getAMDFactory().factory;
            return walkAST(ast, function(node){
                if (node instanceof U2.AST_Directive && node.value == "bundle all")
                    this.exit(true);
                if (node !== ast)
                    return true; // don't go inside
            }) || false;
        }),

        getMeta: cachedProperty("getMeta", function(){
            var self = this;
            var meta = walkAST(self.getOrigAST(), function(node){
                if (isMetaNode(node)) {
                    var meta = (1,eval)("(" + node.definitions[0].value.print_to_string() + ")");
                    meta.source = self.filename().replace(/\.js$/i, ".min.js");
                    meta.widgets = extract_widget_info(self.getFullAST());
                    this.exit(meta);
                }
            });
            return meta;
        }),

        // get the direct AMD dependencies, as extracted from the
        // code.  They will be relative to this component and without
        // .js extension.
        getAMDDeps: cachedProperty("getAMDDeps", function(){
            var deps = [];
            function define(d, factory) {
                if (Array.isArray(d)) deps = d;
            }
            define.amd = true;
            try {
                new Function("define", this.getOrigCode())(define);
            } catch(ex) {
                SYS.error("*** Can't determine AMD deps for " + this.filename() + ".  Failed to evaluate.");
                console.log("    [", ex, "]");
            }
            return deps;
        }),

        getAMDFactory: cachedProperty("getAMDFactory", function(){
            return walkAST(this.getOrigAST(), findDefine);
        }),

        _makeAllDeps: function(maxLevel) {
            return loadComponent(this.filename(), this.dirname(), [], maxLevel);
        },

        // returns an array of file names -- *all* files required to
        // load this component, including internal files (for split
        // components).
        getAllFileDeps: cachedProperty("getAllFileDeps", function(){
            return this._makeAllDeps();
        }),

        // returns an array of file names -- only the files that this
        // component is built from, such as editor/main.js etc.
        // Currently we assume these files are files not directly in
        // src/ dir, but in some subdirectory -- hence we get all
        // names and filter out those directly in src/.
        getCompFiles: cachedProperty("getCompFiles", function(){
            return this._makeAllDeps(2).filter(function(f){
                var dir = PATH.dirname(f);
                return dir != "." && dir != "";
            });
        }),

        getDirectCompDeps: cachedProperty("getDirectCompDeps", function(){
            var self = this, a = self._makeAllDeps(2); // level 2 means load upto directly required components.
            return a.filter(function(f){
                comp = getKendoFile(f);
                return comp !== self && !comp.isSubfile();
            });
        }),

        buildOwnSource: cachedProperty("buildOwnSource", function(){
            if (this.isBundle()) return "";
            var my_code = "";
            var ast = this.getAMDFactory().factory;
            if (ast.body.length > 0) {
                my_code = this.getOrigCode();

                var replacements = [];
                replacements.push(
                    { begin : 0,
                      end   : ast.body[0].start.pos,
                      text  : ""
                    },
                    { begin : ast.body[ast.body.length - 1].end.endpos,
                      end   : my_code.length,
                      text  : "" }
                );

                walkAST(ast, function(node){
                    if (isMetaNode(node)) {
                        replacements.push({
                            begin : node.start.pos,
                            end   : node.end.endpos,
                            text  : ""
                        });
                        return true;
                    }
                    if (isReturnKendo(node)) {
                        replacements.push({
                            begin : node.start.pos,
                            end   : node.end.endpos,
                            text  : ""
                        });
                        return true;
                    }
                    if (node instanceof U2.AST_Statement && node !== ast)
                        return true; // don't dive
                });

                my_code = replaceInString(my_code, replacements);
            }
            return my_code;
        }),

        // Generates the complete (readable) source of this component.
        // Merge any subfiles, and remove them from the `define` list,
        // leaving there only other toplevel components.  Drops
        // __meta__ too.  Drops `define` wrapper from the subfiles.
        buildFullSource: cachedProperty("buildFullSource", function(){
            if (this.isBundle()) {
                return bundleFiles(this.getDirectCompDeps(), this.filename()).code;
            } else {
                return wrapAMD(
                    fileNamesToAMDDeps(this.getDirectCompDeps()),
                    this.getFullCode()
                );
            }
        }),

        buildMinAST: cachedProperty("buildMinAST", function(){
            if (this.isBundle()) {
                return bundleFiles_getMinAST(this.getDirectCompDeps());
            } else {
                var ast = cloneAST(this.getFullAST());
                var deps = fileNamesToAMDDeps(this.getDirectCompDeps(), true);
                ast = get_wrapper().wrap(deps, ast);
                return minify(ast);
            }
        }),

        getBuildDeps: cachedProperty("getBuildDeps", function(){
            return loadComponents([ this.filename() ], this.isBundle() ? null : 2);
        }),

        buildMinAST_noAMD: cachedProperty("buildMinAST_noAMD", function(){
            var ast = this.buildMinAST();
            var f = walkAST(ast, findDefine).factory;
            var stats = [];
            walkAST(f, function(node){
                if (node !== f) {
                    if (node instanceof U2.AST_Return) {
                        var p = node.value;
                        while (p instanceof U2.AST_Seq) {
                            stats.push(new U2.AST_SimpleStatement({ body: p.car }));
                            p = p.cdr;
                        }
                        if (p && p.has_side_effects(U2.Compressor({ unsafe: true, pure_getters: true }))) {
                            stats.push(new U2.AST_SimpleStatement({ body: p }));
                        }
                        this.exit();
                    }
                    else if (node instanceof U2.AST_Statement) {
                        stats.push(node);
                        return true;
                    }
                }
            });
            if (stats.length == 0) {
                throw new Error("Can't find main code for " + this.filename());
            }
            return new U2.AST_Toplevel({ body: stats });
        }),

        buildMinSource_noAMD: cachedProperty("buildMinSource_noAMD", function(){
            return this.buildMinAST_noAMD().print_to_string();
        }),

        buildMinSource: cachedProperty("buildMinSource", function(){
            var source_map = this._source_map = U2.SourceMap({
                file: this.filename().replace(/\.js$/i, ".min.js"),
                orig_line_diff: 8,
                dest_line_diff: 8,
                root: "../src/src/"
            });
            return this.buildMinAST().print_to_string({
                source_map: source_map
            });
        }),

        buildMinSourceMap: cachedProperty("buildMinSourceMap", function(){
            this.buildMinSource();
            return this._source_map.toString();
        }),

        _getFullAST: function(withoutDeps){
            var deps = withoutDeps ? [] : this.getCompFiles();
            var ast = this.getAMDFactory().factory;
            ast = cloneAST(ast);
            ast.transform(new U2.TreeTransformer(function(node, descend){
                if (node === ast) {
                    descend(node, this);
                    deps.forEach(function(f){
                        var comp = getKendoFile(f);
                        var f = comp.getAMDFactory().factory;
                        f.body.forEach(function(stat){
                            if (!isReturnKendo(stat))
                                node.body.push(stat);
                        });
                    });
                    return node;
                }
                if (isMetaNode(node))
                    return U2.MAP.skip;
                if (isReturnKendo(node))
                    return U2.MAP.skip;
                if (node instanceof U2.AST_Statement)
                    return node;
            }));
            return ast;
        },

        getFullAST: cachedProperty("getFullAST", function(){
            return this._getFullAST(false);
        }),

        getFullAST_noDeps: cachedProperty("getFullAST_noDeps", function(){
            return this._getFullAST(true);
        }),

        getFullCode: cachedProperty("getFullCode", function() {
            if (this.isSubfile()) {
                throw new Error("getFullCode doesn't make sense for subfiles: " + this.filename());
            }

            var files = this.getCompFiles().map(function(f){
                var comp = getKendoFile(f);
                return comp.getMainCode();
            });
            files.push(this.buildOwnSource());

            return files.join("\n\n").trim();
        }),

        getMainCode: cachedProperty("getMainCode", function(){
            return this.buildOwnSource();
        }),

        // return true if this is a "subfile", i.e. editor/main.js
        isSubfile: function() {
            var dir = PATH.dirname(this.filename());
            return !(dir == "." || dir == "");
        }
    };

    function isReturnKendo(node) {
        return node instanceof U2.AST_Return
            && (/^return (window\.)?kendo/.test(node.print_to_string()));
    }

    function unwrapFunction(code) {
        return code.replace(/^[^\{]*?{|}[^\}]*?$/g, "").trim();
    }

    var FILES = {};
    function getKendoFile(filename) {
        return FILES[filename] || (
            FILES[filename] = new KendoFile(filename)
        );
    }

    return getKendoFile;
})();

function U2_parse(code, options) {
    // if (options) {
    //     SYS.error("--- parsing " + options.filename);
    // }
    try {
        code = code.replace(/\r/g, ""); // <sigh>
        return U2.parse(code, options);
    } catch(ex) {
        if (ex instanceof U2.JS_Parse_Error) {
            console.log(options.filename);
            console.log(ex);
        }
    }
}

var get_wrapper = (function(wrapper){
    return function() {
        if (wrapper) return wrapper;
        wrapper = U2_parse(AMD_WRAPPER);
        wrapper.wrap = function(deps, cont) {
            return wrapper.transform(new U2.TreeTransformer(
                null,           // need no 'before'
                function after(node){
                    if (node instanceof U2.AST_SymbolRef && node.name == "$DEPS") {
                        return new U2.AST_Array({
                            elements: deps.map(function(x){
                                return new U2.AST_String({ value: x });
                            })
                        });
                    }
                    if (node instanceof U2.AST_SimpleStatement
                        && node.body instanceof U2.AST_SymbolRef
                        && node.body.name == "$CODE") {
                        return U2.MAP.splice(cont.body);
                    }
                }
            ));
        };
        return wrapper;
    };
})();

function wrapAMD(deps, code) {
    var v = {
        CODE: code,
        DEPS: beautify(deps),
    };
    return AMD_WRAPPER.replace(/\$(CODE|DEPS)/g, function(s, p){
        return v[p];
    });
};

function isMetaNode(node) {
    return node instanceof U2.AST_Var
        && node.definitions.length == 1
        && node.definitions[0].name.name == "__meta__";
};

function fileNamesToAMDDeps(files, min) {
    return files.map(function(filename){
        filename = filename.replace(/^(\.\/)?/, "./"); // make sure it starts with ./
        filename = filename.replace(/\.js$/i, "");     // drop the extension
        if (min) filename += ".min";                   // minified?
        return filename;
    });
};

function replaceInString(str, replacements) {
    replacements = U2.mergeSort(replacements, function(a, b){
        return a.begin - b.begin;
    });
    for (var i = replacements.length; --i >= 0;) {
        var r = replacements[i];
        str = str.substr(0, r.begin) + r.text + str.substr(r.end);
    }
    return str;
};

function cachedProperty(name, fetcher) {
    name = "___" + name;
    return function() {
        var self = this;
        if (self[name] != null)
            return self[name];
        return self[name] = fetcher.apply(self, arguments);
    };
}

function cloneAST(ast) {
    var labels = [];
    var tw = new U2.TreeTransformer(function(node, descend) {
        if (node instanceof U2.AST_Label) {
            return node;
        }
        var clone = node.clone();
        if (node instanceof U2.AST_LabeledStatement) {
            clone.label = node.label.clone();
            clone.label.references = node.label.references;
            labels.push(clone.label);
            descend(clone, this);
            labels.pop();
            return clone;
        }
        if ((node instanceof U2.AST_Break ||
             node instanceof U2.AST_Continue) && node.label) {
            clone.label = clone.label.clone();
            for (var i = labels.length; --i >= 0;) {
                var target = labels[i];
                if (target.name == clone.label.name) {
                    clone.label.thedef = target;
                    target.references.forEach(function(ref, i){
                        if (ref === node) {
                            target.references[i] = clone;
                        }
                    });
                }
            }
            return clone;
        }
        descend(clone, this);
        return clone;
    });
    return ast.transform(tw);
}

function walkAST(ast, walker) {
    var returnValue, exit = {
        exit: function(ret) {
            returnValue = ret;
            throw exit;
        }
    };
    try {
        ast.walk(new U2.TreeWalker(function(node, descend){
            return walker.call(exit, node, descend);
        }));
    } catch(ex) {
        if (ex === exit) return returnValue;
        throw ex;
    }
}

function findDefine(node) {
    // (function(f, define){ define([ deps... ], f) })(FACTORY);
    if (node instanceof U2.AST_Call
        && node.args[0] instanceof U2.AST_Function
        && node.expression instanceof U2.AST_Function
        && node.expression.argnames.length == 2
        && node.expression.argnames[1].name == "define"
        && node.expression.body[0] instanceof U2.AST_SimpleStatement
        && node.expression.body[0].body instanceof U2.AST_Call
        && node.expression.body[0].body.expression instanceof U2.AST_SymbolRef
        && node.expression.body[0].body.expression.name == "define"
        && node.expression.body[0].body.args[1] instanceof U2.AST_SymbolRef
        && node.expression.body[0].body.args[1].name == node.expression.argnames[0].name)
    {
        this.exit({
            factory  : node.args[0],
            requires : node.expression.body[0].body.args[0],
        });
    }

    // define([ deps... ], FACTORY)
    if (node instanceof U2.AST_Call
        && node.expression instanceof U2.AST_SymbolRef
        && node.expression.name == "define"
        && node.args.length == 2
        && node.args[0] instanceof U2.AST_Array
        && node.args[1] instanceof U2.AST_Function)
    {
        this.exit({
            factory  : node.args[1],
            requires : node.args[0],
        });
    }

    // define(FACTORY)
    if (node instanceof U2.AST_Call
        && node.expression instanceof U2.AST_SymbolRef
        && node.expression.name == "define"
        && node.args.length == 1
        && node.args[0] instanceof U2.AST_Function)
    {
        this.exit({
            factory : node.args[0],
        });
    }
}

function contains(a, x) {
    return a.indexOf(x) >= 0;
}

function pushUniq(a, x) {
    if (!contains(a, x))
        a.push(x);
}

function removeDuplicates(a) {
    var ret = [];
    for (var i = 0; i < a.length; ++i)
        pushUniq(ret, a[i]);
    return ret;
}

function beautify(obj) {
    return U2_parse("(" + JSON.stringify(obj) + ")").body[0].body.print_to_string({
        beautify: true, indent_level: 4
    });
}

function minify(code, filename) {
    var ast;
    if (code instanceof U2.AST_Node) {
        ast = code;
    } else {
        ast = U2_parse(code, { filename: filename });
    }
    var compressor = U2.Compressor({
        unsafe       : true,
        hoist_vars   : true,
        warnings     : false,
        pure_getters : true,
    });
    ast.figure_out_scope();
    ast = ast.transform(compressor);
    ast.figure_out_scope();
    ast.compute_char_frequency();
    ast.mangle_names({
        except: [ "define" ]
    });
    return ast;
}

function loadComponent(filename, basedir, files, maxLevel) {
    var loading = [];
    function load(filename, basedir, level) {
        if (maxLevel != null && level == maxLevel)
            return;
        // normalize the filename relative to the kendo src directory
        filename = filename.replace(/(\.js)?$/, ".js");
        filename = PATH.resolve(basedir, filename);
        filename = PATH.relative(SRCDIR, filename);
        if (!contains(loading, filename) && !contains(files, filename)) {
            loading.push(filename);
            var comp = getKendoFile(filename);
            comp.getAMDDeps().forEach(function(f){
                // level is increased only if we don't load a subfile.
                // otherwise we assume we're on the same level as the current component.
                load(f, comp.dirname(), level + (comp.isSubfile() ? 0 : 1));
            });
            files.push(filename);
        }
    }
    load(filename, basedir, 0);
    return files;
}

function listKendoFiles() {
    var js_files = FS.readdirSync(SRCDIR)
        .filter(function(filename){
            return /^kendo\..*\.js$/i.test(filename) && !/\.min\.js$/i.test(filename);
        })
        .filter(function(filename){
            var code = FS.readFileSync(PATH.join(SRCDIR, filename), "utf8");
            var has_define = ( /define[\s\n\t]*\(/.test(code) );
            if (!has_define) {
                SYS.error("*** Skipping file " + filename + " (no RequireJS wrapper)");
            }
            return has_define; // XXX: this sucks but it'll do until we cleanup
        })
        .sort();
    return js_files;
}

function extract_widget_info(ast) {
    ast = new U2.AST_Toplevel(ast);
    ast.figure_out_scope();
    var widgets = [];
    var scope = null;

    // Quick-n-dirty heuristic that should cover the use cases in Kendo.
    function dumb_eval(node) {
        if (node instanceof U2.AST_Constant) {
            return node.getValue();
        }
        if (node instanceof U2.AST_SymbolRef) {
            var init = node.definition().init;
            if (init) {
                return dumb_eval(init);
            }
            return node.name;
        }
        if (node instanceof U2.AST_Dot) {
            return dumb_eval(node.expression) + "." + node.property;
        }
        if (node instanceof U2.AST_Call && is_widget(node)) {
            return "kendo.ui.Widget.extend";
        }
        return null;        // dunno how to handle
    }

    // determine if node points to [window.]kendo.ui.SOMETHING
    function is_widget(node) {
        if (node instanceof U2.AST_Call &&
            node.expression instanceof U2.AST_Dot &&
            node.expression.property == "extend") {
            var x = dumb_eval(node.expression);
            if (!x) return false;
            return /^(window\.)?(kendo|kendo\.dataviz|kendo\.mobile)\.ui\..+?\.extend/.test(x);
        }
    }

    var tw = new U2.TreeWalker(function(node, descend){
        if (node instanceof U2.AST_Scope) {
            var save_scope = scope;
            scope = node;
            descend();
            scope = save_scope;
            return true;
        }
        if (is_widget(node)) {
            var def = node.args[0];
            var options = def.properties.filter(function(prop){
                return prop.key == "options";
            })[0];
            var events = def.properties.filter(function(prop){
                return prop.key == "events";
            })[0];
            if (events && events.value instanceof U2.AST_Array) {
                events = events.value.elements.map(function(el){
                    return dumb_eval(el);
                });
            }
            if (options) {
                var name = options.value.properties.filter(function(prop){
                    return prop.key == "name";
                })[0];
                if (name && name.value) {
                    name = name.value.value;
                    widgets.push({
                        name     : name,
                        options  : options.value.properties.map(function(prop){ return prop.key }),
                        events   : events,
                        inherits : node.expression.expression.print_to_string({ beautify: true }),
                        file     : node.start.file,
                        line     : node.start.line,
                        col      : node.start.col
                    });
                }
            }
        }
    });
    ast.walk(tw);
    return widgets;
}

function buildKendoConfig() {
    var files = listKendoFiles();
    var template = JSON.parse(FS.readFileSync(PATH.join(__dirname, "..", "download-builder", "config", "categories.json"), "utf8"));
    template.components = [];
    files.forEach(function(f){
        var comp = getKendoFile(f);
        var meta = comp.getMeta();
        if (!meta) {
            SYS.error("*** No __meta__ declaration in " + f);
            //throw new Error("No __meta__ declaration in " + f);
        } else {
            template.components.push(meta);
        }
    });
    return template;
}

function loadComponents(files, maxLevel) {
    var loads = [];
    files.forEach(function(f){
        loadComponent(f, SRCDIR, loads, maxLevel);
    });
    return loads;
}

function bundleFiles_getMinAST(files) {
    var code = [];
    loadComponents(files).forEach(function(f){
        var comp = getKendoFile(f);
        var ast = comp.getFullAST_noDeps();
        code.push.apply(code, ast.body);
    });
    var min = minify(new U2.AST_Toplevel({ body: code }));
    return get_wrapper().wrap([], min);
}

// makes a bundle loading files and any dependencies in the right order
// adds the AMD wrapper, but depend on nothing since we bundle everything needed.
function bundleFiles(files, filename, min) {
    if (min) {
        var ast = bundleFiles_getMinAST(files);
        var map = U2.SourceMap({
            file: filename,
            orig_line_diff: 8,
            dest_line_diff: 8,
            root: "../src/src/"
        });
        code = ast.print_to_string({ source_map: map });
        return {
            code : code,
            map  : map.toString(),
        };
    }
    else {
        var code = loadComponents(files).map(function(f){
            return getKendoFile(f).buildOwnSource();
        }).join("\n\n");
        return {
            code: wrapAMD([], code)
        };
    }
}

function loadAll() {
    return loadComponents(listKendoFiles());
}

/* -----[ exports ]----- */

exports.getKendoFile = getKendoFile;
exports.listKendoFiles = listKendoFiles;
exports.buildKendoConfig = buildKendoConfig;
exports.loadComponents = loadComponents;
exports.loadAll = loadAll;
exports.bundleFiles = bundleFiles;
exports.wrapAMD = wrapAMD;
exports.minify = minify;

/* -----[ CLI interface ]----- */

if (require.main === module) (function(){
    // invoked as CLI
    var OPT = require("optimist");
    var ARGV = OPT
        .describe("all-deps", "Show a list of all files required to load component(s)")
        .describe("direct-deps", "Show direct dependencies of component(s))")
        .describe("subfiles", "Show files that a component is made of")
        .describe("bundle-all", "Generate kendo.all.js on stdout")
        .describe("build", "Build a given component")
        .describe("full", "Full build")
        .describe("min", "Minified build")
        .describe("kendo-config", "Generate kendo-config.json")
        .boolean("all-deps")
        .boolean("direct-deps")
        .boolean("bundle-all")
        .boolean("min")
        .string("subfiles")
        .string("build")
        .wrap(80)
        .argv;

    if (ARGV["kendo-config"]) {
        var cf = buildKendoConfig();
        SYS.puts(JSON.stringify(cf, null, 2));
        return;
    }

    var REST = ARGV._.slice();

    var files;

    if (ARGV["subfiles"]) {
        files = getKendoFile(ARGV["subfiles"]).getCompFiles();
        SYS.puts(beautify(files));
        return;
    }

    if (ARGV["build"]) {
        var comp = getKendoFile(ARGV["build"]);
        if (ARGV["min"]) {
            SYS.puts(comp.buildMinSource());
        } else {
            SYS.puts(comp.buildFullSource());
        }
        return;
    }

    if (ARGV["all-deps"]) {
        files = loadComponents(REST);
    }

    if (ARGV["direct-deps"]) {
        files = loadComponents(REST, 2);
    }

    if (ARGV["bundle-all"]) {
        files = loadAll();
    }

    if (ARGV["full"] || ARGV["min"]) {
        var code = loadComponents(files).map(function(f){
            var comp = getKendoFile(f);
            SYS.error("Adding " + comp.filename());
            if (comp.isSubfile()) {
                return "";
            } else {
                return comp.getFullCode() + "\n";
            }
        }).join("");
        code = wrapAMD([], code);
        if (ARGV["min"]) {
            code = minify(code).print_to_string();
        }
        SYS.puts(code);
        return;
    }

    SYS.puts(beautify(files));

})();
