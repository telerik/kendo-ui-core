(function(){

var sharedStrings;
var styles;

module("Worksheet", {
  setup: function() {
     sharedStrings = {
        uniqueCount: 0,
        count: 0,
        indexes: {}
     };
     styles = [];
  }
});

function Worksheet(options) {
    options = options || [ [ { value: "foo" } ] ];

    if ($.isArray(options)) {
        options = { data: options };
    }

    return new kendo.ooxml.Worksheet(options, sharedStrings, styles);
}

test("toXML creates a 'c' element for cells", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").length, 1);
});


test("toXML sets the r attribute to the alphanumeric and toXML number (index plus one)", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("r"), "A1");
});

test("toXML sets the t attribute to 's' when the value is string type", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").attr("t"), "s");
});

test("toXML adds strings to sharedStrings", function() {
    var worksheet = Worksheet();

    worksheet.toXML();

    equal(sharedStrings.indexes.foo, 0);
});

test("toXML increments count of sharedStrings", function() {
    var worksheet = Worksheet();

    worksheet.toXML();

    equal(sharedStrings.count, 1);
});

test("toXML increments uniqueCount of sharedStrings", function() {
    var worksheet = Worksheet();

    worksheet.toXML();

    equal(sharedStrings.uniqueCount, 1);
});

test("toXML increments shared string count when existing value is used", function() {
    var worksheet = Worksheet([ [ { value: "foo"}, { value: "foo" } ] ]);

    worksheet.toXML();

    equal(sharedStrings.count, 2);
});

test("toXML doesn't increment uniqueCount when existing value is used", function() {
    var worksheet = Worksheet([ [ { value: "foo"}, { value: "foo" } ] ]);

    worksheet.toXML();

    equal(sharedStrings.uniqueCount, 1);
});

test("toXML creates a new shared string", function() {
    var worksheet = Worksheet([ [ { value: "foo"}, { value: "bar" } ] ]);

    worksheet.toXML();

    equal(sharedStrings.uniqueCount, 2);
    equal(sharedStrings.count, 2);
    equal(sharedStrings.indexes.bar, 1);
});

test("toXML creates a 'v' element for the value", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").children("v").length, 1);
});

test("toXML uses the shared string index as the toXML value", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("c").children("v").text(), sharedStrings.indexes.foo);
});

test("toXML creates a 'row' element", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("> sheetData > row").length, 1);
});

test("toXML sets the 'r' attribute to index plus one", function() {
    var worksheet = Worksheet();

    var dom = $(worksheet.toXML());

    equal(dom.find("row").attr("r"), "r1");
});

test("toXML renders cells as children elements", function() {
    var worksheet = Worksheet([[ { value: "foo" }, { value: "bar" } ]]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c:first v").text(), "0");
    equal(dom.find("c:last v").text(), "1");
});

test("toXML adds styles", function() {
    var worksheet = Worksheet([[ { style: { bold: true }, value: "foo" } ]]);

    worksheet.toXML();

    equal(styles.length, 1);
});

test("toXML sets style index plus one as 's' attribute", function() {
    var worksheet = Worksheet([[ { style: { bold: true }, value: "foo" } ]]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").attr("s"), 1);
});

test("toXML does not set the 's' attribute if style is not set", function() {
    var worksheet = Worksheet([[ { value: "foo" } ]]);

    var dom = $(worksheet.toXML());
    equal(dom.find("c").attr("s"), null);
});

}());
