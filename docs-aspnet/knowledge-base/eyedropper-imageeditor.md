---
title: Implementing Eyedropper Functionality for the ImageEditor
description: Learn how to create a custom eye dropper command for the {{ site.product }} ImageEditor by following the steps in the Knowledge Base section of the {{ site.product }} components.
type: how-to
page_title: Adding Eyedropper Functionality to the ImageEditor
slug: eyedropper-imageeditor
position: 
tags: colorpicker, eyedropper, imageeditor, color
ticketid: 1596287
res_type: kb
---

## Environment

<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td></td>
        </tr>
        <tr>
            <td>Product</td>
            <td>ImageEditor for {{ site.framework }}</td>
        </tr>
    </tbody>
</table>


## Description

How can I create a custom tool to pick a color from an image in the ImageEditor when working with the {{ site.product }} components?

## Solution

The [MDN tutorial for extracting data from a canvas element](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas#a_color_picker) demonstrates how to extract the color for a specific pixel. [Add a custom command to the ImageEditor Toolbar](https://docs.telerik.com/aspnet-core/html-helpers/editors/imageeditor/tools#adding-custom-commands-to-the-toolbar) implementing the logic demonstrated in the MDN tutorial linked above.

In the example below, clicking on the image retrieves the color of the pixel clicked and sets it as the value of the ColorPicker component. Inspect this [runnable example](https://netcorerepl.telerik.com/GnaclaOV22ojLSse56) of the code snippet below:

```
 <script>

     function pick(event, canvas, ctx) {
        const bounding = canvas.getBoundingClientRect();
        const x = event.clientX - bounding.left;
        const y = event.clientY - bounding.top;
        const pixel = ctx.getImageData(x, y, 1, 1);
        const data = pixel.data;

        const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;

        return data
    }
        var imageEditorNS = kendo.ui.imageeditor;

        imageEditorNS.commands.GetColorImageEditorCommand = imageEditorNS.ImageEditorCommand.extend({
        exec: function () {
            var that = this,
                options = that.options,
                imageeditor = that.imageeditor,
                canvas = imageeditor.getCanvasElement(),
                ctx = imageeditor.getCurrent2dContext(),
                image = imageeditor.getCurrentImage();

            canvas.addEventListener("click", function(event){
                var data = pick(event, canvas, ctx);
                var picker = $("#colorpicker").getKendoColorPicker();
                picker.value(`rgba(${data[0]},${data[1]},${data[2]},${data[3] / 255})`);
                picker.trigger("change")
            },{once : true});
        }
        });
    </script>
<div class="demo-section wide">
    <label>Selected Color:</label>
     @(Html.Kendo().ColorPicker()
          .Name("colorpicker")
    )
    <h3>Upload image and select color:</h3>
    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
        .Height(900)
        .Toolbar(toolbar=>toolbar.Items(i=> {
            i.Add().Name("open");
            i.Add().Command("GetColorImageEditorCommand").Type("button").Text("Get Color").Icon("eyedropper");
        }))
    )
</div>
```

## More {{ site.framework }} Editor Resources

* [{{ site.framework }} Image Editor Documentation]({%slug htmlhelpers_imageeditor_aspnetcore%})

* [{{ site.framework }} Image Editor Demos](https://demos.telerik.com/{{ site.platform }}/imageeditor)

{% if site.core %}
* [{{ site.framework }} Image Editor Product Page](https://www.telerik.com/aspnet-core-ui/image-editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Image Editor Product Page](https://www.telerik.com/aspnet-mvc/image-editor)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Telerik REPL: Adding Eyedropper Functionality to the Image Editor](https://netcorerepl.telerik.com/GnaclaOV22ojLSse56)
* [Client-Side API Reference of the Image Editor for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
* [Server-Side API Reference of the Image Editor for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/imageeditor)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
