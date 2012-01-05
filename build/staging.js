#!/usr/bin/env node

var path = require("path"),
    kendoExamples = require("./examples"),
    outputPath = process.argv[2] || path.join("deploy", "staging");

kendoExamples.buildStaging(outputPath);
