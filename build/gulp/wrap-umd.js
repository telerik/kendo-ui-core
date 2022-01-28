/* jshint browser:false, node:true, esnext: true */

var insert = require('gulp-insert');
var lazypipe = require('lazypipe');

var umdBegin = `
(function(f){
    if (typeof define === 'function' && define.amd) {
        define(["kendo.core"], f);
    } else {
        f();
    }
}(function(){
`;

var umdEnd = "}));";

module.exports = lazypipe()
    .pipe(insert.prepend, umdBegin)
    .pipe(insert.append, umdEnd);

