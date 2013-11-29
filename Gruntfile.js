module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                options: {
                    basePath: '',
                    frameworks: ['qunit'],
                    files: [
                        { pattern: 'Gruntfile.js', watched: true, included: false },
                        { pattern: 'styles/**/*.*', watched: true, included: false },
                        'src/jquery.js',
                        'tests/jquery.mockjax.js',
                        'src/kendo.core.js',
                        'src/kendo.timezones.js',
                        'src/cultures/kendo.culture.de-DE.js',
                        'src/cultures/kendo.culture.bg-BG.js',
                        'src/cultures/kendo.culture.en-ZA.js',
                        'src/kendo.data.js',
                        'src/kendo.list.js',
                        'src/kendo.calendar.js',
                        'src/kendo.popup.js',
                        'src/kendo.autocomplete.js',
                        'src/kendo.datepicker.js',
                        'src/kendo.timepicker.js',
                        'src/kendo.mobile.view.js',
                        'src/kendo.mobile.loader.js',
                        'src/kendo.mobile.pane.js',
                        'src/kendo.mobile.shim.js',
                        'src/kendo*.js',
                        'tests/qunit/addons/close-enough/qunit-close-enough.js',
                        'tests/kendo-test-helpers.js',
                        'demos/mvc/content/shared/js/less.js',
                        'demos/mvc/content/mobilethemebuilder/scripts/colorengine.js',
                        'demos/mvc/content/mobilethemebuilder/scripts/gradientengine.js',
                        'tests/core/**/*.js',
                        'tests/mobile/**/*.js',
                        'tests/userevents/**/*.js',
                        'tests/autocomplete/*.js'
                    ],

                    exclude: [ 'src/kendo.icenium.js', 'src/kendo.web.js', 'src/kendo.aspnetmvc.js', 'src/kendo.all.js', 'src/kendo.mobile.js', 'src/kendo.dataviz.js', 'src/kendo.model.js', 'src/kendo.winjs.js', 'src/*min.js', 'src/*editor*', 'src/*dataviz*', 'src/*diagram*', 'src/*scheduler*' ],

                    reporters: ['progress' ],

                    port: 9876,

                    colors: true,

                    autoWatch: true,

                    browsers: ['Chrome'],

                    captureTimeout: 60000,

                    singleRun: false
                }
            }
        },
        jshint: {
            files: [
            'src/kendo*.js',
            'src/editor/*.js',
            'src/dataviz/**/*.js',
            'tests/map/layers/helpers.js',
            'demos/mvc/content/shared/js/examples.js',
            'demos/mvc/content/shared/js/console.js',
            'themebuilder/bootstrap.js',
            'themebuilder/scripts/themebuilder.js',
            'themebuilder/scripts/colorengine.js',
            'themebuilder/scripts/constants.js'
            ],
            options: {
                ignores: ['**/*.min.js', 'src/kendo.web.js', 'src/kendo.aspnetmvc.js', 'src/kendo.all.js', 'src/kendo.mobile.js', 'src/kendo.dataviz.js', 'src/kendo.timezones.js', 'src/kendo.model.js', 'src/kendo.winjs.js', 'src/kendo.editor.js' ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask( "build", [ "concat:all", "uglify:all"] );
};
