var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    os = require("os"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    kendoScripts = require("./kendo-scripts"),
    cssmin = require("./lib/cssmin").cssmin,
    examples = require("./examples"),
    spawn = require('child_process').spawn,

    startDate = new Date(),
    STAT = fs.statSync("./"),
    VERSION = process.argv[2] || kendoBuild.generateVersion(),
    KENDOCDN = process.argv[3] || "http://cdn.kendostatic.com/" + VERSION,
    SRC = "src",
    RELEASE = "release",
    DEPLOY = "deploy",
    PATH = path.join(DEPLOY, "kendoUI"),
    JS = path.join(PATH, "js"),
    STYLES = path.join(PATH, "styles"),
    SOURCE = path.join(PATH, "source"),
    SOURCEJS = path.join(SOURCE, "js"),
    SOURCESTYLES = path.join(SOURCE, "styles"),
    ONLINEEXAMPLES = path.join(DEPLOY, "onlineExamples");

var cssRegExp = /\.css$/;

var bundles = [{
    name: "Commercial",
    license: "commercial",
    hasSource: true
}, {
    name: "Trial",
    license: "commercial",
    hasSource: false
}, {
    name: "OpenSource",
    license: "os",
    hasSource: true
}];

function mkdir(newDir) {
    try {
        fs.statSync(newDir)
    } catch(e) {
        fs.mkdirSync(newDir, STAT.mode);
    }
}

function zip(name, filesPath, success) {
    // cross-platform development example
    var archive;

    if (os.type() == "Linux") {
        archive = spawn("7z", [ "a", "-tzip", path.resolve(name), '*' ], { cwd: path.resolve(filesPath) });
    } else {
        archive = spawn("./build/lib/7z/7z", [ "a", "-tzip", name, path.join(filesPath, '*') ]);
    }

    archive.stderr.on('data', function (data) {
        sys.print('stderr: ' + data);
    });

    archive.on('exit', function (code) {
        if (code !== 0) {
            console.log("zip errro: " + code);
        }

        console.log("package " + name + " created.");

        if (success) {
            success();
        }
    });
}

function createDirectories() {
    mkdir(DEPLOY);
    mkdir(RELEASE);
    mkdir(PATH);
    mkdir(SOURCE);
    mkdir(ONLINEEXAMPLES)
}

function processScripts(license, copySource) {
    mkdir(JS);
    mkdir(SOURCEJS);

    if (copySource) {
        kendoScripts.deployScripts(SRC, SOURCEJS, license, false);
    }
    kendoScripts.deployScripts(SRC, JS, license, true);
}

function processStyles() {
    kendoBuild.copyDirSyncRecursive("styles", SOURCESTYLES, false, /\.(css|png|jpg|jpeg|gif)$/i);
    kendoBuild.copyDirSyncRecursive("styles", STYLES, false, /\.(css|png|jpg|jpeg|gif)$/i);

    fs.readdirSync(STYLES).forEach(function(file) {
        if (cssRegExp.test(file)) {
            file = path.join(STYLES, file);

            var data = fs.readFileSync(file, "utf8");
            var minified = cssmin(data);

            fs.writeFileSync(file, minified);
            fs.renameSync(file, file.replace(".css", ".min.css"));
        }
    });
}

function buildExamplesIndex() {
    var navigation = kendoBuild.readText("demos/examples/js/kendo.examples.nav.js");
    eval(navigation);

    var indexTemplate = kendoBuild.template(
        kendoBuild.readText("build/templates/simple-index.html")
    );

    delete categories.overview;

    fs.writeFileSync(PATH + "/examples/index.html", indexTemplate(categories));
}

function buildExamples() {
    kendoBuild.copyDirSyncRecursive("demos/examples", path.join(PATH, "/examples"));
    kendoBuild.copyTextFile("src/jquery.js", path.join(PATH, "/examples/js/jquery.js"));
    kendoBuild.processFilesRecursive(PATH + "/examples", /\.html$/, function(name) {
        var data = fs.readFileSync(name, "utf8");
        data = data.replace(/..\/..\/..\/styles/g, "../../source/styles");
        data = data.replace(/..\/..\/..\/src\/jquery.js/g, "../js/jquery.js");
        data = data.replace(/..\/..\/..\/src/g, "../../source/js");
        fs.writeFileSync(name, data);
    });

    buildExamplesIndex();
}

function buildBundle(bundle, success) {
    console.log("Building Web/DataViz " + bundle.name);

    kendoBuild.rmdirSyncRecursive(DEPLOY);
    createDirectories();

    console.log("Processing scripts");
    var license = kendoBuild.readText("resources/licenses/" + bundle.license + ".txt");
    processScripts(bundle.license, bundle.hasSource);

    console.log("Building themes");
    themes.build();

    console.log("Processing styles");
    processStyles();

    console.log("Copying cultures");
    kendoBuild.copyDirSyncRecursive("src/cultures", path.join(JS, "cultures"));

    console.log("Copying license");
    var data = fs.readFileSync("resources/Kendo\ Beta\ EULA.pdf");
    fs.writeFileSync(PATH + "/Kendo\ Beta\ EULA.pdf", data);

    data = fs.readFileSync("resources/licenses.txt");
    fs.writeFileSync(PATH + "/licenses.txt", data);

    console.log("Building examples");
    buildExamples();

    console.log("Packaging");
    zip(path.join(RELEASE, "kendoui.web_dataviz." + VERSION + "." + bundle.name + ".zip"), PATH, success);
}

function buildAllBundles(success, bundleIx) {
    bundleIx = bundleIx || 0;

    if (bundleIx < bundles.length) {
        buildBundle(bundles[bundleIx], function() {
            buildAllBundles(success, ++bundleIx);
        });
    } else {
        success();
    }
}

function buildOnlineExamples(success) {
    examples.build(PATH, ONLINEEXAMPLES, KENDOCDN);
    zip(path.join(RELEASE, "OnlineExamples.zip"), ONLINEEXAMPLES, success);
}

console.log("Build starting at " + startDate);

console.log("Merging multi-part scripts");
kendoScripts.mergeScripts("src/");

createDirectories();

buildAllBundles(function() {
    console.log("Building online examples");
    buildOnlineExamples(function() {
        console.log("Time elapsed: " + ((new Date() - startDate) / 1000) + " seconds");
    });
});

