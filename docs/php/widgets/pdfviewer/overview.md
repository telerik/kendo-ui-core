---
title: Overview
page_title: Overview | PDFViewer PHP Class
description: "Get started with the PDFViewer PHP class in Kendo UI."
slug: overview_pdfviewer_uiforphp
position: 1
---

# PDFViewer PHP Class Overview

The PDFViewer PHP Class is a server-side wrapper for the [Kendo UI PDFViewer](https://docs.telerik.com/kendo-ui/api/javascript/ui/pdfviewer) widget.

The [Kendo UI PDFViewer](https://demos.telerik.com/php-ui/pdfviewer/index) displays PDF files in the browser. It uses the [PDF.JS Processing](https://mozilla.github.io/pdf.js/) to process the files.

The PDFViewer consists of a toolbar and a scrollable container that wraps the page elements. Default tools collection includes `pager`, `open` and `download` tool.

**Key Features**

* Provides built-in paging mechanism
* Has virtualization capabilities
* Provides built-in default toolbar collection
* Has responsive capabilities and page scaling

## Getting Started

### Configuration

Below are listed the steps for you to follow when configuring the Kendo UI PDFViewer for PHP.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for PHP]({% slug overview_uiforphp %})&mdash;include the autoloader, JavaScript, and CSS files.

**Step 2** Add the [PDF.JS Processing](https://mozilla.github.io/pdf.js/) scripts.



    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"></script>
    <script>
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';
    </script>

**Step 3** Create a [PDFViewer](/api/php/Kendo/UI/PDFViewer).



    <?php
    $pdfjs = new \Kendo\UI\PDFViewerPdfjsProcessing();
    $pdfjs->file("../content/web/pdfViewer/sample.pdf");

    $pdfViewer = new \Kendo\UI\PDFViewer('pdfViewer');
    $pdfViewer->pdfjsProcessing($pdfjs);
    ?>

**Step 3** Output the PDFViewer by echoing the result of the `render` method.



    <?php
    echo $pdfViewer->render();
    ?>

## Reference

### Client-Side Instances

You are able to reference an existing PDFViewer instance via the [`jQuery.data()`](https://api.jquery.com/jQuery.data/). Once a reference is established, use the [PDFViewer API](/api/javascript/ui/pdfviewer#methods) to control its behavior.



    <?php
    $pdfjs = new \Kendo\UI\PDFViewerPdfjsProcessing();
    $pdfjs->file("../content/web/pdfViewer/sample.pdf");

    $pdfViewer = new \Kendo\UI\PDFViewer('pdfViewer');
    $pdfViewer->pdfjsProcessing($pdfjs);
    echo $pdfViewer->render();
    ?>

    <script>
        $(function() {
            // The constructor parameter is used as the 'id' HTML attribute of the PDFViewer
            var pdfViewer = $("#pdfViewer").data("kendoPDFViewer");
        });
    </script>

## See also

* [Overview of the Kendo UI PDFViewer Widget]({% slug overview_kendoui_pdfviewer_widget %})
* [Telerik UI for PHP API Reference Folder](/api/php/Kendo/UI/AutoComplete)
* [Telerik UI for PHP Classes Folder]({% slug overview_autocomplete_uiforphp %})
