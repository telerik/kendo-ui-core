---
title: Overview
page_title: PDFViewer | Telerik UI for ASP.NET Core Tag Helpers
description: "Get started with the server-side wrapper for the Kendo UI PDFViewer tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_pdfviewer_aspnetcore
position: 1
---

# PDFViewer Tag Helper Overview

The PDFViewer tag helper is a server-side wrapper for the [Kendo UI PDFViewer](http://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget.

The [Kendo UI PDFViewer](https://demos.telerik.com/aspnet-core/pdfviewer/index) displays PDF files in the browser. It provides flexibility to choose the PDF library to be used for processing the file:

* [PDF.JS Processing](https://mozilla.github.io/pdf.js/)
* [Telerik DPL Processing](https://docs.telerik.com/devtools/document-processing/introduction)

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

**Key Features**

* Allows you to choose the PDF processing lib
* Provides built-in paging mechanism
* Has virtualization capabilities
* Provides built-in default toolbar collection
* Has responsive capabilities and page scaling

## Basic Usage

While initializing the widget using the tag helper, choose the PDF processing library and setup its settings. The below example demonstrates a PDFViewer tag helper using the `PDF.JS` library:

###### Example

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

## See also

* [PDFViewer HtmlHelper for ASP.NET Core]({% slug htmlhelpers_pdfviewer_aspnetcore %})
* [PDFViewer Official Demos](https://demos.telerik.com/aspnet-core/pdfviewer/tag-helper)
* [PDFViewer PDFJS Processing]({% slug htmlhelpers_pdfviewer_pdfjs_processing_aspnetcore %})
* [PDFViewer DPL Processing]({% slug htmlhelpers_pdfviewer_dpl_processing_aspnetcore %})
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
