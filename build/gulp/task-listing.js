'use strict';

exports.withFilters = function(filterRegex) {
    return function(done) {
        const gulp = require('gulp');
        const tasks = Object.keys(gulp.registry().tasks());
        const visible = filterRegex ? tasks.filter(name => !filterRegex.test(name)) : tasks;
        visible.sort().forEach(name => process.stdout.write('  ' + name + '\n'));
        done();
    };
};
