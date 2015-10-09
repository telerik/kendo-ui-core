/* jshint browser:false, node:true, esnext: true */

var gulp = require('gulp');
var debug = require('gulp-debug'); // jshint ignore:line
var less = require('gulp-less');
var logger = require('gulp-logger');
var replace =  require('gulp-replace');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var clone = require('gulp-clone');
var cache = require('gulp-cached');
var progeny = require('gulp-progeny');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');

var merge = require('merge2');
var lazypipe = require('lazypipe');
var autoprefix = require('less-plugin-autoprefix');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

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

var lessToCss = lazypipe()
    .pipe(less, { relativeUrls: true, plugins: [new autoprefix({ browsers: browsers }) ] })
    .pipe(replace, /\.\.\/mobile\//g, ''); // temp hack for the discrepancy between source and generated "source"

gulp.task("build-skin", ["css-assets"], function() {
    var lessLogger = logger({ after: 'LESS complete!', extname: '.css', showChange: true });
    var mapLogger = logger({ after: 'map complete!', extname: '.css.map', showChange: true });

    return gulp.src(argv.s.replace(/mobile|web/, "**"))
        .pipe(sourcemaps.init())
        .pipe(lessLogger)
        .pipe(lessToCss())
        .pipe(mapLogger)
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../../styles" }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

gulp.task("watch-skin", [ "build-skin" ], function() {
    browserSync.init({ proxy: "localhost" });
    return gulp.watch("styles/**/*.less", [ "build-skin" ]);
});

gulp.task("dev-less",function() {
    return gulp.src("styles/**/*.less")
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(cache('less'))
        .pipe(progeny({
            regexp: /^\s*@import\s*(?:\(\w+\)\s*)?['"]([^'"]+)['"]/
        }))
        .pipe(filter(['**/kendo.*.less']))
        .pipe(sourcemaps.init())
        .pipe(lessToCss())
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../../styles" }))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("less",function() {
    var css = gulp.src("styles/**/kendo*.less")
        .pipe(sourcemaps.init())
        .pipe(lessLogger)
        .pipe(lessToCss());

    var minCss = css.pipe(clone())
        .pipe(minCssLogger)
        .pipe(minifyCSS(cleanCssOptions))
        .pipe(rename({ suffix: ".min" }))
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../styles" }));

    return merge(css, minCss)
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("styles", [ "less", "css-assets" ]);

gulp.task("watch-styles", [ "dev-less", "css-assets" ], function() {
    return gulp.watch("styles/**/*.less", [ "dev-less" ]);
});
