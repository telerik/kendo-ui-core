/* jshint browser:false, node:true, esnext: true */

var fs = require('fs');
var concat = require('gulp-concat');
var lazypipe = require('lazypipe');
var foreach = require('gulp-foreach');
var amdOptimize = require("amd-optimize");
var ignore = require('gulp-ignore');
var debug = require('gulp-debug'); // jshint ignore:line

function gatherAmd(stream, file) {
    var amdConcat = lazypipe().pipe(concat, { path: file.path, base: "src" });

    var isBundle = fs.readFileSync(file.path).indexOf('"bundle all";') > -1;
    var moduleId = file.path.match(/kendo\.(.+)\.js/)[1];

    var gatherAMD = amdOptimize(`kendo.${moduleId}`, { baseUrl: "src", exclude: [ "jquery" ] });

    if (isBundle) {
        return stream
            .pipe(gatherAMD)
            .pipe(amdConcat());

    } else {
        var whitelist = [ `**/src/kendo.${moduleId}.js`, `**/src/${moduleId.replace('.', '/')}/**/*.js`, "**/{mixins,util}/**/*.js" ];

        return stream
            .pipe(gatherAMD)
            .pipe(ignore.include(whitelist))
            .pipe(amdConcat());
    }
}

function gatherCustomAmd(stream, file) {
    var moduleId = file.path.match(/kendo\.(.+)\.js/)[1];

    return stream.pipe(amdOptimize(`kendo.${moduleId}`, { baseUrl: "src", exclude: [ "jquery" ] }));
}

exports.gather = lazypipe()
    .pipe(foreach, gatherAmd);

exports.gatherCustom = lazypipe()
    .pipe(foreach, gatherCustomAmd);
