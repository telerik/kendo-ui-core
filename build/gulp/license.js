

var insert = require('gulp-insert');
var argv = require('yargs').argv;
var fs = require('fs');
var replace = require('gulp-replace');
var kendoVersion = require('./kendo-version').version;

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

module.exports = stream => stream
    .pipe(replace(/\$KENDO_VERSION/g, kendoVersion))
    .pipe(insert.prepend(license));
