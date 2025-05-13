---
title: Retrieving Row and Column Index of Focused Cell in Kendo UI Grid
description: Learn how to retrieve the row and column index of the focused cell in the Kendo UI Grid when navigating using arrow keys.
type: how-to
page_title: Get Focused Cell Row and Column Index in Kendo UI Grid
slug: kendo-ui-grid-focused-cell-index
tags: kendo ui, grid, navigation, focused cell, row index, column index, keyup event
res_type: kb
ticketid: 1686693
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Grid for Progress® Kendo UI® jQuery</td>
</tr>
<tr>
<td>Version</td>
<td>2025.1.227</td>
</tr>
</tbody>
</table>

## Description

I want to retrieve the row and column index of the currently focused cell in the Kendo UI Grid when navigating through cells using the arrow keys. The goal is to capture these indices during the `keyup` event to reflect the position of the newly focused cell.

This knowledge base article also answers the following questions:

- How can I find the focused cell's row and column index in Kendo UI Grid?
- How do I detect the grid cell's position after arrow key navigation?
- How to use the `keyup` event in the Kendo UI Grid for cell focus tracking?

## Solution

To achieve this, use the `.k-focus` class to identify the currently focused cell and retrieve its row and column indices during the `keyup` event. Follow the steps below:

1. Add the `keyup` event listener to the Kendo UI Grid.
2. Use the `.k-focus` class to identify the focused cell.
3. Retrieve the row and column indices using jQuery.

Below is an example implementation:

```javascript
$($("#grid").data("kendoGrid").element).on("keyup", function (e) {
    var that = $("#grid").data("kendoGrid");
    
    // Get the column index of the focused cell
    var colIndex = $('.k-grid-table .k-focus').index();
    
    // Get the row index of the focused cell
    var rowIndex = $('.k-grid-table .k-focus').closest('tr').index();
    
    // Log the indices
    console.log('Row: ' + rowIndex + ', Column: ' + colIndex);
});
```

### Explanation

- The `.k-focus` class dynamically represents the focused cell in the Kendo UI Grid during navigation.
- The `index()` method is used to retrieve the zero-based column index of the focused cell.
- The `closest('tr').index()` method retrieves the zero-based row index of the parent row containing the focused cell.

### Behavior

This code reflects the indices of the newly focused cell after navigation, as the `keyup` event triggers once the focus changes.

Below is a runnable example:

```dojo
    <script src="https://demos.telerik.com/kendo-ui/content/shared/js/people.js"></script>
    <div id="grid"></div>

    <script>
      $(document).ready(function () {
        $("#grid").kendoGrid({
          dataSource: {
            data: createRandomData(50),
            pageSize: 10,
            schema: {
              model: {
                id: "Id",
                fields: {
                  FirstName: { type: "string" },
                  LastName: { type: "string" },
                  City: { type: "string" },
                  Age: { type: "number" },
                  BirthDate: { type: "date" },
                },
              },
            },
          },
          selectable: "multiple row",
          navigatable: true,
          pageable: true,
          columns: [
            {
              field: "FirstName",
              width: 120,
              title: "First Name",
            },
            {
              field: "LastName",
              width: 120,
              title: "Last Name",
            },
            {
              width: 120,
              field: "City",
            },
            {
              field: "BirthDate",
              title: "Birth Date",
              template: '#= kendo.toString(BirthDate,"dd MMMM yyyy") #',
            },
            {
              width: 80,
              field: "Age",
            },
          ],
        });

        $($("#grid").data("kendoGrid").element).on("keyup", function (e) {
          var that = $("#grid").data("kendoGrid");
          var colindex = $(".k-grid-table .k-focus").index();
          var rowIndex = $(".k-grid-table .k-focus").closest("tr").index();
          console.log("Row " + rowIndex + " col: " + colindex);
        });
      });
    </script>
```

## See Also

- [Grid Documentation](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Keyboard Navigation in Kendo UI Grid](https://docs.telerik.com/kendo-ui/controls/grid/accessibility/key-nav)
