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
			<div id="topEditor">
				some text that I want to alter
			</div>
		</div>
    </div>

    <script>
      $(document).ready(function() {
        $("#topEditor").kendoEditor({
          tools: [
            "bold",
            "italic",
            "underline",
            "strikethrough",
            "justifyLeft",
            "justifyCenter",
            "justifyRight",
            "justifyFull",
            "createLink",
            "unlink",
            "insertImage",
            "createTable",
            "addColumnLeft",
            "addColumnRight",
            "addRowAbove",
            "addRowBelow",
            "deleteRow",
            "deleteColumn",
            "foreColor",
            "backColor"
          ]
        });
        
        $('.click').click(function () {
          $("#topEditor").focus().trigger("click");
          moveCaret(window, 6);
        });
        
        function moveCaret(win, charCount) {
          var sel, range;
            sel = win.getSelection();
            if (sel.rangeCount > 0) {
              var textNode = sel.focusNode;
              var newOffset = sel.focusOffset + charCount;
              sel.collapse(textNode, Math.min(textNode.length, newOffset));
            }
        }
      });
    </script>
```
