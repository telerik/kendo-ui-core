---
title: Set Caret Positions
page_title: Set Caret Positions | Kendo UI Editor
description: "Learn how to set the caret position in a Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/set-caret-position-using-javascript
slug: howto_set_caret_position_editor
---

# Set Caret Positions

To set the position of the caret inside an inline Kendo UI Editor by using JavaScript, you can use a position index or search for a string.  

The exact implementation in other scenarios varies, depending on the business logic and used DOM or Range APIs.

The following example demonstrates how to use a position index&mdash;that is, it sets a caret position inside the Editor to a specified index.

```dojo
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

The following example demonstrates how to search for a string&mdash;that is, it sets the a caret position to the start of a string.

```dojo
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

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
