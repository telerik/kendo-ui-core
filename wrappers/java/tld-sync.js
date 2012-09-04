var xml = require("libxmljs"),
    fs = require("fs"),
    path = require("path"),
    root = "kendo-taglib/src/main/";


function syncTld(tldPath) {
    var tld = fs.readFileSync(tldPath, "utf8");

    // Remove the namespace declaration
    var doc = xml.parseXmlString(tld.replace(/<taglib[^>]*>/, "<taglib>"));

    var tags = doc.find("//tag");

    tags.forEach(function(tag){
        var tagClass = tag.get("tag-class");

        var className = tagClass.text();

        var javaPath = pathFromClassName(className);

        var source = fs.readFileSync(javaPath, "utf8");

        if (!/\/\/>> Attributes/.test(source)) {
            console.warn("The \"//>> Attributes\" comment not found in " + javaPath + ". Skipping.");
        } else {
            var attributes = tag.find("attribute");

            var gettersAndSetters = attributes.filter(function(attribute) {
               return attribute.get("name").text() != "name";
            }).map(setterAndGetter).join("\r\n");

            source = source.replace(/\/\/>> Attributes([^\/]*)\/\/<< Attributes/m, "//>> Attributes\r\n\r\n" + gettersAndSetters + "\r\n//<< Attributes");

            fs.writeFileSync(javaPath, source, "utf8");
        }
    });
}

function pathFromClassName(className) {
    return root + "java/" + className.replace(/\./g, "/") + ".java";
}

function setterAndGetter(attribute) {
    var name = attribute.get("name").text();

    var upper = name[0].toUpperCase() + name.substring(1);
    var type = attribute.get("type").text();

    var javaTypes = {
        "java.lang.String": "String",
        "java.lang.Boolean": "boolean",
        "java.lang.Integer": "int"
    };

    type = javaTypes[type];

    var code = [];

    code.push("    public " + type + " get" + upper + "() {");
    code.push("        return (" + type + ")getProperty(\"" + name + "\");");
    code.push("    }");
    code.push("");

    code.push("    public void set" + upper + "(" + type + " " + name + ") {");
    code.push("        setProperty(\"" + name + "\", " + name + ");");
    code.push("    }");
    code.push("");

    return code.join("\r\n");
}

syncTld(root + "resources/META-INF/taglib.tld");

