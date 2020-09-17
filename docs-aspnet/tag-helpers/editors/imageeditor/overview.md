---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI ImageEditor TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_imageeditor_aspnetcore
position: 1
---

# ImageEditor TagHelper Overview

The Telerik UI ImageEditor TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI ImageEditor widget.

The ImageEditor utilizes a canvas element and enables image editing. It allows you to open, edit and save edited images.

* [Demo page for the ImageEditor](https://demos.telerik.com/aspnet-core/imageeditor/index)

## Initializing the ImageEditor

The following example demonstrates how to define the ImageEditor by using the ImageEditor TagHelper. You can adjust and set up the tools in the tools collection through the `<toolbar>` tag. To define the tools for the ImageEditor, use the `<items>` and `<item>` tags to set the items collection.

```tagHelper
    <kendo-imageeditor name="imageEditor" width="500" height="500" on-image-loaded="onImageLoaded">
        <save-as file-name="image.png" />
        <toolbar>
            <items>
                <item name="open"></item>
                <item name="save"></item>
                <item name="crop"></item>
                <item name="resize"></item>
            </items>
        </toolbar>
    </kendo-imageeditor>

    <script>
    function onImageLoaded(e){
        console.log("Image loaded")
    }
    </script>
```

## See Also

* [Basic Usage of the ImageEditor TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/imageeditor/tag-helper)
* [Server-Side API](/api/imageeditor)
