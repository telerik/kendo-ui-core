---
title: Convert an XLSX File to JSON without Using a Spreadsheet Widget
description: An example on how to convert an XLSX file to JSON without initializing a Kendo UI Spreadsheet widget.
type: how-to
page_title: Convert XLSX Data to JSON | Kendo UI Spreadsheet for jQuery
slug: spreadsheet-convert-xlsx-to-json-with-no-widget
tags: kendo, kendoui, spreadsheet, xlsx, json, workbook
res_type: kb
component: spreadsheet
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Spreadsheet</td>
 </tr>
</table>


## Description

How can I convert an XLSX file to JSON without initializing a Spreadsheet widget?

## Solution

Use a `kendo.spreadsheet.Workbook` object.

```dojo
<div>
  1. Click to load an .xlsx file
  <input type="file" name="files" id="fileForUpload" accept=".xlsx" />
</div>
<br/>
<div>
  2. Click to print the file JSON on the console
  <input type="button" value="Click tо read file" id="btn" />
</div>

<script>
  $('#btn').on('click', function() {
    var file = document.getElementById("fileForUpload").files[0];

    if (file) {
      var workbook = new kendo.spreadsheet.Workbook({});

      workbook.fromFile(file).then(function(){
        var jsonContent = workbook.toJSON();
        console.log(jsonContent);
      })
    }
  });
</script>
```

## See Also

* [API Reference of the Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
