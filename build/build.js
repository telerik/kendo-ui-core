var fs = require("fs");
var sys = require("sys");
var wrench = require("./wrench");
var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var cssmin = require("./lib/cssmin").cssmin;
var examples = require("./build-examples");
var spawn = require('child_process').spawn;

var date = new Date();
var STAT = fs.statSync("./");
var VERSION = generateVersion();
var QUATTER = "2011 Q1";
var RELEASE = "release/" + QUATTER + "/BETA";
var PATH = "kendo_" + VERSION;
var JS = PATH + "/js";
var STYLES = PATH + "/styles";
var SOURCE = PATH + "/source";
var SOURCEJS = SOURCE + "/js";
var SOURCESTYLES = SOURCE + "/styles";
var ONLINEEXAMPLES = "Kendo_OnlineExamples_" + VERSION;
var count = 0;

var cssRegExp = /\.css$/;

var scripts = [
    "kendo.core.js",
    "kendo.fx.js",
    "kendo.query.js",
    "kendo.data.js",
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

function zip(name, path) {
    var archive = spawn("./build/lib/zip", ["-r", name, path]);

    archive.stderr.on('data', function (data) {
        sys.print('stderr: ' + data);
    });

    archive.on('exit', function (code) {
        console.log("deleting temp folder: " + path);
        wrench.rmdirSyncRecursive(path);

        if (count === 1) {
            console.log("Time elapsed: " + ((new Date() - date) / 1000) + " seconds");
        }

        count++;
    });
}

function createDirectories() {
    mkdir("release");
    mkdir("release/" + QUATTER);
    mkdir(RELEASE);
    mkdir(PATH);
    mkdir(SOURCE);
    mkdir(ONLINEEXAMPLES)
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

console.log("start building...");
createDirectories();

//processing
console.log("process scripts...");
processScripts();

console.log("process styles...");
processStyles();

//examples
console.log("build examples...");
examples.build(SOURCE, PATH + "/examples", false);

console.log("build online examples...");
examples.build(PATH, ONLINEEXAMPLES, true);

//archives
console.log("archieve kendo.version.zip...");
zip(RELEASE + "/kendo." + VERSION + ".zip", PATH);

console.log("archieve online examples...");
zip(RELEASE + "/onlineExamples." + VERSION + ".zip", ONLINEEXAMPLES);
