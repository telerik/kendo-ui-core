var fs = require("fs"),
    sys = require("sys"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    cssmin = require("./lib/cssmin").cssmin,
    examples = require("./examples"),
    spawn = require('child_process').spawn,

    date = new Date(),
    STAT = fs.statSync("./"),
    VERSION = process.argv[2] || generateVersion(),
    KENDOCDN = process.argv[3] || "http://cdn.kendostatic.com/" + VERSION,
    RELEASE = "release/",
    DEPLOY = "deploy/",
    PATH = DEPLOY + "kendoUI",
    JS = PATH + "/js",
    STYLES = PATH + "/styles",
    SOURCE = PATH + "/source",
    SOURCEJS = SOURCE + "/js",
    SOURCESTYLES = SOURCE + "/styles",
    ONLINEEXAMPLES = DEPLOY + "onlineExamples",
    count = 0;

var cssRegExp = /\.css$/;

var scripts = [
    "kendo.core.js",
    "kendo.fx.js",
    "kendo.data.odata.js",
    "kendo.data.xml.js",
    "kendo.model.js",
    "kendo.data.js",
    "kendo.draganddrop.js",
    "kendo.groupable.js",
    "kendo.resizable.js",
    "kendo.sortable.js",
    "kendo.selectable.js",
    "kendo.scroller.js",
    "kendo.pageable.js",
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
    return date.getFullYear() + ".2." + (date.getMonth() + 1) + "" + day;
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

        console.log("package " + name + " created.");

        if (count === 1) {
            console.log("Time elapsed: " + ((new Date() - date) / 1000) + " seconds");
        }

        count++;
    });
}

function createDirectories() {
    mkdir(DEPLOY);
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

        all += data;

        data = kendoBuild.minifyJs(data);

        fs.writeFileSync(JS + "/" + file.replace(".js", ".min.js"), data);

    });

    all = kendoBuild.minifyJs(all);

    fs.writeFileSync(JS + "/kendo.all.min.js", all);
}

function processStyles() {
    kendoBuild.copyDirSyncRecursive("styles", SOURCESTYLES, false, /\.(css|png|jpg|jpeg|gif)$/i);
    kendoBuild.copyDirSyncRecursive("styles", STYLES, false, /\.(css|png|jpg|jpeg|gif)$/i);

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

function buildExamples() {
    kendoBuild.copyDirSyncRecursive("demos/examples", PATH + "/examples");
    copyTextFile("src/jquery.js", PATH + "/examples/js/jquery.js");
    processFilesRecursive(PATH + "/examples", /\.html$/, function(name) {
        var data = fs.readFileSync(name, "utf8");
        data = data.replace(/..\/..\/..\/styles/g, "../../source/styles");
        data = data.replace(/..\/..\/..\/src\/jquery.js/g, "../js/jquery.js");
        data = data.replace(/..\/..\/..\/src/g, "../../source/js");
        fs.writeFileSync(name, data);
    });

    var navigation = fs.readFileSync("demos/examples/js/kendo.examples.js", "utf8");
    navigation = navigation.match(/\/\/ BEGIN NAVIGATION([\s\S]*)\/\/ END NAVIGATION/g)[0];
    eval(navigation);

    var categoryTemplate = template(
        "<h2><#= name #></h2>" +
        "<ul><# for(var i = 0; i < children.length; i++) { #>" +
        "<li><#= children[i].text #>" +
        "<ul>" +
        "<# for (var k = 0; k < children[i].items.length; k++) { #>" +
        "<li><a href='<#= children[i].items[k].url #>'><#= children[i].items[k].text #></a></li>" +
        "<# } #></ul></li>" +
        "<# } #></ul>");

    var simpleIndex = "";
    for (var c in categories) {
        simpleIndex += categoryTemplate({ name: c, children: categories[c] });
    }
    fs.writeFileSync(PATH + "/examples/index.html", simpleIndex);
}

function processFilesRecursive(dir, filterRegex, callback) {
    var files = fs.readdirSync(dir),
        fileName,
        stat;

    for (var i = 0; i < files.length; i++) {
        var fileName = dir + "/" + files[i];
        var stat = fs.statSync(fileName);

        if (!stat.isFile()) {
            processFilesRecursive(fileName, filterRegex, callback);
        } else if (filterRegex.test(fileName)) {
            callback(fileName);
        }
    }
}

function template(template) {
    var paramName = "data",
        begin =  "<#",
        end = "#>",
        useWithBlock = true,
        functionBody = "var o;",
        evalRegExp = /<#=(.+?)#>/g,
        quoteRegExp = /'(?=[^<"]*#>)/g,
        newLineTabRegExp = /[\r\t\n]/g;

    if (typeof template === "function") {
        if (template.length === 2) {
            //looks like jQuery.template
            return function(d) {
                return template($, { data: d }).join("");
            }
        }
        return template;
    }

    functionBody += useWithBlock ? "with(" + paramName + "){" : "";

    functionBody += "o='";

    functionBody += template.replace(newLineTabRegExp, " ")
        .replace(quoteRegExp,"\t")
        .split("'").join("\\'")
        .split("\t").join("'")
        .replace(evalRegExp, "'+($1)+'")
        .split(begin).join("';")
        .split(end).join("o+='");

    functionBody += useWithBlock ? "';}" : "';";

    functionBody += "return o;";

    return new Function(paramName, functionBody);
}

function copyTextFile(src, dest) {
    fs.writeFileSync(dest, fs.readFileSync(src, "utf8"), "utf8");
}

console.log("build initiated.");
createDirectories();

//processing
console.log("processing scripts...");
processScripts();

console.log("building themes...");
themes.build();

console.log("processing styles...");
processStyles();

console.log("copying culture js files...");
kendoBuild.copyDirSyncRecursive("src/cultures", JS + "/cultures");

console.log("copying license agreement...");
var data = fs.readFileSync("resources/Kendo\ Beta\ EULA.pdf");
fs.writeFileSync(PATH + "/Kendo\ Beta\ EULA.pdf", data);

console.log("building examples...");
buildExamples();

console.log("building online examples...");
examples.build(PATH, ONLINEEXAMPLES, KENDOCDN);

//archives
console.log("packaging distribution...");
zip(RELEASE + "KendoUI_" + VERSION + ".zip", ".\\" + PATH.replace("/", "\\") + "\\*", PATH);

console.log("packaging online examples...");
zip(RELEASE + "OnlineExamples_" + VERSION + ".zip", ".\\" + ONLINEEXAMPLES.replace("/", "\\") + "\\*", ONLINEEXAMPLES);
