---
title: Overview
page_title: Overview
description: "Get started with the server-side wrapper for the Telerik UI PDFViewer TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_pdfviewer_aspnetcore
position: 1
---

# PDFViewer TagHelper Overview

The Telerik UI PDFViewer TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI PDFViewer widget.

The PDFViewer displays PDF files in the browser and consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool. For processing files, it supports the PDF.JS Processing and Telerik DPL Processing libraries. Among the key features the PDFViewer provides are the selection of a PDF processing library, a built-in paging mechanism, virtualization capabilities, a built-in default toolbar collection, and responsive capabilities and page scaling.

* [Demo page for the PDFViewer](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)

## Initializing the PDFViewer

To initialize the PDFViewer by using its tag helper, choose the PDF processing library and set up its settings.

The following example demonstrates a PDFViewer TagHelper which uses the `PDF.JS` library.

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

> Running an Adblock extension in Chrome might treat the new browser tab for the print dialog as a potential ad and block it.

## See Also

* [Basic Usage of the PDFViewer TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)
* [Server-Side API](/api/pdfviewer)
