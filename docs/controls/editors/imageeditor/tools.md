---
title: Tools
page_title: jQuery ImageEditor Documentation | Tools | Kendo UI
description: "Get started with the jQuery ImageEditor by Kendo UI and use its tools."
slug: tools_kendoui_imageeditor_widget
position: 2
---

# Tools

The ImageEditor provides a predefined collection of tools that are used to interact with the widget.

## Default Tools

The ImageEditor creates a set of default tools for image editing. For a runnable example, refer to the [demo of the ImageEditor](https://demos.telerik.com/kendo-ui/editor/index).

The following example demonstrates how to instantiate an ImageEditor with predefined set of tools.
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

* [Overview of the ImageEditor (Demo)](https://demos.telerik.com/kendo-ui/imageeditor/index)
* [JavaScript API Reference of the ImageEditor](/api/javascript/ui/imageeditor)
