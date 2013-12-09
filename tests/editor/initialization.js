(function(){

var IndentCommand = kendo.ui.editor.IndentCommand;

var editor, textarea;

module("editor initialization", {
   setup: function() {
       textarea = $("<textarea></textarea>").appendTo(QUnit.fixture);
   },
   teardown: function() {
       kendo.destroy(QUnit.fixture);
   }
});

function setup(content, options) {
    editor = textarea.val(content).kendoEditor(options).data("kendoEditor");
}

test("editor value is get from textarea", function() {
    setup("foo");

    equal(editor.value(), "foo");
});

test("color tools react to palette definition", function() {
    var customColor = "#ff1ff1";
    setup("bar", {
        tools: [
            { name: "foreColor", palette: [customColor] }
        ]
    });

    var colorpicker = $("[data-role=colorpicker]");

    equal(colorpicker.length, 1);
    deepEqual(colorpicker.data("kendoColorPicker").options.palette, [customColor]);
    equal(colorpicker.data("kendoColorPicker").value(), customColor);
});

test("define global ColorTool palette", function() {
    var customColor = "#ff1ff1";

    var defaultPalette = kendo.ui.editor.ColorTool.fn.options.palette;
    kendo.ui.editor.ColorTool.fn.options.palette = [customColor];

    setup("baz", {
        tools: [ "foreColor", "backColor" ]
    });

    var colorpickers = $("[data-role=colorpicker]");

    deepEqual(colorpickers.eq(0).data("kendoColorPicker").options.palette, [customColor]);
    equal(colorpickers.eq(0).data("kendoColorPicker").value(), customColor);
    deepEqual(colorpickers.eq(1).data("kendoColorPicker").options.palette, [customColor]);
    equal(colorpickers.eq(1).data("kendoColorPicker").value(), customColor);

    kendo.ui.editor.ColorTool.fn.options.palette = defaultPalette;
});

test("tool options are passed to toolbar", function() {
    setup("foo", {
        tools: [ { name: "bold", tooltip: "foo" } ]
    });

    equal($(".k-tool").attr("title"), "foo");
});

module("initialization from div[contentEditable]", {
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

test("returns proper initial content", function() {
    var dom = $("<div contentEditable='true'><p>foo</p></div>").appendTo(QUnit.fixture);
    dom.kendoEditor();

    equal(dom.data("kendoEditor").value(), "<p>foo</p>");
});

test("adds k-editor class to contentEditable", function() {
    var dom = $("<div contentEditable='true'><p>foo</p></div>").appendTo(QUnit.fixture);

    dom.kendoEditor();

    ok(dom.hasClass("k-editor"));
    ok(dom.hasClass("k-editor-inline"));
    ok(dom.hasClass("k-widget"));
});

if (!kendo.support.browser.msie) {
    test("processes value when initializing", function() {
        var dom = $("<div contentEditable><p></p></div>").appendTo(QUnit.fixture);
        dom.kendoEditor();

        equal(dom.find("br").length, 1);
    });
}

}());
