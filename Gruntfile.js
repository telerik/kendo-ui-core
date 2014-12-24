var META = require("./build/kendo-meta.js");
var PATH = require("path");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('build/grunt/tasks');

    // support different test sets for public|private repo
    var TESTS = require(grunt.file.expand('./build/grunt/test-paths-*.js')[0]);

    function addSrc(f) {
        return PATH.join("src", f);
    }

    var browsers = ['Chrome'];

    var tests = [ "tests/**/*.js" ];

    var browserOption = grunt.option('browser');
    var testsOption = grunt.option('tests');
    var jqueryOption = grunt.option('jquery');
    var jquery = 'src/jquery.js';

    if (testsOption) {
        tests = [ testsOption ];
    }

    if (jqueryOption) {
        jquery = "http://code.jquery.com/jquery-" + jqueryOption + ".min.js";
    }

    TESTS.beforeTestFiles.push(jquery);
    TESTS.beforeTestFiles.push('tests/jquery.mockjax.js');
    TESTS.beforeTestFiles.push('src/angular.js');
    TESTS.beforeTestFiles.push('tests/angular-route.js');

    if (browserOption) {
        browsers = [ browserOption ];
    }

    var reporters = [ 'progress' ];

    if (grunt.option('junit-results')) {
        reporters.push('junit');
    }

    var jshint = grunt.file.readJSON('build/grunt/jshint.json');

    var files = grunt.option('files');

    jshint.files = files ? files.split(",") : jshint.files;

    // all files (including subfiles like editor/main.js etc.)
    var allKendoFiles = META.loadAll().map(addSrc);

    // files directly in src/
    var mainKendoFiles = META.listKendoFiles().map(addSrc);

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        jshint: jshint,
        karma: {
            options: {
                reportSlowerThan: 500,
                basePath: '',
                frameworks: ['qunit'],
                preprocessors: {
                    'tests/**/.html': [],
                    'tests/**/*-fixture.html': ['html2js'],
                },
                reporters: ['progress'],
                colors: true,
                autoWatch: true,
                browsers: browsers,
                captureTimeout: 60000,
                browserNoActivityTimeout: 30000,
                singleRun: grunt.option('single-run')
            },
            jenkins: {
                options: {
                    reporters: ['dots', 'junit'],

                    junitReporter: {
                      outputFile: grunt.option('junit-results')
                    },

                    singleRun: true,

                    browsers: browsers,

                    files: [].concat(
                        TESTS.beforeTestFiles,
                        TESTS.ciFiles,
                        TESTS.afterTestFiles,
                        tests
                    )
                }
            },
            travis: {
                options: {
                    reporters: ['dots'],

                    singleRun: true,

                    browsers: [ 'Chrome' ],

                    files: [].concat(
                        TESTS.beforeTestFiles,
                        TESTS.ciFiles,
                        TESTS.afterTestFiles,
                        tests
                    )
                }
            },
            unit: {
                options: {
                    files: [].concat(
                        TESTS.beforeTestFiles,
                        allKendoFiles,
                        TESTS.afterTestFiles,
                        tests
                    )
                }
            },          
            legacyUnit: {
                options: {
                    browsers: browserOption ? [ browserOption ] : [],

                    files: [].concat(
                        TESTS.beforeTestFiles.filter(function(x) {
                            return !/angular/i.test(x);
                        }),
                        allKendoFiles,
                        TESTS.afterTestFiles.filter(function(x) {
                            return !/(themeuilder|less)\.js/i.test(x);
                        }),
                        tests
                    )
                }
            }
        },

        copy: {
            jquery: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: [ "jquery.*" ],
                    dest: '<%= kendo.options.jsDestDir %>/',
                }]
            },
            angular: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: [ "angular.*" ],
                    dest: '<%= kendo.options.jsDestDir %>/',
                }]
            },
            timezones: {
                files: [{
                    expand: true,
                    cwd: "src/",
                    src: "kendo.timezones.js" ,
                    dest: '<%= kendo.options.jsDestDir %>/',
                }]
            },
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
            },
            cultures: {
                src: [ "src/cultures/kendo.culture.*.js",
                       "!src/cultures/kendo.culture.*.min.js" ],
                dest: "<%= kendo.options.jsDestDir %>/cultures",
            },
            messages: {
                src: [ "src/messages/kendo.messages.*.js",
                       "!src/messages/kendo.messages.*.min.js" ],
                dest: "<%= kendo.options.jsDestDir %>/messages",
            }
        },

        download_builder: {
            min: {
                src: mainKendoFiles,
                ext: ".min.js",
                dest: PATH.join("dist", "download-builder", "content", "js"),
            },
            config: {
                src: mainKendoFiles,
                dest: "download-builder/config/kendo-config.json",
            },
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
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask('tests', [ 'styles', 'karma:unit' ]);
    grunt.registerTask('styles', [ 'copy:css_assets', 'less' ]);
    grunt.registerTask('all', [ 'kendo', 'download_builder', 'copy:jquery', 'copy:angular', 'copy:timezones' ]);
    grunt.registerTask('build', [ 'kendo', 'copy:jquery', 'copy:angular', 'styles', 'license' ]);

    grunt.registerTask("ci", [ 'all', 'karma:jenkins' ]);
    grunt.registerTask("travis", [ 'jshint', 'build', 'karma:travis' ]);
};
