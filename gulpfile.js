const gulp = require('gulp');
const replace = require("gulp-replace");
const rename = require("gulp-rename");

const merge = require('merge2');

const { version } = require("./build/gulp/kendo-version.mjs");

function packNpm() {
    let internalOption = "";
    let i = process.argv.indexOf("--channel");

    if (i > -1) {
        internalOption = process.argv[i + 1];
    }

    const dest = 'dist/npm';

    const cjs = gulp.src('dist/cjs/**/*')
        .pipe(gulp.dest(dest + '/js'));

    const js = gulp.src(['dist/js/**/*.min.js', 'dist/js/**/*.min.js.map'])
        .pipe(gulp.dest(dest + '/umd'));

    const esm = gulp.src('dist/mjs/**/*.js')
        .pipe(gulp.dest(dest + '/esm'));

    const pkg = gulp.src('build/package-core.json')
        .pipe(replace("$KENDO_VERSION", version + internalOption))
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

gulp.task('npm-core', packNpm);

const taskListing = require('gulp-task-listing');
gulp.task('tasks', taskListing.withFilters(/:/));

// Exit immediately on Ctrl+C
process.once('SIGINT', function() {
    process.exit();
});
