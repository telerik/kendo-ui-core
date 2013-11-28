module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        karma: {
            unit: {
                options: {
                    basePath: '',
                    frameworks: ['qunit'],
                    files: [
                        { pattern: 'styles/**/*.*', watched: true, included: false },
                        'src/jquery.js',
                        'src/kendo.core.js',
                        'src/kendo.data.js',
                        'src/kendo.list.js',
                        'src/kendo.calendar.js',
                        'src/kendo.popup.js',
                        'src/kendo.datepicker.js',
                        'src/kendo.timepicker.js',
                        'src/kendo.mobile.view.js',
                        'src/kendo.mobile.loader.js',
                        'src/kendo.mobile.pane.js',
                        'src/kendo.mobile.shim.js',
                        'src/kendo*.js',
                        'tests/jquery.mockjax.js',
                        'tests/kendo-test-helpers.js',
                        'demos/mvc/content/shared/js/less.js',
                        'tests/mobile/**/*.js'
                    ],

                    exclude: [ 'src/kendo.web.js', 'src/kendo.aspnetmvc.js', 'src/kendo.all.js', 'src/kendo.mobile.js', 'src/kendo.dataviz.js', 'src/kendo.winjs.js', 'src/*min.js', 'src/*dataviz*', 'src/*diagram*', 'src/*scheduler*' ],

                    reporters: ['progress' ],

                    port: 9876,

                    colors: true,

                    autoWatch: true,

                    browsers: ['Chrome'],

                    captureTimeout: 60000,

                    singleRun: false
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask( "build", [ "concat:all", "uglify:all"] );
};
