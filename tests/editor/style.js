(function(){

var editor;
var inline;
var StyleCommand = kendo.ui.editor.StyleCommand;
var Dom = kendo.ui.editor.Dom;

editor_module("editor style", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        QUnit.fixture.append('<style id="style-fixture">.foo{ color: red; }</style>');
        QUnit.fixture.append('<div id="inline" contentEditable="true"></div>');
        inline = new kendo.ui.Editor("#inline",{
            tools: [
                { name: "style", items: [
                    { text: "foo", value: "foo" }
                ] }
            ]
        } );
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
}, {
    tools: [
        { name: "style", items: [
            { text: "foo", value: "bar" }
        ] }
    ],
    stylesheets: [
        "editorStyles.css"
    ]
});


test("exec applies css class to inline element", function() {
    var range = createRangeFromText(editor, '<span>|foo|</span>');
    editor.selectRange(range);
    editor.exec("style", {value:"bar"});
    equal(editor.value(), '<span class="bar">foo</span>');
});

function styleTool(editor) {
    return editor.toolbar.items().filter(".k-style").data("kendoSelectBox");
}

function styleInput(editor) {
    return styleTool(editor).wrapper.find(".k-input");
}

test("tool displays styles initially", function() {
    editor.focus();
    editor.value("");
    editor.trigger("select");
    equal(styleInput(editor).text(), "Styles");
});

test("tool displays known values", function() {
    styleInput(editor).click();
    editor.focus();
    var range = createRangeFromText(editor, '<span class="bar">|foo|</span>');
    editor.selectRange(range);
    editor.trigger("select");
    equal(styleInput(editor).text(), "foo");
});

test("tool selects known values for inline editor", function() {
    var range = createRangeFromText(inline, '<p class="foo">f||oo</p>');
    inline.selectRange(range);
    inline.trigger("select");

    equal(inline.toolbar.items().filter(".k-style").val(), "foo");
});

test("tool applies classes in inline editor", function() {
    var range = createRangeFromText(inline, '<span>|foo|</span>');
    inline.selectRange(range);
    inline.exec("style", {value:"bar"});
    equal(inline.value(), '<span class="bar">foo</span>');
});

test("tool items are styled for inline editor", function() {
    var range = createRangeFromText(inline, '<p class="foo">f||oo</p>');
    inline.selectRange(range);
    inline.trigger("select");

    var popup = styleTool(inline).popup.element;

    equal(popup.find(".k-item span").length, 1);
    equal(popup.find(".k-item span").css("color"), propertyFrom("foo", "color"));
});

}());
