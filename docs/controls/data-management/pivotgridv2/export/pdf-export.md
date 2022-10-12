---
title: PDF Export
page_title: jQuery PivotGridV2 Documentation - PDF Export
description: "Get started with the jQuery PivotGridV2 by Kendo UI and learn how to export a Kendo UI PivotGridV2 to PDF."
slug: pdfexport_kendoui_pivotgridv2
position: 1
---

# PDF Export

The PivotGridV2 provides a built-in PDF export functionality.

## General

* To export the PivotGridV2, call the [`saveAsPDF()`](/api/javascript/ui/pivotgridv2/methods/saveaspdf) method of the widget.

        <button id="export" class="k-button k-button-icontext"><span class="k-icon k-i-pdf"></span>Export to PDF</button>
        <div id="pivotgrid"></div>

        <script>
            // PivotGridV2 configuration...
            // Omitted for brevity

            // Export to PDF button function.
            $("#export").click(function () {
                var pivotGrid = $("#pivotgrid").data("kendoPivotGridV2")
                pivotgrid.saveAsPDF();
            });
        </script>


* To configure the PDF file, refer to the [`pdf` configuration options](/api/javascript/ui/pivotgridv2/configuration/pdf). 

* For the runnable project, refer to the demo on [exporting the PivotGridV2 to PDF](https://demos.telerik.com/kendo-ui/pivotgridv2/pdf-export).

* To customize the appearance of the exported PDF file, refer to the articles on the [PDF output by the Kendo UI Drawing library]({% slug customizingappearance_drawing %}).

## See Also

* [Exporting the PivotGridV2 to PDF (Demo)](https://demos.telerik.com/kendo-ui/pivotgridv2/pdf-export)
* [PDF Export Known Limitations]({% slug supportedbrowsers_drawingapi %})
* [PivotGridV2 JavaScript API Reference](/api/javascript/ui/pivotgridv2)
