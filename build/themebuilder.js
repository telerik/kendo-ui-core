var kendoBuild = require("./kendo-build"),
    less = require("./less-js/lib/less"),
    path = require("path"),
    KENDO_STYLES = path.join("styles", "web"),
    SOURCE_PATH = path.join("themebuilder", "src"),
    SOURCE_STYLES = path.join(SOURCE_PATH, "styles"),
    SOURCE_SCRIPTS = path.join(SOURCE_PATH, "scripts");

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
    console.log("Building generated themebuilder files");
    // build modified less.js

    var less_libonly_src = [
            "build/require.js",
            "build/ecma-5.js",
            "lib/less/parser.js",
            "lib/less/functions.js",
            "lib/less/colors.js",
            "lib/less/tree/*.js",
            "lib/less/tree.js"
        ].map(function(relativePath) {
            return path.join("build", "less-js", relativePath);
        });

    kendoBuild.writeText(
        path.join(SOURCE_SCRIPTS, "less.js"),
        kendoBuild.minifyJs(wrap(kendoBuild.merge(less_libonly_src)))
    );


    // convert template.less to JSON

    var template = path.join(KENDO_STYLES, "template.less"),
        lessJsonString = lessToJsonString(template),
        templateInfoSource = kendoBuild.readText(path.join(SOURCE_SCRIPTS, "constants.js"));

    templateInfoSource = replaceVariable(templateInfoSource, "lessTemplate", lessJsonString);

    kendoBuild.writeText(
        path.join(SOURCE_SCRIPTS, "template.js"),
        templateInfoSource
    );


    // generate themebuilder css

    var parser = new(less.Parser)({}),
        skinTemplate = kendoBuild.readText(path.join(KENDO_STYLES, "kendo.black.less"));

    skinTemplate = skinTemplate.replace(/@require.*;/gm, "") + kendoBuild.readText(template);

    parser.parse(skinTemplate, function (e, tree) {
        kendoBuild.writeText(path.join(SOURCE_STYLES, "kendo.black.css"), tree.toCSS());
    });

    kendoBuild.copyDirSyncRecursive(path.join(KENDO_STYLES, "Black"), path.join(SOURCE_STYLES, "Black"));

    // copy textures
    kendoBuild.copyDirSyncRecursive(path.join(KENDO_STYLES, "textures"), path.join(SOURCE_STYLES, "textures"));
}

function replaceVariable(source, name, value) {
    var variableAssignments = new RegExp(name + "\\s*=\\s*.*(,|;)\\s*$", "gim");

    return source.replace(variableAssignments, name + "=" + value + "$1");
}

function deployBootstrapper(destinationPath, cdnRoot) {
    var source = kendoBuild.readText(path.join(SOURCE_PATH, "bootstrap.js"));

    // set the required resources to single concatenated script
    source = replaceVariable(source, "requiredJs", '["scripts/themebuilder.js"]');
    source = replaceVariable(source, "requiredCss", '["styles/themebuilder.css"]');
    source = replaceVariable(source, "JQUERY_LOCATION", '"https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"');
    source = replaceVariable(source, "KENDO_LOCATION", '"' + cdnRoot + '"');

    kendoBuild.writeText(path.join(destinationPath, "bootstrap.js"), kendoBuild.minifyJs(source));
}

function mergeResources(stylesPath, scriptsPath) {
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
        path.join(scriptsPath, "themebuilder.js"),
        kendoBuild.minifyJs(kendoBuild.merge(themeBuilderScripts))
    );

    kendoBuild.writeText(
        path.join(stylesPath, "themebuilder.css"),
        kendoBuild.merge(themeBuilderStyles)
    );

    kendoBuild.copyDirSyncRecursive(path.join(SOURCE_STYLES, "Black"), path.join(stylesPath, "Black"));

    kendoBuild.copyFileSync(path.join(SOURCE_STYLES, "bootstrap.css"), path.join(stylesPath, "bootstrap.css"));
    kendoBuild.copyFileSync(path.join(SOURCE_STYLES, "sprite.png"), path.join(stylesPath, "sprite.png"));
}

function deployTextures(stylesPath) {
    var themesPath = path.join(stylesPath, "textures");
    kendoBuild.mkdir(themesPath);
    kendoBuild.copyDirSyncRecursive(path.join(SOURCE_STYLES, "textures"), themesPath, false);
}

function deploy(destinationPath, cdnRoot) {
    var scriptsPath = path.join(destinationPath, "scripts"),
        stylesPath = path.join(destinationPath, "styles");

    console.log("Deploying themebuilder");

    kendoBuild.rmdirSyncRecursive(destinationPath);
    kendoBuild.mkdir(destinationPath);
    kendoBuild.mkdir(scriptsPath);
    kendoBuild.mkdir(stylesPath);
    mergeResources(stylesPath, scriptsPath);
    deployBootstrapper(destinationPath, cdnRoot);
    deployTextures(stylesPath);
}

exports.buildGeneratedSources = buildGeneratedSources;
exports.deploy = deploy;
