var META = require("./build/kendo-meta.js");
var TESTS = require("./build/grunt/tests.js");
var PATH = require("path");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadTasks('build/grunt/tasks');

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
                browserStack: {
                  username: 'petyoivanov',
                  accessKey: 'QBgixFUrxrEQyY2nKVqb'
                },
                sauceLabs: {
                    username: 'petyosi',
                    accessKey: '2e136bfe-8507-4ac2-b201-1c2f53003669',
                    startConnect: true,
                    testName: 'zergling'
                },
                customLaunchers: {
                    bs_chrome: {
                        base: 'BrowserStack',
                        browser: 'chrome',
                        browser_version: 'latest',
                        os: 'OS X',
                        os_version: 'Mavericks'
                    },
                    sl_chrome: {
                        base: 'SauceLabs',
                        browserName: 'chrome',
                        version: '31'
                    }
                },
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
            ci: {
                options: {
                    reporters: ['progress', 'junit'],

                    junitReporter: {
                      outputFile: grunt.option('junit-results')
                    },

                    singleRun: true,

                    files: [].concat(
                        TESTS.compiledStyleSheets,
                        TESTS.beforeTestFiles,
                        [ 'dist/js/kendo.all.min.js', 'dist/js/kendo.aspnetmvc.min.js' ],
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
                    src: ["**/*.less", "**/*.woff", "**/*.ttf", "**/*.png", "**/*.gif", "**/*.css" ],
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
            download_builder: {
                src: mainKendoFiles,
                ext: ".min.js",
                dest: PATH.join("dist", "download-builder", "content", "js"),
            },
            config: {
                src: mainKendoFiles,
                dest: "download-builder/config/kendo-config.json"
            },
            cultures: {
                src: [ "src/cultures/kendo.culture.*.js",
                       "!src/cultures/kendo.culture.*.min.js" ],
                dest: "<%= kendo.options.jsDestDir %>/cultures",
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
    grunt.registerTask("ci", [ 'kendo:min', 'styles', 'copy:jquery', 'copy:timezones', 'karma:ci' ]);
    grunt.registerTask('tests', [ 'karma:unit' ]);
    grunt.registerTask('styles', [ 'copy:css_assets', 'less' ]);
    grunt.registerTask('all', [ 'kendo', 'copy:jquery', 'copy:timezones' ]);
    grunt.registerTask('build', ['copy:jquery', 'copy:timezones', 'kendo:min', 'kendo:full', 'kendo:cultures', 'styles', 'license']);
};
