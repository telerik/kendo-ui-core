var gulp = require('gulp');
var shell = require('gulp-shell');
var logger = require('gulp-logger');
var PluginError = require('plugin-error');
var clone = require('gulp-clone');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var replace = require("gulp-replace");
var rename = require("gulp-rename");
var filter = require('gulp-filter');
var flatmap = require('gulp-flatmap');

var merge = require('merge2');
var argv = require('yargs').argv;

var license = require('./build/gulp/license');
var requireDir = require('require-dir');

const exec = require('child_process').exec;
const terser = require('gulp-terser');
const rollupStream = require('@rollup/stream');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

var kendoVersion = require("./build/gulp/kendo-version");

requireDir('./build/gulp/tasks');

var makeSourceMaps = !argv['skip-source-maps'];

let HELPERS = {
    execute: (command) => {
      const process = exec(command);
      process.stdout.on('data', (data) => { console.log(data.toString()); });
      process.stderr.on('data', (data) => { console.log(data.toString()); });
      process.on('exit', (code) => {
        console.log('Process exited with code ' + code.toString());
      });
      return process;
    }
  };

function compileScripts() {
    return HELPERS.execute('node --max-old-space-size=8192 ./node_modules/rollup/dist/bin/rollup -c');
}

function compileMjsScripts() {
    return HELPERS.execute('npx rollup -c rollup.mjs.config.js');
}

function renameModules(match) {
    return match.replace(/['"]([\w\.\-\/]+)?['"]/g, function(_, module) {
        return module == "jquery" ? '"jquery"' : `"${module}.min"`;
    });
}

const terserOptions = {
    mangle: {
        reserved: [ "define", "KendoLicensing" ]
    }
};

function uglifyScripts(stream) {
    return stream
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(replace(/define\((?:["'][\w\.\-\/]+["'])?.+?\]/g, renameModules))
        .pipe(replace(/"kendo\.core"/g, '"kendo.core.min"'))
        .pipe(logger({ extname: '.min.js', showChange: true }))
        .pipe(terser(terserOptions))
        .pipe(rename({ suffix: ".min" }))
        .pipe(logger({ extname: '.js.map', showChange: true }))
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));
}

function distThirdParty() {
    return gulp.src('src/{jquery,angular,pako,jszip}*.*')
        .pipe(logger({ after: "ThirdParty: Scripts copied!", display: 'name', dest: './dist/js/', showChange: true }))
        .pipe(gulp.dest('dist/js'));
}

function minScripts() {
    return gulp.src(['dist/js/kendo.*.js', 'dist/js/cultures/*.js', 'dist/js/messages/*.js'], { base: "dist/js" })
        .pipe(filter(file => !/\.min\.js/.test(file.path)))
        .pipe(flatmap(uglifyScripts))
        .pipe(gulp.dest('dist/js'));
}

function mjsMin() {
    return gulp.src(['dist/mjs/kendo.*.js', 'dist/mjs/cultures/*.js', 'dist/mjs/messages/*.js'], { base: "dist/mjs" })
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(logger({ after: 'Terser: Uglify complete!', showChange: true }))
        .pipe(terser(terserOptions))
        .pipe(logger({ after: 'Sourcemap: Write complete!', extname: '.js.map', showChange: true }))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('dist/mjs'));
}

gulp.task('js-license', function() {
    return gulp.src(['dist/js/**/kendo.*.js', 'dist/mjs/**/kendo.*.js'], { base: './dist' })
        .pipe(flatmap(license))
        .pipe(gulp.dest('dist/temp'));
});

gulp.task("scripts", gulp.series(gulp.parallel(compileMjsScripts,
    gulp.series(compileScripts, gulp.parallel(distThirdParty, minScripts))
), mjsMin, 'js-license'));

gulp.task("custom", function() {
    var files = argv.c;

    if (!files) {
        throw new PluginError({
            task: "custom",
            plugin: "custom",
            message: "please provide a list of the components to be included in the build with -c, separated with ','"
        });
    }

    const imports = argv.c.split(',').map((bundles) => `import './src/kendo.${bundles}.js'`).join(';');

    var src = rollupStream({
            input: 'custom',
            output: {
                format: 'umd',
                globals: { jquery: '$' },
                strict: false
            },
            external: ['jquery'],
            treeshake: false,
            plugins: [
                require('@rollup/plugin-buble')(),
                require('@rollup/plugin-virtual')({
                    custom: `
                        import 'jquery';
                        ${imports}
                    `
                })
            ]
        })
        .pipe(source('kendo.custom.js'))
        .pipe(logger({ before: 'Custom: Bundling!', after: 'Custom: Bundle complete!', showChange: true }))
        .pipe(buffer())
        .pipe(flatmap(license));

    var minSrc = src
        .pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(logger({ after: 'Terser: Uglify complete!', extname: '.min.js', showChange: true }))
        .pipe(terser(terserOptions))
        .pipe(rename({ suffix: ".min" }))
        .pipe(logger({ after: 'Sourcemap: Write complete!', extname: '.js.map', showChange: true }))
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));

    return merge(src.pipe(gulp.dest('dist/js')), minSrc.pipe(gulp.dest('dist/js')));
});

gulp.task('build', gulp.series('scripts'));

gulp.task('tests', gulp.series(['karma-mocha']));

gulp.task('ci', gulp.series(['build', 'karma-ci']));

function compileModulesScripts() {
    return HELPERS.execute('npm run scripts:modules');
}

gulp.task('mdspell', shell.task(
    ['cd docs && mdspell "**/*.md" -n -a --report']
));

function packNpm() {
    var internalOption = "";
    var i = process.argv.indexOf("--channel");

    if (i > -1) {
        internalOption = process.argv[i + 1];
    }

    const dest = 'dist/npm';

    const cjs = gulp.src('dist/cjs/**/*')
        .pipe(gulp.dest(dest + '/js'));

    const js = gulp.src(['dist/js/**/*.min.js', 'dist/js/**/*.min.js.map'])
        .pipe(gulp.dest(dest + '/umd'));

    const esm = gulp.src('dist/esm/**/*.js')
        .pipe(gulp.dest(dest + '/esm'));

    const pkg = gulp.src('build/package-core.json')
        .pipe(replace("$KENDO_VERSION", kendoVersion + internalOption))
        .pipe(rename('package.json'))
        .pipe(gulp.dest(dest));

    const license = gulp.src('resources/legal/npm/core.txt')
        .pipe(replace("$YEAR", new Date().getFullYear()))
        .pipe(rename('LICENSE'))
        .pipe(gulp.dest(dest));

    const readme = gulp.src('resources/npm/core-README.md')
        .pipe(rename('README.md'))
        .pipe(gulp.dest(dest));

    const typings = gulp.src('typescript/kendo.all.d.ts')
        .pipe(rename('index.d.ts'))
        .pipe(gulp.dest(dest));

    return merge(cjs, js, esm, pkg, license, readme, typings);
}

gulp.task('npm-core', gulp.series(gulp.parallel('scripts', compileModulesScripts), packNpm));

const taskListing = require('gulp-task-listing');
gulp.task('tasks', taskListing.withFilters(/:/));

// Exit immediately on Ctrl+C
process.once('SIGINT', function() {
    process.exit();
});
