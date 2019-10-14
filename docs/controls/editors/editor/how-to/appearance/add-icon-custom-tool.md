---
title: Add Icon or Image to a Custom Tool
page_title: Add Icon or Image to a Custom Tool | Kendo UI Editor
description: "Learn how to add an icon or a plain image to a custom tool in the Kendo UI Editor widget."
previous_url: /controls/editors/editor/how-to/add-icon-custom-tool
slug: howto_add_add_icon_custom_tool
---

# Add Icons or Images to a Custom Tool

When you create a custom tool, it depends on the further CSS stylization whether to render an image or an icon in its appearance.

To add such visual elements, use the automatically generated class name taken from the tool and follow the `k-i-[ToolName]` pattern. 

The following example demonstrates how to decorate your own custom tool with a background image or a FontAwesome icon.

```dojo
<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
<style>
  /* Using plain image for background */

  .k-editor .k-i-my-tool
  {
      background: 50% 50% no-repeat url(https://demos.telerik.com/kendo-ui/content/web/16x16/Chart.png);
  }

  /* Using FontAwesome icon for background */

  .k-editor .k-i-my-second-tool:before
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
                    tooltip: "My tool",
                    exec: function(e) {
                        // My code.
                    }
                },
                {
                    name: "mySecondTool",
                    tooltip: "My second tool",
                    exec: function(e) {
                        // My code.
                    }
                }
              ]
    });
</script>
```

## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
