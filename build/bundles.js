// Imports ====================================================================
var fs = require("fs"),
    sys = require("sys"),
    path = require("path"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    kendoScripts = require("./kendo-scripts"),
    copyDir = kendoBuild.copyDirSyncRecursive,
    processFiles = kendoBuild.processFilesRecursive,
    mkdir = kendoBuild.mkdir,
    readText = kendoBuild.readText,
    template = kendoBuild.template,
    writeText = kendoBuild.writeText,
    zip = kendoBuild.zip;

var commercialLicense = {name: "commercial", source: true};

var productionLicenses = [
    commercialLicense,
    {name: "trial", source: false},
    {name: "open-source", source: true}
];

var betaLicenses = [
    {name: "beta", source: true}
];


// Configuration ==============================================================
var cdnBundle = {
    name: "kendoui.cdn",
    suites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    licenses: betaLicenses,
    eula: "beta-eula",
};

var bundles = [{
    name: "kendoui.complete",
    suites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    licenses: betaLicenses,
    eula: "beta-eula",
}, {
    name: "kendoui.web",
    suites: ["web"],
    licenses: betaLicenses,
    eula: "beta-eula",
}, {
    name: "kendoui.dataviz",
    suites: ["dataviz"],
    licenses: betaLicenses,
    eula: "beta-eula"
}, {
    name: "kendoui.mobile",
    suites: ["mobile"],
    licenses: betaLicenses,
    eula: "beta-eula"
}];

var thirdPartyScripts = [
    "jquery.min.js"
];

var LATEST = "latest",
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
    DEPLOY_CULTURES = path.join(DEPLOY_SCRIPTS, "cultures"),
    DEPLOY_EXAMPLES = "examples",
    DEPLOY_LEGAL_ROOT = "LicenseAgreements",
    DEPLOY_THIRD_PARTY_ROOT = "ThirdParty",
    DEPLOY_ONLINEEXAMPLES = "online-examples",
    ONLINE_EXAMPLES_PACKAGE = "kendoui-online-examples.zip";

    var startDate = new Date(),
        licenseTemplate = template(readText(path.join(LEGAL_ROOT,  "src-license.txt")));

// Implementation ==============================================================
function clean() {
    kendoBuild.rmdirSyncRecursive(DEPLOY_ROOT);

    mkdir(DEPLOY_ROOT);
    mkdir(DROP_LOCATION);
}

function deployScripts(root, bundle, license, hasSource) {
    var scriptsDest = path.join(root, DEPLOY_SCRIPTS),
        culturesDest = path.join(root, DEPLOY_CULTURES),
        sourceRoot = path.join(root, DEPLOY_SOURCE),
        sourceDest = path.join(sourceRoot, DEPLOY_SCRIPTS),
        culturesSourceDest = path.join(sourceRoot, DEPLOY_CULTURES);

    mkdir(scriptsDest);
    mkdir(culturesDest);

    if (hasSource) {
        mkdir(sourceRoot);
        mkdir(sourceDest);
        mkdir(culturesSourceDest);
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

    kendoScripts.buildCultures(scriptsDest, license, true);

    if (hasSource) {
        kendoScripts.buildCultures(sourceDest, license, false);
    }
}

function deployStyles(root, bundle, license, copySource) {
    var stylesDest = path.join(root, DEPLOY_STYLES),
        sourceRoot = path.join(root, DEPLOY_SOURCE),
        sourceDest = path.join(sourceRoot, DEPLOY_STYLES);

    if (copySource) {
        mkdir(sourceRoot);
        mkdir(sourceDest);
    }

    bundle.suites.forEach(function(suite) {
        var suiteStyles = path.join(STYLES_ROOT, suite);
        if (path.existsSync(suiteStyles)) {
            kendoBuild.deployStyles(suiteStyles, stylesDest, license, true);

            if (copySource) {
                kendoBuild.deployStyles(suiteStyles, sourceDest, license, false);
            }
        }
    });
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
                if (widgets[widgetIx].onlineOnly) {
                    continue;
                }

                for (var exampleIx = 0, examples = widgets[widgetIx].items; exampleIx < examples.length; exampleIx++) {
                    var example = examples[exampleIx],
                    viewName = example.url.replace(".html", ".cshtml"),
                    fileName = path.join(viewsRoot, suite, viewName),
                    outputName = path.join(suiteDest, example.url),
                    exampleBody = readText(fileName);

                    if (example.onlineOnly) {
                        continue;
                    }

                    exampleBody = exampleBody
                        .replace(/@section \w+ {(.|\n|\r)+?}/gi, "")
                        .replace(/@{(.|\n|\r)+?}/gi)
                        .replace(/@@/gi, "");

                    kendoBuild.mkdir(path.dirname(outputName));
                    writeText(outputName, exampleTemplate({
                        body: exampleBody,
                        title: example.text
                    }));
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

function buildBundle(bundle, version, success) {
    var name = bundle.name,
        zips = 0;

    bundle.licenses.forEach(function(license) {
        var licenseName = license.name,
            hasSource = license.source,
            deployName = name + "." + version + "." + licenseName,
            root = path.join(DEPLOY_ROOT, name + "." + licenseName),
            packageName = path.join(DROP_LOCATION, deployName + ".zip"),
            srcLicense = licenseTemplate({ version: version, year: startDate.getFullYear() }),
            packageNameLatest = packageName.replace(version, LATEST);

        console.log("Building " + deployName);
        mkdir(root);

        console.log("Deploying scripts");
        deployScripts(root, bundle, srcLicense, hasSource);
        deployThirdPartyScripts(root);

        console.log("Deploying styles");
        deployStyles(root, bundle, srcLicense, hasSource);

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

function buildAllBundles(version, success, bundleIx) {
    bundleIx = bundleIx || 0;

    if (bundleIx < bundles.length) {
        buildBundle(bundles[bundleIx], version, function() {
            buildAllBundles(version, success, ++bundleIx);
        });
    } else {
        if (success) {
            success();
        }
    }
}

// Exports =====================================================================
exports.buildBundle = buildBundle;
exports.buildAllBundles = buildAllBundles;
exports.cdnBundle = cdnBundle;
exports.clean = clean;
