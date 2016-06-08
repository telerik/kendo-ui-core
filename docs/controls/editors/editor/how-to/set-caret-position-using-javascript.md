---
title: Set Caret Position
page_title: Set Caret Position | Kendo UI Editor
description: "Learn how to set the caret position in a Kendo UI Editor widget."
slug: howto_set_caret_position_editor
---

# Set Caret Position

The examples below demonstrate how to set the position of the caret inside a Kendo UI inline Editor by using JavaScript.

The first sample uses a position index, while the second one searches for a string. The exact implementation in other scenarios will vary, depending on the business logic and used DOM/Range APIs.

The example below demonstrates how to set a caret position to a specified index.

###### Example

```html
    <div id="example" style="margin: 2em;">
        <p><button id="setPosition" class="k-button">Click</button></p>
        <div id="editor">Some text to focus and edit.</div>
    </div>

    <script>
      $(document).ready(function() {
        $("#editor").kendoEditor();

        $("#setPosition").click(function () {
          $("#editor").focus().trigger("click");
          var editor = $("#editor").data("kendoEditor");
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

The example below demonstrates how to set a caret position to the start of a string.

###### Example

```html
    <div id="example" style="margin: 2em;">
      <p><input id="stringToFocus" class="k-textbox" type="text" value="focus" /> <button id="setPosition" class="k-button">Click</button></p>
      <div id="editor" style="margin: 5em 0 0">
        <p>Random paragraph 1.</p>
        <p>Some text to focus and edit.</p>
      </div>
    </div>

    <script>
      $(document).ready(function() {
        $("#editor").kendoEditor();


        function findNodeOfString(container, str) {
          var nodeIterator = document.createNodeIterator(
            container,
            NodeFilter.SHOW_TEXT,
            function(node) {
        			return node.nodeValue.indexOf(str) >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    				});

          return nodeIterator.nextNode();
        }

        function moveCaret(editor, str) {
          var range = editor.getRange();
          if (range.collapsed) {


            var textNode = findNodeOfString(editor.body, str);
            if (textNode !== null) {
              var position = textNode.nodeValue.indexOf(str);
              range.setStart(textNode, position);
            }
            range.collapse(true); // collapse to start
            editor.selectRange(range);
          }
        }

        $("#setPosition").click(function () {
          $("#editor").focus().trigger("click");
          var editor = $("#editor").data("kendoEditor");
          moveCaret(editor, $("#stringToFocus").val());
        });

      });
    </script>
```

## See Also

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
