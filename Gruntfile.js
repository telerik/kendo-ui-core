/* jshint browser:false, node:true */
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');

    // Project configuration.
    grunt.initConfig({
        shell: {
            options: {
                stderr: false
            },
            gulp: {
                command: function(task) {
                    return 'node node_modules/gulp/bin/gulp.js ' + task;
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['shell:gulp:ci']);
    grunt.registerTask('tests', ['shell:gulp:ci']);
    grunt.registerTask('styles', ['shell:gulp:styles']);
    grunt.registerTask('all', ['shell:gulp:travis']);
    grunt.registerTask('build', ['shell:gulp:build']);
    grunt.registerTask("ci", ['shell:gulp:ci']);
    grunt.registerTask("travis", ['shell:gulp:travis']);
    grunt.registerTask('jshint', ['shell:gulp:jshint']);
};
