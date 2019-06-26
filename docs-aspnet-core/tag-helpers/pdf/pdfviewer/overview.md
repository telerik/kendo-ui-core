---
title: Overview
page_title: PDFViewer Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Get started with the server-side wrapper for the Kendo UI PDFViewer tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_pdfviewer_aspnetcore
position: 1
---

# PDFViewer Tag Helper Overview

The [Kendo UI PDFViewer](https://demos.telerik.com/aspnet-core/pdfviewer/index) displays PDF files in the browser.

It provides flexibility to choose the PDF library to be used for processing the file:

* [PDF.JS Processing](https://demos.telerik.com/aspnet-core/pdfviewer/index)
* [Telerik DPL Processing](https://demos.telerik.com/aspnet-core/pdfviewer/dpl-processing)

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

The PDFViewer provides the following key features:
* Selection of PDF processing library.
* A built-in paging mechanism.
* Virtualization capabilities.
* A built-in default toolbar collection.
* Responsive capabilities and page scaling.

The PDFViewer tag helper extension is a server-side wrapper for the [Kendo UI PDFViewer](http://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget and enables you to configure the Kendo UI PDFViewer widget in ASP.NET Core applications.

## Initializing the PDFViewer

To initialize the PDFViewer by using its tag helper, choose the PDF processing library and set up its settings.

The following example demonstrates a PDFViewer tag helper which uses the `PDF.JS` library.

```
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

    <kendo-pdfviewer name="pdfviewer">
        <pdfjs-processing file="@(Url.Content("~/shared/web/pdfViewer/sample.pdf"))" />
        <toolbar enabled="true">
            <pdfviewer-toolbar-items>
                <pdfviewer-toolbar-item command="PageChangeCommand" type="pager" name="pager"></pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item type="spacer" name="spacer"></pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item command="OpenCommand" type="button" name="open" icon="folder-open"></pdfviewer-toolbar-item>
                <pdfviewer-toolbar-item command="DownloadCommand" type="button" name="download" icon="download"></pdfviewer-toolbar-item>
            </pdfviewer-toolbar-items>
        </toolbar>
    </kendo-pdfviewer>
```

## See Also

* [Basic Usage of the PDFViewer Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)
* [JavaScript API Reference of the PDFViewer](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer)
