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

test("toDataUrl creates sharedStrings.xml", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {} ]
    });

    workbook.toDataURL();

    ok(JSZip.prototype.files["sharedStrings.xml"]);
});

test("toDataUrl stores shared strings in sharedStrings", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { value: "foo" }, { value: "foo" }, { value: "bar" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["sharedStrings.xml"]);

    equal(dom.last().attr("count"), "3");
    equal(dom.last().attr("uniqueCount"), "2");
    equal(dom.find("si > t").first().text(), "foo");
});

test("toDataUrl creates styles.xml", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {} ]
    });

    workbook.toDataURL();

    ok(JSZip.prototype.files["styles.xml"]);
});

test("toDataUrl stores bold style as 'b' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { bold: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("font > b").length, 1);
});

test("toDataUrl stores bold italic style as 'i' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { italic: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("font > i").length, 1);
});

test("toDataUrl stores underline style as 'u' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { underline: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("font > u").length, 1);
});

test("toDataUrl stores the fontName option as the 'val' attribute of the 'name' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { fontName: "Arial", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("font:last name").attr("val"), "Arial");
});

test("toDataUrl stores the fontSize option as the 'val' attribute of the 'sz' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { fontSize: 15, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("font:last sz").attr("val"), "15");
});

test("toDataUrl stores number formats", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { format: "foo", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("numFmts > numFmt").length, 1);
});

test("toDataUrl doesn't store default formats", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { format: "mm-dd-yy", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("numFmts > numFmt").length, 0);
});

test("toDataUrl stores number format code", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { format: "foo", value: new Date() } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("numFmts > numFmt").attr("formatCode"), "foo");
});

test("toDataUrl stores number format id", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { format: "foo", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("numFmts > numFmt").attr("numFmtId"), "165");
});

test("toDataUrl stores default format id", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { format: "mm-dd-yy", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf:last").attr("numFmtId"), "14");
});

test("toDataUrl stores cell style as 'xf' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { bold: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").length, 2);
});

test("toDataUrl stores default cell style style as 'xf'", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").length, 1);
});

test("toDataUrl stores cell font index as 'fontId' attribute of the 'xf' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { bold: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").last().attr("fontId"), 1);
});

test("toDataUrl sets 'applyFont' attribute to '1' if bold is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { bold: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").last().attr("applyFont"), 1);
});

test("toDataUrl reuses fonts and styles", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { bold: true, value: "foo" }, { bold: true, value: "bar" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").length, 2);
    equal(dom.find("fonts > font").length, 2);
});

test("toDataUrl sets the rgb attribute of the 'color' element when color style is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { color: "#ff0000", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("fonts > font:last > color").attr("rgb"), "FFFF0000");
});

test("toDataUrl and short color", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { color: "#f00", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("fonts > font:last > color").attr("rgb"), "FFFF0000");
});

test("toDataUrl and rgba color", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { color: "#aabbccddee", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("fonts > font:last > color").attr("rgb"), "AABBCCDDEE");
});

test("toDataUrl creates two default 'fill' elements", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("fills > fill").length, 2);
});

test("toDataUrl creates a 'fill' element if the background style option is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { background: "red", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("fills > fill").length, 3);
});


test("toDataUrl stores cell fill index as 'fillId' attribute of the 'xf' element", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { background: "red", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").last().attr("fillId"), 2);
});

test("toDataUrl sets 'applyFill' attribute to '1' if background is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { background: "a0b0c0", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").last().attr("applyFill"), 1);
});

test("toDataUrl sets the rgb attribute of the 'fgColor' element when background style is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { background: "#ff0000", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("fills > fill:last > patternFill > fgColor").attr("rgb"), "FFFF0000");
});

test("toDataUrl sets 'applyAlignment' attribute to '1' if hAlign is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { hAlign: "center", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").last().attr("applyAlignment"), 1);
});

test("toDataUrl sets 'wrapText' attribute to '1' if wrap is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { wrap: true, value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf:last > alignment").attr("wrapText"), 1);
});

test("toDataUrl sets 'applyAlignment' attribute to '1' if vAlign is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { vAlign: "middle", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf").last().attr("applyAlignment"), 1);
});

test("toDataUrl creates 'alignment' element and sets its 'horizontal' attribute if hAlign is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { hAlign: "center", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf:last > alignment").attr("horizontal"), "center");
});

test("toDataUrl creates 'alignment' element and sets its 'vertical' attribute if vAlign is set", function() {
    var workbook = new kendo.ooxml.Workbook({
        sheets: [ {
           rows: [
               { cells: [ { vAlign: "center", value: "foo" } ] }
           ]
        } ]
    });

    workbook.toDataURL();

    var dom = $(JSZip.prototype.files["styles.xml"]);

    equal(dom.find("cellXfs > xf:last > alignment").attr("vertical"), "center");
});

}());
