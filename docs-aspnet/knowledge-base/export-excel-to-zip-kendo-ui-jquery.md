---
title: Exporting Excel File to ZIP Using Kendo UI for jQuery
description: Learn how to export Excel files to a ZIP archive using Kendo UI for jQuery and external libraries like JSZip.
type: how-to
page_title: How to Export Excel to ZIP in Kendo UI for jQuery
meta_title: How to Export Excel to ZIP in Kendo UI for jQuery
slug: export-excel-to-zip-kendo-ui-jquery
tags: kendo-ui-for-jquery, excel-export, zip, jszip, kendo-ooxml
res_type: kb
ticketid: 1536486
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td>
Kendo UI for jQuery
</td>
</tr>
<tr>
<td> 2026.3.1015 </td>
<td>
Current
</td>
</tr>
</tbody>
</table>

## Description

I want to export one or more Excel files created using the built-in Kendo UI API into a ZIP file. This process requires combining Kendo UI's Excel export functionality with an external library like JSZip.

This knowledge base article also answers the following questions:
- How can I zip exported Excel files in Kendo UI for jQuery?
- How to use JSZip to zip files with Kendo UI for jQuery Excel export?
- Can Kendo UI for jQuery export data as a ZIP file?

## Solution

To export an Excel file to a ZIP archive, follow these steps:

1. Include the necessary libraries in your HTML file:
   - jQuery
   - Kendo UI
   - JSZip (external library for ZIP file creation)

2. Define the Excel file structure using Kendo's OOXML Workbook format.

3. Convert the Kendo Workbook to a Base64 Data URL asynchronously.

4. Use JSZip to create a ZIP archive and add the Excel file to it.

5. Generate the ZIP file as a binary blob and download it using Kendo's `kendo.saveAs` method.

Below is an example implementation:

```dojo
<button id="exportBtn" style="padding: 10px 20px; font-weight: bold; cursor: pointer;">
        Generate ZIP with Excel File
    </button>

    <script>
        $(document).ready(function () {
            $("#exportBtn").on("click", function () {
                // 1. Define your Excel structure using the Kendo OOXML Workbook format
                var workbook = new kendo.ooxml.Workbook({
                    sheets: [
                        {
                            name: "Invoices",
                            columns: [
                                { width: 100 },
                                { width: 150 },
                                { width: 100 }
                            ],
                            rows: [
                                // Header Row
                                {
                                    cells: [
                                        { value: "Invoice ID", bold: true, background: "#4CAF50", color: "#ffffff" },
                                        { value: "Customer Name", bold: true, background: "#4CAF50", color: "#ffffff" },
                                        { value: "Amount", bold: true, background: "#4CAF50", color: "#ffffff" }
                                    ]
                                },
                                // Data Row 1
                                {
                                    cells: [
                                        { value: 1001 },
                                        { value: "Acme Corp" },
                                        { value: 1250.50, format: "$#,##0.00" }
                                    ]
                                },
                                // Data Row 2
                                {
                                    cells: [
                                        { value: 1002 },
                                        { value: "Globex Corporation" },
                                        { value: 3400.00, format: "$#,##0.00" }
                                    ]
                                }
                            ]
                        }
                    ]
                });

                // 2. Convert the Kendo Workbook to a Base64 Data URL asynchronously
                workbook.toDataURLAsync().then(function (dataUrl) {
                    // Extract just the raw Base64 string from the data URI
                    var base64Data = dataUrl.split(";base64,")[1];

                    // 3. Initialize JSZip and add the Excel file into it
                    var zip = new JSZip();
                    
                    // file() accepts base64 data if you pass {base64: true}
                    zip.file("Financial_Report.xlsx", base64Data, { base64: true });

                    // 4. Generate the ZIP file as a binary blob and download it via Kendo's saver
                    zip.generateAsync({ type: "blob" }).then(function (content) {
                        // Use Kendo UI's built-in file saver to trigger the browser download
                        kendo.saveAs({
                            dataURI: content,
                            fileName: "Exported_Data.zip"
                        });
                    });
                });
            });
        });
    </script>
```

## See Also

- [Kendo UI Workbook API](https://docs.telerik.com/kendo-ui/api/javascript/ooxml/workbook)
- [JSZip Library](https://stuk.github.io/jszip/)
```
