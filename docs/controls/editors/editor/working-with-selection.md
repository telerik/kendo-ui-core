---
title: Set Selections
page_title: Set Selections | Kendo UI Editor
description: "Learn how to use the `range` object and set desired selections in the Kendo UI Editor widget."
slug: set_selections_editor_widget
position: 4
---

# Set Selections

The Editor widget works with standard [`range` objects](https://developer.mozilla.org/en/docs/Web/API/Range) that provide a polyfill for Internet Explorer versions that do not fully support them.

To set the Editor selection, you need to create a `Range` object that specifies the desired selection, and pass it to the [`selectRange` method](/api/javascript/ui/editor#methods-selectRange)

The example below demonstrates how to set the Editor selections.

###### Example

    <textarea id="editor"></textarea>
    <script>
      var editor = $("#editor").kendoEditor().data("kendoEditor");

      editor.value("<strong>foo</strong><em>bar</em>");

      var strong = $("strong", editor.body)[0];
      var em = $("em", editor.body)[0]

      // get a Range object within the Editor document
      var range = editor.createRange();

      // set range start after **f**
      range.setStart(strong.firstChild, 1);

      // set range end before **r**
      range.setEnd(em.firstChild, 2);

      // set editor selection to a given range
      editor.selectRange(range);
    </script>

Notice that the second parameter of the `setStart` and `setEnd` methods work differently with the `Element` and `Text` nodes. For `Text` nodes the range boundary is set between the characters of the node: 0 means "before all characters", 1 means "between the first and the second character". For `Element` nodes the range boundary is set between the child nodes: 0 means "at the start of the element", and `element.childNodes.length` means "after all children".

For more information, see the [in-depth tutorial on `Range` objects on Quirksmode](http://www.quirksmode.org/dom/range_intro.html).

## See Also

Other articles on the Kendo UI Editor:

* [Overview of the Editor Widget]({% slug overview_kendoui_editor_widget %})
* [Image Browser]({% slug image_browser_editor_widget %})
* [Post-Process Content]({% slug post_process_content_editor_widget %})
* [Pasting]({% slug pasting_editor_widget %})
* [Prevent Cross-Site Scripting]({% slug prevent_xss_editor_widget %})
* [Troubleshooting]({% slug troubleshooting_editor_widget %})
* [Editor JavaScript API Reference](/api/javascript/ui/editor)

For how-to examples on the Kendo UI Editor widget, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
