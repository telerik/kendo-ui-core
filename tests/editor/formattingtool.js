(function(){

var inline;

module("editor formatting tools", {
    setup: function() {
        QUnit.fixture.append('<div id="inline"></div>');
        inline = new kendo.ui.Editor("#inline", {
            tools: [
                { name: "formatting", items: [
                    { text: "red", value: ".red" }
                ] }
            ]
        });

        setFormattingItems(inline, [
            { text: "red", value: "h1.red", context: "h1" },
            { text: "blue", value: "p.blue", context: "p" }
        ]);
    },
    teardown: function() {
        kendo.destroy(QUnit.fixture);
    }
});

function formattingTool(editor) {
    return editor.toolbar.items().filter(".k-formatting").data("kendoSelectBox");
}

function formattingInput(editor) {
    return formattingTool(editor).wrapper.find(".k-input");
}

function setFormattingItems(editor, array) {
    var tool = formattingTool(editor);

    tool.setDataSource({
        data: array
    });

    tool.decorate(editor.body);
}

function selectFromValue(editor, value) {
    var range = createRangeFromText(editor, value);
    editor.selectRange(range);
    editor.trigger("select");
}

test("Inline Editor sets a contentEditable attribute", function() {
    equal(inline.element.attr("contenteditable"), "true");
});

test("tool items are filtered depending on selection", function() {
    selectFromValue(inline, '<h1>fo||o</h1><p>bar</p>');

    var tool = formattingTool(inline);
    var popup = tool.popup.element;

    equal(popup.find(".k-item").length, 1);
    equal(popup.find(".k-item").text(), "red");
    equal(tool.text(), tool.options.title);

    selectFromValue(inline, '<h1>foo</h1><p>ba||r</p>');

    equal(popup.find(".k-item").length, 1);
    equal(popup.find(".k-item").text(), "blue");
    equal(tool.text(), tool.options.title);
});

test("format is applied to specified context", function() {
    selectFromValue(inline, '<h1>fo||o</h1>');

    var tool = formattingTool(inline);

    tool.value("h1.red");
    tool.trigger("change");

    equal(inline.value(), '<h1 class="red">foo</h1>');
});

test("tool is hidden if there are no applicable styles", function() {
    selectFromValue(inline, 'fo||o');

    var tool = formattingTool(inline);

    ok(tool.wrapper.is(".k-state-disabled"));
});

test("selecting new format removes old className", function() {
    selectFromValue(inline, "<h1 class='red'>fo||o</h1>");

    inline.exec("formatting", { value: { tag: "h1" } });

    equal(inline.value(), "<h1>foo</h1>");
});

test("drop-down items are decorated", function() {
    selectFromValue(inline, "<h1 class='red'>fo||o</h1>");

    var tool = formattingTool(inline);

    var formatSpan = tool.popup.element.find(".k-item span");

    equal(formatSpan.length, 1);
    equal(formatSpan.css("color"), propertyFrom("red", "color"));
});

// identical test for iframe Editor are in components.js
test("inline editor background color is applied to drop-down item wrapper", function() {
    var backgroundProperty = "background-color",
        backgroundValue = "rgb(1, 1, 1)",
        oldBackgroundValue = inline.element.css(backgroundProperty);

    inline.element.css(backgroundProperty, backgroundValue);

    var tool = formattingTool(inline);
    tool.decorate(inline.body);

    equal(tool.list.css(backgroundProperty), backgroundValue);

    inline.element.css(backgroundProperty, oldBackgroundValue);
});

test("inline editor parent's background color is applied to drop-down item wrapper", function() {
    var backgroundProperty = "background-color",
        backgroundValue = "rgb(1, 1, 1)",
        oldBackgroundValue = inline.element.parent().css(backgroundProperty);

    inline.element.parent().css(backgroundProperty, backgroundValue);

    var tool = formattingTool(inline);
    tool.decorate(inline.body);

    equal(tool.list.css(backgroundProperty), backgroundValue);

    inline.element.parent().css(backgroundProperty, oldBackgroundValue);
});

test("styles handle quotes in item decoration", function() {
    selectFromValue(inline, "<h1>fo||o</h1>");

    withMock(kendo.ui.editor.Dom, "inlineStyle", function() {
        return 'font-family: "Segoe UI";';
    }, function() {
        var tool = formattingTool(inline);
        tool.decorate();

        var formatSpan = tool.popup.element.find(".k-item span");

        equal(formatSpan.length, 1);
        ok(formatSpan.css("font-family").replace(/"/g, "'"), "'Segoe UI'"); // '
    });
});

test("styles apply to specified context", function() {
    setFormattingItems(inline, [
        { text: "red", value: ".red", context: "h1" },
        { text: "blue", value: ".blue", context: "p" }
    ]);

    selectFromValue(inline, '<h1>fo||o</h1>');

    var tool = formattingTool(inline);

    tool.value(".red");
    tool.trigger("change");

    equal(inline.value(), '<h1 class="red">foo</h1>');
});

test("tool items are filtered depending on selection", function() {
    selectFromValue(inline, '<h1>fo||o</h1><p>bar</p>');

    var tool = formattingTool(inline);
    var popup = tool.popup.element;

    equal(popup.find(".k-item").length, 1);
    equal(popup.find(".k-item").text(), "red");
    equal(tool.text(), tool.options.title);

    selectFromValue(inline, '<h1>foo</h1><p>ba||r</p>');

    equal(popup.find(".k-item").length, 1);
    equal(popup.find(".k-item").text(), "blue");
    equal(tool.text(), tool.options.title);
});

test("styles tool is hidden if there are no applicable styles", function() {
    selectFromValue(inline, 'fo||o');

    var tool = formattingTool(inline);

    ok(tool.wrapper.is(".k-state-disabled"));
});

test("tool shows current format", function() {
    setFormattingItems(inline, [
        { text: "red", value: "h1.red" },
        { text: "blue", value: "p.blue" },
        { text: "heading 2", value: "h2" }
    ]);

    var tool = formattingTool(inline);

    selectFromValue(inline, '<p>f|o|o</p>');
    equal(tool.text(), tool.options.title);

    selectFromValue(inline, '<h2>f|o|o</h2>');
    equal(tool.text(), "heading 2");
});

test("applying format does not replace outer wrapper", function() {
    setFormattingItems(inline, [
        { text: "heading", value: "h1" }
    ]);

    selectFromValue(inline, "f|o|o");

    var tool = formattingTool(inline);

    tool.value("h1");
    tool.trigger("change");

    equal(inline.value(), "<h1>foo</h1>");
});

test("tool shows current if range spans between elements format", function() {
    setFormattingItems(inline, [
        { text: "red", value: "h1.red" },
        { text: "blue", value: "p.blue" },
        { text: "heading 2", value: "h2" }
    ]);

    var tool = formattingTool(inline);

    selectFromValue(inline, '<h2>f|oo</h2><h2>ba|r</h2>');
    equal(tool.text(), "heading 2");

    selectFromValue(inline, '<h2>f|oo</h2><p class="blue">ba|r</p>');
    equal(tool.text(), tool.options.title);
});

}());
