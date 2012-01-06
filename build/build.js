#!/usr/bin/env node

// Imports ====================================================================
var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    kendoExamples = require("./examples"),
    kendoScripts = require("./kendo-scripts"),
    copyDir = kendoBuild.copyDirSyncRecursive,
    processFiles = kendoBuild.processFilesRecursive,
    mkdir = kendoBuild.mkdir,
    readText = kendoBuild.readText,
    template = kendoBuild.template,
    writeText = kendoBuild.writeText,
    zip = kendoBuild.zip;

var productionLicenses = [
    {name: "commercial", source: true},
    {name: "trial", source: false},
    {name: "open-source", source: true}
]

var betaLicenses = [
    {name: "beta", source: true}
]


// Configuration ==============================================================
var bundles = [{
    name: "kendoui.complete",
    suites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    licenses: productionLicenses,
    eula: "eula",
}, {
    name: "kendoui.web",
    suites: ["web"],
    licenses: productionLicenses,
    eula: "eula",
}, {
    name: "kendoui.dataviz",
    suites: ["dataviz"],
    licenses: productionLicenses,
    eula: "eula"
}, {
    name: "kendoui.mobile",
    suites: ["mobile"],
    licenses: betaLicenses,
    eula: "eula"
}];

var thirdPartyScripts = [
    "jquery.min.js"
];

var VERSION = kendoBuild.generateVersion(),
    LATEST = "latest",
    INDEX = "index.html",
    SCRIPTS_ROOT = "src",
    STYLES_ROOT = "styles",
    DEMOS_ROOT = path.join("demos", "mvc"),
    TEMPLATES_ROOT = path.join("build", "templates"),
    SUITE_INDEX = path.join(TEMPLATES_ROOT, "suite-index.html"),
    BUNDLE_INDEX = path.join(TEMPLATES_ROOT, "bundle-index.html"),
    CONTENT_ROOT = "content",
    VIEWS_ROOT = "Views",
    LEGAL_ROOT = path.join("resources", "legal"),
    THIRD_PARTY_ROOT = "third-party",
    DROP_LOCATION = "release",
    DEPLOY_ROOT = "deploy",
    DEPLOY_SOURCE = "source",
    DEPLOY_SCRIPTS = "js",
    DEPLOY_STYLES = "styles",
    DEPLOY_EXAMPLES = "examples",
    DEPLOY_LEGAL_ROOT = "LicenseAgreements",
    DEPLOY_THIRD_PARTY_ROOT = "ThirdParty",
    DEPLOY_ONLINEEXAMPLES = "online-examples",
    ONLINE_EXAMPLES_PACKAGE = "kendoui-online-examples.zip";

    var startDate = new Date(),
        licenseTemplate = template(readText(path.join(LEGAL_ROOT,  "src-license.txt"))),
        SRC_LICENSE = licenseTemplate({ version: VERSION, year: startDate.getFullYear() });

// Implementation ==============================================================

function initWorkspace() {
    kendoBuild.rmdirSyncRecursive(DEPLOY_ROOT);

    mkdir(DEPLOY_ROOT);
    mkdir(DROP_LOCATION);
}

function deployScripts(root, bundle, license, hasSource) {
    var scriptsDest = path.join(root, DEPLOY_SCRIPTS),
        sourceRoot = path.join(root, DEPLOY_SOURCE),
        sourceDest = path.join(sourceRoot, DEPLOY_SCRIPTS);

    mkdir(scriptsDest);

    if (hasSource) {
        mkdir(sourceRoot);
        mkdir(sourceDest);
    }

    bundle.suites.forEach(function(suite) {
        var buildSuitScripts = function(dest, compress) {
            kendoScripts.buildSuiteScripts(suite, dest, license, compress);

            if (bundle.combinedScript) {
                kendoScripts.buildCombinedScript(
                    bundle.combinedScript, bundle.suites,
                    dest, license, compress);
            }
        };

        buildSuitScripts(scriptsDest, true);

        if (hasSource) {
            buildSuitScripts(sourceDest, false);
        }
    });
}

function deployStyles(root, license, copySource) {
    var stylesDest = path.join(root, DEPLOY_STYLES),
        sourceRoot = path.join(root, DEPLOY_SOURCE),
        sourceDest = path.join(sourceRoot, DEPLOY_STYLES);

    kendoBuild.deployStyles(STYLES_ROOT, stylesDest, license, true);
    kendoBuild.rmdirSyncRecursive(path.join(stylesDest, "mobile"));

    if (copySource) {
        mkdir(sourceRoot);
        mkdir(sourceDest);

        kendoBuild.deployStyles(STYLES_ROOT, sourceDest, license, false);
        kendoBuild.rmdirSyncRecursive(path.join(sourceDest, "mobile"));
    }
}

