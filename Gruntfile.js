var META = require("./build/kendo-meta.js");
var PATH = require("path");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
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
    var all_kendo_files = META.loadAll().map(addSrc);

    // files directly in src/
    var main_kendo_files = META.listKendoFiles().map(addSrc);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: jshint,
        karma: {
            unit: {
                options: {
                    reportSlowerThan: 500,
                    basePath: '',
                    frameworks: ['qunit'],
                    preprocessors: {
                        'tests/**/.html': [],
                        'tests/**/*-fixture.html': ['html2js'],
                    },
                    files: [
                        { pattern: 'styles/**/*.*', watched: true, included: false },
                        { pattern: 'tests/router/sandbox.html', watched: true, included: false },
                        { pattern: 'tests/window/blank.html', watched: true, included: false },
                        { pattern: 'tests/editor/editorStyles.css', included: false },
                        { pattern: 'tests/**/*-fixture.html' },
                        jquery,
                        'tests/jquery.mockjax.js',

                    ].concat(all_kendo_files).concat([

                        'src/kendo.timezones.js',
                        'src/cultures/kendo.culture.de-DE.js',
                        'src/cultures/kendo.culture.bg-BG.js',
                        'src/cultures/kendo.culture.en-ZA.js',
                        "src/cultures/kendo.culture.es-ES.js",

                        'tests/kendo-test-helpers.js',
                        'tests/**/test-helper.js',
                        'demos/mvc/content/shared/js/less.js',
                        { pattern: 'demos/mvc/App_Data/*json', included: false },
                        'demos/mvc/content/mobilethemebuilder/scripts/colorengine.js',
                        'demos/mvc/content/mobilethemebuilder/scripts/gradientengine.js',

                        'tests/chart/util.js',
                        'tests/map/util.js',

                        'themebuilder/scripts/themebuilder.js',

                        'tests/chart/util.js',
                        'tests/upload/helper.js',
                        'tests/upload/select.js',
                        'tests/upload/selection.js',
                        'tests/upload/async.js',
                        'tests/upload/asyncnomultiple.js',
                        'tests/upload/asyncnoauto.js',
                        'tests/upload/upload.js',
                        'tests/upload/success.js',
                        'tests/upload/error.js',
                        'tests/upload/cancel.js',
                        'tests/upload/remove.js',

                        { pattern: 'src/kendo.editor.js', included: false }, // download builder needs this
                        { pattern: 'src/kendo.aspnetmvc.js', included: false }, // download builder needs this

                        'download-builder/scripts/script-resolver.js',
                        'tests/diagram/common.js'
                    ]).concat(tests),

                    exclude: [ 'src/kendo.icenium.js', 'src/kendo.web.js', 'src/kendo.all.js', 'src/kendo.mobile.js', 'src/kendo.dataviz.js', 'src/kendo.model.js', 'src/kendo.winjs.js', 'src/*min.js' ],

                    reporters: reporters,

                    junitReporter: {
                      outputFile: grunt.option('junit-results')
                    },

                    colors: true,

                    autoWatch: true,

                    browsers: browsers,

                    captureTimeout: 60000,

                    singleRun: grunt.option('single-run')
                }
            }
        },

        kendo: {
            options: {
                destDir: PATH.join("dist", "js"),
            },
            min: {
                src: main_kendo_files,
                dest: "<%= kendo.options.destDir %>",
                ext: ".min.js",
            },
            full: {
                src: main_kendo_files,
                dest: "<%= kendo.options.destDir %>",
                ext: ".js",
            },
            config: {
                src: main_kendo_files,
                dest: "download-builder/config/kendo-config.json"
            },
            cultures: {
                src: [ "src/cultures/kendo.culture.*.js",
                       "!src/cultures/kendo.culture.*.min.js" ],
                dest: "<%= kendo.options.destDir %>/cultures",
            },

            // these just need to be listed here, though everything
            // needed to build these targets is in the task definition.
            web: {},
            mobile: {},
            win: {},
            icenium: {},
            dataviz: {},
            all: {},
        },

        custom: {
            options: {
                destDir: "<%= kendo.options.destDir %>",
            },
        },

    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
};
