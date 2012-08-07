// Imports ====================================================================
var fs = require("fs"),
    util = require("util"),
    path = require("path"),
    themes = require("./themes"),
    kendoBuild = require("./kendo-build"),
    kendoScripts = require("./kendo-scripts"),
    Changelog = require("./changelog"),
    GitHubApi = require("build/github-api"),
    vsdoc = require("./vs-doc/vs-doc").vsdoc,
    copyDir = kendoBuild.copyDirSyncRecursive,
    processFiles = kendoBuild.processFilesRecursive,
    mkdir = kendoBuild.mkdir,
    readText = kendoBuild.readText,
    template = kendoBuild.template,
    writeText = kendoBuild.writeText,
    zip = kendoBuild.zip;

// Configuration ==============================================================

var VERSION = JSON.parse(kendoBuild.readText("VERSION"));

var commercialLicense = {name: "commercial", source: true};
var openSourceLicense = {name: "open-source", source: true};
var hotFixLicense = {name: "commercial", source: false};
var trialLicense = {name: "trial", source: false};
var betaLicense = {name: "beta", source: true};

var productionLicenses = [
    commercialLicense,
    trialLicense
];

var cdnBundle = {
    name: "kendoui.cdn",
    suites: ["web", "dataviz", "mobile", "aspnetmvc"],
    combinedSuites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    sourceLicense: "src-license-complete.txt",
    licenses: [commercialLicense],
    skipExamples: true
};

var winjsBundle = {
    name: "kendoui.winjs",
    suites: ["winjs", "dataviz"],
    combinedScript: "winjs",
    sourceLicense: "src-license-none.txt",
    licenses: [commercialLicense],
    vsdoc: /(web|framework|dataviz).+md/,
    skipExamples: true
};

var mvcWrappersBundle = {
    name: "kendoui.aspnetmvc",
    suites: ["web", "dataviz", "mobile", "aspnetmvc"],
    combinedSuites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    sourceLicense: "src-license-complete.txt",
    licenses: productionLicenses,
    vsdoc: /.+md/,
    skipExamples: true,
    skipPackage: true,
    eula: "aspnetmvc-eula"
};

var bundles = [{
    name: "kendoui.complete",
    suites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    sourceLicense: "src-license-complete.txt",
    vsdoc: /.+md/,
    licenses: [commercialLicense],
    eula: "complete-eula",
}, {
    name: "kendoui.web",
    suites: ["web"],
    sourceLicense: "src-license-web.txt",
    vsdoc: /(framework|web).+md/,
    licenses: [commercialLicense, openSourceLicense],
    eula: "web-eula",
}, {
    name: "kendoui.dataviz",
    suites: ["dataviz"],
    sourceLicense: "src-license-dataviz.txt",
    vsdoc: /(framework|dataviz).+md/,
    licenses: [commercialLicense],
    eula: "dataviz-eula"
}, {
    name: "kendoui.mobile",
    suites: ["mobile"],
    sourceLicense: "src-license-mobile.txt",
    vsdoc: /(framework|mobile).+md/,
    licenses: [commercialLicense],
    eula: "mobile-eula"
},{
    name: "kendoui",
    suites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    sourceLicense: "src-license-complete.txt",
    vsdoc: /.+md/,
    licenses: [trialLicense],
    wrappers: ["aspnetmvc"],
    eula: "trial-eula",
},{
    name: "kendoui.aspnetmvc.hotfix",
    suites: ["web", "dataviz", "mobile"],
    combinedScript: "all",
    sourceLicense: "src-license-complete.txt",
    vsdoc: /.+md/,
    licenses: [hotFixLicense],
    wrappers: ["aspnetmvc"],
    skipExamples: true,
    eula: "aspnetmvc-eula",
}];

