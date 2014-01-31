var PATH = require("path");
var LESS = require("../../less-js");
var CSSMIN = require("cssmin").cssmin;

module.exports = function(grunt) {
    grunt.registerMultiTask("less", "Build CSS styles", function(){
        var task = this;
        var destDir = task.options().destDir;
        task.files.forEach(function(f){
            f.src.forEach(function(f){
                var base = PATH.dirname(f);
                var p = new LESS.Parser({
                    paths    : [ base ],
                    filename : PATH.basename(f),
                    syncImport: true
                });
                grunt.log.writeln("Compiling stylesheet: " + f);
                p.parse(grunt.file.read(f), function(err, tree){
                    try {
                        var css = tree.toCSS();
                        grunt.file.write(PATH.join(destDir, f.replace(/\.less$/, ".css")), css);
                        var cssmin = CSSMIN(css);
                        grunt.file.write(PATH.join(destDir, f.replace(/\.less$/, ".min.css")), cssmin);
                    } catch(ex) {
                        grunt.log.error("Can't LESS-compile " + f);
                        console.log(ex);
                    }
                });
            });
        });
    });
}
