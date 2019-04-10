---
title: Overview
page_title: Excel Export Overview | Kendo UI Excel Export
description: "Learn how to create Excel documents with Kendo UI."
slug: introduction_excelexport_kendoui
position: 1
---

# Excel Export Overview

As of the Kendo UI 2014 Q3 release, Kendo UI has provided Excel generation support.

Excel export allows you to create Excel documents in JavaScript and save them on the client machine.

## Requirements

To take full advantage of the Excel export feature, download the [JSZip](http://stuk.github.io/jszip/) library and include the file before the Kendo UI JavaScript files.

```
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
<script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
```

JSZip is part of the Kendo UI distribution and is also available through the Kendo UI CDN:

```
<script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jszip.min.js"></script>
```

> * If you do not include JSZip in the page, Kendo UI will raise a runtime exception.
> * As of the Kendo UI R3 2017 release, the Excel Export feature supports JSZip 2.* and 3.* versions. Kendo UI releases prior to R2 2017 SP1 provided Excel export of JSZip 2.* versions only.

When you use JSZip in scenarios where the packages are loaded from NPM, explicitly assign the JSZip object to a field in the `window` object. To properly load JSZip in the application:

1. Install the library and save it to the `package.json` file by running `npm install jszip --save`.
1. Import the library in the module where it will be used through `import JSZip from 'jszip'`.
1. Assign the library object to a field of the `window` by setting `window.JSZip = JSZip`.

## Compatibility with Other Libraries

* GlobalizeJS&mdash;If you want to use GlobalizeJS in your project, include it after the Kendo UI scripts.
* RequireJS&mdash;JSZip requires some extra initialization code to work with RequireJS. For more information on using [RequireJS](http://requirejs.org/) with the Kendo UI Excel export functionality, refer to the [related article]({% slug requirejs_integration_kendoui %}).

## Browser Support

Excel generation is available for all [supported browsers]({% slug wbe_browserand_operating_system_support %}). Saving a file needs a server-side proxy for older browser versions. For more information, refer to the [article on saving files with Kendo UI](/framework/save-files/introduction).

> Some mobile browsers do not support saving of files.

## Creating Excel Documents

To create an Excel document (workbook):

1. Instantiate a [`kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook). The workbook has an array of sheets. Sheets have rows and rows have cells.
1. Call the [`toDataURL`](/api/javascript/ooxml/workbook/methods/todataurl) or [`toDataURLAsync`](/api/javascript/ooxml/workbook/methods/todataurlasync) methods of the workbook to get the output Excel file as a data URI.
1. Call the [`kendo.saveAs`](/api/javascript/kendo/methods/saveas) method to save the Excel file on the client machine.

```dojo
<script>
var workbook = new kendo.ooxml.Workbook({
  sheets: [
    {
      // The column settings (width).
      columns: [
        { autoWidth: true },
        { autoWidth: true }
      ],
      // Th title of the sheet.
      title: "Customers",
      // The rows of the sheet.
      rows: [
        // The first row (header).
        {
          cells: [
            // The first cell.
            { value: "Company Name" },
            // The second cell.
            { value: "Contact" }
          ]
        },
        // The second row (data).
        {
          cells: [
            { value: "Around the Horn" },
            { value: "Thomas Hardy" }
          ]
        },
        // The third row (data).
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

## See Also

* [Customizing the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freezing Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Setting the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Spanning Cells across Rows and Columns]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Creating Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Exporting the Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
