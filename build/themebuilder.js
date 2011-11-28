var kendoBuild = require("./kendo-build"),
    less = require("./less-js/lib/less"),
    path = require("path"),
    KENDO_STYLES = "styles",
    SOURCE_PATH = path.join("themebuilder", "src"),
    SOURCE_STYLES = path.join(SOURCE_PATH, "styles"),
    SOURCE_SCRIPTS = path.join(SOURCE_PATH, "scripts"),
    DEPLOY_PATH = path.join("themebuilder", "live"),
    DEPLOY_STYLES = path.join(DEPLOY_PATH, "styles"),
    DEPLOY_SCRIPTS = path.join(DEPLOY_PATH, "scripts"),
    KENDO_CDN = process.argv[2] || "http://cdn.kendostatic.com/2011.3.1130/";

function wrap(source) {
    return "(function(window, undefined){\r\n" + source + "\r\n})(window);"
}

function lessToJsonString(lessTemplate) {
    var template = kendoBuild.readText(lessTemplate)
            .replace(/\\/g, '\\\\')
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")
            .replace(/\r\n/g, "\\n")
            .replace(/(\n|\r)/g, "\\n");

    return "'" + template + "'";
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

    var lessJsonString = lessToJsonString(path.join(KENDO_STYLES, "template.less")),
        templateInfoSource = kendoBuild.readText(path.join(SOURCE_SCRIPTS, "constants.js"));

    templateInfoSource = replaceVariable(templateInfoSource, "lessTemplate", lessJsonString);

    kendoBuild.writeText(
        path.join(SOURCE_SCRIPTS, "template.js"),
        templateInfoSource
    );


    console.log("\tgenerating themebuilder css...");

    var parser = new(less.Parser)({}),
        skinTemplate = kendoBuild.readText(path.join(KENDO_STYLES, "black.less"));

    skinTemplate = skinTemplate.replace(/@import.*;/gm, "") +
        kendoBuild.readText(path.join(KENDO_STYLES, "template.less"));

    parser.parse(skinTemplate, function (e, tree) {
        kendoBuild.writeText(path.join(SOURCE_STYLES, "kendo.black.css"), tree.toCSS());
    });

    kendoBuild.copyDirSyncRecursive(path.join(KENDO_STYLES, "Black"), path.join(SOURCE_STYLES, "Black"));

    console.log("\tcopying textures...");
    kendoBuild.copyDirSyncRecursive(path.join(KENDO_STYLES, "textures"), path.join(SOURCE_STYLES, "textures"));
}

function replaceVariable(source, name, value) {
    var variableAssignments = new RegExp(name + "\\s*=\\s*.*(,|;)\\s*$", "gim");

    return source.replace(variableAssignments, name + "=" + value + "$1");
}

function processBootstrapper() {
    var source = kendoBuild.readText(path.join(SOURCE_PATH, "bootstrap.js"));

    // set the required resources to single concatenated script
    source = replaceVariable(source, "requiredJs", '["scripts/themebuilder.js"]');
    source = replaceVariable(source, "requiredCss", '["styles/themebuilder.css"]');
    source = replaceVariable(source, "JQUERY_LOCATION", '"https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"');
    source = replaceVariable(source, "KENDO_LOCATION", '"' + KENDO_CDN + '"');

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
    kendoBuild.writeText(
        path.join(DEPLOY_SCRIPTS, "themebuilder.js"),
        kendoBuild.minifyJs(kendoBuild.merge(themeBuilderScripts))
    );

    kendoBuild.writeText(
        path.join(DEPLOY_STYLES, "themebuilder.css"),
        kendoBuild.merge(themeBuilderStyles)
    );

    kendoBuild.copyDirSyncRecursive(path.join(SOURCE_STYLES, "Black"), path.join(DEPLOY_STYLES, "Black"));

    kendoBuild.copyFileSync(path.join(SOURCE_STYLES, "bootstrap.css"), path.join(DEPLOY_STYLES, "bootstrap.css"));
    kendoBuild.copyFileSync(path.join(SOURCE_STYLES, "sprite.png"), path.join(DEPLOY_STYLES, "sprite.png"));
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
    processBootstrapper();
    copyTextures();
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
