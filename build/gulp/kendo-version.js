/* jshint browser:false, node:true, esnext: true */

var fs = require('fs');

var version = JSON.parse(fs.readFileSync('VERSION'));

var now = new Date();

var versionYear = version.year;

var month = Math.max((now.getMonth() + 1 + (now.getFullYear() - versionYear) * 12), 0);

var versionQ = version.release;

module.exports = process.env.VERSION || `${versionYear}.${versionQ}.${month * 100 + now.getDate()}`;
