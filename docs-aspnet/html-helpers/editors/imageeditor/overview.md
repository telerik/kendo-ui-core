---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ImageEditor HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_imageeditor_aspnetcore
position: 1
---

# ImageEditor HtmlHelper Overview

The Telerik UI ImageEditor HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI ImageEditor widget.

The ImageEditor utilizes a canvas element and enables image editing. It allows you to open, edit and save edited images.

* [Demo page for the ImageEditor](https://demos.telerik.com/{{ site.platform }}/imageeditor/index)

## Initializing the ImageEditor

The following example demonstrates how to define the ImageEditor by using the ImageEditor HtmlHelper.

```
@(Html.Kendo().ImageEditor()
    .Name("imageEditor")
    .Width(500)
    .Height(500)
    .SaveAs(saveas => saveas.FileName("image.png"))
)
```

## Functionality and Features

* [Tools]({% slug htmlhelpers_imageeditor_tools_aspnetcore %})

## Events

The following example demonstrates how to handle ImageEditor HTML helper events on the client-side. For a complete example on basic ImageEditor events, refer to the [demo on using the events of the ImageEditor](https://demos.telerik.com/{{ site.platform }}/imageeditor/events).

```
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

## See Also

* [Basic Usage of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor)
* [Using the API of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/api)
* [Server-Side API](/api/imageeditor)
