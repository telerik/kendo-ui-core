var fs = require('fs');
var gulp = require('gulp');
var shell = require('gulp-shell');
var path = require('path');
var debug = require('gulp-debug');
var logger = require('gulp-logger');
var PluginError = require('plugin-error');
var clone = require('gulp-clone');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var requirejsOptimize = require('gulp-requirejs-optimize');
var glob = require("glob");
var flatmap = require('gulp-flatmap');

var ignore = require('gulp-ignore');

var merge = require('merge2');
var argv = require('yargs').argv;

var license = require('./build/gulp/license');
var cssUtils = require('./build/gulp/css');
var umdWrapToCore = require('./build/gulp/wrap-umd');
var uglify = require('./build/gulp/uglify');
var requireDir = require('require-dir');

var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var named = require('vinyl-named');

var kendoVersion = require("./build/gulp/kendo-version");

requireDir('./build/gulp/tasks');

var makeSourceMaps = !argv['skip-source-maps'];
var skipMinify = argv['skip-min'];
var skipCultures = argv['skip-cultures']

var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var calc = require("postcss-calc");
var browsers = [
    "Explorer >= 9",
    "last 3 Edge versions",
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Opera versions",
    "last 2 Safari major versions",
    "last 2 iOS major versions",
    "Android >= 4.4",
    "ExplorerMobile >= 10"
];
var postcssPlugins = [
    calc({
        precision: 10
    }),
    autoprefixer({
        browsers: browsers
    })
];

gulp.task("css-assets", function() {
    return gulp.src("styles/**/*.{less,woff,ttf,eot,png,gif,css,svg,txt}")
        .pipe(gulpIf((file) => file.path.match(/.less$/), license()))
        .pipe(gulp.dest("dist/styles"));
});

gulp.task("less", function() {
    var css = gulp.src(`styles/${argv.styles || '**/kendo*.less'}`, { base: "styles" })
        .pipe(license())
        .pipe(cssUtils.fromLess())
        .pipe(postcss(postcssPlugins));

    var minCss = css.pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(cssUtils.minify())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./", {
            mapSources: function(sourcePath) {
                return sourcePath
                    .replace(/(styles|mobile|web)\//, "")
                    .replace(/\.css$/, ".min.css");
            }
        })));

    return merge(css, minCss)
        .pipe(gulp.dest('dist/styles'));
});

gulp.task("styles", gulp.series(["less", "css-assets"]));

// cloning those somehow fails, I think that it is due to the RTL symbols in the culture
function cultures() {
    let src = gulp.src('src/cultures/kendo.culture.*.js', { base: 'src' })
        .pipe(umdWrapToCore())
        .pipe(license());
    let minJs;

    if (!skipMinify) {
        minJs = src.pipe(clone())
            .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
            .pipe(flatmap(uglify))
            .pipe(logger({ after: 'Cultures: Uglify complete', extname: '.min.js', showChange: true }))
            .pipe(license())
            .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

        src = merge(src, minJs);
    }

    return src;
}

function messages() {
    let src = gulp.src('src/messages/kendo.messages.*.js', { base: 'src' })
        .pipe(umdWrapToCore())
        .pipe(license());
    let minJs;

    if (!skipMinify) {
        minJs = src.pipe(clone())
            .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
            .pipe(flatmap(uglify))
            .pipe(logger({ after: 'Messages: Uglify complete', extname: '.min.js', showChange: true }))
            .pipe(license())
            .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

        src = merge(src, minJs);
    }

    return src;
}

const toDist = (stream) => stream.pipe(gulp.dest('dist/js'));

function gatherWithRequireJS(stream, file) {
    let currentModule = path.relative(process.cwd(), file.path).replace("\\", "/");
    let modules = glob.sync("src/kendo.*.js", { ignore: currentModule }).map(mdname => mdname.replace(/^src\/(.*)\.js$/, "$1"));
    let dict = Object.assign({}, ...modules.map(mod => Object.assign({ [mod]: 'empty:' })));
    let paths = { jquery: "empty:" };
    let isBundle = fs.readFileSync(file.path).indexOf('"bundle all";') > -1;

    if (!isBundle) {
        Object.assign(paths, dict);
    }

    return stream.pipe(requirejsOptimize({
        baseUrl: "src",
        optimize: "none",
        paths: paths,
        logLevel: 2,
        onBuildWrite: function (moduleName, path, contents) {
            return contents.replace(/(\.+\/)+(kendo[\.\w]+)/gm, '$2');
        }
    }));
}

gulp.task("scripts", function() {
    let src = gulp.src(`src/${argv.scripts || 'kendo.*.js'}`, { base: "src" })
        .pipe(flatmap(gatherWithRequireJS))
        .pipe(license());
    let minJs;

    if (!skipMinify) {
        minJs = src.pipe(clone())
            .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
            .pipe(flatmap(uglify))
            .pipe(license())
            .pipe(logger({ after: 'Scripts: Uglify complete', extname: '.min.js', showChange: true }))
            .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));
        src = merge(src, minJs);
    }

    let thirdParty = gulp.src('src/{jquery,angular,pako,jszip}*.*');

    let combinedSrc = merge(
        src.pipe(flatmap(toDist)),
        thirdParty.pipe(flatmap(toDist))
    );

    if (!skipCultures) {
        combinedSrc = merge(combinedSrc,
            cultures().pipe(flatmap(toDist)),
            messages().pipe(flatmap(toDist))
        );
    }

    return combinedSrc;
});

