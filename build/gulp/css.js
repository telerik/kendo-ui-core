/* jshint browser:false, node:true, esnext: true */

var lazypipe = require('lazypipe');
var less = require('gulp-less');
var logger = require('gulp-logger');
var cleanCss = require('gulp-clean-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');

var cleanCssOptions = {
    compatibility: 'ie9',
    aggressiveMerging: false,
    advanced: false
};

module.exports.fromLess = lazypipe()
    .pipe(logger, { after: 'LESS complete!', extname: '.css', showChange: true })
    .pipe(less, {
        math: 'strict',
        relativeUrls: true,
        plugins: []
    })
    .pipe(replace, /\.\.\/mobile\//g, ''); // temp hack for the discrepancy between source and generated "source"

module.exports.minify = lazypipe()
    .pipe(logger, { after: 'Min CSS complete!', extname: '.min.css', showChange: true } )
    .pipe(cleanCss, cleanCssOptions)
    .pipe(rename, { suffix: ".min" });

module.exports.cacheLessDependencies = lazypipe()
    .pipe(cache, 'less')
    .pipe(progeny, {
        regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
    });
