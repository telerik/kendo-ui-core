---
title: Enable and Disable the Editor
page_title: Enable and Disable the Editor | Kendo UI Editor
description: "Learn how to enable and disable the Kendo UI Editor."
slug: howto_enable_and_disable_the_editor_editor
---

# Enable and Disable the Editor

The example below demonstrates how to enable and disable the Kendo UI Editor.

###### Example

```html
  <style>
      #overlay{
        top:100;
        position:absolute;
        background-color:black;
        opacity:0.1;

      }
      #content{
        top:100;
        position:absolute;

      }
    </style>

    <input type="button" class="k-button" value="Disable" onclick="setzIndex(2)">
    <input type="button" class="k-button" value="Enable" onclick="setzIndex(0)">

    <div id="overlay" style="width:740px;height:440px"></div>
    <div id="content">
      <textarea id="editor" rows="10" cols="30" style="width:740px;height:440px"></textarea>
    </div>
    <script>
      function setzIndex(index){
        $("#overlay").css("z-index", index);
      }
      $(document).ready(function() {
        // create Editor from textarea HTML element with default set of tools
        $("#editor").kendoEditor();
      });
    </script>
```

## See Also

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_max_length_validation_editor %}).
