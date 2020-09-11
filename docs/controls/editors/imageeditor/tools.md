---
title: Tools
page_title: jQuery Image Editor Documentation | Tools | Kendo UI
description: "Get started with the jQuery Image Editor by Kendo UI and use its tools."
slug: tools_kendoui_imageeditor_widget
position: 2
---

# Tools

The Image Editor provides a predefined collection of tools that are used to interact with the widget.

## Default Tools

The Image Editor creates a set of default tools for image editing. For a runnable example, refer to the [demo of the Image Editor](https://demos.telerik.com/kendo-ui/editor/index).

The following example demonstrates how to instantiate an Image Editor with predefined set of tools.
```
    $(document).ready(function(){
        $("#imageEditor").kendoImageEditor({
            tools: [
                "open",
                "save",
                "crop",
                "resize"
            ]
        });
    });
```

## See Also

* [Overview of the Image Editor (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/index)
* [JavaScript API Reference of the Image Editor](/api/javascript/ui/imageeditor)
