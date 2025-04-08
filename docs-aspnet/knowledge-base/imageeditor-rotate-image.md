---
title: Adding a Rotating-Image Functionality to the ImageEditor
page_title: Adding a Rotating-Image Functionality to the ImageEditor
description: Learn how to add a functionality for rotating images in the {{ site.product }} ImageEditor. Find the solution in the Knowledge Base section of the {{ site.product }} documentation.
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
  <td>{{ site.product }} ImageEditor</td>
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

```Razor CustomCommand
        .Toolbar(toolbar => toolbar.Items(i =>
        {
            i.Add().Command("RotateImageRightImageEditorCommand").Type("button").Text("Rotate Image");

        }))         
```
```JS script.js
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


For the complete implementation of approach suggested above, refer to the following [Telerik REPL](https://netcorerepl.telerik.com/cwEtcMkf58Vhoi8t58).

## More {{ site.framework }} ImageEditor Resources

* [{{ site.framework }} ImageEditor Documentation]({%slug htmlhelpers_imageeditor_aspnetcore%})

* [{{ site.framework }} ImageEditor Demos](https://demos.telerik.com/{{ site.platform }}/imageeditor)

{% if site.core %}
* [{{ site.framework }} ImageEditor Product Page](https://www.telerik.com/aspnet-core-ui/image-editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} ImageEditor Product Page](https://www.telerik.com/aspnet-mvc/image-editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Adding a Rotating-Image Functionality to the ImageEditor](https://netcorerepl.telerik.com/cwEtcMkf58Vhoi8t58)
* [Client-Side API Reference of the ImageEditor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
* [Server-Side API Reference of the ImageEditor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/imageeditor)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
