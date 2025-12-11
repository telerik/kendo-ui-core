---
title: Exporting Page Content Including Kendo UI for jQuery Grid and Additional Inputs to Excel
description: Learn how to export data from a Kendo UI for jQuery Grid and other page elements like inputs and labels into a single Excel file.
type: how-to
page_title: How to Export Page Elements and Kendo UI Grid to Excel in a Unified File
slug: how-to-export-page-content-and-grid-to-excel
tags: kendo ui for jquery, grid, export, excel, excelexport
res_type: kb
components: ["grid"]
ticketid: 1678881
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Progress® Kendo UI® for jQuery Grid</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I have a page with a group of labels containing data and a Kendo UI for jQuery Grid with more data underneath. I want to generate an Excel file that includes data from the labels at the top cells and the Kendo UI for jQuery Grid data below those cells. How can I combine all these into one Excel file?

This knowledge base article also answers the following questions:
- How to export data from both the Grid and other inputs on the page to Excel?
- Can I include additional page data when exporting a Kendo UI for jQuery Grid to Excel?
- What is the process for customizing the Excel file generated from a Kendo UI for jQuery Grid export?

## Solution

To export data from a Kendo UI for jQuery Grid along with other inputs or labels on the page into a single Excel file follow these steps for implementation:

1. Bind the [`excelExport`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport) event to your Kendo UI for jQuery Grid.
2. In the event handler, access the `e.workbook` object.
3. Modify `e.workbook` to include data from the inputs or labels you wish to export along with the Grid data.
4. Optionally, customize the appearance of the exported data, such as changing font colors or styles.

Here is an example code snippet demonstrating how to append additional data to the Excel file during the Grid's `excelExport` event:

```javascript
$("#grid").kendoGrid({
    // Grid configuration...
    excelExport: function(e) {
        var sheet = e.workbook.sheets[0];
        
        // Example: Prepending data from a label above the Grid
        sheet.rows.unshift({
            cells: [
                // Assuming the label contains data you want to export
                { value: "Label Data", color: "#ff0000" } // Customize the cell as needed
            ]
        });

        // Continue to modify the workbook as needed
    }
});
```

The above code demonstrates how to add a row at the beginning of the Excel file with data from a label. You can adapt this approach to include any other data from the page.

For a practical demonstration, refer to this example: 

```dojo
 <div>
      <button id="btn">Export to Excel</button>
    </div>
    <input type="text" id="text1" placeholder="Enter some text...." />
    <input
      type="text"
      id="text2"
      placeholder="Enter second text...."
      value="some text"
    />

    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        toolbar: ["excel"],
        columns: [{ field: "name" }],
        dataSource: [{ name: "Jane Doe" }, { name: "John Doe" }],
        excelExport: function (e) {
          //debugger

          let cell1 = {
            value: $("#text1").val(),
            color: "#af41f1",
            bold: true,
          };

          let cell2 = {
            value: $("#text2").val(),
            color: "#fff",
            background: "#9c0cf3",
            bold: true,
          };

          e.workbook.sheets[0].rows.unshift({
            type: "data",
            cells: [cell1, cell2],
          });
          e.workbook.fileName = "Grid.xlsx";
        },
      });

      $("#btn").kendoButton({
        themeColor: "success",
        click: function () {
          $("#grid").data("kendoGrid").saveAsExcel();
        },
      });
    </script>
```
## See Also

- [Kendo UI for jQuery Grid excelExport Event Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/excelexport)
- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
