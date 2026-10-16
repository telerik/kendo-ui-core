---
title: Add a Watermark to the Exported Grid PDF
description: Learn how to add a watermark to every page of the PDF document that the Kendo UI for jQuery Grid exports.
type: how-to
page_title: Add a Watermark to the PDF Export - Kendo UI for jQuery Data Grid
slug: grid-pdf-export-watermark
tags: grid, pdf, export, watermark, page template, confidential
res_type: kb
components: ["grid"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with the {{ site.cdnVersion }} version</td>
 </tr>
</table>

## Description

How can I add a watermark, such as **INTERNAL USE**, to every page of the PDF document when I export the Kendo UI for jQuery Grid?

This KB also answers the following questions:

* How to use the `pdf.template` option to add a watermark.
* How to style the watermark with CSS.
* How to ensure the watermark appears on every page of the exported PDF.

## Solution

Use the [`pdf.template`](/api/ui/grid/configuration/pdf#pdftemplate) option of the Grid. The page template renders on every page of the exported document inside a container with the size of the paper, which allows you to position a watermark over the Grid content.

The following example demonstrates the full implementation of the suggested approach.

```dojo
<script src="https://unpkg.com/pako/dist/pako_deflate.min.js"></script>

<style>
    .page-template {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .page-template .watermark {
        font-weight: bold;
        font-size: 400%;
        text-align: center;
        margin-top: 30%;
        color: #aaaaaa;
        opacity: 0.1;
        transform: rotate(-35deg) scale(1.7, 1.5);
    }
</style>

<script type="x/kendo-template" id="page-template">
    <div class="page-template">
        <div class="watermark">INTERNAL USE</div>
    </div>
</script>

<div id="grid"></div>

<script>
    $("#grid").kendoGrid({
        toolbar: ["pdf"],
        pdf: {
            fileName: "Products.pdf",
            allPages: true,
            paperSize: "A4",
            landscape: true,
            margin: { top: "2cm", right: "1cm", bottom: "1cm", left: "1cm" },
            template: $("#page-template").html()
        },
        dataSource: {
            transport: {
                read: "https://demos.telerik.com/service/v2/core/Products"
            },
            pageSize: 20
        },
        height: 550,
        pageable: true,
        columns: [
            { field: "ProductName", title: "Product Name" },
            { field: "UnitPrice", title: "Unit Price", format: "{0:c}", width: 150 },
            { field: "UnitsInStock", title: "Units In Stock", width: 150 },
            { field: "Discontinued", width: 150 }
        ]
    });
</script>
```

The steps to add a watermark to the exported PDF are as follows:

1. Set the [`pdf.paperSize`](/api/ui/grid/configuration/pdf#pdfpapersize) option. The page template works only when a paper size is set.
1. Define a page template that contains the watermark element.

    ```
    <script type="x/kendo-template" id="page-template">
        <div class="page-template">
            <div class="watermark">INTERNAL USE</div>
        </div>
    </script>
    ```

1. Pass the template to the `pdf.template` option.

    ```
    pdf: {
        allPages: true,
        paperSize: "A4",
        landscape: true,
        margin: { top: "2cm", right: "1cm", bottom: "1cm", left: "1cm" },
        template: $("#page-template").html()
    }
    ```

1. Use CSS to stretch the page template over the whole page and to position, rotate, and fade the watermark.

    ```
    .page-template {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }

    .page-template .watermark {
        font-weight: bold;
        font-size: 400%;
        text-align: center;
        margin-top: 30%;
        color: #aaaaaa;
        opacity: 0.1;
        transform: rotate(-35deg) scale(1.7, 1.5);
    }
    ```

The standard PDF fonts do not support Unicode characters. If the watermark text contains such characters, embed a font that supports them. For more information, refer to the article on [embedding custom fonts]({% slug embeddedfonts_drawing %}).

## See Also

* [JavaScript API Reference of the jQuery Data Grid](/api/ui/grid)
* [PDF Export of the jQuery Data Grid]({% slug exporting_pdf_kendoui_grid_widget %})
* [Export Grid PDF with Custom Template and External Variables]({% slug grid-pdf-export-external-content %})
* [PDF Output of the Drawing Library]({% slug pdfderawingexport_drawingapi %})
