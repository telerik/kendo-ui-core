---
title: Add Overlay Text in ImageEditor On Top of an Image
description: Learn how to add overlay text in ImageEditor on top of an image.
type: how-to
page_title: Create a Custom Command to Add Overlay Text in ImageEditor On Top of an Image - Kendo UI ImageEditor for jQuery
slug: imageeditor-add-overlay-text
tags: kendo ui, imageeditor, custom, command, overlay, image
res_type: kb
component: imageeditor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ImageEditor for jQuery</td>
 </tr>
</table>
 

## Description

How can I add overlay text over an image in ImageEditor?

## Solution

Adding an overlay text over image could be achieved by utilizing [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D) through the [ImageEditor's methods](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor#methods).
By getting the Image's [canvas](/api/javascript/ui/imageeditor/methods/getcanvaselement) element and [context](/api/javascript/ui/imageeditor/methods/getcurrent2dcontext) object, the developer can customize the content placed on the image.


### DatePicker

The following example demonstrates how a [custom command](https://docs.telerik.com/kendo-ui/controls/editors/imageeditor/tools#adding-custom-commands-to-the-toolbar) can be created in the ImageEditor toolbar for adding a custom text over a loaded image.  

```dojo
    <div id="imageEditor"></div>

    <script>
      $("#imageEditor").kendoImageEditor({
        toolbar: {
          items: [
            "open",            
            {
              type: "button",
              text: "Add Overlay Text",
              icon: "launch",
              enable: true,
              command:"AddOverlayTextImageEditorCommand"
            }
          ]
        }
      });

      $(document).ready(function () {

        var imageEditorNS = kendo.ui.imageeditor;

        imageEditorNS.commands.AddOverlayTextImageEditorCommand = imageEditorNS.ImageEditorCommand.extend({
          exec: function () {
            var that = this,
                options = that.options,
                imageeditor = that.imageeditor,
                canvas = imageeditor.getCanvasElement(),
                ctx = imageeditor.getCurrent2dContext(),
                image = imageeditor.getCurrentImage();

            //If there's an image
            if (image){

                //clear the contents
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                //Draws the image to te canvas
                ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                //Custom text is configured
                ctx.fillStyle = "#ffffff";
                ctx.font = "100pt Calibri";
                ctx.fillText('My Custom Text', canvas.width/2, canvas.height/2);

                //Draws the image instance
                imageeditor.drawImage(canvas.toDataURL()).done(function(image){

                //draw the canvas element with an image
                imageeditor.drawCanvas(image);

              }).fail(function (ev) {

                //trigger error
                imageeditor.trigger("error", ev);
              });
            } else {
              kendo.alert("No Image Present");
            }
          }
        });
      })
    </script>
```

## See Also

* [ImageEditor] API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
