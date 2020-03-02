---
title: Overview
page_title: Overview | PDFViewer JSP Tag
description: "Get started with the PDFViewer JSP tag in Kendo UI."
slug: overview_pdfviewer_uiforjsp
position: 1
---

# PDFViewer JSP Tag Overview

The PDFViewer JSP tag is a server-side wrapper for the [Kendo UI PDFViewer](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget.

The [Kendo UI PDFViewer](https://demos.telerik.com/jsp-ui/pdfviewer/index) displays PDF files in the browser. It uses the [PDF.JS Processing](https://mozilla.github.io/pdf.js/) to process the files.

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

**Key Features**

* Provides built-in paging mechanism
* Has virtualization capabilities
* Provides built-in default toolbar collection
* Has responsive capabilities and page scaling

## Getting Started

### Configuration

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for JSP]({% slug overview_uiforjsp %}).

**Step 2** Create a new action method which renders the view.



    @RequestMapping(value = "index", method = RequestMethod.GET)
    public String index() {

        return "web/pdfviewer/index";
    }

**Step 3** Add the Kendo UI `taglib` mapping to the page.



    <%@taglib prefix="kendo" uri="https://www.telerik.com/kendo-ui/jsp/tags"%>

**Step 4** Add the [PDF.JS Processing](https://mozilla.github.io/pdf.js/) scripts.



    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

**Step 5** Add the `PDFViewer` tag.



    <kendo:pdfViewer name="pdfviewer">
        <kendo:pdfViewer-pdfjsProcessing file="/spring-demos/resources/web/pdfViewer/sample.pdf"/>
    </kendo:pdfViewer>

## See also

* [Overview of the Kendo UI PDFViewer Widget]({% slug overview_kendoui_pdfviewer_widget %})
* [Telerik UI for JSP API Reference Folder](/api/jsp/autocomplete/animation)
