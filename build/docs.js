function build() {
    var jsdoctoolkit = require("./node-jsdoc-toolkit/app/nodemodule").jsdoctoolkit;

    console.log("building documentation...");
    jsdoctoolkit.run(["-c=build/docs.conf"]);
}

if (require.main === module) {
    build();
} else {
    exports.build = build;
}
