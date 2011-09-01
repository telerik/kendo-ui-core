var parser = require("./lib/parse-js"),
    uglify = require("./lib/process");

exports.minifyJs = function(source) {
    var ast = parser.parse(source);
    ast = uglify.ast_mangle(ast);
    ast = uglify.ast_squeeze(ast);
    return uglify.gen_code(ast);
};
