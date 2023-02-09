---
title: Customize the Pdf Export Filename of the Grid by Adding Current Date and Time
description: "Learn how to customize the Pdf export filename of the Grid by adding the current date and time of generation."
type: how-to
page_title: Add the Current Date and Time to the Pdf Export Filename - Kendo UI Grid for jQuery
slug: grid-customize-pdf-export-filename
tags: grid, pdf, export, datetime, customize, customize
ticketid: 1130491
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
</table>


## Description

How can I add the current date and time to the Pdf export filename of the Grid?

## Solution

1. Use the [`pdfExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/pdfexport) event to access the Grid options.

1. With the help of the [`kendo.toString()`](https://docs.telerik.com/kendo-ui/framework/globalization/dateformatting) method or another way to format the date, concatenate the date to the filename:

```
    pdfExport: function(e) {
      e.sender.options.pdf.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " Grid.pdf";
    }
```

```dojo
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["pdf"],
      columns: [
        { field: "name" }
      ],
      pdfExport: function(e) {
        e.sender.options.pdf.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " Grid.pdf";
      },
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ]
    });
    var grid = $("#grid").data("kendoGrid");
    </script>
```
