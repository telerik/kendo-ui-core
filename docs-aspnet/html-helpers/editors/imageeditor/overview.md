---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ImageEditor component for {{ site.framework }}."
slug: htmlhelpers_imageeditor_aspnetcore
position: 1
---

# {{ site.framework }} ImageEditor Overview

{% if site.core %}
The Telerik UI ImageEditor TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI ImageEditor widget.
{% else %}
The Telerik UI ImageEditor HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ImageEditor widget.
{% endif %}

The ImageEditor utilizes a canvas element and enables image editing. It allows you to open, edit and save edited `.png`, `.jpg`, or `.jpeg` images.

* [Demo page for the ImageEditor HtmlHelper](https://demos.telerik.com/{{ site.platform }}/imageeditor/index)
{% if site.core %}
* [Demo page for the ImageEditor TagHelper](https://demos.telerik.com/aspnet-core/imageeditor/index)
{% endif %}

## Initializing the ImageEditor

The following example demonstrates how to define the ImageEditor.

```HtmlHelper
@(Html.Kendo().ImageEditor()
    .Name("imageEditor")
    .Width(500)
    .Height(500)
    .SaveAs(saveas => saveas.FileName("image.png"))
)
```
{% if site.core %}
```TagHelper
    <kendo-imageeditor name="imageEditor" width="500" height="500">
        <save-as file-name="image.png" />
    </kendo-imageeditor>
```
{% endif %}

## Functionality and Features

* [Tools]({% slug htmlhelpers_imageeditor_tools_aspnetcore %})

## Events

The following example demonstrates how to handle ImageEditor events on the client-side. For a complete example on basic ImageEditor events, refer to the [demo on using the events of the ImageEditor](https://demos.telerik.com/{{ site.platform }}/imageeditor/events).

```HtmlHelper
    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
        .Events(e => e
            .ImageLoaded("onImageLoaded")
        )
    )

    <script>
        function onImageLoaded(e) {
            console.log("Image loaded");
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-imageeditor name="imageEditor" 
                       width="500" 
                       height="500" 
                       on-image-loaded="onImageLoaded">
    </kendo-imageeditor>
    <script>
        function onImageLoaded(e) {
            console.log("Image loaded");
        }
    </script>
```    
{% endif %}

## See Also

* [Basic Usage of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor)
{% if site.core %}
* [Basic Usage of the ImageEditor TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/imageeditor/tag-helper)
{% endif %}
* [Using the API of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/api)
* [Server-Side API](/api/imageeditor)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/imageeditor)
