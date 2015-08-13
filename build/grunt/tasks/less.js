var PATH = require("path");
var LESS = require("less");
var CSSMIN = require("cssmin").cssmin;
var postcss = require("postcss");

module.exports = function(grunt) {
    grunt.registerMultiTask("less", "Build CSS styles", function(){
        var done = this.async();

        var task = this;
        var options = task.options();
        var destDir = options.destDir;
        var autoprefixer = require("autoprefixer-core")(options.autoprefixer);
        var fileCount = 0;

        task.files.forEach(function(f){

            fileCount = f.src.length;

            f.src.forEach(function(f){
                var base = PATH.dirname(f);
                var p = new LESS.Parser({
                    paths    : [ base ],
                    filename : PATH.basename(f),
                    syncImport: true
                });
                grunt.log.writeln(f + " - compiling LESS...");
                p.parse(grunt.file.read(f), function(err, tree){
                    try {
                        var css = tree.toCSS();
                        var cssFile = f.replace(/\.less$/, ".css");
                        grunt.log.writeln(cssFile + " - autoprefixing CSS...");
                        postcss([ autoprefixer ]).process(css).then(function (result) {
                            result.warnings().forEach(function (warn) {
                                console.warn(warn.toString() + " " + f);
                            });
                            var cssFileInDir = PATH.join(destDir, cssFile);
                            grunt.log.writeln(cssFileInDir + " - saving CSS file...");
                            grunt.file.write(cssFileInDir, result.css);
                            var cssmin = CSSMIN(result.css);
                            var cssMinFileInDir = PATH.join(destDir, f.replace(/\.less$/, ".min.css"));
                            grunt.log.writeln(cssMinFileInDir + " - saving minified CSS file...");
                            grunt.file.write(cssMinFileInDir, cssmin);

                            if (--fileCount === 0) {
                                done(true);
                            }
                        });
                    } catch(ex) {
                        grunt.log.error("Can't process LESS file " + f);
                        console.log(ex);
                        done(false);
                    }
                });
            });
        });
    });
}
