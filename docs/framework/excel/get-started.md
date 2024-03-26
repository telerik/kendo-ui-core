---
title: Getting Started
page_title: Getting Started - Kendo UI for jQuery Excel Export
description: "Get started with the jQuery Excel Export by Kendo UI and learn how to generate workbooks and export them."
slug: getting_started_kendoui_excel_export
position: 1
---

# Getting Started with Excel Export

This guide demonstrates how to use the Kendo UI for jQuery Workbook API to generate and export spreadsheets.

After the completion of this guide, you will achieve the following result:

```dojo
    <button id="export">Generate and Export</button>
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
      $("#export").on("click", () => {
        workbook.toDataURLAsync().then(function(dataURL) {
            kendo.saveAs({
              dataURI: dataURL,
              fileName: "Test.xlsx"
            });
        });
      });
    </script>
```

## 1. Requirements

> Starting with v2023.3.1115 the JSZip library is no longer distributed with the rest of the Kendo UI for jQuery scripts. You must use one of the official distribution channels such as `unpkg` instead.

To take full advantage of the Excel Export feature, download the [JSZip](http://stuk.github.io/jszip/) library and include the file before the Kendo UI JavaScript files.

```
<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/kendo.all.min.js"></script>
```

JSZip is part of the Kendo UI distribution and is also available through the Kendo UI CDN:

```
<script src="https://unpkg.com/jszip/dist/jszip.min.js"></script>
```

> * If you do not include JSZip in the page, Kendo UI will raise a runtime exception.

When you use JSZip in scenarios where the packages are loaded from NPM, explicitly assign the JSZip object to a field in the `window` object. To properly load JSZip in the application:

1. Install the library and save it to the `package.json` file by running `npm install jszip --save`.
1. Import the library in the module where it will be used through `import JSZip from 'jszip'`.
1. Assign the library object to a field of the `window` by setting `window.JSZip = JSZip`.

### Compatibility with Other Libraries

* GlobalizeJS&mdash;If you want to use GlobalizeJS in your project, include it after the Kendo UI scripts.
* RequireJS&mdash;JSZip requires some extra initialization code to work with RequireJS. For more information on using [RequireJS](http://requirejs.org/) with the Kendo UI Excel export functionality, refer to the [related article]({% slug requirejs_integration_kendoui %}).

## 2. Instantiate a Workbook

First, instantiate a [`kendo.ooxml.Workbook`](/api/javascript/ooxml/workbook).

```javascript
    var workbook = new kendo.ooxml.Workbook({});
```

## 3. Configure the Workbook Settings

The workbook has an array of sheets. Sheets have rows and rows have cells.

```javascript
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
```

## 4. Convert the Workbook to Data URI

Call the [`toDataURL`](/api/javascript/ooxml/workbook/methods/todataurl) or [`toDataURLAsync`](/api/javascript/ooxml/workbook/methods/todataurlasync) methods of the workbook to get the output Excel file as a data URI.

```javascript
      workbook.toDataURLAsync().then(function(dataURL) {
         
      });
```

## 5. Save the Generated Excel File

Call the [`kendo.saveAs`](/api/javascript/kendo/methods/saveas) method to save the Excel file on the client machine.

```javascript
      workbook.toDataURLAsync().then(function(dataURL) {
          kendo.saveAs({
            dataURI: dataURL,
            fileName: "Test.xlsx"
          });
      });
```

## Next Steps

* [Changing the Appearance of the Excel Sheet]({% slug appearance_excelexport_kendoui %})
* [Generating Excel Files from a DataSource]({% slug exportdatasource_excelexport_kendoui %})
* [Saving Files]({% slug overview_savingfiles_kendoui %})

## See Also 

* [Knowledge Base Section](/knowledge-base)

<script>
  window.onload = function() {
    document.getElementsByClassName("btn-run")[0].click();
  }
</script>