// Kendo templates
//

function compilePart(part, stringPart) {
    if (stringPart) {
        return "'" +
            part.split("'").join("\\'")
        .replace(/\n/g, "\\n")
        .replace(/\r/g, "\\r")
        .replace(/\t/g, "\\t") + "'";
    } else {
        var first = part.charAt(0),
        rest = part.substring(1);

        if (first === "=") {
            return "+(" + rest + ")+";
        } else if (first === ":") {
            return "+e(" + rest + ")+";
        } else {
            return ";" + part + ";o+=";
        }
    }
}

var argumentNameRegExp = /^\w+/,
    encodeRegExp = /\$\{([^}]*)\}/g,
    escapedCurlyRegExp = /\\\}/g,
    curlyRegExp = /__CURLY__/g,
    escapedSharpRegExp = /\\#/g,
    sharpRegExp = /__SHARP__/g;

/**
* @name kendo.Template
* @namespace
*/
Template = /** @lends kendo.Template */ {
    paramName: "data", // name of the parameter of the generated template
    useWithBlock: true, // whether to wrap the template in a with() block
    /**
    * Renders a template for each item of the data.
    * @ignore
    * @name kendo.Template.render
    * @static
    * @function
    * @param {String} [template] The template that will be rendered
    * @param {Array} [data] Data items
    * @returns {String} The rendered template
    */
    render: function(template, data) {
        var idx,
        length,
        html = "";

        for (idx = 0, length = data.length; idx < length; idx++) {
            html += template(data[idx]);
        }

        return html;
    },
    /**
    * Compiles a template to a function that builds HTML. Useful when a template will be used several times.
    * @ignore
    * @name kendo.Template.compile
    * @static
    * @function
    * @param {String} [template] The template that will be compiled
    * @param {Object} [options] Compilation options
    * @returns {Function} The compiled template
    */
    compile: function(template, options) {
        var settings = {},
        useWithBlock = settings.useWithBlock,
        functionBody = "var o;",
        parts,
        idx;

        functionBody += useWithBlock ? "with(data){" : "";

            functionBody += "o=";

            parts = template
            .replace(escapedCurlyRegExp, "__CURLY__")
            .replace(encodeRegExp, "#=e($1)#")
            .replace(curlyRegExp, "}")
            .replace(escapedSharpRegExp, "__SHARP__")
            .split("#");

            for (idx = 0; idx < parts.length; idx ++) {
                functionBody += compilePart(parts[idx], idx % 2 === 0);
            }

            functionBody += useWithBlock ? ";}" : ";";

            functionBody += "return o;";

            functionBody = functionBody.replace(sharpRegExp, "#");

            // console.log(functionBody);
            return new Function("data", functionBody);
    }
};

exports.template = function(string, options) {
    return Template.compile(string, options);
}

