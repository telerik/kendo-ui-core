/* jshint browser:false, node:true, esnext: true */

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');

var compress = {
    unsafe       : true,
    hoist_vars   : true,
    pure_getters : true
};

var mangle = {
    reserved: [ "define" ]
};

function renameModules(match) {
  return match.replace(/['"]([\w\.\-\/]+)?['"]/g, function(_, module) {
    return module == "jquery" ? '"jquery"' : `"${module}.min"`
  });
}


module.exports = stream => {
    return stream
        .pipe(uglify({ mangle: mangle, compress: compress, warnings: false }))
        .pipe(replace(/define\("[\w\.\-\/]+".+?\]/g, renameModules))
        .pipe(replace(/"kendo\.core"/g, '"kendo.core.min"'))
        .pipe(rename({ suffix: ".min" }))
};
