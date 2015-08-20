var PATH = require("path");
var LESS = require("less");
var CSSMIN = require("cssmin").cssmin;
var licensePath = PATH.join("resources", "legal", "core-license.txt");

module.exports = function(grunt) {
    grunt.registerMultiTask("license", "Apply license to built files", function() {
        var licenseContents = grunt.template.process(grunt.file.read(licensePath), { data: { year: grunt.template.today('yyyy') }});

        this.files.forEach(function(f) {
            f.src.forEach(function(file) {
                var contents = licenseContents + "\n" + grunt.file.read(file);
                grunt.file.write(file, contents);
            });
        });
    });
}
