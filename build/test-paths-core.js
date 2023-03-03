const packageJson = require("../package.json");
const themesVersion = packageJson.devDependencies[
    Object.keys(packageJson.devDependencies).filter((dep) =>
        dep.startsWith("@progress/kendo-theme")
    )[0]
].replace(/[\^~\*x]/, "");

exports.beforeTestFiles = [
    `https://kendo.cdn.telerik.com/themes/${themesVersion}/default/default-ocean-blue.css`,
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
