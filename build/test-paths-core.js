exports.beforeTestFiles = [
    'dist/styles/web/kendo.common.min.css',
    'dist/styles/mobile/kendo.mobile.all.min.css',
    'dist/styles/web/kendo.rtl.css',
    { pattern: 'dist/styles/**/*.*', watched: true, included: false },
    { pattern: 'tests/window/blank.html', watched: true, included: false },
    { pattern: 'tests/**/*-fixture.html' }
];

exports.afterTestFiles = [
    'tests/kendo-test-helpers.js',
    'tests/**/test-helper.js'
];

exports.ciFiles = [
    'dist/js/kendo.ui.core.min.js',
    'dist/js/kendo.timezones.js',
    'dist/js/cultures/kendo.culture.de-DE.js',
    'dist/js/cultures/kendo.culture.bg-BG.js',
    'dist/js/cultures/kendo.culture.en-ZA.js',
    "dist/js/cultures/kendo.culture.es-ES.js"
];
