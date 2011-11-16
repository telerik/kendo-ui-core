// Imports ====================================================================
var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    themes = require("./themes"),
    cssmin = require("./lib/cssmin").cssmin,
    kendoBuild = require("./kendo-build"),
    kendoExamples = require("./examples"),
    kendoScripts = require("./kendo-scripts"),
    mkdir = kendoBuild.mkdir,
    zip = kendoBuild.zip;

// Configuration ==============================================================
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

var VERSION = kendoBuild.generateVersion(),
    CDN_URL = process.argv[2] || "http://cdn.kendostatic.com/" + VERSION,
    SCRIPTS_ROOT = "src",
    STYLES_ROOT = "styles",
    DROP_LOCATION = "release",
    DEPLOY_ROOT = "deploy",
    DEPLOY_SOURCE = "source",
    DEPLOY_SCRIPTS = "js",
    DEPLOY_STYLES = "styles",
    DEPLOY_ONLINEEXAMPLES = "onlineExamples";

// Implementation ==============================================================
var startDate = new Date();

function initWorkspace() {
    kendoBuild.rmdirSyncRecursive(DEPLOY_ROOT);

    mkdir(DEPLOY_ROOT);
    mkdir(DROP_LOCATION);
}

function deployScripts(root, license, copySource) {
    var scriptsDest = path.join(root, DEPLOY_SCRIPTS),
        sourceRoot = path.join(root, DEPLOY_SOURCE),
        sourceDest = path.join(sourceRoot, DEPLOY_SCRIPTS);

    mkdir(scriptsDest);
    kendoScripts.deployScripts(SCRIPTS_ROOT, scriptsDest, license, true);

    if (copySource) {
        mkdir(sourceRoot);
        mkdir(sourceDest);
        kendoScripts.deployScripts(SCRIPTS_ROOT, sourceDest, license, false);
    }
}

function deployStyles(root, copySource) {
    var stylesDest = path.join(root, DEPLOY_STYLES),
        sourceRoot = path.join(root, DEPLOY_SOURCE),
        sourceDest = path.join(sourceRoot, DEPLOY_STYLES),
        cssFilter = /\.css$/,
        stylesFilter = /\.(css|png|jpg|jpeg|gif)$/i;

    mkdir(stylesDest);
    kendoBuild.copyDirSyncRecursive(STYLES_ROOT, stylesDest, false, stylesFilter);
    kendoBuild.processFilesRecursive(stylesDest, cssFilter, function(fileName) {
        var css = kendoBuild.readText(fileName),
            minified = cssmin(css);

        kendoBuild.writeText(fileName, minified);
        fs.renameSync(fileName, fileName.replace(".css", ".min.css"));
    });

    if (copySource) {
        mkdir(sourceRoot);
        mkdir(sourceDest);

        kendoBuild.copyDirSyncRecursive(STYLES_ROOT, sourceDest, false, stylesFilter);
    }
}

function buildExamplesIndex() {
    var navigation = kendoBuild.readText("demos/examples/js/kendo.examples.nav.js");
    eval(navigation);

    var indexTemplate = kendoBuild.template(
        kendoBuild.readText("build/templates/simple-index.html")
    );

    delete categories.overview;

    fs.writeFileSync(DEPLOY_ROOT + "/examples/index.html", indexTemplate(categories));
}

function buildExamples() {
    kendoBuild.copyDirSyncRecursive("demos/examples", path.join(DEPLOY_ROOT, "/examples"));
    kendoBuild.copyTextFile("src/jquery.js", path.join(DEPLOY_ROOT, "/examples/js/jquery.js"));
    kendoBuild.processFilesRecursive(DEPLOY_ROOT + "/examples", /\.html$/, function(name) {
        var data = fs.readFileSync(name, "utf8");
        data = data.replace(/..\/..\/..\/styles/g, "../../source/styles");
        data = data.replace(/..\/..\/..\/src\/jquery.js/g, "../js/jquery.js");
        data = data.replace(/..\/..\/..\/src/g, "../../source/js");
        fs.writeFileSync(name, data);
    });

    buildExamplesIndex();
}

function buildBundle(bundle, success) {
    var name = bundle.name,
        root = path.join(DEPLOY_ROOT, name),
        license = kendoBuild.readText("resources/licenses/" + bundle.license + ".txt");

    console.log("Building Web/DataViz " + name);
    mkdir(root);

    console.log("Deploying scripts");
    deployScripts(root, bundle.license, bundle.hasSource);

    console.log("Deploying styles");
    deployStyles(root, bundle.hasSource);

    success();
    return;

    console.log("Copying license");
    var data = fs.readFileSync("resources/Kendo\ Beta\ EULA.pdf");
    fs.writeFileSync(DEPLOY_ROOT + "/Kendo\ Beta\ EULA.pdf", data);

    data = fs.readFileSync("resources/licenses.txt");
    fs.writeFileSync(DEPLOY_ROOT + "/licenses.txt", data);

    console.log("Building examples");
    buildExamples();

    console.log("Packaging");
    zip(path.join(DROP_LOCATION, "kendoui.web_dataviz." + VERSION + "." + name + ".zip"), DEPLOY_ROOT, success);
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
    kendoExamples.build(DEPLOY_ROOT, ONLINEEXAMPLES, CDN_URL);
    zip(path.join(DROP_LOCATION, "OnlineExamples.zip"), ONLINEEXAMPLES, success);
}

console.log("Build starting at " + startDate);
initWorkspace();

console.log("Merging multi-part scripts");
kendoScripts.mergeScripts("src/");

console.log("Building themes");
themes.build();

buildAllBundles(function() {
    console.log("Building online examples");
    buildOnlineExamples(function() {
        console.log("Time elapsed: " + ((new Date() - startDate) / 1000) + " seconds");
    });
});

