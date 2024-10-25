---
title: Add Icons or Images to Custom Editor Tools
page_title: Add an Icon or an Image to a Custom Editor Tool - jQuery Editor
description: "Learn how to add an icon or a plain image to a custom tool in the Kendo UI for jQuery Editor component."
previous_url: /controls/editors/editor/how-to/add-icon-custom-tool, /controls/editors/editor/how-to/appearance/add-icon-custom-tool
slug: howto_add_add_icon_custom_tool
tags: telerik, kendo, jquery, editor, add, icon, image, to, custom, tool
component: editor
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Editor for jQuery</td>
 </tr>
</table>

## Description

How can I add an SVG or FontAwesome icon to a custom Editor tool?

## Solution

When you create a custom tool, it depends on the further CSS stylization whether to render an image or an icon in its appearance.

To add an SVG icon:

1. Target the default icon using the `k-icon` class and the title ofthe custom tool. For example, `$('.k-editor [title="My tool"] k-icon')` .
2. Use the [`kendo.ui.icon`](/api/javascript/ui/ui/methods/icon)method and set the needed icon.


The following example demonstrates how to decorate your own custom tool with a SVG icon.

```dojo
    <textarea id="editor" rows="10" cols="30" style="width:100%;height:400px"></textarea>

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


      kendo.ui.icon($('.k-editor [title="My tool"] .k-icon'), { icon: 'camera' });
      kendo.ui.icon($('.k-editor [title="My second tool"] .k-icon'), { icon: 'rss' });
    </script>
```

To add FontAwesome icon you can also target the default icon element and use CSS content property.
The following example demonstrates how to decorate your own custom tool with a FontAwesome icon.

```dojo
    <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
    
    <div id="example">
      <div class="demo-section wide">
        <textarea id="editor" rows="10" cols="30" style="width:100%; height:790px" aria-label="editor">
        </textarea>

        <script>
          kendo.setDefaults('iconType', 'font');
        </script>

        <style>
          .k-editor .k-toolbar-tool[title="Custom tool 1"] .k-icon:before {
            font-family: FontAwesome;
            content: "\f09e";
          }

          .k-editor .k-toolbar-tool[title="Custom tool 2"] .k-icon:before {
            font-family: FontAwesome;
            content: "\f061";
          }
        </style>

        <script>
          $("#editor").kendoEditor({
            tools: [
              {
                name: "custom-tool-1",
                tooltip: "Custom tool 1",
                exec: function (e) {
                  var editor = $("#editor").data("kendoEditor");
                  editor.exec("inserthtml", { value: "<hr />" });
                }
              },
              {
                name: "custom-tool-2",
                tooltip: "Custom tool 2",
                exec: function (e) {
                  var editor = $("#editor").data("kendoEditor");
                  editor.exec("inserthtml", { value: "<hr />" });
                }
              }
            ]
          });
        </script>

      </div>
    </div>
```


## See Also

* [Basic Usage of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/index)
* [Using the API of the Editor (Demo)](https://demos.telerik.com/kendo-ui/editor/api)
* [JavaScript API Reference of the Editor](/api/javascript/ui/editor)
* [jQuery Rich Text Editor Product Page](https://www.telerik.com/kendo-jquery-ui/rich-text-editor)
