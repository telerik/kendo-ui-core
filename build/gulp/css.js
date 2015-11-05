/* jshint browser:false, node:true, esnext: true */

var lazypipe = require('lazypipe');
var less = require('gulp-less');
var autoprefix = require('less-plugin-autoprefix');
var logger = require('gulp-logger');
var minifyCSS = require('gulp-minify-css');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');

var browsers = [
    "Explorer >= 8",
    "Chrome >= 21",
    "Firefox ESR",
    "Opera >= 15",
    "Android >= 2.3",
    "Safari >= 6.2.6",
    "ExplorerMobile >= 10",
    "iOS >= 6",
    "BlackBerry >= 10"
].join(",");

var cleanCssOptions = {
    compatibility: 'ie7',
    aggressiveMerging: false,
    advanced: false
};

module.exports.fromLess = lazypipe()
    .pipe(logger, { after: 'LESS complete!', extname: '.css', showChange: true })
    .pipe(less, { relativeUrls: true, plugins: [new autoprefix({ browsers: browsers }) ] })
    .pipe(replace, /\.\.\/mobile\//g, ''); // temp hack for the discrepancy between source and generated "source"

module.exports.minify = lazypipe()
    .pipe(logger, { after: 'Min CSS complete!', extname: '.min.css', showChange: true } )
    .pipe(minifyCSS, cleanCssOptions)
    .pipe(rename, { suffix: ".min" });

module.exports.cacheLessDependencies = lazypipe()
    .pipe(cache, 'less')
    .pipe(progeny, {
        regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
    });
