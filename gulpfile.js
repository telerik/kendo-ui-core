var gulp = require('gulp');
var shell = require('gulp-shell');
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
      // eslint-disable-next-line no-console
      process.stdout.on('data', (data) => { console.log(data.toString()); });
      // eslint-disable-next-line no-console
      process.stderr.on('data', (data) => { console.log(data.toString()); });
      process.on('exit', (code) => {
        // eslint-disable-next-line no-console
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
    },
    format: {
        comments: (node, comments) => comments.value.includes("Progress Software Corporation and/or one of its subsidiaries or affiliates. All rights reserved.") // Preserve license comment.
    }
};

function uglifyScripts(stream) {
    return stream
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(replace(/define\((?:["'][\w\.\-\/]+["'])?.+?\]/g, renameModules))
        .pipe(replace(/"kendo\.core"/g, '"kendo.core.min"'))
        .pipe(terser(terserOptions))
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulpIf(makeSourceMaps, sourcemaps.write("./")));
}

function minScripts() {
    return gulp.src(['dist/raw-js/kendo.*.js', 'dist/raw-js/cultures/*.js', 'dist/raw-js/messages/*.js'], { base: "dist/raw-js" })
        .pipe(gulp.dest('dist/js')) // copy the unminified files alongside the minified ones.
        .pipe(filter(file => !/\.min\.js/.test(file.path)))
        .pipe(flatmap(uglifyScripts))
        .pipe(gulp.dest('dist/js'));
}

function mjsMin() {
    return gulp.src(['dist/raw-mjs/kendo.*.js', 'dist/raw-mjs/cultures/*.js', 'dist/raw-mjs/messages/*.js'], { base: "dist/raw-mjs" })
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(terser(terserOptions))
        .pipe(sourcemaps.write("./"))
        .pipe(gulp.dest('dist/mjs'));
}

gulp.task('js-license', function() {
    return gulp.src(['dist/raw-js/**/kendo.*.js', 'dist/raw-mjs/**/kendo.*.js'], { base: './dist' })
        .pipe(flatmap(license))
        .pipe(gulp.dest((file) => {
            file.dirname = file.dirname.replace('raw-', '');
            return 'dist/temp';
        }));
});

gulp.task("scripts", gulp.series(gulp.parallel(compileMjsScripts,
    gulp.series(compileScripts, minScripts)
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
                require("@rollup/plugin-node-resolve").nodeResolve(),
                require('@rollup/plugin-virtual')({
                    custom: `
                        import 'jquery';
                        ${imports}
                    `
                })
            ]
        })
        .pipe(source('kendo.custom.js'))
        .pipe(buffer())
        .pipe(flatmap(license));

    var minSrc = src
        .pipe(clone())
        .pipe(gulpIf(makeSourceMaps, sourcemaps.init()))
        .pipe(terser(terserOptions))
        .pipe(rename({ suffix: ".min" }))
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
