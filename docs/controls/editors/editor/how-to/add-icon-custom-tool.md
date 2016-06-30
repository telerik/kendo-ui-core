---
title: Add Icon or Image to a Custom Tool
page_title: Add Icon or Image to a Custom Tool | Kendo UI Editor
description: "Learn how to add icon or plain image to a custom tool in th etoolbar"
slug: howto_add_add_icon_custom_tool
---

# Add Max-Length Validation

The example below demonstrates how to decorate your own custom tools with a background image or a FontAwesome icon.

When a custom tool is created its appearance depends on further CSS stylization in order to have an image or icon rendered. 
To do so you can use the automatically generated class name taken from the tool's and follows this pattern: `k-[ToolName]`.

###### Example

```html
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<style>
  /* Using plain image for background */
  
  .k-editor .k-myTool
  {
      background: 50% 50% no-repeat url(http://digitaltools.node3000.com/wp-content/themes/digital-tools/images/rss-icon-16x16px.png);
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

Other articles on the Kendo UI Editor and how-to examples::

* [Editor JavaScript API Reference](/api/javascript/ui/editor)
* [How to Get Reference to Child Widgets]({% slug howto_get_referenceto_child_widgets_editor %})
* [How to Insert HTML Content via Custom Popup Tools]({% slug howto_insert_html_content_custom_popup_tool_editor %})
* [How to Set Caret Position]({% slug howto_set_caret_position_editor %})
* [How to Show Editor in Full Screen]({% slug howto_show_infull_screen_editor %})
* [How to Use Inline Editor inside Windows]({% slug howto_use_inline_editor_inside_windows_editor %})

For more runnable examples on the Kendo UI Editor, browse its [**How To** documentation folder]({% slug howto_add_google_webfonts_editor %}).
