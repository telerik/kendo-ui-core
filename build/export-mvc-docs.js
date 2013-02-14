var xml = require("libxmljs"),
    fs = require("fs"),
    path = require("path");

function exportDocs() {
    var rawXml = fs.readFileSync("wrappers/mvc/src/Kendo.Mvc/bin/Release/Kendo.Mvc.xml", "utf8");

    // Replace <see /> tags with their "cref" attribute value

    rawXml = rawXml.replace(/<see cref="([^"]*)"\s*\/>/g, function($0, $1){
        // return only the last word of the cref attribute
        return $1.replace(/^.*?(\w+)$/, "$1");
    });

    var xmlDoc = xml.parseXmlString(rawXml);
    var members = xmlDoc.find("//member")

    function getTypesByNamespace(namespace) {
        var namespaceRegExp = new RegExp("^T:" + namespace.replace(/\./g, "\\.") + "\\.([^\\.]+)$");
        var types = {};

        members.forEach(function(member) {
            var name = member.attr("name").value();
            var type;
            var shortName;

            if (namespaceRegExp.test(name)) {
                shortName = RegExp.$1.replace(/`\d/, "");

                types[shortName] = type = {};
                type.name = name.substring(2);
                type.shortName = shortName;
                type.namespace = namespace;
                type.methods = [];
                type.properties = [];
                type.fields = [];
                type.summary = parseSummary(member);

                populateMemebers(type);
            }
        });

        return types;
    }

    function sanitizeGenerics(name) {
        var result = "";
        var idx = 0;
        var length = name.length;
        var open = 0;
        var close = 0;

        while (idx < length) {
            var ch = name.charAt(idx);
            idx ++;

            if (ch == "{") {
                open ++;
                result += "<";
                continue;
            }

            if (ch == "}") {
                close ++;
                result += ">";
                continue;
            }

            if (ch == ",") {
               if (close != open) {
                   result += ",";
               } else {
                   result += "|";
               }

               continue;
            }

            if (ch == "`") {
                var ticks = 0;

                while (ch = name.charAt(idx++) == "`") {
                    ticks ++;
                }

                if (open) {
                    result += "T" + (ticks > 0 ? ticks : "");
                } else {
                    result += "<T" + (ticks > 0 ? ticks : "") + ">";
                }

                continue;
            }

            result += ch;
        }

        return result;
    }

    function populateMemebers(type) {
        var namespaceRegExp = new RegExp("^([MFP]):" + type.name.replace(/\./g, "\\.") + "\\.(.*)");

        members.forEach(function(member) {
            var name = member.attr("name").value();
            var kind;
            var fullName;
            var shortName;

            if (namespaceRegExp.test(name)) {
                kind = RegExp.$1;
                shortName = sanitizeGenerics(RegExp.$2);

                if (kind == "M" && name.indexOf("#ctor") < 0) {
                    var method = parseMethod(member);

                    console.log(shortName);
                    method.name = shortName;

                    type.methods.push(method);
                } else if (kind == "F") {
                    var field = parseField(member);

                    field.name = shortName;

                    type.fields.push(field);
                } else if (kind == "P") {
                    var property = parseProperty(member);

                    property.name = shortName;

                    type.properties.push(property);
                }
            }
        });
    }

    function typeToMarkdown(type) {
        var markdown = "";

        var name = type.namespace + "." + type.shortName;

        markdown += "---";
        markdown += "\ntitle:" + type.shortName;
        markdown += "\nslug:aspnetmvc-" + name.toLowerCase();
        markdown += "\npublish:true";
        markdown += "\n---";


        markdown += "\n\n# " + name;

        if (type.summary) {
            markdown += "\n\n" + type.summary;
        }

        if (type.fields.length) {
            markdown += "\n\n## Fields";

            type.fields.forEach(function(field){
                markdown += emitField(field);
            });
        }

        if (type.properties.length) {
            markdown += "\n\n## Properties";

            type.properties.forEach(function(field){
                markdown += emitProperty(field);
            });
        }

        if (type.methods.length) {
            markdown += "\n\n## Methods";

            type.methods.forEach(function(method){
                markdown += emitMethod(method);
            });
        }

        return markdown.trim();
    }

    function emitField(field) {
        var markdown = "";

        markdown += "\n\n### " + field.name;

        if (field.summary) {
            markdown += "\n" + field.summary;
        }

        return markdown;
    }

    function emitProperty(property) {
        return emitField(property);
    }

    function emitMethod(method) {
        var markdown = "";

        // replace any "|" with "," (coming from generics)

        markdown += "\n\n### " + method.name.replace(/\|/g, ",").replace(/([<>])/g, "\\$1");

        if (method.summary) {
            markdown += "\n" + method.summary;
        }

        if (method.examples) {
            markdown += "\n\n#### Example";

            method.examples.forEach(function(example) {
                markdown += emitExample(example);
            })
        }

        if (method.params) {
            var paramTypes = /\(([^\)]*)\)$/.exec(method.name)[1].split("|");

            markdown += "\n\n#### Parameters";

            method.params.forEach(function(param, index) {
                markdown += emitParam(param, paramTypes[index].replace(/\|/g, ","));
            })
        }

        if (method.returns) {
            markdown += "\n\n#### Returns";
            markdown += "\n" + method.returns;
        }

        return markdown;
    }

    function emitParam(param, type) {
        var markdown = "";

        function linkNamespace(namespace) {
            var known = false;
            var regExp = new RegExp(namespace.replace(/\./g, "\\.") + "\\.([\\w]+)", "g");

            type = type.replace(regExp, function($0, $1) {
                known = true;

                var result = "[" + namespace + "." + $1 + "](/api/wrappers/aspnet-mvc/" + namespace + "/" + $1.replace(/<[^>]*>/g, "") + ")";

                return result;
            });

            return known;
        }

        var link = linkNamespace("Kendo.Mvc.UI.Fluent") || linkNamespace("Kendo.Mvc.UI") || linkNamespace("Kendo.Mvc");

        markdown += "\n\n##### " + param.name + " ";
        if (link) {
            markdown += type.replace(/>/g, "\\>").replace(/</g, "\\<");
        } else {
            markdown += "`" + type + "`";
        }

        if (param.summary) {
            markdown += "\n" + param.summary;
        }

        return markdown;
    }

    function emitExample(example) {
        return "\n    " + example.code.replace(/^ {4}/gm, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"');
    }

    function parseField(element) {
        var result = {};

        result.summary = parseSummary(element);

        return result;
    }

    function parseProperty(element) {
        return parseField(element);
    }

    function parseMethod(element) {
        var result = {};

        result.summary = parseSummary(element);

        var params = element.find("param");

        if (params.length) {
            result.params = params.map(parseParam);
        }

        var examples = element.find("example");

        if (examples.length) {
            result.examples = examples.map(parseExample);
        }

        var returns = element.get("returns");

        if (returns) {
            result.returns = text(returns);
        }

        return result;
    }

    function parseParam(param) {
        return {
           name: param.attr("name").value(),
           summary: text(param)
        };
    }

    function text(element) {
        return element.text().trim();
    }

    function parseExample(example) {
        var code = example.get("code");

        return {
           code: code.text().trim()
        }
    }

    function parseSummary(element) {
       var summary = element.get("summary");

       if (summary) {
            summary = text(summary);

            if (summary) {
               return summary;
            }
       }

       return "";
    }

    function isEmpty(object) {
        for (var member in object) {
            return false;
        }

        return true;
    }

    function makePath(/**Array*/ path) {
         path = path.split(/[\\\/]/);
        var make = "";

        for (var i = 0, l = path.length; i < l; i++) {
            make += path[i] + "/";
            if (!exists(make)) {
                makeDir(make);
            }
        }
    }

    function saveFile(/**string*/ outDir, /**string*/ fileName, /**string*/ content) {
        fs.writeFileSync(outDir + "/" + fileName, content, "utf8");
    }

    function exists(/**string*/ path) {
        try {
            fs.statSync(path);
            return true;
        } catch(e) {
            return false;
        }
    }

    function makeDir(/**string*/ path) {
        fs.mkdirSync(path, 0777);
    }

    function exportNamespace(namespace) {
        var types = getTypesByNamespace(namespace);
        var path = "docs/api/wrappers/aspnet-mvc/" + namespace;
        var typeName;
        var type;

        makePath(path);

        for (typeName in types) {
            type = types[typeName];
            if (type.fields.length || type.methods.length || type.summary) {
                saveFile(path, typeName + ".md", typeToMarkdown(type));
            }
        }
    }

    exportNamespace("Kendo.Mvc");
    exportNamespace("Kendo.Mvc.Extensions");
    exportNamespace("Kendo.Mvc.UI");
    exportNamespace("Kendo.Mvc.UI.Fluent");
}

exports.exportDocs = exportDocs;
