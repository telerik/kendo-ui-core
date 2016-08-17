/* jshint browser:false, node:true, esnext: true */

var gulp = require('gulp');
var path = require('path');
var debug = require('gulp-debug'); // jshint ignore:line
var logger = require('gulp-logger');
var util = require('gulp-util');
var clone = require('gulp-clone');
var plumber = require('gulp-plumber');
var filter = require('gulp-filter');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var jshint = require("gulp-jshint");
var replace = require("gulp-replace");
var rename = require("gulp-rename");

var ignore = require('gulp-ignore');

var merge = require('merge2');
var concat = require('gulp-concat');
var lazypipe = require('lazypipe');
var browserSync = require('browser-sync').create();
var argv = require('yargs').argv;

var license = require('./build/gulp/license');
var cssUtils = require('./build/gulp/css');
var umdWrapToCore = require('./build/gulp/wrap-umd');
var gatherAmd = require('./build/gulp/gather-amd');
var uglify = require('./build/gulp/uglify');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var named = require('vinyl-named');

var kendoVersion = require("./build/gulp/kendo-version");

requireDir('./build/gulp/tasks');

var makeSourceMaps = !argv['skip-source-maps'];

gulp.task("css-assets", function() {
    return gulp.src("styles/**/*.{less,woff,ttf,eot,png,gif,css,svg,txt}")
        .pipe(gulpIf((file) => file.path.match(/.less$/), license() ))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("build-skin", ["css-assets"], function() {
    var resumeOnErrors = lazypipe()
        .pipe(plumber, {
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        });

    var mapLogger = logger({ after: 'source map complete!', extname: '.css.map', showChange: true });

    var allFiles = "styles/**/*.less";
    var filesToBuild = argv.s || 'styles/**/kendo.*.less';

    return gulp.src(allFiles)
        .pipe(resumeOnErrors())
        .pipe(cssUtils.cacheLessDependencies())
        .pipe(filter([
            filesToBuild.replace(/(styles|mobile|web)/, "**")
        ]))
        .pipe(sourcemaps.init())
        .pipe(cssUtils.fromLess())
        .pipe(mapLogger)
        .pipe(sourcemaps.write("maps", { sourceRoot: "../../../../styles" }))
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task("less",function() {
    var css = gulp.src(`styles/${argv.styles || '**/kendo*.less'}`, { base: "styles" })
        .pipe(license())
        .pipe(cssUtils.fromLess());

    var minCss = css.pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(cssUtils.minify())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

    return merge(css, minCss)
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("styles", [ "less", "css-assets" ]);

gulp.task("watch-styles", [ "build-skin", "css-assets" ], function() {
    browserSync.init({ proxy: "localhost", open: false });
    return gulp.watch("styles/**/*.less", [ "build-skin" ]);
});

// cloning those somehow fails, I think that it is due to the RTL symbols in the culture
function cultures() {
   return gulp.src('src/cultures/kendo.culture.*.js', { base: 'src' })
        .pipe(umdWrapToCore())
        .pipe(license());
}

function messages() {
   return gulp.src('src/messages/kendo.messages.*.js', { base: 'src' })
        .pipe(umdWrapToCore())
        .pipe(license());
}

var toDist = lazypipe().pipe(gulp.dest,  "dist/js");

gulp.task("scripts", function() {
    var skipMinify = argv['skip-min'];
    var src = gulp.src(`src/${argv.scripts || 'kendo.*.js'}`, { base: "src" }).pipe(gatherAmd.gather()).pipe(license());

    var thirdParty = gulp.src('src/{jquery,angular,pako,jszip}*.*');
    var minSrc;

    if (!skipMinify) {
        var gatheredSrc = src.pipe(clone())
            .pipe(ignore.include(["**/src/kendo.**.js"]));

        var scriptsToUglify = argv['skip-cultures'] ? gatheredSrc : merge(cultures(), messages(), gatheredSrc);

        minSrc = scriptsToUglify
            .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
            .pipe(uglify())
            .pipe(gulpIf(makeSourceMaps, logger({after: 'source map complete!', extname: '.map', showChange: true})))
            .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));
    }

    // the duplication below is due to something strange with merge2 and concat
    // resulting in "cannot switch to old mode now" error
    var combinedSrc = merge(
        cultures().pipe(toDist()),
        messages().pipe(toDist()),
        src.pipe(toDist()),
        thirdParty.pipe(toDist())
    );

    return skipMinify ? combinedSrc : merge(combinedSrc, minSrc.pipe(toDist()));
});

gulp.task("custom", function() {
    var files = argv.c;

    if (!files) {
        throw new util.PluginError({
            task: "custom",
            plugin: "custom",
            message: "please provide a list of the components to be included in the build with -c, separated with ','"
        });
    }

    var included = [];
    var src = gulp.src(`src/kendo.{${files}}.js`)
                .pipe(gatherAmd.gatherCustom())
                .pipe(filter(function(file) {
                    if (included.indexOf(file.path) === -1) {
                        included.push(file.path);
                        return true;
                    }  else {
                        util.log("skipping ", file.path);
                        return false;
                    }
                }))
                .pipe(concat({path: 'src/kendo.custom.js', base: 'src'}))
                .pipe(license());

    var minSrc = src
        .pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(uglify())
        .pipe(gulpIf(makeSourceMaps, logger({after: 'source map complete!', extname: '.map', showChange: true})))
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

    return merge(src.pipe(toDist()), minSrc.pipe(toDist()));
});

gulp.task("jshint", function() {
    var packageJSON = require('./package');

    return gulp.src(argv.files || packageJSON.jshintFiles)
        .pipe(jshint(packageJSON.jshintConfig))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('build', [ 'scripts', 'styles' ]);

gulp.task('tests', [ 'karma-unit' ]);

gulp.task('ci', function(done) {
  runSequence('build', 'karma-jenkins', done);
});

gulp.task('travis', function(done) {
  runSequence('jshint', 'build', 'karma-travis', done);
});

gulp.task('cjs', function() {
    return gulp.src('src/{kendo.*.js,*/*.js,*/**/*.js}')
        .pipe(named(function(file) {
            const thePath = file.path;
            const relativeDir = path.relative(file.base, path.dirname(thePath));
            const fileName = path.basename(thePath, path.extname(thePath));
            return path.join(relativeDir, fileName);
        }))
        .pipe(webpackStream({
            output: {
                libraryTarget: 'commonjs2'
            },

            plugins: [ new webpack.ProvidePlugin({ 'jQuery': "jquery" }) ],

            externals: ['jquery', /^\.\//, /^\.\.\// ]
        }))
        .pipe(gulp.dest('dist/cjs'));
});

[ 'pro', 'core' ].forEach(function(flavor) {
    gulp.task('npm-' + flavor, [ 'cjs', 'styles' ] , function() {
        var js = gulp.src('dist/cjs/**/*').pipe(gulp.dest('dist/npm/js'));

        var styles = gulp.src('dist/styles/**/*').pipe(gulp.dest('dist/npm/css'));

        var pkg = gulp.src('build/package-' + flavor + '.json')
                    .pipe(replace("$KENDO_VERSION", kendoVersion))
                    .pipe(rename('package.json'))
                    .pipe(gulp.dest('dist/npm'));

        var license = gulp.src('resources/legal/npm/' + flavor + '.txt')
                    .pipe(replace("$YEAR", new Date().getFullYear()))
                    .pipe(rename('LICENSE'))
                    .pipe(gulp.dest('dist/npm'));

        var readme = gulp.src('resources/npm/' + flavor + '-README.md')
                    .pipe(rename('README.md'))
                    .pipe(gulp.dest('dist/npm'));

        return merge(js, styles, pkg, license, readme);
    })
})