gulp.task("custom", function() {
    var files = argv.c;
    const customFilePath = 'src/kendo.custom.js';

    if (!files) {
        throw new PluginError({
            task: "custom",
            plugin: "custom",
            message: "please provide a list of the components to be included in the build with -c, separated with ','"
        });
    }

    files = files.split(',').map(f => `"./kendo.${f}"`);

    fs.writeFileSync(customFilePath, `(function(f, define){
            define([${files.join(',')}], f);
        })(function(){
            "bundle all";
            return window.kendo;
        }, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });`);

    var src = gulp.src(customFilePath)
        .pipe(requirejsOptimize({
            optimize: "none",
            paths: { jquery: "empty:" },
            logLevel: 2,
            onModuleBundleComplete: function() {
                fs.unlinkSync(customFilePath);
            }
        }))
        .pipe(license());

    var minSrc = src
        .pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(gulpIf(!skipMinify, flatmap(uglify)))
        .pipe(logger({ after: 'Scripts: Uglify complete', extname: '.min.js', showChange: true }))
        .pipe(gulpIf(makeSourceMaps, logger({ after: 'Scripts: source map complete!', extname: '.map', showChange: true })))
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

    return merge(src.pipe(flatmap(toDist)), minSrc.pipe(flatmap(toDist)));
});

gulp.task("custom", function() {
    var files = argv.c;
    const customFilePath = 'src/kendo.custom.js';

    if (!files) {
        throw new PluginError({
            task: "custom",
            plugin: "custom",
            message: "please provide a list of the components to be included in the build with -c, separated with ','"
        });
    }

    files = files.split(',').map(f => `"./kendo.${f}"`);

    fs.writeFileSync(customFilePath, `(function(f, define){
            define([${files.join(',')}], f);
        })(function(){
            "bundle all";
            return window.kendo;
        }, typeof define == 'function' && define.amd ? define : function(a1, a2, a3){ (a3 || a2)(); });`);

    var src = gulp.src(customFilePath)
        .pipe(requirejsOptimize({
            optimize: "none",
            paths: { jquery: "empty:" },
            logLevel: 2,
            onModuleBundleComplete: function() {
                fs.unlinkSync(customFilePath);
            }
        }))
        .pipe(license());

    var minSrc = src
        .pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(gulpIf(!skipMinify, flatmap(uglify)))
        .pipe(logger({ after: 'Scripts: Uglify complete', extname: '.min.js', showChange: true }))
        .pipe(gulpIf(makeSourceMaps, logger({ after: 'Scripts: source map complete!', extname: '.map', showChange: true })))
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

    return merge(src.pipe(flatmap(toDist)), minSrc.pipe(flatmap(toDist)));
});

gulp.task('build', gulp.parallel(['scripts', 'styles']));

gulp.task('tests', gulp.series(['karma-mocha']));

gulp.task('ci', gulp.series(['build', 'karma-ci']));

gulp.task('cjs', function() {
    return gulp.src('src/{kendo.*.js,*/*.js,*/**/*.js}')
        .pipe(named(function(file) {
            const thePath = file.path;
            const relativeDir = path.relative(file.base, path.dirname(thePath));
            const fileName = path.basename(thePath, path.extname(thePath));
            return path.join(relativeDir, fileName);
        }))
        .pipe(webpackStream({
            mode: 'production',
            output: {
                libraryTarget: 'commonjs2'
            },

            plugins: [new webpack.ProvidePlugin({ 'jQuery': "jquery" })],

            externals: ['jquery', /^\.\//, /^\.\.\//],
            optimization: {
                minimize: false
            }
        }))
        .pipe(gulp.dest('dist/cjs'));
});
gulp.task('mdspell', shell.task(
    ['cd docs && mdspell "**/*.md" -n -a --report']
));

gulp.task('pack-npm', function() {
    var internalOption = "", i = process.argv.indexOf("--channel"), flavor = 'core';

    if (i > -1) {
        internalOption = process.argv[i + 1];
    }
    var js = gulp.src('dist/cjs/**/*')
        .pipe(gulp.dest('dist/npm/js'));

    var jsmin = gulp.src('dist/cjs/**/*.js')
        .pipe(flatmap(uglify))
        .pipe(gulp.dest('dist/npm/js'));

    var styles = gulp.src('dist/styles/**/*').pipe(gulp.dest('dist/npm/css'));

    var pkg = gulp.src('build/package-' + flavor + '.json')
        .pipe(replace("$KENDO_VERSION", kendoVersion + internalOption))
        .pipe(rename('package.json'))
        .pipe(gulp.dest('dist/npm'));

    var license = gulp.src('resources/legal/npm/' + flavor + '.txt')
        .pipe(replace("$YEAR", new Date().getFullYear()))
        .pipe(rename('LICENSE'))
        .pipe(gulp.dest('dist/npm'));

    var readme = gulp.src('resources/npm/' + flavor + '-README.md')
        .pipe(rename('README.md'))
        .pipe(gulp.dest('dist/npm'));

    var typings = gulp.src('typescript/kendo.all.d.ts')
        .pipe(rename('index.d.ts'))
        .pipe(gulp.dest('dist/npm'));

    return merge(js, jsmin, styles, pkg, license, readme, typings);
});

gulp.task('npm-core', gulp.series(['cjs', 'styles', 'pack-npm']));


const taskListing = require('gulp-task-listing');
gulp.task('tasks', taskListing.withFilters(/:/));

// Exit immediately on Ctrl+C
process.once('SIGINT', function() {
    process.exit();
});