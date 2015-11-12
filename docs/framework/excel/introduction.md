---
title: Introduction
page_title: Create Excel files with Kendo UI
description: This article shows how to create Excel document with Kendo UI
position: 1
---

# Introduction

Kendo UI provides Excel generation support since the 2014 Q3 release. It allows developers to create Excel documents in JavaScript and save them on the client machine.

## Requirements

The Excel generation feature needs the [JSZip](http://stuk.github.io/jszip/) JavaScript library. Include the file before the Kendo UI JavaScript files.

```
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
<script src="http://kendo.cdn.telerik.com/2014.3.1029/js/kendo.all.min.js"></script>
```

JSZip is part of the Kendo UI distribution and is also available via the Kendo UI CDN:

```
<script src="http://kendo.cdn.telerik.com/2014.3.1029/js/jszip.min.js"></script>
```

> If JSZip is not included in the page Kendo UI will raise a runtime exception.

## Using GlobalizeJS

When GlobalizeJS is needed, it should be included after the Kendo UI scripts.

## Using RequireJS

JSZip requires extra initalization code in order to work with RequireJS. Check the related example in the [Use Kendo UI with RequireJS](/using-kendo-with-requirejs#using-jszip-with-requirejs) help topic.

## Browser support

Excel generation is available for all [supported browsers](/intro/supporting/browser-support). Saving the file needs a server-side proxy for older browser versions.
Check the [saving files](/framework/save-files/introduction) help topic for more details.

## Create Excel Document

To create an Excel document (a.k.a. workbook) follow these steps:

1. Instantiate a [kendo.ooxml.Workbook](/api/javascript/ooxml/workbook). The workbook has an array of sheets. Sheets have rows and rows have cells.
1. Call the [toDataURL](/api/javascript/ooxml/workbook#methods-toDataURL) method of the workbook to get the output Excel file as a data URI.
1. Call the [kendo.saveAs](/api/javascript/kendo#methods-saveAs) method to save the Excel file on the client machine.

### Example - create an Excel workbook

```html
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      // Column settings (width)
      columns: [
        { autoWidth: true },
        { autoWidth: true }
      ],
      // Title of the sheet
      title: "Customers",
      // Rows of the sheet
      rows: [
        // First row (header)
        {
          cells: [
            // First cell
            { value: "Company Name" },
            // Second cell
            { value: "Contact" }
          ]
        },
        // Second row (data)
        {
          cells: [
            { value: "Around the Horn" },
            { value: "Thomas Hardy" }
          ]
        },
        // Third row (data)
        {
          cells: [
            { value: "B's Beverages" },
            { value: "Victoria Ashworth" }
          ]
        }
      ]
    }
  ]
});
kendo.saveAs({
    dataURI: workbook.toDataURL(),
    fileName: "Test.xlsx"
});
</script>
```

## Further reading

The following help articles show how to perform common tasks related to Excel export.

* [Customize the Appearance](appearance)
* [Freeze Rows and Columns](freeze-pane)
* [Set column width](column-width)
* [Colspan and rowspan](colspan-rowspan)
* [Multiple sheets](sheets)
