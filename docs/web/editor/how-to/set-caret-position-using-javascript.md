---
title: Set caret position
page_title: Set caret position
description: Set caret position
---

# Set caret position

The example shows how to set the position of the caret inside a Kendo UI Inline Editor using JavaScript.

#### Example

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
