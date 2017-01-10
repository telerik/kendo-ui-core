---
title: Add Icon or Image to a Custom Tool
page_title: Add Icon or Image to a Custom Tool | Kendo UI Editor
description: "Learn how to add an icon or a plain image to a custom tool in the Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/add-icon-custom-tool
slug: howto_add_add_icon_custom_tool
---

# Add Icons or Images to a Custom Tool

When you create a custom tool, it depends on the further CSS stylization whether to render an image or an icon in its appearance.

To add such visual elements, use the automatically generated class name taken from the tool and follow the `k-[ToolName]` pattern.

The following example demonstrates how to decorate your own custom tool with a background image or a FontAwesome icon.

###### Example

```html
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<style>
  /* Using plain image for background */

  .k-editor .k-myTool
  {
      background: 50% 50% no-repeat url(images/rss-icon-16x16px.png);
  }

  /* Using FontAwesome icon for background */

  .k-editor .k-mySecondTool
  {
      background: none;
      line-height:25px;
  }

  .k-editor .k-mySecondTool:before
  {
      font-family: FontAwesome;
      content: "\f09e";
      font-size:16px;
  }
</style>

<textarea id="editor" rows="10" cols="30" style="width:100%;height:400px">
</textarea>


<script>
    $("#editor").kendoEditor({
        tools: [ "bold", "italic", "underline",
                {
                    name: "myTool",
                    exec: function(e) {
                        // my code
                    }
                },
                {
                    name: "mySecondTool",
                    exec: function(e) {
                        // my code
                    }
                }
              ]
    });
</script>
```

## See Also

Other articles on the Kendo UI Editor:

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_google_webfonts_editor %}).
