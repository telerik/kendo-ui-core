jQuery = require("jquery");

document = {
    createElement: function() {
        return {
            style: {}
        };
    },
    documentElement: {
        style: {}
    }
};


navigator = {
    userAgent: ""
};

window = {
    document: document,
    navigator: navigator
};

var xml = require("libxmljs"),
    fs = require("fs"),
    path = require("path"),
    root = "kendo-taglib/src/main/";

    require("../../src/kendo.core.js");
    require("../../src/kendo.fx.js");
    require("../../src/kendo.data.odata.js");
    require("../../src/kendo.data.xml.js");
    require("../../src/kendo.model.js");
    require("../../src/kendo.data.js");
    require("../../src/kendo.draganddrop.js");
    require("../../src/kendo.mobile.scroller.js");
    require("../../src/kendo.popup.js");
    require("../../src/kendo.list.js");
    require("../../src/kendo.autocomplete.js");
    require("../../src/kendo.calendar.js");
    require("../../src/kendo.dataviz.core.js");
    require("../../src/kendo.dataviz.chart.js");
    require("../../src/kendo.dataviz.themes.js");
    require("../../src/kendo.dataviz.svg.js");
    require("../../src/kendo.dataviz.vml.js");
    require("../../src/kendo.dataviz.gauge.js");
    require("../../src/kendo.combobox.js");
    require("../../src/kendo.datepicker.js");
    require("../../src/kendo.dropdownlist.js");
    require("../../src/kendo.numerictextbox.js");
    require("../../src/kendo.validator.js");
    require("../../src/kendo.binder.js");
    require("../../src/kendo.editable.js");
    require("../../src/kendo.filtermenu.js");
    require("../../src/kendo.groupable.js");
    require("../../src/kendo.pager.js");
    require("../../src/kendo.selectable.js");
    require("../../src/kendo.sortable.js");
    require("../../src/kendo.columnmenu.js");
    require("../../src/kendo.grid.js");
    require("../../src/kendo.listview.js");
    require("../../src/kendo.menu.js");
    require("../../src/kendo.panelbar.js");
    require("../../src/kendo.slider.js");
    require("../../src/kendo.reorderable.js");
    require("../../src/kendo.resizable.js");
    require("../../src/kendo.splitter.js");
    require("../../src/kendo.tabstrip.js");
    require("../../src/kendo.timepicker.js");
    require("../../src/kendo.datetimepicker.js");
    require("../../src/kendo.treeview.js");
    require("../../src/kendo.upload.js");
    require("../../src/kendo.window.js");
    require("../../src/kendo.editor.js");

function generateJava(path, className) {
    var javaCode = [];

    javaCode.push("package com.kendoui.taglib;\r\n");
    javaCode.push('@SuppressWarnings("serial")');
    javaCode.push("public class " + className + " extends WidgetTag {");
    javaCode.push("    public " + className + "() {");
    javaCode.push('        super("' + className.replace("Tag", "") + '");');
    javaCode.push("    }\r\n");
    javaCode.push("    //>> Attributes");
    javaCode.push("    //<< Attributes");
    javaCode.push("}");

    fs.writeFileSync(path, javaCode.join("\r\n"), "utf8");
}

