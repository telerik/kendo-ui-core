---
title: Toolbar and Tools
page_title: Toolbar and Tools
description: "Get started with the Telerik UI PDFViewer HtmlHelper for {{ site.framework }} and learn how to use and define the tools in its toolbar."
previous_url: /helpers/pdf/pdfviewer/toolbar
slug: htmlhelpers_pdfviewer_toolbar_aspnetcore
position: 4
---

# Toolbar and Tools

Internally, the PDFViewer uses the [{{ site.product }} Toolbar]({% slug htmlhelpers_toolbar_aspnetcore %}) and provides a set of default tools and corresponding commands in its toolbar.

This approach enables you to use the [ToolBar client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar) and perform all available customizations.

You can control the number and type of the rendered tools by initializing the items collection only with the tools that you require. For the full list of configuration options, refer to the [client-side API of the ToolBar items](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer/configuration/toolbar.items).

The toolbar collection includes the following built-in tools:

* `pager`
* `zoom`
* `toggleSelection`
* `search` 
* `open` 
* `download`
* `print`

> Running an Adblock extension in Chrome might treat the new browser tab for the print dialog as a potential ad and block it.

The `zoom`, `toggleSelection`, `search` and `print` tools are available only with PDFjs processing.

The following example demonstrates basic configuration options for the PDFViewer toolbar tools. You can also add `spacer` elements, in order to group a preferable set of tools. 

```  
      @(Html.Kendo().PDFViewer().Name("pdfviewer")
        .Toolbar(toolbar =>
            toolbar.Items(items =>
            {
                items.Add().Name("pager");
                items.Add().Name("spacer");
                items.Add().Name("zoom");
                items.Add().Name("toggleSelection");
                items.Add().Name("spacer");
                items.Add().Name("search");
                items.Add().Name("open");
                items.Add().Name("download");
                items.Add().Name("print");
            })
        )
    )
```

You can also use the `add` and `remove` client-side API methods to programmatically manage the rendered tools in the PDFViewer.

    @(Html.Kendo().PDFViewer()
        .Name("pdfviewer")     
    )
    <script>    
      var pdfviewer = $("#pdfViewer").getKendoPDFViewer();
      var printToolElement = $(".k-toolbar").find('a[title="Print"]');
      pdfviewer.toolbar.remove(printToolElement);
    </script>

## See Also

* [Basic Usage of the PDFViewer HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/pdfviewer/index)
* [ToolBar Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/toolbar)
* [PDFViewer Server-Side API](/api/pdfviewer)
