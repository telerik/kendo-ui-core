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
                    if (comp.isBundle()) return;
                    grunt.log.writeln("Making " + dest);
                    code = comp.buildMinSource_noAMD();
                    grunt.file.write(dest, code);
                }
            });
        });
    }

    function makeKendoConfig(task) {
        var files = UTILS.getSrc(task);
        var dest = task.files[0].dest;
        if (UTILS.outdated(files, dest)) {
            grunt.log.writeln("Building kendo-config.json");
            var data = META.buildKendoConfig();
            grunt.file.write(dest, JSON.stringify(data, null, 2));
        }
    }

    grunt.registerMultiTask("download_builder", "Generate JS files for download_builder", function(){
        var task = this;
        switch (task.target) {
          case "min":
            makeSources(task);
            break;

          case "config":
            makeKendoConfig(task);
            break;
        }
    });
};
