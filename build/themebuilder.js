var kendoBuild = require("./kendo-build"),
    fs = require("fs"),
    less = require("./less-js/lib/less"),
    path = require("path"),
    SOURCE_PATH = path.join("themebuilder", "src"),
    OUTPUT_PATH = path.join("themebuilder", "live");

// themebuilder-specific
function wrap(source) {
    return "(function(window, undefined){\r\n" + source + "\r\n})(window);"
}

function lessToJson(lessTemplate) {
    var template = fs.readFileSync(lessTemplate, "utf8")
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\r\n/g, "\\n")
            .replace(/(\n|\r)/g, "\\n"),
        outputTemplate = kendoBuild.template("lessLoaded({ version: '#= version #', template: '#= template #' })");

    return outputTemplate({
            version: kendoBuild.generateVersion(),
            template: template
        });
}

function mkdir(path) {
    try {
        fs.statSync(path);
    } catch(e) {
        fs.mkdirSync(path, fs.statSync("./").mode);
    }
}

function replaceVariable(source, name, value) {
    var variableAssignments = new RegExp(name + "\\s*=\\s*.*(,|;)\\s*$", "gim");

    return source.replace(variableAssignments, name + "=" + value + "$1");
}

function createIndexPage() {
}

function createBootstrapper() {
    var source = fs.readFileSync(path.join(SOURCE_PATH, "script.js"), "utf8");

    // set the required resources to single concatenated script
    source = replaceVariable(source, "requiredFiles", '["themebuilder.js"]');

    fs.writeFileSync(
        path.join(OUTPUT_PATH, "script.js"),
        kendoBuild.minifyJs(source),
        "utf8"
    );
}

function mergeResources() {
    var themeBuilderScripts = [
        "less.js",
        "themebuilder.js",
        "colorengine.js",
        "template.js"
    ].map(function(x) {
        return path.join(SOURCE_PATH, x);
    });

    var themeBuilderStyles = [
        "kendo.black.css",
        "styles.css"
    ].map(function(x) {
        return path.join(SOURCE_PATH, x);
    });


    // merge resources into one
    fs.writeFileSync(
        path.join(OUTPUT_PATH, "themebuilder.js"),
        kendoBuild.minifyJs(kendoBuild.merge(themeBuilderScripts)),
        "utf8"
    );

    fs.writeFileSync(
        path.join(OUTPUT_PATH, "themebuilder.css"),
        kendoBuild.merge(themeBuilderStyles),
        "utf8"
    );

    kendoBuild.copyDirSyncRecursive(path.join(SOURCE_PATH, "Black"), path.join(OUTPUT_PATH, "Black"));
}

function buildGeneratedSources() {
    console.log("building modified less.js...");

    var less_libonly_src = [
            "build/require.js",
            "build/ecma-5.js",
            "lib/less/parser.js",
            "lib/less/functions.js",
            "lib/less/tree/*.js",
            "lib/less/tree.js"
        ].map(function(relativePath) {
            return path.join("build", "less-js", relativePath);
        });

    fs.writeFileSync(
        path.join(SOURCE_PATH, "less.js"),
        kendoBuild.minifyJs(wrap(kendoBuild.merge(less_libonly_src))),
        "utf8"
    );


    console.log("converting template.less to JSON...");

    fs.writeFileSync(
        path.join(SOURCE_PATH, "template.js"),
        lessToJson(path.join("styles", "template.less")),
        "utf8"
    );


    console.log("generating themebuilder css...");

    var parser = new(less.Parser)({}),
        skinTemplate = fs.readFileSync(path.join("styles", "black.less"), "utf8");

    skinTemplate = skinTemplate.replace(/@import.*;/gm, "") +
        fs.readFileSync(path.join("styles", "template.less"), "utf8");

    parser.parse(skinTemplate, function (e, tree) {
        fs.writeFileSync(path.join(SOURCE_PATH, "kendo.black.css"), tree.toCSS(), "utf8");
    });

    kendoBuild.copyDirSyncRecursive(path.join("styles", "Black"), path.join(SOURCE_PATH, "Black"));
}

function copyThemes() {
    var themesPath = path.join(OUTPUT_PATH, "themes");
    mkdir(themesPath);
    require("./themes").build();
    kendoBuild.copyDirSyncRecursive("styles", themesPath, false, /\.(?!less)[a-z]+$/i);
}

function build() {
    kendoBuild.rmdirSyncRecursive(OUTPUT_PATH);
    mkdir(OUTPUT_PATH);
    buildGeneratedSources();
    console.log("building distribution...");
    mergeResources();
    createBootstrapper();
    createIndexPage();
    copyThemes();
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
