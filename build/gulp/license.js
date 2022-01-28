/* jshint browser:false, node:true, esnext: true */

var insert = require('gulp-insert');
var lazypipe = require('lazypipe');
var argv = require('yargs').argv;
var fs = require('fs');
var replace = require('gulp-replace');
var kendoVersion = require('./kendo-version');

var license;
if (argv['license-pad']) {
license =
`/*!
${Array(22).join(Array(200).join(" ") + "\n")}
*/
`;
} else {
    license = fs.readFileSync('resources/legal/core-license.txt').toString();
    license = license
        .replace('<%= year %>', new Date().getFullYear())
        .replace('/**', '/*!');
}

module.exports = lazypipe()
    .pipe(replace, "$KENDO_VERSION", kendoVersion)
    .pipe(insert.prepend, license);
