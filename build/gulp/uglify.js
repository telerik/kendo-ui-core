/* jshint browser:false, node:true, esnext: true */

var lazypipe = require('lazypipe');
var uglify = require('gulp-uglify');
var logger = require('gulp-logger');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var compress = {
    unsafe       : true,
    hoist_vars   : true,
    warnings     : false,
    pure_getters : true
};

var mangle = {
    except: [ "define" ]
};

function renameModules(match) {
  return match.replace(/['"]([\w\.\-\/]+)?['"]/g, function(_, module) {
    return module == "jquery" ? '"jquery"' : `"${module}.min"`
  });
}


module.exports = lazypipe()
    .pipe(logger, { after: 'uglify complete', extname: '.min.js', showChange: true })
    .pipe(uglify, { compress, mangle, preserveComments: "license" })
    .pipe(replace, /define\("[\w\.\-\/]+".+?\]/g, renameModules)
    .pipe(replace, /"kendo\.core"/g, '"kendo.core.min"')
    .pipe(rename, { suffix: ".min" });
