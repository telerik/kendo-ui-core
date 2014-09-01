(function() {

function JSZip() {
}

JSZip.prototype.folder = function(name) {
    return this;
}

JSZip.prototype.file = function(name, contents) {
    this.files[name] = contents;
    return this;
}

JSZip.prototype.generate = function() {
    return "";
}

module("Workbook", {
    setup: function() {
        JSZip.prototype.files = {};
        window.JSZip = JSZip;
    },
    teardown: function() {
        delete window.JSZip;

    }
});

test("toDataURL creates [Content_Types].xml", function() {
    var workbook = new kendo.ooxml.Workbook();

    workbook.toDataURL();

    ok(JSZip.prototype.files["[Content_Types].xml"]);
});

test("toDataUrl creates content type for every sheet", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {}, {} ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["[Content_Types].xml"]);

    equal(dom.find("Override[PartName*=sheet]").length, 2);
});

test("toDataUrl creates workbook.xml", function() {
    var workbook = new kendo.ooxml.Workbook();

    workbook.toDataURL();

    ok(JSZip.prototype.files["workbook.xml"]);
});

test("toDataUrl creates sheet element for every sheet in workbook.xml", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {}, {} ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["workbook.xml"]);
    equal(dom.find("> sheets > sheet").length, 2);
});

test("toDataUrl sets the name of the sheet element to the title option", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ { title: "foo"} ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["workbook.xml"]);
    equal(dom.find("> sheets > sheet").attr("name"), "foo");
});

test("toDataUrl creates app.xml", function() {
    var workbook = new kendo.ooxml.Workbook();

    workbook.toDataURL();

    ok(JSZip.prototype.files["app.xml"]);
});

test("toDataUrl stores sheet count in app.xml", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {}, {} ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["app.xml"]);
    equal(dom.find("HeadingPairs").children().children().last().text(), 2);
});

test("toDataUrl stores sheet titles in app.xml", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ { title: "foo" }, { } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["app.xml"]);
    equal(dom.find("TitlesOfParts").children().children().text(), "fooSheet2");
});

test("toDataUrl creates workbook.xml.rels file", function() {
    var workbook = new kendo.ooxml.Workbook();

    workbook.toDataURL();

    ok(JSZip.prototype.files["workbook.xml.rels"]);
});

test("toDataUrl relationship element for every sheet in workbook.xml.rels", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {}, {} ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["workbook.xml.rels"]);

    equal(dom.find("Relationship[Target*=sheet]").length, 2);
});

}());
