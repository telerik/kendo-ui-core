---
title: Create ImageEditor Print Command
description: Learn how to create a custom command to print images from the ImageEditor
type: how-to
page_title: Create ImageEditor Print Command
slug: imageeditor_print_command
position: 
tags: ImageEditor, image, print, command
ticketid: 1563917
res_type: kb
---
## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product_long }}</td>
 </tr>
</table>

## Description
How can I print the edited image from the ImageEditor?

## Solution
Create a [custom command](https://docs.telerik.com/aspnet-core/html-helpers/editors/imageeditor/tools#adding-custom-commands-to-the-toolbar) and use it to print the image.

The below example demonstrates how you can create a Print command:
```
<script>
     var imageEditorNS = kendo.ui.imageeditor;

        imageEditorNS.commands.PrintImageEditorCommand = imageEditorNS.ImageEditorCommand.extend({
          exec: function () {
            var that = this,
                options = that.options,
                imageeditor = that.imageeditor,
                canvas = imageeditor.getCanvasElement(),
                ctx = imageeditor.getCurrent2dContext(),
                image = imageeditor.getCurrentImage();

            var win = window.open('about:blank', "_new");
            win.document.open();
            win.document.write([
              '<html>',
              '   <head>',
              '   </head>',
              '   <body onload="window.print()" onafterprint="window.close()">',
              '       <img src="' + image.src + '"/>',
              '   </body>',
              '</html>'
            ].join(''));
            win.document.close();
          }
        });
</script>

<div class="demo-section wide">
    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
        .Height(900)
        .SaveAs(s => s.FileName("image_edited.png"))
        .Toolbar(toolbar=>toolbar.Items(i=> {
            i.Add().Name("open");
            i.Add().Name("save");
            i.Add().Name("resize");
            i.Add().Name("crop");
            i.Add().Name("undo");
            i.Add().Name("redo");
            i.Add().Name("zoomIn");
            i.Add().Name("zoomOut");
            i.Add().Name("zoomDropdown");
            i.Add().Command("PrintImageEditorCommand").Type("button").Text("Print").Icon("print");
        }))
    )
</div>
```

Refer to this [REPL](https://netcorerepl.telerik.com/mmkzQEEi225iCf3606) for a runnable example.
