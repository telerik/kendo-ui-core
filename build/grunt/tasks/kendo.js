var FS = require("fs");
var PATH = require("path");
var META = require("../../kendo-meta.js");
var UTILS = require("./utils.js");

module.exports = function(grunt) {

    function makeSources(task) {
        task.files.forEach(function(f){
            var destDir = f.dest;
            var ext = f.ext;
            f.src.forEach(function(f){
                var basename = PATH.basename(f, PATH.extname(f));
                var dest = PATH.join(destDir, basename + ext);
                var comp = META.getKendoFile(f.replace(/^src\//, "")), code;
                var srcFiles = comp.getBuildDeps().map(function(f){
                    return "src/" + f;
                });
                if (UTILS.outdated(srcFiles, dest)) {
                    grunt.log.writeln("Making " + dest);
                    if (task.target == "min") {
                        code = comp.buildMinSource();
                        var map = comp.buildMinSourceMap();
                        grunt.file.write(dest + ".map", map);
                    } else if (task.target == "full") {
                        code = comp.buildFullSource();
                    }
                    grunt.file.write(dest, code);
                }
            });
        });
    }

    function makeBundle(task, bundle, components, force) {
        bundle = "kendo." + bundle + ".js";
        var bundleMin = bundle.replace(/\.js$/, ".min.js");
        var dest = PATH.join(task.options().destDir, bundle);
        var destMin = PATH.join(task.options().destDir, bundleMin);
        var files = components.map(function(f){ return PATH.join("src", f) });

        if (grunt.option("show")) {
            META.loadComponents(components).forEach(function(f){
                var comp = META.getKendoFile(f);
                if (!comp.isSubfile()) {
                    console.log(comp.filename());
                }
            });
            return;
        }

        if (force || UTILS.outdated(files, dest)) {
            grunt.log.writeln("Making bundle " + dest);
            var data = META.bundleFiles(components, bundle);
            grunt.file.write(dest, data.code);
        }

        if (force || UTILS.outdated(files, destMin)) {
            grunt.log.writeln("Making bundle " + destMin);
            var data = META.bundleFiles(components, bundleMin, true);
            grunt.file.write(destMin, data.code);
            grunt.file.write(destMin + ".map", data.map);
        }
    }

    function makeCultures(task) {
        var destDir = task.files[0].dest;
        var files = UTILS.getSrc(task);
        files.forEach(function(f){
            var basename = PATH.basename(f);
            var dest = PATH.join(destDir, basename);
            var destMin = dest.replace(/\.js$/, ".min.js");
            if (UTILS.outdated(f, dest)) {
                var code = grunt.file.read(f, { encoding: "utf8" });

                // cultures depend on kendo.core but we can't declare that in the AMD wrapper because people would
                // frequently load cultures along with kendo.all.js which already includes kendo.core.  Therefore we
                // initialize window.kendo here if it's not present.
                code = code.replace(/^(\s*)kendo\.cultures\[.*?\]\s*=/m, function(s, indent){
                    return indent + "var kendo = window.kendo || (window.kendo = { cultures: {} });\n" + s;
                });

                code = META.wrapAMD([], code);
                grunt.log.writeln("Writing " + dest);
                grunt.file.write(dest, code);

                var ast = META.minify(code);
                code = ast.print_to_string();
                grunt.log.writeln("Writing " + destMin);
                grunt.file.write(destMin, code);
            }
        });
    }

    function makeMessages(task) {
        var destDir = task.files[0].dest;
        var files = UTILS.getSrc(task);
        files.forEach(function(f){
            var basename = PATH.basename(f);
            var dest = PATH.join(destDir, basename);
            var destMin = dest.replace(/\.js$/, ".min.js");
            if (UTILS.outdated(f, dest)) {
                var code = grunt.file.read(f, { encoding: "utf8" });

                code = META.wrapAMD([], code);
                grunt.log.writeln("Writing " + dest);
                grunt.file.write(dest, code);

                var ast = META.minify(code);
                code = ast.print_to_string();
                grunt.log.writeln("Writing " + destMin);
                grunt.file.write(destMin, code);
            }
        });
    }

    grunt.registerMultiTask("kendo", "Kendo UI build task", function(){
        var task = this;
        switch (task.target) {
          case "min":
          case "full":
            makeSources(task);
            break;
          case "cultures":
            makeCultures(task);
            break;
          case "messages":
            makeMessages(task);
            break;
        }
    });

    grunt.registerTask("custom", "Custom Kendo build", function(){
        var task = this;
        var files;
        if (task.args.length === 0) {
            grunt.log.writeln("No components specified for the custom task; assuming all components...");
            files = META.loadAll().map(function (c){
                return c.split("kendo.")[1].split(".js")[0];
            });
        }
        else {
            files = task.args[0].trim().split(/\s*,\s*/);
        }
        files = files.map(function(c){
            var name = "kendo." + c + ".js";
            var comp = META.getKendoFile(name);
            try {
                comp.getOrigCode();
            } catch(ex) {
                throw new Error("Can't find Kendo file: " + name);
            }
            return name;
        });
        makeBundle(task, "custom", files, true);
    });
};
