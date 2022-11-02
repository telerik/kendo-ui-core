---
title: Add a Rotating-Image Functionality to the ImageEditor
page_title: Add a Functionality for Rotating Images in the ImageEditor
description: "An example on how to add a functionality for rotating images in the {{ site.product }} ImageEditor."
type: how-to
slug: imageeditor-rotate-image
tags: progress, telerik, aspnet, mvc, core, imageeditor, image, rotate, edit
res_type: kb
component: imageeditor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.prodcut }} ImageEditor</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.621 version</td>
 </tr>
</table>

## Description

How can I add a functionality for rotating images in the {{ site.product }} ImageEditor?

## Solution

To achieve the desired scenario: 

1. Add a custom button in the ToolBar of the ImageEditor that executes a custom command.
1. When the command is triggered, execute custom logic to rotate the image.

```CustomCommand
        .Toolbar(toolbar => toolbar.Items(i =>
        {
            i.Add().Command("RotateImageRightImageEditorCommand").Type("button").Text("Rotate Image");

        }))         
```
```script.js
    $(document).ready(function () {
        var imageEditor = $("#imageEditor").getKendoImageEditor();
        imageEditor.one("imageRendered", function () {
            imageEditor.executeCommand({ command: "ZoomImageEditorCommand", options: imageEditor.getZoomLevel() - 5.0 });
        });
    });


    var imageEditorNS = kendo.ui.imageeditor;
    imageEditorNS.commands.RotateImageRightImageEditorCommand = imageEditorNS.ImageEditorCommand.extend({
        exec: function () {
            var that = this,
                imageeditor = that.imageeditor,
                canvas = imageeditor.getCanvasElement(),
                ctx = imageeditor.getCurrent2dContext(),
                image = imageeditor.getCurrentImage();

            let degrees = 90; //rotate right

            canvas.width = image.height;
            canvas.height = image.width;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.translate(image.height / 2, image.width / 2);

            ctx.rotate(degrees * Math.PI / 180);
            ctx.drawImage(image, -image.width / 2, -image.height / 2);

            imageeditor.drawImage(canvas.toDataURL()).done(function (image) {
                imageeditor.drawCanvas(image);
            }).fail(function (ev) {
                imageeditor.trigger("error", ev);
            });
        }
    });
```


For a complete implementation of the suggested approach, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cwEtcMkf58Vhoi8t58).