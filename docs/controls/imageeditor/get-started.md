---
title: Getting Started
page_title: jQuery ImageEditor Documentation - Getting Started with the ImageEditor
description: "Get started with the jQuery ImageEditor by Kendo UI and learn how to create, initialize, and enable the component."
slug: getting_started_kendoui_imageeditor_widget
position: 2
---

# Getting Started with the ImageEditor

This guide demonstrates how to get up and running with the Kendo UI for jQuery ImageEditor.

After the completion of this guide, you will achieve the following end result:

```dojo
    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg",
        width: 500,
        height: 400
    });
    </script> 
```

## 1. Create a Div Element

First, create a `<div>` element on the page that will be used to initialize the component.

```html
<div id="imageEditor"></div>
```

## 2. Initialize the ImageEditor

In this step, you will initialize the ImageEditor from the `<div>` element.

```html
<div id="imageEditor"></div>

<script>
    // Target the input element by using jQuery and then call the kendoImageEditor() method.
    $("#imageEditor").kendoImageEditor({
        // Add some basic configurations such as width and height.
        width: 500,
        height: 400
    });
</script>
```

## 3. Configure the Image's URL

The ImageEditor enables you to set the URL (or base64 string) of the image that will be opened by using the [`imageUrl`](/api/javascript/ui/imageeditor/configuration/imageurl) property.

```html
<div id="imageEditor"></div>

<script>
    <div id="imageEditor"></div>
    <script>
    $("#imageEditor").kendoImageEditor({
        imageUrl: "https://demos.telerik.com/kendo-ui/content/shared/images/photos/2.jpg", //specify the url or base64 string
        width: 500,
        height: 400
    });
</script> 
```

## Next Steps

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %})
* [Demo Page for the ImageEditor](https://demos.telerik.com/kendo-ui/imageeditor/index)

## See Also 

* [JavaScript API Reference of the ImageEditor](/api/javascript/ui/imageeditor)
* [Knowledge Base Section](/knowledge-base)


