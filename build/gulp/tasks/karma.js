/* jshint browser:false, node:true, esnext: true, loopfunc: true */
var karma = require('karma');
var gulp = require('gulp');
var glob = require('glob');
var path = require('path');
var argv = require('yargs').argv;
var meta = require("../../kendo-meta.js");

// all files (including subfiles like editor/main.js etc.)
var allKendoFiles = meta.loadAll().map((f) => path.join('src', f));

// support different test sets for public|private repo
var TESTS = require(glob.sync('../../test-paths-*.js', { cwd: __dirname })[0]);

var browserOption = argv.browser;
var testsOption = argv.tests;
var jqueryOption = argv.jquery;

var tests, jquery, browsers;

if (testsOption) {
    tests = [ testsOption ];
} else {
    tests = [ "tests/!(download-builder)/**/*.js" ];
}

if (jqueryOption) {
    jquery = "http://code.jquery.com/jquery-" + jqueryOption + ".min.js";
} else {
    jquery = 'src/jquery.js';
}

if (browserOption) {
    browsers = [ browserOption ];
} else {
    browsers = ['Chrome'];
}

TESTS.beforeTestFiles.push(jquery);
TESTS.beforeTestFiles.push('tests/jquery.mockjax.js');
TESTS.beforeTestFiles.push('src/angular.js');
TESTS.beforeTestFiles.push('tests/angular-route.js');

var defaultOptions = {
    reportSlowerThan: 500,
    basePath: '',
    frameworks: ['qunit'],
    preprocessors: {
        'tests/**/.html': [],
        'tests/**/*-fixture.html': ['html2js']
    },
    reporters: ['progress'],
    colors: true,
    autoWatch: true,
    browsers: browsers,
    customLaunchers: {
        ChromiumTravis: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },

    junitReporter: {
      outputDir: '.',
      outputFile: argv['junit-results']
    },
    captureTimeout: 60000,
    browserNoActivityTimeout: 30000,
    singleRun: argv['single-run']
};

var flavours = {
    jenkins: {
        reporters: ['dots', 'junit'],
        singleRun: true,
        browsers: browsers,

        files: [].concat(
            TESTS.beforeTestFiles,
            allKendoFiles,
            TESTS.afterTestFiles,
            tests
        )
    },

    travis: {
        reporters: ['dots'],
        singleRun: true,
        browsers: [ 'ChromiumTravis' ],

        files: [].concat(
            TESTS.beforeTestFiles,
            TESTS.ciFiles,
            TESTS.afterTestFiles,
            tests
        )
    },

    unit: {
        files: [].concat(
            TESTS.beforeTestFiles,
            allKendoFiles,
            TESTS.afterTestFiles,
            tests
        )
    },

    legacyUnit: {
        browsers: browserOption ? [ browserOption ] : [],

        files: [].concat(
            TESTS.beforeTestFiles,
            allKendoFiles,
            TESTS.afterTestFiles,
            tests
        ).filter(function(x) {
            return !/(themeuilder|less)\.js|angular/i.test(x);
        })
    }
};

for (var flavour in flavours) {
    (function(flavour) {
        gulp.task('karma-' + flavour, function(done) {
            new karma.Server(Object.assign({}, defaultOptions, flavours[flavour]), done).start();
        });
    })(flavour);
}
