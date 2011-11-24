var kendoBuild = require("./kendo-build"),
    fs = require("fs"),
    less = require("./less-js/lib/less"),
    path = require("path"),
    KENDO_STYLES = "styles",
    SOURCE_PATH = path.join("themebuilder", "src"),
    SOURCE_STYLES = path.join(SOURCE_PATH, "styles"),
    SOURCE_SCRIPTS = path.join(SOURCE_PATH, "scripts"),
    DEPLOY_PATH = path.join("themebuilder", "live"),
    DEPLOY_STYLES = path.join(DEPLOY_PATH, "styles"),
    DEPLOY_SCRIPTS = path.join(DEPLOY_PATH, "scripts");

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

function replaceVariable(source, name, value) {
    var variableAssignments = new RegExp(name + "\\s*=\\s*.*(,|;)\\s*$", "gim");

    return source.replace(variableAssignments, name + "=" + value + "$1");
}

function createIndexPage() {
}

function createBootstrapper() {
    var source = kendoBuild.readText(path.join(SOURCE_PATH, "bootstrap.js"));

    // set the required resources to single concatenated script
    source = replaceVariable(source, "requiredFiles", '["scripts/themebuilder.js"]');

    kendoBuild.writeText(path.join(DEPLOY_PATH, "bootstrap.js"), kendoBuild.minifyJs(source));
}

function mergeResources() {
    var themeBuilderScripts = [
        "less.js",
        "themebuilder.js",
        "colorengine.js",
        "template.js"
    ].map(function(x) {
        return path.join(SOURCE_SCRIPTS, x);
    });

    var themeBuilderStyles = [
        "kendo.black.css",
        "styles.css"
    ].map(function(x) {
        return path.join(SOURCE_STYLES, x);
    });


    // merge resources into one
    fs.writeFileSync(
        path.join(DEPLOY_SCRIPTS, "themebuilder.js"),
        kendoBuild.minifyJs(kendoBuild.merge(themeBuilderScripts)),
        "utf8"
    );

    fs.writeFileSync(
        path.join(DEPLOY_STYLES, "themebuilder.css"),
        kendoBuild.merge(themeBuilderStyles),
        "utf8"
    );

    kendoBuild.copyDirSyncRecursive(path.join(SOURCE_STYLES, "Black"), path.join(DEPLOY_STYLES, "Black"));
}

function buildGeneratedSources() {
    console.log("\tbuilding modified less.js...");

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

    kendoBuild.writeText(
        path.join(SOURCE_SCRIPTS, "less.js"),
        kendoBuild.minifyJs(wrap(kendoBuild.merge(less_libonly_src)))
    );


    console.log("\tconverting template.less to JSON...");

    kendoBuild.writeText(
        path.join(SOURCE_SCRIPTS, "template.js"),
        lessToJson(path.join(KENDO_STYLES, "template.less"))
    );


    console.log("\tgenerating themebuilder css...");

    var parser = new(less.Parser)({}),
        skinTemplate = fs.readFileSync(path.join(KENDO_STYLES, "black.less"), "utf8");

    skinTemplate = skinTemplate.replace(/@import.*;/gm, "") +
        fs.readFileSync(path.join(KENDO_STYLES, "template.less"), "utf8");

    parser.parse(skinTemplate, function (e, tree) {
        kendoBuild.writeText(path.join(SOURCE_STYLES, "kendo.black.css"), tree.toCSS());
    });

    kendoBuild.copyDirSyncRecursive(path.join(KENDO_STYLES, "Black"), path.join(SOURCE_STYLES, "Black"));

    console.log("\tcopying textures...");
    kendoBuild.copyDirSyncRecursive(path.join(KENDO_STYLES, "textures"), path.join(SOURCE_STYLES, "textures"));
}

function copyTextures() {
    var themesPath = path.join(DEPLOY_STYLES, "textures");
    kendoBuild.mkdir(themesPath);
    kendoBuild.copyDirSyncRecursive(path.join(SOURCE_STYLES, "textures"), themesPath, false);
}

function build() {
    console.log("building generated sources...");
    buildGeneratedSources();

    console.log("building distribution...");
    kendoBuild.rmdirSyncRecursive(DEPLOY_PATH);
    kendoBuild.mkdir(DEPLOY_PATH);
    kendoBuild.mkdir(DEPLOY_SCRIPTS);
    kendoBuild.mkdir(DEPLOY_STYLES);
    mergeResources();
    createBootstrapper();
    createIndexPage();
    copyTextures();
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
