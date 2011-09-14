var kendoBuild = require("./kendo-build"),
    fs = require("fs");

// themebuilder-specific
function wrap(source) {
    return "(function(window, undefined){\r\n" + source + "\r\n})(window);"
}

function buildModifiedLess() {
    var less_libonly_src = [
            "build/require.js",
            "build/ecma-5.js",
            "lib/less/parser.js",
            "lib/less/functions.js",
            "lib/less/tree/*.js",
            "lib/less/tree.js"
        ].map(function(relativePath) {
            return "build/less-js/" + relativePath;
        });

    fs.writeFileSync("themebuilder/less.js", kendoBuild.minifyJs(wrap(kendoBuild.merge(less_libonly_src))));
}

function lessToJson(lessTemplate) {
    var template = fs.readFileSync(lessTemplate, "utf8")
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\r\n/g, "\\n");

    return "lessLoaded({ version: '" + kendoBuild.generateVersion() + "', template: '" + template + "' })";
}

function copyLessTemplates() {
    fs.writeFileSync("themebuilder/template.js", lessToJson("styles/template.less"), "utf8");
}

function build() {
    buildModifiedLess();
    copyLessTemplates();
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
