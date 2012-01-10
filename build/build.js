#!/usr/bin/env node

// Imports ====================================================================
var themes = require("./themes"),
    kendoScripts = require("./kendo-scripts"),
    bundles = require("./bundles");

// Implementation ==============================================================
console.log("Build starting at " + new Date());

console.log("Merging multi-part scripts");
kendoScripts.mergeScripts();

console.log("Building themes");
themes.build();

bundles.clean();
bundles.buildAllBundles();