function syncTld(tldPath) {
    var tld = fs.readFileSync(tldPath, "utf8");

    // Remove the namespace declaration
    var doc = xml.parseXmlString(tld.replace(/<taglib[^>]*>/, "<taglib>"));

    var tags = doc.find("//tag");

    tags.forEach(function(tag){
        var tagClass = tag.get("tag-class");

        var className = tagClass.text();

        var javaPath = pathFromClassName(className);

        if (!fs.existsSync(javaPath)) {
            generateJava(javaPath, className.split(".").pop());
        }

        var source = fs.readFileSync(javaPath, "utf8");

        if (!/\/\/>> Attributes/.test(source)) {
            console.warn("The \"//>> Attributes\" comment not found in " + javaPath + ". Skipping.");
        } else {
            var attributes = tag.find("attribute");

            var gettersAndSetters = attributes.filter(function(attribute) {
               return attribute.get("name").text() != "name";
            }).map(setterAndGetter).join("\r\n");

            source = source.replace(/\/\/>> Attributes([^\/]*)\/\/<< Attributes/m, "//>> Attributes\r\n\r\n" + gettersAndSetters + "\r\n    //<< Attributes");

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
        "java.lang.Integer": "int",
        "boolean": "boolean",
        "int": "int",
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



function optionDescription(md, option, widget) {
    var re = new RegExp("### " + option + ".*\\n+([^\.#]*)");

    var description = re.exec(md);

    if (description) {
        return description[1].trim().replace(/[*]/g, "").replace(/\n/g, " ");
    }

    console.warn("Can't find description for the " + option + " of the " + widget + ".");

    return "";
}

function generateTag(widget, ns) {
    var options = widget.fn.options;
    var name = options.name;

    delete options.name;
    delete options.prefix;

    var tag = [];

    tag.push("    <tag>")
    tag.push("      <description>" + name + " Widget</description>");
    tag.push("      <name>" + camelCase(name) + "</name>");
    tag.push("      <tag-class>com.kendoui.taglib." + name + "Tag</tag-class>");
    tag.push("      <body-content>JSP</body-content>");
    tag.push("      <attribute>");
    tag.push("          <description>The mandatory and unique name of the widget. Used as the \"id\" attribute of the widget's HTML element.</description>");
    tag.push("          <name>name</name>");
    tag.push("          <required>true</required>");
    tag.push("          <rtexprvalue>true</rtexprvalue>");
    tag.push("          <type>java.lang.String</type>");
    tag.push("      </attribute>");

    var docPath = "../../docs/api/" + ns + "/" + name.toLowerCase() + ".md";

    var md = fs.readFileSync(docPath, "utf8");

    md = md.split("## Methods")[0];


    for (var option in options) {
        var type = typeof options[option];

        if (type === "object" || type === "null" || option == "template") {
            continue;
        } else if (type === "number") {
            type = "int";
        } else if (type === "string") {
            type = "java.lang.String";
        }

        var description = optionDescription(md, option, name);

        tag.push("      <attribute>");

        if (description) {
            tag.push("          <description>" + description + "</description>");
        }

        tag.push("          <name>" + option + "</name>");
        tag.push("          <rtexprvalue>true</rtexprvalue>");
        tag.push("          <type>" + type + "</type>");
        tag.push("      </attribute>");
    }

    tag.push("    </tag>\r\n")

    return tag.join("\r\n");
}

var ignoredRoles = ["sortable",
    "columnmenu",
    "reorderable",
    "resizable",
    "draggable",
    "filtermenu",
    "selectable",
    "editable",
    "groupable",
    "virtualscrollable",
    "droptarget",
    "droptargetarea",
    "popup",
    "validator",
    "pager"
];

function camelCase(value) {
    return value.charAt(0).toLowerCase() + value.substring(1);
}

function generateTld(tldPath) {
    var tags = [];

    for (var key in window.kendo.ui.roles) {
        if (ignoredRoles.indexOf(key) < 0) {
            tags.push(generateTag(window.kendo.ui.roles[key], "web"));
        }
    }

    for (var key in window.kendo.dataviz.ui.roles) {
        if (ignoredRoles.indexOf(key) < 0) {
            tags.push(generateTag(window.kendo.dataviz.ui.roles[key], "dataviz"));
        }
    }

    var tld = fs.readFileSync(tldPath, "utf8");

    tld = tld.split("<!-- Auto-generated -->");

    tld[1] = tags.join("\r\n");

    tld = [
        tld[0],
        "<!-- Auto-generated -->\r\n\r\n",
        tld[1],
        "\r\n    <!-- Auto-generated -->",
        tld[2]
    ].join("");

    fs.writeFileSync(tldPath, tld, "utf8");
}

generateTld(root + "resources/META-INF/taglib.tld");

syncTld(root + "resources/META-INF/taglib.tld");
