---
title: Kendo UI Grid export to Excel customize export filename with current date and time
description: How to customize the grid excel export filename
type: how-to
page_title: Add the current date and time to the excel export filename 
slug: grid-customize-excel-export-filename
tags: grid, excel,export,datetime,customize,customise
ticketid: 1130491
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

I need to add the current date and time to the  export filename. How can I do that?

## Solution

To add the current date and time to the workbook filename, you can use the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-excelExport) event. It has the workbook in its event data and you can rename it. 
With the help of [`kendo.toString()`](https://docs.telerik.com/kendo-ui/framework/globalization/dateformatting) method or another way to format the date, just concatenate it to the filename as your application requires, for example:

```
excelExport: function(e) {
  e.workbook.fileName = kendo.toString(new Date, "d") + " Grid.xlsx";
}
```

```html
    <div id="grid"></div>
    <script>
    $("#grid").kendoGrid({
      toolbar: ["excel"],
      columns: [
        { field: "name" }
      ],
      dataSource: [
        { name: "Jane Doe"},
        { name: "John Doe"}
      ],
      excelExport: function(e) {
        e.workbook.fileName = kendo.toString(new Date, "dd/MM/yyyy HH:mm") + " Grid.xlsx";
      }
    });
    var grid = $("#grid").data("kendoGrid");
    grid.saveAsExcel();
    </script>
```

