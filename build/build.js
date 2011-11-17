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
    name: "kendoui.web_dataviz",
    license: "Commercial",
    eula: "EULA-Kendo.pdf",
    hasSource: true
}, {
    name: "kendoui.web_dataviz",
    license: "Trial",
    eula: "EULA-Kendo.pdf",
    hasSource: false
}, {
    name: "kendoui.web_dataviz",
    license: "OpenSource",
    eula: "EULA-Kendo.pdf",
    hasSource: true
}];

var sourceLicenses = {
    "Commercial": "src-commercial.txt",
    "Trial": "src-commercial.txt",
    "OpenSource": "src-os.txt"
};

var VERSION = kendoBuild.generateVersion(),
    CDN_URL = process.argv[2] || "http://cdn.kendostatic.com/" + VERSION,
    SCRIPTS_ROOT = "src",
    STYLES_ROOT = "styles",
    LEGAL_ROOT = "resources/legal",
    THIRD_PARTY_LICENSES = "licenses.txt",
    DROP_LOCATION = "release",
    DEPLOY_ROOT = "deploy",
    DEPLOY_SOURCE = "source",
    DEPLOY_SCRIPTS = "js",
    DEPLOY_STYLES = "styles",
    DEPLOY_ONLINEEXAMPLES = "onlineExamples",
    ONLINE_EXAMPLES_PACKAGE = "OnlineExamples.zip";

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

function deployLicenses(root, bundle) {
    kendoBuild.copyFileSync(
        path.join(LEGAL_ROOT, bundle.eula),
        path.join(root, bundle.eula)
    );

    kendoBuild.copyFileSync(
        path.join(LEGAL_ROOT, THIRD_PARTY_LICENSES),
        path.join(root, THIRD_PARTY_LICENSES)
    );
}

function deployExamples(root) {
    kendoBuild.copyDirSyncRecursive("demos/examples", path.join(root, "/examples"));
    kendoBuild.copyTextFile("src/jquery.js", path.join(root, "/examples/js/jquery.js"));
    kendoBuild.processFilesRecursive(root + "/examples", /\.html$/, function(name) {
        var data = fs.readFileSync(name, "utf8");
        data = data.replace(/..\/..\/..\/styles/g, "../../source/styles");
        data = data.replace(/..\/..\/..\/src\/jquery.js/g, "../js/jquery.js");
        data = data.replace(/..\/..\/..\/src/g, "../../source/js");
        fs.writeFileSync(name, data);
    });

    buildExamplesIndex(root);
}

function buildExamplesIndex(root) {
    var navigation = kendoBuild.readText("demos/examples/js/kendo.examples.nav.js");
    eval(navigation);

    var indexTemplate = kendoBuild.template(
        kendoBuild.readText("build/templates/simple-index.html")
    );

    delete categories.overview;

    fs.writeFileSync(root + "/examples/index.html", indexTemplate(categories));
}

function buildBundle(bundle, success) {
    var name = bundle.name,
        license = bundle.license,
        deployName = name + "." + VERSION + "." + license,
        root = path.join(DEPLOY_ROOT, deployName),
        srcLicenseFile = sourceLicenses[license],
        srcLicense = kendoBuild.readText(path.join(LEGAL_ROOT, srcLicenseFile)),
        packageName = path.join(DROP_LOCATION, deployName + ".zip");

    console.log("Building " + deployName);
    mkdir(root);

    console.log("Deploying scripts");
    deployScripts(root, srcLicense, bundle.hasSource);

    console.log("Deploying styles");
    deployStyles(root, bundle.hasSource);

    console.log("Deploying licenses");
    deployLicenses(root, bundle);

    console.log("Deploying examples");
    deployExamples(root);

    zip(packageName, root, success);
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
    kendoExamples.build("", DEPLOY_ONLINEEXAMPLES, CDN_URL);
    zip(path.join(DROP_LOCATION, ONLINE_EXAMPLES_PACKAGE), DEPLOY_ONLINEEXAMPLES, success);
}

console.log("Build starting at " + startDate);
initWorkspace();

console.log("Merging multi-part scripts");
kendoScripts.mergeScripts(SCRIPTS_ROOT);

console.log("Building themes");
themes.build();

buildAllBundles(function() {
    console.log("Building online examples");
    buildOnlineExamples(function() {
        console.log("Time elapsed: " + ((new Date() - startDate) / 1000) + " seconds");
    });
});

