---
title: Overview
page_title: jQuery ImageEditor Documentation |  ImageEditor Overview
description: "Get started with the jQuery ImageEditor by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_imageeditor_widget
position: 1
---

# ImageEditor Overview

The ImageEditor utilizes a canvas element and enables image editing. It allows you to open, edit and save edited images.

* [Demo page for the ImageEditor](https://demos.telerik.com/kendo-ui/imageeditor/index)

## Initializing the ImageEditor

To initialize the ImageEditor, use an existing `div` element and a jQuery selector.
```dojo
    <div id="imageEditor"></div>
    <script>
      $(document).ready(function(){
          $("#imageEditor").kendoImageEditor();
      });
    </script>
```

## Functionality and Features

* [Tools]({% slug tools_kendoui_imageeditor_widget %})

## Events

For an example on the ImageEditor events, refer to the [demo on using the events of the ImageEditor](https://demos.telerik.com/kendo-ui/imageeditor/events).

## Referencing Existing Instances

You can access an existing ImageEditor instance by using the `.data()` jQuery method. After the reference is established, use the [JavaScript API reference of the ImageEditor](/api/javascript/ui/imageeditor) to control its behavior.

```
    var imageEditor = $("#imageEditor").data("kendoImageEditor");
```

## See Also

* [Overview of the ImageEditor functionality (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/index)
* [Using the API of the ImageEditor (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/api)
* [JavaScript API Reference of the ImageEditor](/api/javascript/ui/imageeditor)
