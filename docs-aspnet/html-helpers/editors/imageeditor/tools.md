---
title: Tools
page_title: Tools
description: "Learn which tools are available in the Telerik UI ImageEditor HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_imageeditor_tools_aspnetcore
position: 2
---

# Tools

The ImageEditor provides a predefined collection of tools that are used to interact with the control.

You can enable any of these tools by using the `Toolbar()` HtmlHelper method and configuring the Items collection to add the required tools.

## Default Tools

By default, all tools of the ImageEditor are included in the Toolbar.

The following example demonstrates how to instantiate an ImageEditor with predefined set of tools and add a custom button to the ImageEditor Toolbar.

```
    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
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
                i.Add().Type("separator");
                i.Add().Type("button").Name("myButton").Text("Custom Button").Click("onButtonClick");
            }))
    )

    <script>
        function onButtonClick() {
            kendo.alert("button clicked!")
        }
    </script>
```

## Adding Custom Commands to the Toolbar

The kendo.ui.imageeditor namespace exposes the ImageEditorCommand class that could be extended to implement a custom ImageEditor command. The example below demonstrates how to create a custom command that creates a thumbnail from the loaded image.

First, create a new command by extending the ImageEditorCommand class.

```
    <script>
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
    </script>
```

Then add the custom command to the ImageEditor Toolbar:

```
    .Toolbar(toolbar=>toolbar.Items(i=> {
            i.Add().Command("MakeThumbnailImageEditorCommand").Type("button").Text("Make Thumbnail");
        }))
```

## Loading Images in the ImageEditor

If the ImageUrl configuration option is used to set a predefined image for the ImageEditor and the image is hosted on another domain, the image editing tools will be disabled. If loading of an image from another domain is required provide the image as base64string. When the image is loaded from the same domain make sure a relative path to the image is used or the image is provided as base64string.


## See Also

* [Overview of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/index)
* [Server-Side API](/api/imageeditor)