function deployLicenses(root, bundle) {
    var deployLegalRoot = path.join(root, DEPLOY_LEGAL_ROOT),
        deployThirdPartyRoot = path.join(root, DEPLOY_LEGAL_ROOT, DEPLOY_THIRD_PARTY_ROOT);

    kendoBuild.mkdir(deployLegalRoot);
    kendoBuild.mkdir(deployThirdPartyRoot);

    copyDir(
        path.join(LEGAL_ROOT, bundle.eula),
        deployLegalRoot
    );

    copyDir(
        path.join(LEGAL_ROOT, THIRD_PARTY_ROOT),
        deployThirdPartyRoot
    );
}

function deployExamples(root, bundle) {
    var examplesRoot = path.join(root, DEPLOY_EXAMPLES),
        viewsRoot = path.join(DEMOS_ROOT, VIEWS_ROOT),
        suiteIndexTemplate = template(readText(SUITE_INDEX)),
        bundleIndexTemplate = template(readText(BUNDLE_INDEX)),
        bundleIndex = bundleIndexTemplate(bundle);

    kendoBuild.mkdir(examplesRoot);

    writeText(path.join(examplesRoot, INDEX), bundleIndex)

    copyDir(
        path.join(DEMOS_ROOT, CONTENT_ROOT),
        path.join(examplesRoot, CONTENT_ROOT)
    );

    bundle.suites.forEach(function(suite) {
        var navigationFile = path.join(DEMOS_ROOT, "App_Data", suite + ".nav.json"),
            exampleTemplate = template(readText(path.join(TEMPLATES_ROOT, suite + "-example.html"))),
            navigationData = readText(navigationFile),
            navigation = JSON.parse(navigationData),
            suiteDest = path.join(examplesRoot, suite),
            suiteIndex = suiteIndexTemplate(navigation);

        kendoBuild.mkdir(suiteDest);
        writeText(path.join(suiteDest, INDEX), suiteIndex)

        for (var category in navigation) {
            for (var widgetIx = 0, widgets = navigation[category]; widgetIx < widgets.length; widgetIx++) {
                for (var exampleIx = 0, examples = widgets[widgetIx].items; exampleIx < examples.length; exampleIx++) {
                    var example = examples[exampleIx],
                    viewName = example.url.replace("html", "cshtml"),
                    fileName = path.join(viewsRoot, suite, viewName),
                    outputName = path.join(suiteDest, example.url),
                    params = {
                        body: readText(fileName),
                        title: example.text
                    };

                    kendoBuild.mkdir(path.dirname(outputName));
                    writeText(outputName, exampleTemplate(params));
                }
            }
        }
    });
}

function deployThirdPartyScripts(outputRoot) {
    thirdPartyScripts.forEach(function(scriptName) {
        kendoBuild.copyFileSync(
            path.join(SCRIPTS_ROOT, scriptName),
            path.join(outputRoot, DEPLOY_SCRIPTS, scriptName)
        );
    });
}

function buildBundle(bundle, success) {
    var name = bundle.name,
        zips = 0;

    bundle.licenses.forEach(function(license) {
        var licenseName = license.name,
            hasSource = license.source,
            deployName = name + "." + VERSION + "." + licenseName,
            root = path.join(DEPLOY_ROOT, name + "." + licenseName),
            packageName = path.join(DROP_LOCATION, deployName + ".zip"),
            packageNameLatest = packageName.replace(VERSION, LATEST);

        console.log("Building " + deployName);
        mkdir(root);

        console.log("Deploying scripts");
        deployScripts(root, bundle, SRC_LICENSE, hasSource);
        deployThirdPartyScripts(root);

        console.log("Deploying styles");
        deployStyles(root, SRC_LICENSE, hasSource);

        console.log("Deploying licenses");
        deployLicenses(root, bundle);

        console.log("Deploying examples");
        deployExamples(root, bundle);

        zip(packageName, root, function() {
            kendoBuild.copyFileSync(packageName, packageNameLatest);

            if (success && ++zips === bundle.licenses.length) {
                success();
            }
        });
    });
}

function buildAllBundles(success, bundleIx) {
    bundleIx = bundleIx || 0;

    if (bundleIx < bundles.length) {
        buildBundle(bundles[bundleIx], function() {
            buildAllBundles(success, ++bundleIx);
        });
    } else {
        if (success) {
            success();
        }
    }
}

console.log("Build starting at " + startDate);
initWorkspace();

console.log("Merging multi-part scripts");
kendoScripts.mergeScripts();

console.log("Building themes");
themes.build();

buildAllBundles();

