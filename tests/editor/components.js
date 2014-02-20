(function(){

var editor;
var colorpicker;

editor_module("editor components", {
    setup: function() {
        editor = $("#editor-fixture").data("kendoEditor");
        colorpicker = $(editor.element).closest(".k-editor").find(".k-colorpicker:first").data("kendoColorPicker");

        $.fn.press = function(key, ctrl, shift) {
            return this.trigger( { type: "keydown", keyCode: key, ctrlKey: ctrl, shiftKey: shift } );
        };
    }
}, {
    tools: [
        "foreColor",
        "backColor",
        {
            name: "fontName",
            items: [
                {text: "foo1", value: "bar1"},
                {text: "foo2", value: "bar2"}
            ]
        },
        {
            name: "fontSize",
            items: [
                {text: "foo1", value: "bar1"},
                {text: "foo2", value: "bar2"}
            ]
        },
        {
            name: "formatting",
            items: [{ text: "foo", value: "bar" }]
        }
    ]
});

test('colorpicker value returns black when no value has been selected', function() {
    equal(colorpicker.value(), '#000000');
});

var componentType = kendo.support.browser.msie ? "kendoDropDownList" : "kendoComboBox";

test('FontName combobox accepts custom item collections and preserves the default value item', function() {
    var fontNameCombo = editor.wrapper.find("select.k-fontName").data(componentType);

    var popupItems = fontNameCombo.popup.element.find("li");
    equal(popupItems.length, 3);

    var firstItemText = popupItems.first().text();
    equal(firstItemText, kendo.ui.Editor.fn.options.messages.fontNameInherit);

    var lastItem = popupItems.last();
    var lastItemText = lastItem.text();
    equal(lastItemText, "foo2");

    var lastItemButOneText = lastItem.prev().text();
    equal(lastItemButOneText, "foo1");

    var dataItems = fontNameCombo.dataSource.view();
    equal(dataItems.length, 3);
    equal(dataItems[0].value, "inherit");
    equal(dataItems[1].value, "bar1");
    equal(dataItems[2].value, "bar2");
});

test('FontSize combobox accepts custom item collections and preserves the default value item', function() {

    var fontSizeCombo = editor.wrapper.find("select.k-fontSize").data(componentType);

    var popupItems = fontSizeCombo.popup.element.find("li");
    equal(popupItems.length, 3);

    var firstItemText = popupItems.first().text();
    equal(firstItemText, kendo.ui.Editor.fn.options.messages.fontSizeInherit);

    var lastItem = popupItems.last();
    var lastItemText = lastItem.text();
    equal(lastItemText, "foo2");

    var lastItemButOneText = lastItem.prev().text();
    equal(lastItemButOneText, "foo1");

    var dataItems = fontSizeCombo.dataSource.view();
    equal(dataItems.length, 3);
    equal(dataItems[0].value, "inherit");
    equal(dataItems[1].value, "bar1");
    equal(dataItems[2].value, "bar2");
});

test('FormatBlock dropdown accepts custom item collections', function() {
    var formatBlockDropDown = editor.wrapper.find("select.k-formatting").data("kendoSelectBox");

    var popupItems = formatBlockDropDown.popup.element.find("li");
    equal(popupItems.length, 1);

    var firstItemText = popupItems.first().text();
    equal(firstItemText, "foo");

    var dataItems = formatBlockDropDown.dataSource.view();
    equal(dataItems.length, 1);
    equal(dataItems[0].value, "bar");
});

// identical test for inline Editor are in formattingtool.js
test("editor's body background color is applied to drop-down item wrapper", function() {
    var backgroundProperty = "backgroundColor",
        backgroundValue = "rgb(1, 1, 1)",
        $body = $(editor.body, editor.document),
        oldBackgroundValue = $body.css(backgroundProperty);

    $body.css(backgroundProperty, backgroundValue);
    
    stop();

    window.setTimeout(function (){
        start();
        equal(tool.list.css(backgroundProperty), backgroundValue);
        $body.css(backgroundProperty, oldBackgroundValue);
    });
    
    var tool = editor.toolbar.items().filter(".k-formatting").data("kendoSelectBox");
    tool.decorate(editor.body);
});

}());
