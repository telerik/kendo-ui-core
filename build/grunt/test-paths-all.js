exports.beforeTestFiles = [
    'dist/styles/mobile/kendo.mobile.all.css',
    'dist/styles/web/kendo.common.css',
    'dist/styles/dataviz/kendo.dataviz.css',
    'dist/styles/web/kendo.rtl.css',
    { pattern: 'dist/styles/**/*.*', watched: true, included: false },
    { pattern: 'tests/router/sandbox.html', watched: true, included: false },
    { pattern: 'tests/window/blank.html', watched: true, included: false },
    { pattern: 'tests/editor/editorStyles.css', included: false },
    { pattern: "tests/download-builder/*.js", included: false },
    { pattern: 'tests/**/*-fixture.html' }
];

exports.afterTestFiles = [
    'src/kendo.timezones.js',
    'src/cultures/kendo.culture.de-DE.js',
    'src/cultures/kendo.culture.bg-BG.js',
    'src/cultures/kendo.culture.en-ZA.js',
    "src/cultures/kendo.culture.es-ES.js",

    'tests/kendo-test-helpers.js',
    'tests/**/test-helper.js',
    'demos/mvc/content/shared/js/less.js',
    'demos/mvc/content/mobilethemebuilder/scripts/colorengine.js',
    'demos/mvc/content/mobilethemebuilder/scripts/gradientengine.js',

    'tests/dv-export-tests.js',
    'tests/chart/util.js',
    'tests/chart/base-line-chart.js',
    'tests/map/util.js',
    'tests/map/layers/base.js',

    'themebuilder/scripts/themebuilder.js',

    'tests/chart/util.js',
    'tests/upload/helper.js',
    'tests/upload/select.js',
    'tests/upload/selection.js',
    'tests/upload/async.js',
    'tests/upload/asyncnomultiple.js',
    'tests/upload/asyncnoauto.js',
    'tests/upload/upload.js',
    'tests/upload/success.js',
    'tests/upload/error.js',
    'tests/upload/cancel.js',
    'tests/upload/remove.js',

    { pattern: 'src/kendo.editor.js', included: false },
    { pattern: 'src/kendo.aspnetmvc.js', included: false },

    'tests/diagram/common.js',
    'demos/mvc/content/shared/js/kendo-dojo.js'
];

exports.ciFiles = [ 'dist/js/kendo.all.min.js', 'dist/js/kendo.aspnetmvc.min.js'  ];
