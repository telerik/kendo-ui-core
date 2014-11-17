var META = require("./build/kendo-meta.js");
var PATH = require("path");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('build/grunt/tasks');

    var mainKendoFiles = META.listKendoFiles().map(function(f) {
        return PATH.join("src", f);
    });

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        copy: {
            css_assets: {
                files: [{
                    expand: true,
                    cwd: "styles",
                    src: ["**/*.less", "**/*.woff", "**/*.ttf", "**/*.png", "**/*.gif", "**/*.css", "**/*.svg" ],
                    dest: '<%= kendo.options.stylesDestDir %>/',
                }]
            }
        },

        kendo: {
            options: {
                destDir: "dist",
                jsDestDir: PATH.join("dist", "js"),
                stylesDestDir: PATH.join("dist", "styles")
            },
            min: {
                src: mainKendoFiles,
                dest: "<%= kendo.options.jsDestDir %>",
                ext: ".min.js",
            },
            full: {
                src: mainKendoFiles,
                dest: "<%= kendo.options.jsDestDir %>",
                ext: ".js",
            }
        },

        custom: {
            options: {
                destDir: "<%= kendo.options.jsDestDir %>",
            },
        },

        less: {
            options: {
                destDir: "<%= kendo.options.destDir %>",
            },
            compile: {
                src: [ "styles/**/kendo*.less" ],
            }
        },

        license: {
            apply: {
                src:  [ "<%= kendo.options.destDir %>/**/*" ],
                filter: function(src) {
                    return PATH.basename(src).match(/^kendo(.+)(js|css|less)$/);
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('styles', [ 'copy:css_assets', 'less' ]);
    grunt.registerTask('build', [ 'kendo', 'styles', 'license' ]);
};
