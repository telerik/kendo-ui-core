//var http = require('http');

//var x = 0;
//http.createServer(function (req, res) {

var fs = require("fs");
var sys = require("sys");
var wrench = require("./wrench");
var uglify = require("./uglify-js").uglify;
var parser = require("./uglify-js").parser;
var examples = require("./build-examples");
var spawn = require('child_process').spawn;

var VERSION = "1.0.0"; //build version upon date
var PATH = "release/" + VERSION;
var JS = PATH + "/js";
var SRC = PATH + "/src";

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
]

function processScripts() {
    //create folders if not exist!!!

    var all = "";
    scripts.forEach(function(file, key) {
        console.log("read file src/" + file);
        var data = fs.readFileSync("src/" + file, "utf8");

        if (data.charCodeAt(0) == 0xfeff) {
            data = data.substring(1);
        }

        fs.writeFile(SRC + "/" + file, data, function(error) {
            if (error) {
                console.log(file + " error: " + error);
                return;
            }
            console.log("write file: " + file + " to folder: " + SRC + " DONE!");
        });

        var ast = parser.parse(data);
        ast = uglify.ast_mangle(ast);
        ast = uglify.ast_squeeze(ast);
        data = uglify.gen_code(ast);

        fs.writeFile(JS + "/" + file.replace(".js", ".min.js"), data, function(error) {
            if (error) {
                console.log(file + " error: " + error);
                return;
            }
            console.log("write file: " + file.replace(".js", ".min.js") + " to folder: " + JS + " DONE!");
        });

        all += data;
    });

    fs.writeFile(JS + "/kendo.all.min.js", all, function(error) {
            if (error) {
                console.log("kendo.all.min.js error: " + error);
                return;
            }

            console.log("write file: kendo.all.min.js to folder: " + JS + " DONE!");

            console.log("end processing scritps...");
    });
}
//scripts
console.log("\r\nstart processing scritps...");
processScripts();

//styles
wrench.copyDirSyncRecursive("styles", PATH + "/styles");

//examples
examples.build(PATH + "/examples");

//archive everything
var zip = spawn("zip", ["-r", PATH + "/kendo." + VERSION + ".zip", PATH]);

zip.stdout.on('data', function (data) {
  sys.print('stdout: ' + data);
});

zip.stderr.on('data', function (data) {
  sys.print('stderr: ' + data);
});

zip.on('exit', function (code) {
    console.log('child process exited with code ' + code);
    //console.log("delete folder: " + PATH);
    //wrench.rmdirRecursive(PATH, function(error) {
    //    if (error) {
    //        console.log("could not delete directory : " + PATH);
    //    }
    //});
});

//  res.writeHead(200, {'Content-Type': 'text/plain'});
//  res.end('Hello World ' + x);
//}).listen(8124);
//console.log('Server running at http://127.0.0.1:8124/');
