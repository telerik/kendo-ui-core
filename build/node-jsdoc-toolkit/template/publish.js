function publish(symbolSet) {
    publish.conf = {
        symbolsDir: "symbols/"
    };

    Link.symbolSet = symbolSet;

    var symbols = symbolSet.toArray();
    var classes = symbols.filter(isaClass).sort(makeSortby("alias"));
    var templatesDir = JSDOC.opt.t;
    var outDir = JSDOC.opt.d;
    var allSections = ["description", "configuration", "methods", "events"];

    classes.forEach(function(c) {
        c.events = c.getEvents();   // 1 order matters
        c.methods = c.getMethods(); // 2

        allSections.forEach(function(section) {
            var template = new JSDOC.JsPlate(templatesDir + section + ".tmpl"),
                html = template.process(c);

            if (hasValue(html)) {
                IO.saveFile(
                    outDir,
                    c.alias.toLowerCase() + "." + section + ".html",
                    html
                );
            }
        });
    });
}

function hasValue(text) {
    return text.replace(/^\s*|\s*$/g, '').replace("<!-- help-data -->", "").length > 0;
}

function isaClass($) {
    return (($.is("CONSTRUCTOR") || $.isNamespace) &&
    ($.alias != "_global_" || !JSDOC.opt.D.noGlobal))
}

function makeSortby(attribute) {
    return function(a, b) {
        if (a[attribute] != undefined && b[attribute] != undefined) {
            a = a[attribute].toLowerCase();
            b = b[attribute].toLowerCase();
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        }
    }
}

function htmlEncode(value) {
    return ("" + value).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

// custom output for descriptions -- enables titled code examples and multiple text sections
function outputDescription(description) {
    var hasTitle = false,
        output = "";

    for (var i in description.tags) {
        var tag = description.tags[i];

        switch (tag.title) {
            case "exampleTitle":
                hasTitle = true;
                output += '<div class="code-sample"><h4 class="code-title">' + tag.desc + '</h4>';
            break;

            case "example":
                if (!hasTitle) {
                    output += '<div class="code-sample"><h4 class="code-title">Example</h4>';
                }

                output += '<pre class="code prettyprint"><code>' + htmlEncode(tag.desc) + '</code></pre></div>';
                hasTitle = false;
            break;

            case "param":
                // params are separately outputted
            break;

            case "section":
            default:
                if (/<[^>]+>/g.test(tag.desc)) {
                    output += tag.desc;
                } else if (tag.desc.indexOf("kendo.") !== 0) {
                    output += "<p>" + tag.desc + "</p>";
                }
            break;
        }
    }

    return output;
}

/** Build output for displaying function parameters. */
function makeSignature(params) {
    if (!params) return "()";
    var signature = "("
    +
    params.filter(
        function($) {
            return $.name.indexOf(".") == -1; // don't show config params in signature
        }
    ).map(
        function($) {
            return $.name;
        }
    ).join(", ")
    +
    ")";
    return signature;
}

function resolveLinks(str, from) {
    return str;
}
