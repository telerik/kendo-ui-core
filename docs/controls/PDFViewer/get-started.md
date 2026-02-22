---
title: Getting Started
page_title: jQuery PDFViewer Documentation - Getting Started with the PDFViewer
description: "Get started with the jQuery PDFViewer by Kendo UI and learn how to create and initialize the component."
components: ["pdfviewer"]
slug: getting_started_kendoui_pdfviewer_widget
position: 1
---

# Getting Started with the PDFViewer

This guide demonstrates how to get up and running with the Kendo UI for jQuery PDFViewer.

After the completion of this guide, you will be able to achieve the following end result:

```dojo
    <div id="pdfViewer"></div>

    <script type="module">
        $("#pdfViewer").kendoPDFViewer({
          pdfjsProcessing: {
            file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
          },
          width: "100%",
          height: 700,
          scale: 1.5
        })
    </script>
```

## 1. Create an Empty Div Element

First, create a `<div>` element on the page—it will serve as the main container of the PDFViewer component.

```html
<div id="pdfViewer"></div>
```

## 2. Include Necessary Files

When you use the [`pdfjsProcessing`](/api/javascript/ui/pdfviewer/configuration/pdfjsprocessing) option to preview a file, the [PDF.js](https://mozilla.github.io/pdf.js/) library must be included.

```html
<div id="pdfViewer"></div>

<script>
    $.when(
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"),
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js")
      )
        .done(function () {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';           
      }).then(function(){
        // initialize the PDFViewer here
        
      })
</script>
```

## 3. Initialize the PDFViewer 

In this step, you will initialize the PDFViewer from the `<div>` element. All settings of the PDFViewer will be provided in the initialization script statement and you have to describe its layout and configuration in JavaScript.

```html
<div id="pdfViewer"></div>

<script>
    // Target the div element by using jQuery and then call the kendoPDFViewer() method.
     $.when(
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"),
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js")
      )
        .done(function () {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';           
      }).then(function(){ 
        $("#pdfViewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            }
        });
      })
</script>
```

## 4. Width and Height of the PDFViewer

The code below shows how you can define the `width` and `height` of the PDFViewer.

```html
<div id="pdfViewer"></div>

<script> 
     $.when(
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"),
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js")
      )
        .done(function () {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';           
      }).then(function(){ 
        $("#pdfViewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            width: "100%",
            height: 700,
        });
      })
</script>
```

## 5. Set Default Scale

The [`scale`](/api/javascript/ui/pdfviewer/configuration/scale) configuration allows you to change the default scale of the document's pages.

```html
<div id="pdfViewer"></div>

<script> 
     $.when(
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.js"),
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js")
      )
        .done(function () {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.2.2/pdf.worker.js';           
      }).then(function(){ 
        $("#pdfViewer").kendoPDFViewer({
            pdfjsProcessing: {
                file: "https://demos.telerik.com/kendo-ui/content/web/pdfViewer/sample.pdf"
            },
            width: "100%",
            height: 700,
            scale: 1.5
        });
      })
</script>
```

## Next Steps 

* [Referencing Existing Component Instances]({% slug widget_methodsand_events_kendoui_installation %}) 
* [Demo Page for the PDFViewer](https://demos.telerik.com/kendo-ui/pdfviewer/index)

## See Also 

* [JavaScript API Reference of the PDFViewer](/api/javascript/ui/pdfviewer)
* [Knowledge Base Section](/knowledge-base)


