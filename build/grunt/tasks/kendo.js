var FS = require("fs");
var PATH = require("path");
var META = require("../../kendo-meta.js");

function outdated(source, dest) {
    if (Array.isArray(source)) {
        for (var i = 0; i < source.length; ++i) {
            if (outdated(source[i], dest))
                return true;
        }
        return false;
    }
    try {
        var sstat = FS.statSync(source);
        var dstat = FS.statSync(dest);
        return sstat.mtime.getTime() > dstat.mtime.getTime();
    } catch(ex) {
        return true;
    }
}

module.exports = function(grunt) {

    function makeSources(task) {
        task.files.forEach(function(f){
            var destDir = f.dest;
            var ext = f.ext;
            f.src.forEach(function(f){
                var basename = PATH.basename(f, PATH.extname(f));
                var dest = PATH.join(destDir, basename + ext);
                if (outdated(f, dest)) {
                    var comp = META.getKendoFile(f.replace(/^src\//, "")), code;
                    if (task.target == "min") {
                        code = comp.buildMinSource();
                    } else if (task.target == "full") {
                        code = comp.buildFullSource();
                    }
                    grunt.log.writeln("Writing " + dest);
                    grunt.file.write(dest, code);
                }
            });
        });
    }

    function makeBundle(task) {
        var bundle = "kendo." + task.target + ".js";
        var bundleMin = bundle.replace(/\.js$/, ".min.js");
        var dest = PATH.join("tmp", bundle);
        var destMin = PATH.join("tmp", bundleMin);
        var components = META.listKendoFiles(task.target);
        var files = components.map(function(f){ return PATH.join("src", f) });

        if (outdated(files, dest)) {
            grunt.log.writeln("Making bundle " + dest);
            var data = META.bundleFiles(components, bundle);
            grunt.file.write(dest, data.code);
        }

        if (outdated(files, destMin)) {
            grunt.log.writeln("Making bundle " + destMin);
            var data = META.bundleFiles(components, bundleMin, true);
            grunt.file.write(destMin, data.code);
        }
    }

    function makeKendoConfig(task) {
        var files = getSrc(task);
        var dest = task.files[0].dest;
        if (outdated(files, dest)) {
            grunt.log.writeln("Building kendo-config.json");
            var data = META.buildKendoConfig();
            grunt.file.write(dest, data);
        }
    }

    function makeCultures(task) {
        var destDir = task.files[0].dest;
        var files = getSrc(task);
        files.forEach(function(f){
            var basename = PATH.basename(f);
            var dest = PATH.join(destDir, basename);
            var destMin = dest.replace(/\.js$/, ".min.js");
            if (outdated(f, dest)) {
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

    function getSrc(task) {
        return task.files.reduce(function(a, f){
            f.src.forEach(function(f){
                a.push(f);
            });
            return a;
        }, []);
    }

    grunt.registerMultiTask("kendo", "Kendo UI build task", function(){
        var task = this;
        switch (task.target) {
          case "min":
          case "full":
            makeSources(task);
            break;

          case "web":
          case "mobile":
          case "win":
          case "icenium":
          case "dataviz":
          case "all":
            makeBundle(task);
            break;

          case "config":
            makeKendoConfig(task);
            break;

          case "cultures":
            makeCultures(task);
            break;
        }
    });

};
