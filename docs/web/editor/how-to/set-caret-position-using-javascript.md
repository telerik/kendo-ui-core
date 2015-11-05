---
title: Set Caret Position
page_title: Set Caret Position | Kendo UI Editor Widget
description: "Learn how to set the caret position in a Kendo UI Editor widget."
slug: howto_set_caret_position_editor
---

# Set Caret Position

The example below demonstrates how to set the position of the caret inside a Kendo UI inline Editor by using JavaScript.

###### Example

```html
    <div id="example">
        <button class="click">Click</button>
        <div class="demo-section k-header" style="padding:100px">
            <div id="topEditor">some text that I want to alter</div>
        </div>
    </div>

    <script>
      $(document).ready(function() {
        $("#topEditor").kendoEditor();

        $('.click').click(function () {
          $("#topEditor").focus().trigger("click");
          var editor = $("#topEditor").data("kendoEditor");
          moveCaret(editor, 6);
        });

        function moveCaret(editor, position) {
          var range = editor.getRange();
          if (range.collapsed) {
            var textNode = editor.body.firstChild;
            range.setStart(textNode, position);
            range.collapse(true); // collapse to start
            editor.selectRange(range);
          }
        }
      });
    </script>
```

## See Also

Other articles on Kendo UI Editor:

* [JavaScript API Reference](/api/javascript/ui/editor)
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Add Max-Length Validation]({% slug howto_add_max_length_validation_editor %})
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})