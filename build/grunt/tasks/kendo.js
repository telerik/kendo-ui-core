var FS = require("fs");
var PATH = require("path");
var META = require("../../kendo-meta.js");

function outdated(source, dest) {
    try {
        var sstat = FS.statSync(source);
        var dstat = FS.statSync(dest);
        return sstat.mtime.getTime() > dstat.mtime.getTime();
    } catch(ex) {
        return true;
    }
}

module.exports = function(grunt) {

    grunt.registerMultiTask("kendo", "Kendo UI build task", function(){
        var task = this;
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
    });

};
