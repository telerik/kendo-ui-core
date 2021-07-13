---
title: Selection
page_title: jQuery Editor Documentation | Selection
description: "Get started with the jQuery Editor by Kendo UI and set the desired selections."
previous_url: /controls/editors/editor/working-with-selection
slug: set_selections_editor_widget
position: 5
---

# Selection

The Editor works with standard [`range`](https://developer.mozilla.org/en/docs/Web/API/Range) objects that provide a polyfill for Internet Explorer versions that do not fully support them.

## Getting Started

To set the Editor selection:

1. Create a `Range` object that specifies the desired selection.
1. Pass `Range` to the [`selectRange`](/api/javascript/ui/editor/methods/selectrange) method.

The following example demonstrates how to set the Editor selections. The second parameter of the `setStart` and `setEnd` methods works differently with the `Element` and `Text` nodes.

For the `Text` nodes, the range boundary is set between the characters of the node.
* `0` means "before all characters".
* `1` means "between the first and the second character".

For the `Element` nodes, the range boundary is set between the child nodes.
* `0` means "at the start of the element".
* `element.childNodes.length` means "after all children".

For more information, refer to the [tutorial on `Range` objects on Quirksmode](http://www.quirksmode.org/dom/range_intro.html).

    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor().data("kendoEditor");

      editor.value("<strong>foo</strong><em>bar</em>");

      var strong = $("strong", editor.body)[0];
      var em = $("em", editor.body)[0]

      // Get a Range object within the Editor document.
      var range = editor.createRange();

      // Set the range start after **f**.
      range.setStart(strong.firstChild, 1);

      // Set the range ending before **r**.
      range.setEnd(em.firstChild, 2);

      // Set the Editor selection to a given range.
      editor.selectRange(range);
    </script>

## Using Selection in Internet Explorer

Internet Explorer keeps a single instance of the selection and the range. As a result, any custom tools that draw the focus away from the content area apply the executed command at the beginning of the content instead of at the caret position. To prevent this behavior, cache the range and re-select it at the correct moments.

The following example shows how to implement a custom tool in a DropDownList with its filtering enabled.

    <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
    </textarea>

    <script type="text/x-kendo-template" id="custom-template">
        <label for='templateTool' style='vertical-align:middle;'>Insert tag:</label>
        <input id='templateTool' style='width: 130px;' />
    </script>

    <script>
        $("#editor").kendoEditor({
            tools: [
                {
                    name: "customTemplate",
                    template: $("#custom-template").html()
                }
            ]
        });

      var _Editor_Range = null;

      $("#templateTool").kendoDropDownList({
        filter: "contains",
        dataTextField: "text",
        dataValueField: "value",
        change: function(e) {
  				var editor = $("#editor").data("kendoEditor");
          editor.selectRange(_Editor_Range);
          editor.exec("inserthtml", { value: e.sender.value() });
        },
        open: function () {
        	var editor = $("#editor").data("kendoEditor");
          _Editor_Range = editor.getRange();
        },
        dataSource: [
          { text: "Item1", value: 1 },
          { text: "Item2", value: 2 },
          { text: "Item3", value: 3 }
        ]
      });
    </script>

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
