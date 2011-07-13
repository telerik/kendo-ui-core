var fs = require("fs");
var sys = require("sys");
var path = require("path");
var wrench = require("./wrench");
var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var cssmin = require("./lib/cssmin").cssmin;
var examples = require("./build-examples");
var spawn = require('child_process').spawn;

var DIRNAME = __dirname;

var date = new Date();
var STAT = fs.statSync(path.resolve(DIRNAME, "../"));
var VERSION = generateVersion();
var QUATTER = "2011 Q1";
var RELEASE = path.resolve(DIRNAME, "../release/" + QUATTER + "/BETA");
var PATH = path.resolve(DIRNAME, "../kendo_" + VERSION);
var JS = PATH + "/js";
var STYLES = PATH + "/styles";
var SOURCE = PATH + "/source";
var SOURCEJS = SOURCE + "/js";
var SOURCESTYLES = SOURCE + "/styles";
var ONLINEEXAMPLES = path.resolve(DIRNAME, "../Kendo_OnlineExamples_" + VERSION);
var count = 0;

var cssRegExp = /\.css$/;

var scripts = [
    "kendo.core.js",
    "kendo.fx.js",
    "kendo.query.js",
    "kendo.data.js",
    "kendo.model.js",
    "kendo.draganddrop.js",
    "kendo.groupable.js",
    "kendo.resizable.js",
    "kendo.sortable.js",
    "kendo.selectable.js",
    "kendo.scroller.js",
    "kendo.pager.js",
    "kendo.popup.js",
    "kendo.list.js",
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

function generateVersion() {
    var day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    return date.getFullYear() + "_1_" + (date.getMonth() + 1) + "" + day;
}

function mkdir(newDir) {
    try {
        fs.statSync(newDir)
    } catch(e) {
        fs.mkdirSync(newDir, STAT.mode);
    }
}

function zip(name, path, folder) {
    var archive = spawn("./build/lib/7z/7z", ["a", "-tzip", name, path]);

    archive.stderr.on('data', function (data) {
        sys.print('stderr: ' + data);
    });

    archive.on('exit', function (code) {
        if (code !== 0) {
            console.log("zip errro: " + code);
        }
        console.log("deleting temp folder: " + folder);
        wrench.rmdirSyncRecursive(folder);

        if (count === 1) {
            console.log("Time elapsed: " + ((new Date() - date) / 1000) + " seconds");
        }

        count++;
    });
}

function createDirectories() {
    mkdir(path.resolve(DIRNAME, "../release"));
    mkdir(path.resolve(DIRNAME, "../release/" + QUATTER));
    mkdir(RELEASE);
    mkdir(PATH);
    mkdir(SOURCE);
    mkdir(ONLINEEXAMPLES);
}

function processScripts() {
    mkdir(JS);
    mkdir(SOURCEJS);

    var all = "";

    scripts.forEach(function(file, key) {
        var data = fs.readFileSync(path.resolve(DIRNAME, "../src") + "/" + file, "utf8");

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

    var absStylesPath = path.resolve(DIRNAME, "../styles");

    wrench.copyDirSyncRecursive(absStylesPath, SOURCESTYLES);
    wrench.copyDirSyncRecursive(absStylesPath, STYLES);

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

console.log("current folder: " + DIRNAME);

console.log("build start...");
createDirectories();

//processing
console.log("processing scripts...");
processScripts();

console.log("processing styles...");
processStyles();

//examples
console.log("building examples...");
//examples.build(SOURCE, PATH + "/examples", false);

console.log("building online examples...");
//examples.build(PATH, ONLINEEXAMPLES, true);

//archives
console.log("archieving kendo.version.zip...");
//zip(RELEASE + "/kendo_" + VERSION + ".zip", ".\\" + PATH.replace("/", "\\") + "\\*", PATH);

console.log("archieving online examples...");
//zip(RELEASE + "/onlineExamples_" + VERSION + ".zip", ".\\" + ONLINEEXAMPLES.replace("/", "\\") + "\\*", ONLINEEXAMPLES);
