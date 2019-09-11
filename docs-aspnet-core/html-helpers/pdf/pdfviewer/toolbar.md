---
title: Toolbar and Tools
page_title: Toolbar and Tools | Telerik UI PDFViewer HtmlHelper for ASP.NET Core
description: "Get started with the Telerik UI PDFViewer HtmlHelper for ASP.NET Core and learn how to use and define the tools in its toolbar."
slug: htmlhelpers_pdfviewer_toolbar_aspnetcore
position: 4
---

# Toolbar and Tools

Internally, the PDFViewer uses the [Telerik UI for ASP.NET Core Toolbar]({% slug htmlhelpers_toolbar_aspnetcore %}) and provides a set of default tools and corresponding commands in its toolbar.

This approach enables you to use the [ToolBar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar) and perform all available customizations.

You can control the number and type of the rendered tools by initializing the items collection only with the tools that you require. For the full list of configuration options, refer to the [client-side API of the ToolBar items](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/configuration/toolbar.items).

The toolbar collection includes the following built-in tools:

* `pager` with a corresponding command `PageChangeCommand`.
* `zoom` with a corresponding command `ZoomCommand`.
* `toggleSelection` with a corresponding commands `EnableSelectionCommand`.
* `togglePan` with a corresponding commands `EnablePanCommand`.
* `search` with a corresponding command `OpenSearchCommand`.
* `open` with a corresponding command `OpenCommand`.
* `download` with a corresponding command `DownloadCommand`.
* `print` with a corresponding command `PrintCommand`.

The following example demonstrates basic configuration options for the PDFViewer toolbar tools.

```
      @(Html.Kendo().PDFViewer().Name("pdfviewer")
        .Toolbar(toolbar =>
            toolbar.Items(items =>
            {
                items.Add().Command("PageChangeCommand").Type("pager").Name("pager");
                items.Add().Name("spacer").Type("spacer");
                items.Add().Command("OpenCommand").Type("button").Name("open").Icon("folder-open");
                items.Add().Command("DownloadCommand").Type("button").Name("download").Icon("download");
                items.Add().Command("PrintCommand").Type("button").Name("print").Icon("print");
            })
        )
    )
```

You can also add and remove client-side API methods to programmatically render the desired toolbar tools in the PDFViewer.

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")     
    )
    <script>    
      var pdfviewer = $("#pdfViewer").getKendoPDFViewer();
      var printToolElement = $(".k-toolbar").find('a[title="Print"]');
      pdfviewer.toolbar.remove(printToolElement);
    </script>

## See Also

* [Basic Usage of the PDFViewer HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pdfviewer/index)
* [ToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar)
* [PDFViewer Server-Side API](/api/pdfviewer)
