---
title: Overview
page_title: Overview | Kendo UI Excel Export
description: "Learn how to create Excel documents with Kendo UI."
slug: introduction_excelexport_kendoui
position: 1
---

# Overview of Excel Export

Since Kendo UI 2014 Q3 release Kendo UI has provided Excel generation support. It allows you to create Excel documents in JavaScript and save them on the client machine.

## Requirements

### JSZip

To take full advantage of the Excel export feature, download the [JSZip](http://stuk.github.io/jszip/) library and include the file before the Kendo UI JavaScript files, as shown below.

###### Example

```
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://cdnjs.cloudflare.com/ajax/libs/jszip/2.4.0/jszip.js"></script>
<script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
```

JSZip is part of the Kendo UI distribution and is also available via the Kendo UI CDN:

```
<script src="http://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/jszip.min.js"></script>
```

> **Important**
>
> If you do not include JSZip in the page, Kendo UI raises a runtime exception.

### Compatibility with Other Libraries

#### GlobalizeJS

If you want to use GlobalizeJS in your project, include it after the Kendo UI scripts.

#### RequireJS

JSZip requires some extra initialization code to work with RequireJS.

For detailed information on using [RequireJS](http://requirejs.org/) with the Kendo UI Excel export functionality, refer to the [related article]({% slug requirejs_integration_kendoui %}).

### Browser Support

Excel generation is available for all [supported browsers]({% slug wbe_browserand_operating_system_support %}). Saving the file needs a server-side proxy for older browser versions.

> **Important**
>
> Some mobile browsers will not allow you to save the file though.

For detailed information on how to save files, refer to the [article about saving files with Kendo UI](/framework/save-files/introduction).

## Excel Document Creation

To create an Excel document (workbook), follow the steps:

**Step 1** Instantiate a [`kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook). The workbook has an array of sheets. Sheets have rows and rows have cells.
**Step 2** Call the [`toDataURL`](/api/javascript/ooxml/workbook#methods-toDataURL) method of the workbook to get the output Excel file as a data URI.
**Step 3** Call the [`kendo.saveAs`](/api/javascript/kendo#methods-saveAs) method to save the Excel file on the client machine.

The example below demonstrates how to create an Excel workbook.

###### Example

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

## See Also

Articles on the Excel export functionality in Kendo UI:

* [Customize the Appearance]({% slug appearance_excelexport_kendoui %})
* [Freeze Rows and Columns]({% slug freezerowsandcolumns_excelexport_kendoui %})
* [Set the Column Width]({% slug columnwidth_excelexport_kendoui %})
* [Set the Colspan and Rowspan]({% slug colaspanandrowspan_excelexport_kendoui %})
* [Create Multiple Sheets]({% slug sheets_excelexport_kendoui %})
* [Export Kendo UI DataSource to Excel]({% slug exportdatasource_excelexport_kendoui %})
