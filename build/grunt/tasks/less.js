var PATH = require("path");
var LESS = require("less");
var CSSMIN = require("cssmin").cssmin;
var postcss = require("postcss");

module.exports = function(grunt) {
    grunt.registerMultiTask("less", "Build CSS styles", function(){
        var task = this;
        var options = task.options();
        var destDir = options.destDir;
        var autoprefixer = require("autoprefixer-core")(options.autoprefixer);

        task.files.forEach(function(f){
            f.src.forEach(function(f){
                var base = PATH.dirname(f);
                var p = new LESS.Parser({
                    paths    : [ base ],
                    filename : PATH.basename(f),
                    syncImport: true
                });
                grunt.log.writeln("Compiling LESS file: " + f);
                p.parse(grunt.file.read(f), function(err, tree){
                    try {
                        var css = tree.toCSS();
                        var cssFile = f.replace(/\.less$/, ".css");
                        grunt.log.writeln("Autoprefixing CSS file: " + cssFile);
                        postcss([ autoprefixer ]).process(css).then(function (result) {
                            result.warnings().forEach(function (warn) {
                                console.warn(warn.toString() + " " + f);
                            });
                            grunt.file.write(PATH.join(destDir, cssFile), result.css);
                            var cssmin = CSSMIN(result.css);
                            grunt.file.write(PATH.join(destDir, f.replace(/\.less$/, ".min.css")), cssmin);
                        });
                    } catch(ex) {
                        grunt.log.error("Can't process LESS file " + f);
                        console.log(ex);
                    }
                });
            });
        });
    });
}
