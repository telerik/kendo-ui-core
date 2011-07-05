//var http = require('http');

//var x = 0;
//http.createServer(function (req, res) {

var fs = require("fs");
var sys = require("sys");
var wrench = require("./wrench");
var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var cssmin = require("./lib/cssmin").cssmin;
var examples = require("./build-examples");
var spawn = require('child_process').spawn;

var STAT = fs.statSync("./");
var VERSION = "1.0.0"; //build version upon date
var RELEASE = "release/beta";
var PATH = "kendo-" + VERSION;
var JS = PATH + "/js";
var STYLES = PATH + "/styles";
var SOURCE = PATH + "/source";
var SOURCEJS = SOURCE + "/js";
var SOURCESTYLES = SOURCE + "/styles";

var cssRegExp = /\.css$/;

var scripts = [
    "kendo.core.js",
    "kendo.fx.js",
    "kendo.query.js",
    "kendo.datasource.js",
    "kendo.model.js",
    "kendo.binder.js",
    "kendo.draganddrop.js",
    "kendo.groupable.js",
    "kendo.resizable.js",
    "kendo.sortable.js",
    "kendo.selectable.js",
    "kendo.scroller.js",
    "kendo.pager.js",
    "kendo.popup.js",
    "kendo.list.js",
    "kendo.listView.js",
    "kendo.autocomplete.js",
    "kendo.dropdownlist.js",
    "kendo.combobox.js",
    "kendo.chart.js",
    "kendo.grid.js",
    "kendo.menu.js",
    "kendo.panelbar.js",
    "kendo.tabstrip.js",
    "kendo.treeview.js",
    "kendo.slider.js",
    "kendo.splitter.js",
    "kendo.upload.js",
    "kendo.window.js"
];

function mkdir(newDir) {
    try {
        fs.statSync(newDir)
    } catch(e) {
        fs.mkdirSync(newDir, STAT.mode);
    }
}

function processScripts() {
    mkdir(JS);
    mkdir(SOURCEJS);

    var all = "";

    scripts.forEach(function(file, key) {
        var data = fs.readFileSync("src/" + file, "utf8");

        if (data.charCodeAt(0) == 0xfeff) {
            data = data.substring(1);
        }

        fs.writeFileSync(SOURCEJS + "/" + file, data);

        var ast = parser.parse(data);
        ast = uglify.ast_mangle(ast);
        ast = uglify.ast_squeeze(ast);
        data = uglify.gen_code(ast);

        fs.writeFileSync(JS + "/" + file.replace(".js", ".min.js"), data);

        all += data;
    });

    fs.writeFileSync(PATH + "/kendo.all.min.js", all);
}

function processStyles() {
    wrench.copyDirSyncRecursive("styles", SOURCESTYLES);
    wrench.copyDirSyncRecursive("styles", STYLES);

    fs.readdirSync(STYLES).forEach(function(file) {
        if (cssRegExp.test(file)) {
            file = STYLES + "/" + file;

            var data = fs.readFileSync(file, "utf8");
            var minified = cssmin(data);

            fs.writeFileSync(file, minified);
            fs.renameSync(file, file.replace(".css", ".min.css"));
        }
    });
}

var time = new Date();

//start build process
mkdir("release"); //should make mkdir to create folders recursively !!!
mkdir(RELEASE);
mkdir(PATH);
mkdir(SOURCE);

//scripts
console.log("\r\nstart processing scritps...");
processScripts();

//styles
processStyles();

//examples
examples.build(PATH + "/examples");

//archive everything
var zip = spawn("./build/lib/zip", ["-r", RELEASE + "/kendo." + VERSION + ".zip", PATH]);

//zip.stdout.on('data', function (data) {
//  sys.print('stdout: ' + data);
//});

zip.stderr.on('data', function (data) {
  sys.print('stderr: ' + data);
});

zip.on('exit', function (code) {
    console.log('child process exited with code ' + code);
    console.log("delete folder: " + PATH);
    wrench.rmdirRecursive(PATH, function(error) {
        if (error) {
            console.log("could not delete directory : " + PATH);
        }
    });
});

var onlineExamples = "onlineExamples-" + VERSION;
mkdir(onlineExamples)

examples.onlineExamples(PATH, onlineExamples);

zip2 = spawn("./build/lib/zip", ["-r", RELEASE + "/onlineExamples." + VERSION + ".zip", onlineExamples]);

zip2.stderr.on('data', function (data) {
  sys.print('stderr: ' + data);
});

zip2.on('exit', function (code) {
    console.log("delete folder: " + onlineExamples);
    wrench.rmdirRecursive(onlineExamples, function(error) {
        if (error) {
            console.log("could not delete directory : " + onlineExamples);
        }
    });
});

//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World ' + x);
//}).listen(8124);
//console.log('Server running at http://127.0.0.1:8124/');
