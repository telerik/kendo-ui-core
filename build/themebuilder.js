function merge(files) {
    var result = "";

    for (var i = 0; i < files.length; i++) {
        if (files[i].indexOf("*") > -1) {
            var dir = files[i].substring(0, files[i].indexOf("*")),
                files = fs.readdirSync(dir);

            files = files.map(function(file) {
                return dir + file;
            });

            result += merge(files);
        } else {
            result += fs.readFileSync(files[i], "utf8");
        }
    }

    return result.replace("\ufeff", "");
}

function uglify(source) {
    var uglifyJs = require("./uglify-js").uglify,
        ast = require("./uglify-js").parser.parse(source);

    ast = uglifyJs.ast_mangle(ast);
    ast = uglifyJs.ast_squeeze(ast);
    return uglifyJs.gen_code(ast);
}

// themebuilder-specific
function wrap(source) {
    return "(function(window, undefined){\r\n" + source + "\r\n})(window);"
}

function buildModifiedLess() {
    var fs = require("fs");

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

    fs.writeFileSync("themebuilder/less.js", wrap(merge(less_libonly_src)));
}

function build() {
    buildModifiedLess();
}

if (require.main === module) {
    exports.build = build;
} else {
    build();
}
