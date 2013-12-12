var META = require("./build/kendo-meta.js");

module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadTasks('build/grunt/tasks');

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

    var kendo_files = META.loadAll().map(function(f){
        return "src/" + f;
    });

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

                    ].concat(kendo_files).concat([

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
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask( "build", [ "concat:all", "uglify:all"] );
};
