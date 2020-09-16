---
title: Tools
page_title: Tools
description: "Learn which tools are available in the Telerik UI ImageEditor HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_imageeditor_tools_aspnetcore
position: 2
---

# Tools

The ImageEditor provides a predefined collection of tools that are used to interact with the control.

You can enable any of these tools by using the `Tools()` HtmlHelper method and configure it with the specific tool method.

## Default Tools

The default tools in the ImageEditor are included in the toolbar of the ImageEditor upon setting the respective tool method.

The following example demonstrates how to instantiate an ImageEditor with predefined set of tools.

```
    @(Html.Kendo().ImageEditor()
        .Name("imageEditor")
        .Tools(tools => tools
            .Open()
            .Save()
            .Crop()
            .Resize()
        )
    )
```

## See Also

* [Overview of the ImageEditor HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/imageeditor/index)
* [Server-Side API](/api/imageeditor)