var SUITE_STYLES = {
    "web": "web",
    "dataviz": "dataviz",
    "mobile": "mobile",
    "winjs": "web"
}

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
    RELEASE_LEGAL_ROOT = path.join(LEGAL_ROOT, VERSION.beta ? "beta" : "official"),
    THIRD_PARTY_LEGAL_ROOT = path.join(LEGAL_ROOT, "third-party"),
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
    ONLINE_EXAMPLES_PACKAGE = "kendoui-online-examples.zip",
    PACKAGE_NAME = "offline";

    var startDate = new Date();

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
                var combinedSuites = bundle.combinedSuites || bundle.suites;
                kendoScripts.buildCombinedScript(
                    bundle.combinedScript, combinedSuites,
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
        var suiteStyles = path.join(STYLES_ROOT, SUITE_STYLES[suite] || suite);
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

    if (bundle.eula) {
        kendoBuild.mkdir(deployLegalRoot);
        kendoBuild.mkdir(deployThirdPartyRoot);

        copyDir(
            path.join(RELEASE_LEGAL_ROOT, bundle.eula),
            deployLegalRoot
        );

        copyDir(
            THIRD_PARTY_LEGAL_ROOT,
            deployThirdPartyRoot
        );
    }
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

    function shouldInclude(widget) {
        var packages = widget.packages;

        if (!packages) {
            return true;
        }

        var invert = false,
            match = false;

        packages.forEach(function(name) {
            if (name[0] === "!") {
                invert = true;
                name = name.substring(1);
            }

            if (name === PACKAGE_NAME) {
                match = true;
            }
        });

        return (!invert && match) || (invert && !match);
    }

    bundle.suites.forEach(function(suite) {
        var navigationFile = path.join(DEMOS_ROOT, "App_Data", suite + ".nav.json"),
            exampleTemplate = template(readText(path.join(TEMPLATES_ROOT, suite + "-example.html"))),
            navigationData = readText(navigationFile),
            navigation = JSON.parse(navigationData),
            suiteDest = path.join(examplesRoot, suite),
            suiteIndex = suiteIndexTemplate({
                navigation: navigation,
                shouldInclude: shouldInclude
            });

        kendoBuild.mkdir(suiteDest);
        writeText(path.join(suiteDest, INDEX), suiteIndex)

        for (var category in navigation) {
            for (var widgetIx = 0, widgets = navigation[category]; widgetIx < widgets.length; widgetIx++) {
                if (!shouldInclude(widgets[widgetIx])) {
                    continue;
                }

                for (var exampleIx = 0, examples = widgets[widgetIx].items; exampleIx < examples.length; exampleIx++) {
                    var example = examples[exampleIx],
                    viewName = example.url.replace(".html", ".cshtml"),
                    fileName = path.join(viewsRoot, suite, viewName),
                    outputName = path.join(suiteDest, example.url),
                    exampleBody;

                    if (!shouldInclude(example)) {
                        continue;
                    }

                    exampleBody = readText(fileName)
                        .replace(/@section \w+ {(.|\n|\r)+?}/gi, "")
                        .replace(/@{(.|\n|\r)+?}/gi, "")
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

var changelog = new Changelog();

function fetchChangelog(callback) {
    if (changelog.fetched) {
        callback();
        return;
    }

    var github = new GitHubApi({
        version: "3.0.0"
    });

    github.authenticate({
        type: "oauth",
        token: "5dd646a3d9d8d5fb69fe59c163fc84b76fc67fcb"
    });

    github.issues.getAllMilestones({
        user: "telerik",
        repo: "kendo"
    }, function(err, openMilestones) {
        if (err) {
            console.log ("Network error, skipping changelog generation.");
            changelog.available = false;
            return callback();
        }

        github.issues.getAllMilestones({
            user: "telerik",
            repo: "kendo",
            state: "closed"
        }, function(err, closedMilestones) {
            processMilestones(openMilestones.concat(closedMilestones));
        });
    });

    function processMilestones(results) {
        var milestones = changelog.filterMilestones(results, VERSION);

        function processMilestone(callback) {
            if (milestones.length == 0) {
                changelog.fetched = true;
                callback();
            } else {
                var milestone = milestones.pop();

                function queryIssues(page) {
                    github.issues.repoIssues({
                        user: "telerik",
                        repo: "kendo",
                        state: "closed",
                        milestone: milestone.number,
                        per_page: 100,
                        page: page
                    }, function(err, res) {
                        changelog.groupIssues(res);

                        if (res.length == 100) {
                            queryIssues(page + 1);
                        } else {
                            processMilestone(callback);
                        }
                    });
                }

                queryIssues(1);
            }
        }

        processMilestone(callback);
    }
}

function deployChangelog(root, bundle, version) {
    var changelogTemplate = kendoBuild.readText(path.join("build", "templates", "changelog.html")),
        outputFile = path.join(root, "changelog.html");

    changelogTemplate = kendoBuild.template(changelogTemplate);

    kendoBuild.writeText(outputFile, changelogTemplate({
        version: version,
        issues: changelog.groupedIssues,
        suites: bundle.suites
    }));
}

function deployVsDoc(root, bundle) {
        kendoBuild.mkdir(path.join(root, "vsdoc"));
        var contents  = vsdoc("docs/api/", bundle.vsdoc);
        var scriptName = bundle.combinedScript || bundle.suites[0];
        kendoBuild.writeText(path.join(root, "vsdoc", "kendo." + scriptName + "-vsdoc.js"), contents);
}

function deployWrappers(root, licenseName, bundle) {
    bundle.wrappers.forEach(function(wrapper){
        kendoBuild.copyDirSyncRecursive(path.join(DEPLOY_ROOT, "kendoui." + wrapper + "." + licenseName, "wrappers", wrapper), path.join(root, "wrappers", wrapper));
        kendoBuild.copyDirSyncRecursive(path.join(DEPLOY_ROOT, "kendoui." + wrapper + "." + licenseName, "js"), path.join(root, "js"));
        if (bundle.skipExamples) {
            kendoBuild.rmdirSyncRecursive(path.join(root, "wrappers", wrapper, "Examples"));
        }
    })
}

function buildBundle(bundle, version, success, licenseBuilt) {
    fetchChangelog(function() {
        var name = bundle.name,
            zips = 0,
            licenseTemplate = template(readText(path.join(RELEASE_LEGAL_ROOT, bundle.sourceLicense)));

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

            if (!bundle.skipExamples) {
                console.log("Deploying examples");
                deployExamples(root, bundle);
            }

            if (bundle.wrappers) {
                console.log("Deploying wrappers");
                mkdir(path.join(root, "wrappers"));
                deployWrappers(root, licenseName, bundle);
            }

            if (bundle.vsdoc) {
                console.log("Deploying vsdoc");
                deployVsDoc(root, bundle);
            }

            if (changelog.available !== false) {
                console.log("Deploying changelog");
                deployChangelog(root, bundle, version);
            }

            // allow customization before packaging
            if (licenseBuilt) {
                licenseBuilt(root, bundle, license);
            }

            zip(packageName, root, function() {
                kendoBuild.copyFileSync(packageName, packageNameLatest);

                if (success && ++zips === bundle.licenses.length) {
                    success();
                }
            });
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
exports.winjsBundle = winjsBundle;
exports.mvcWrappersBundle = mvcWrappersBundle;
exports.clean = clean;
