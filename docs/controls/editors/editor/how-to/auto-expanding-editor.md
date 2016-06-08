---
title: Create Auto-Expanding Editors
page_title: Create Auto-Expanding Editors | Kendo UI Editor
description: "Learn how to make the Editor automatically expand."
slug: howto_make_the_editor_auto_expanding_editor
---

# Create Auto-Expanding Editors

The example below demonstrates how to create an auto-expanding Kendo UI Editor.

###### Example

```html
  <style>
      html{font:12px sans-serif;overflow:auto;}

      html,body{margin:0;padding:0;height:100%;min-height:100%;}

      #Comments{display:block;width:100%;height:100%;border:0;padding:0;}

      table.expandEditor{border-width:0;width:100%;height:100%;}
    </style>

    <textarea id="Comments" cols="60" rows="10"></textarea>

    <script>
      	  $("#Comments").kendoEditor().data("kendoEditor").wrapper.width("").height("").addClass("expandEditor");
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
