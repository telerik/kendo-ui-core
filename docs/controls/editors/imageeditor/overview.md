---
title: Overview
page_title: jQuery Image Editor Documentation |  Image Editor Overview | Kendo UI
description: "Get started with the jQuery Image Editor by Kendo UI and learn how to create, initialize, and enable the widget."
slug: overview_kendoui_imageeditor_widget
position: 1
---

# Image Editor Overview

The Image Editor utilizes a canvas element and enables image editing. It allows you to open, edit and save edited images.

* [Demo page for the Image Editor](https://demos.telerik.com/kendo-ui/imageeditor/index)

## Initializing the Image Editor

To initialize the Image Editor, use an existing `div` element and a jQuery selector.
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

For an example on the Image Editor events, refer to the [demo on using the events of the Image Editor](https://demos.telerik.com/kendo-ui/imageeditor/events).

## Referencing Existing Instances

You can access an existing Image Editor instance by using the `.data()` jQuery method. After the reference is established, use the [JavaScript API reference of the Image Editor](/api/javascript/ui/imageeditor) to control its behavior.

```
    var imageEditor = $("#imageEditor").data("kendoImageEditor");
```

## See Also

* [Overview of the Image Editor functionality (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/index)
* [Using the API of the Image Editor (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/api)
* [JavaScript API Reference of the Image Editor](/api/javascript/ui/imageeditor)
