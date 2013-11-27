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
                        'src/jquery.js',
                        'src/kendo.core.js',
                        'src/kendo.list.js',
                        'src/kendo.calendar.js',
                        'src/kendo.popup.js',
                        'src/kendo.datepicker.js',
                        'src/kendo.timepicker.js',
                        'src/kendo.mobile.view.js',
                        'src/kendo.mobile.loader.js',
                        'src/kendo.mobile.pane.js',
                        'src/kendo*.js',
                        'tests/mobile/**/*.js'
                    ],

                    exclude: [ 'src/*dataviz*', 'src/*diagram*', 'src/*scheduler*' ],

                    reporters: ['progress' ],

                    port: 9876,

                    colors: true,

                    autoWatch: true,

                    browsers: ['Firefox'],

                    captureTimeout: 60000,

                    singleRun: true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['karma:unit']);
    grunt.registerTask( "build", [ "concat:all", "uglify:all"] );
};
