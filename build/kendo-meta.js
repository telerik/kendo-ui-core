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
}, typeof define == 'function' && define.amd ? define : function(_, f){ f() });";

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
            code = code.replace(/\r\n/g, "\n"); // <sigh>
            return code;
        }),

        getOrigAST: cachedProperty("getOrigAST", function(){
            //SYS.error("Parsing: " + this.filename());
            return U2.parse(this.getOrigCode(), {
                filename: this.filename()
            });
        }),

        getMeta: cachedProperty("getMeta", function(){
            var self = this;
            var meta = walkAST(self.getOrigAST(), function(node){
                if (isMetaNode(node)) {
                    self._meta_startpos = node.start.pos;
                    self._meta_endpos = node.end.endpos;
                    self._meta_node = node;
                    var meta = (1,eval)("(" + node.definitions[0].value.print_to_string() + ")");
                    meta.source = self.filename().replace(/\.js$/i, ".min.js");
                    meta.widgets = extract_widget_info(self.buildFullAST());
                    this.exit(meta);
                }
            });
            return meta;
        }),

        getMetaStartPos: function() {
            this.getMeta();
            return this._meta_startpos;
        },

        getMetaEndPos: function() {
            this.getMeta();
            return this._meta_endpos;
        },

        // // returns as UglifyJS AST the function that's being passed to `define`.
        // // populates internal properties _main_closure_node and _amd_deps_node.
        // getFactoryAST: cachedProperty("getFactoryAST", function(){
        //     var self = this;
        //     return walkAST(this.getOrigAST(), function(node){
        //         if (node instanceof U2.AST_SimpleStatement) {
        //             node = node.body;
        //             if (node instanceof U2.AST_Call &&
        //                 node.expression instanceof U2.AST_Function &&
        //                 node.expression.argnames.length == 2 &&
        //                 node.expression.argnames[1].name == "define") {
        //                 var comp_closure = node.args[0];
        //                 this.exit(walkAST(node.expression, function(node){
        //                     if (node instanceof U2.AST_SimpleStatement &&
        //                         node.body instanceof U2.AST_Call &&
        //                         node.body.expression instanceof U2.AST_SymbolRef &&
        //                         node.body.expression.name == "define")
        //                     {
        //                         var comp_files = node.body.args[0];
        //                         self._main_closure_node = comp_closure;
        //                         self._amd_deps_node = comp_files;
        //                         this.exit(comp_closure);
        //                     }
        //                 }));
        //             }
        //         }
        //     });
        // }),

        // get the direct AMD dependencies, as extracted from the
        // code.  They will be relative to this component and without
        // .js extension.
        getAMDDeps: cachedProperty("getAMDDeps", function(){
            var self = this;
            function define(deps, factory) {
                self._amd_deps = deps;
                self._amd_factory = factory.toString();
            }
            define.amd = true;
            new Function("define", this.getOrigCode())(define);
            return self._amd_deps;
        }),

        getAMDFactory: cachedProperty("getAMDFactory", function(){
            this.getAMDDeps();
            return this._amd_factory;
        }),

        _getAllFileDeps: function(maxLevel) {
            var files = [], loading = [];
            function load(filename, basedir, level) {
                if (maxLevel != null && level == maxLevel)
                    return;
                // normalize the filename relative to the kendo src directory
                filename = filename.replace(/(\.js)?$/, ".js");
                filename = PATH.resolve(basedir, filename);
                filename = PATH.relative(SRCDIR, filename);
                if (!contains(loading, filename)) {
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
            load(this.filename(), this.dirname(), 0);
            return files;
        },

        // returns an array of file names -- *all* files required to
        // load this component, including internal files (for split
        // components).
        getAllFileDeps: cachedProperty("getAllDeps", function(){
            return this._getAllFileDeps();
        }),

        // returns an array of file names -- only the files that this
        // component is built from, such as editor/main.js etc.
        // Currently we assume these files are files not directly in
        // src/ dir, but in some subdirectory -- hence we get all
        // names and filter out those directly in src/.
        getCompFiles: cachedProperty("getCompFiles", function(){
            return this.getAllFileDeps().filter(function(f){
                var dir = PATH.dirname(f);
                return dir != "." && dir != "";
            });
        }),

        getDirectCompDeps: cachedProperty("getDirectCompDeps", function(){
            var self = this, a = self._getAllFileDeps(2); // level 2 means load upto directly required components.
            return a.filter(function(f){
                comp = getKendoFile(f);
                return comp !== self && !comp.isSubfile();
            });
        }),

        // getDirectCompDeps: cachedProperty("getDirectCompDeps", function(){
        //     var meta = this.getMeta();
        //     var deps = meta.depends.slice();
        //     if (meta.features) meta.features.forEach(function(f){
        //         if (f.depends) f.depends.forEach(function(d){
        //             pushUniq(deps, d);
        //         });
        //     });
        //     return deps;
        // }),

        // Generates the complete (readable) source of this component.
        // Merge any subfiles, and remove them from the `define` list,
        // leaving there only other toplevel components.  Drops
        // __meta__ too.  Drops `define` wrapper from the subfiles.
        buildFullSource: cachedProperty("buildFullSource", function(){
            return wrapAMD(
                fileNamesToAMDDeps(this.getDirectCompDeps()),
                this._getFullCode()
            );
        }),

        buildFullAST: cachedProperty("buildFullAST", function(){
            return U2.parse(this.buildFullSource(), {
                filename: this.filename()
            });
        }),

        buildMinAST: cachedProperty("buildMinAST", function(){
            var code = wrapAMD(
                fileNamesToAMDDeps(this.getDirectCompDeps(), true),
                this._getFullCode()
            );
            var ast = U2.parse(code, {
                filename: this.filename()
            });
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
        }),

        buildMinSource: cachedProperty("buildMinSource", function(){
            var source_map = this._source_map = U2.SourceMap({
                file: this.filename().replace(/\.js$/i, ".min.js"),
                //root: "../src/js" // XXX: what's the source map root?
            });
            return this.buildMinAST().print_to_string({
                source_map: source_map
            });
        }),

        buildMinSourceMap: cachedProperty("buildMinSourceMap", function(){
            this.buildMinSource();
            return this._source_map.toString();
        }),

        _getFullCode: function() {
            var self = this;
            if (self.isSubfile()) {
                throw new Error("buildFullSource doesn't make sense for subfiles: " + self.filename());
            }
            var my_code = this.getAMDFactory();
            var ast = U2.parse(my_code, { expression: true });
            var replacements = [];
            walkAST(ast, function(node){
                if (isMetaNode(node)) {
                    replacements.push({
                        begin : node.start.pos,
                        end   : node.end.endpos,
                        text  : ""
                    });
                    return true;
                }
                if (node instanceof U2.AST_Return &&
                    (/^return (window\.)?kendo/.test(node.print_to_string()))) {
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

            my_code = replaceInString(my_code, replacements).replace(/^[^\{]*?{|}[^\}]*?$/g, "").trim();

            var files = this.getCompFiles().map(function(f){
                var comp = getKendoFile(f);
                return comp.getMainCode();
            });
            files.push(my_code);

            return files.join("\n\n").trim();
        },

        getMainCode: cachedProperty("getMainCode", function(){
            return this.getAMDFactory().replace(/^[^\{]*?{|}[^\}]*?$/g, "").trim();
        }),

        // return true if this is a "subfile", i.e. editor/main.js
        isSubfile: function() {
            var dir = PATH.dirname(this.filename());
            return !(dir == "." || dir == "");
        }
    };

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
        name = "_" + name;
        return function() {
            var self = this;
            if (self[name] != null)
                return self[name];
            return self[name] = fetcher.apply(self, arguments);
        };
    }

    function cloneAST(ast) {
        return ast.transform(new U2.TreeTransformer(null, function(){}));
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

    function contains(a, x) {
        return a.indexOf(x) >= 0;
    }

    function pushUniq(a, x) {
        if (!contains(a, x))
            a.push(x);
    }

    function beautify(obj) {
        return U2.parse("(" + JSON.stringify(obj) + ")").body[0].body.print_to_string({
            beautify: true, indent_level: 4
        });
    }

    var FILES = {};
    function getKendoFile(filename) {
        return FILES[filename] || (
            FILES[filename] = new KendoFile(filename)
        );
    }

    return getKendoFile;
})();

function listKendoFiles() {
    var js_files = FS.readdirSync(SRCDIR)
        .filter(function(filename){
            return /^kendo\..*\.js$/i.test(filename) && !/\.min\.js$/i.test(filename);
        })
        .filter(function(filename){
            return !/^kendo\.(web|dataviz|mobile|all|winjs)\.js$/.test(filename);
        })
        .sort();
    return js_files;
}

function extract_widget_info(ast) {
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
            SYS.error("No __meta__ declaration in " + f);
            //throw new Error("No __meta__ declaration in " + f);
        } else {
            template.components.push(meta);
        }
    });
    return template;
}

exports.getKendoFile = getKendoFile;
exports.listKendoFiles = listKendoFiles;
exports.buildKendoConfig = buildKendoConfig;
