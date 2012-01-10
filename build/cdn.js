#!/usr/bin/env node

// Imports ====================================================================
var path = require("path"),
    config = require("./config"),
    bundles = require("./bundles"),
    themes = require("./themes"),
    kendoScripts = require("./kendo-scripts"),
    kendoBuild = require("./kendo-build");

// Configuration ===============================================================
var project = path.join("build", "cdn.proj"),
    root = path.join("..", "deploy", "kendoui.complete.commercial"),
    version = config.version,
    completeBundle = bundles.bundles.filter(function(bundle) { return bundle.name === "kendoui.complete" })[0];

// Implementation ==============================================================
console.log("Build starting at " + new Date());

console.log("Merging multi-part scripts");
kendoScripts.mergeScripts();

console.log("Building themes");
themes.build();

// Build only the commercial license
completeBundle.licenses = completeBundle.licenses.filter(function(license) { return license.name === "commercial"});

bundles.clean();

bundles.buildBundle(completeBundle, function() {
    kendoBuild.msBuild(project, [ "/p:Version=" + version, "/p:BundleRoot=" + root, project ]);
});
