---
title: Tools
page_title: jQuery ImageEditor Documentation | Tools
description: "Get started with the jQuery ImageEditor by Kendo UI and use its tools."
slug: tools_kendoui_imageeditor_widget
position: 2
---

# Tools

The ImageEditor provides a predefined collection of tools that are used to interact with the widget.

## Default Tools

The ImageEditor creates a set of default tools for image editing. For a runnable example, refer to the [demo of the ImageEditor](https://demos.telerik.com/kendo-ui/editor/index).

The following example demonstrates how to instantiate an ImageEditor with predefined set of tools and define a custom button on the ImageEditor Toolbar.
```
    $(document).ready(function(){
        $("#imageEditor").kendoImageEditor({
            toolbar: {
                items: [
                    "open",
                    "save",
                    "crop",
                    "resize",
                    "undo",
                    "redo",
                    "zoomIn",
                    "zoomOut",
                    "zoomDropdown",
                    {
                        type: "button",
                        text: "Custom Button",
                        icon: "info",
                        enable: true,
                        click:function(){
                            alert('button clicked')
                        }
                    }
                ]
            }
        });
    });
```

## Adding Custom Commands to the Toolbar

The kendo.ui.imageeditor namespace exposes the ImageEditorCommand class that could be extended to implement a custom ImageEditor command. The example below demonstrates how to create a custom command that creates a thumbnail from the loaded image.

```
    <div id="imageEditor"></div>

    <script>
      $("#imageEditor").kendoImageEditor({
        toolbar: {
          items: [
            {
              type: "button",
              text: "Make Thumbnail",
              icon: "launch",
              enable: true,
              command:"MakeThumbnailImageEditorCommand"
            }
          ]
        }
      });

      $(document).ready(function () {

        var imageEditorNS = kendo.ui.imageeditor;

        imageEditorNS.commands.MakeThumbnailImageEditorCommand = imageEditorNS.ImageEditorCommand.extend({
          exec: function () {
            var that = this,
                options = that.options,
                imageeditor = that.imageeditor,
                canvas = imageeditor.getCanvasElement(),
                ctx = imageeditor.getCurrent2dContext(),
                image = imageeditor.getCurrentImage();

            var origWidth = canvas.width;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if((canvas.width / canvas.height) < 0){
              canvas.width = 200;
              canvas.height = origWidth*(200 / canvas.height);
            } else {
              canvas.width = origWidth/(canvas.height/200);
              canvas.height = 200
            }

            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

            imageeditor.drawImage(canvas.toDataURL()).done(function(image){
              imageeditor.drawCanvas(image);
            }).fail(function (ev) {
              imageeditor.trigger("error", ev);
            });
          }
        });
      })
    </script>
```

## Loading Images in the ImageEditor

If [imageUrl](/api/javascript/ui/imageeditor/configuration/imageurl) configuration option is used to set a predefined image for the ImageEditor and the image is hosted on another domain, the image editing tools will be disabled. If loading of an image from another domain is required, either using the [imageUrl](/api/javascript/ui/imageeditor/configuration/imageurl) configuration option or the [drawImage](/api/javascript/ui/imageeditor/methods/drawimage) method, provide the image as base64string. When the image is loaded from the same domain make sure a relative path to the image is used or the image is provided as base64string.

## See Also

* [Overview of the ImageEditor (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/index)
* [JavaScript API Reference of the ImageEditor](/api/javascript/ui/imageeditor)
