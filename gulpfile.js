/* jshint browser:false, node:true, esnext: true */

var gulp = require('gulp');
var debug = require('gulp-debug'); // jshint ignore:line
var less = require('gulp-less');
var logger = require('gulp-logger');
var replace =  require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var clone = require('gulp-clone');
var sourcemaps = require('gulp-sourcemaps');

var merge = require('merge2');
var autoprefix = require('less-plugin-autoprefix');

var browsers = [
    "Explorer >= 7",
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

var lessLogger = logger({
    after: 'LESS complete!',
    extname: '.css',
    showChange: true
});

var minCssLogger = logger({
    after: 'Min CSS complete!',
    extname: '.min.css',
    showChange: true
});

gulp.task("css-assets", function() {
    return gulp.src("styles/**/*.{less,woff,ttf,png,gif,css,svg}").
        pipe(gulp.dest("dist/styles"));
});

gulp.task("styles", [ "css-assets" ], function() {
    var css = gulp.src("styles/**/kendo*.less")
        .pipe(sourcemaps.init())
        .pipe(lessLogger)
        .pipe(less({
            relativeUrls: true,
            plugins: [new autoprefix({ browsers: browsers }) ]
        }))
        .pipe(replace(/\.\.\/mobile\//g, '')); // temp hack for the discrepancy between source and generated "source"

    var minCss = css.pipe(clone())
        .pipe(minCssLogger)
        .pipe(minifyCSS(cleanCssOptions))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../styles" }));

    merge(css, minCss)
        .pipe(gulp.dest('dist/styles'));
});
