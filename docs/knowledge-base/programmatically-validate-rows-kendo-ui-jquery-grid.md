---
title: Triggering Validation Programmatically for Kendo UI for jQuery Grid
description: Learn how to programmatically validate all rows of a Kendo UI for jQuery Grid and display validation messages for invalid cells.
type: how-to
page_title: Programmatically Validate Rows in Kendo UI for jQuery Grid
meta_title: Programmatically Validate Rows in Kendo UI for jQuery Grid
slug: programmatically-validate-rows-kendo-ui-jquery-grid
tags: kendo-ui-for-jquery, grid, validation, data-source
res_type: kb
components: ["grid"]
ticketid: 1688346
---

## Environment

<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Grid </td>
</tr>
<tr>
<td> Version </td>
<td> Current </td>
</tr>
</tbody>
</table>

## Description

I need to trigger validation programmatically for all rows in the [Kendo UI for jQuery Grid](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview) and display validation messages on cells with invalid data. The validation occurs when data is loaded from an external source, and the invalid cells should be highlighted similarly to how the Grid's built-in validation mechanism works.

This knowledge base article also answers the following questions:
- How can I validate all rows in Kendo UI for jQuery Grid programmatically?
- How can I highlight invalid cells in Kendo UI for jQuery Grid?
- How can I show validation messages for invalid data in Kendo UI for jQuery Grid?

## Solution

Use a custom approach to validate all data items in the Kendo UI for jQuery Grid's DataSource. Highlight invalid cells and display validation messages manually. Follow these steps:

### Steps
1. Configure the Kendo UI Grid with a DataSource and schema defining the fields.
2. Add a button to trigger validation.
3. Use JavaScript to loop through the DataSource items and validate each field manually.
4. Highlight invalid cells using CSS classes and append validation messages.

Example implementation:

```dojo
  <div id="grid"></div>
  <button id="validateBtn">Validate Grid</button>

  <script>
  $(document).ready(function () {
    var data = [
      { Name: "John", Age: 30 },
      { Name: "", Age: 25 },
      { Name: "Alice", Age: -5 }
    ];

    $("#grid").kendoGrid({
      dataSource: {
        data: data,
        schema: {
          model: {
            fields: {
              Name: { type: "string" },
              Age: { type: "number" }
            }
          }
        }
      },
      editable: true,
      columns: [
        { field: "Name", title: "Name" },
        { field: "Age", title: "Age" }
      ]
    });

    $("#validateBtn").click(function () {
      var grid = $("#grid").data("kendoGrid");
      var data = grid.dataSource.view();

      // Clear previous validation messages and styles
      grid.tbody.find("td").removeClass("k-invalid");
      grid.tbody.find(".validation-message").remove();

      data.forEach(function (item, rowIndex) {
        var row = grid.tbody.find("tr:eq(" + rowIndex + ")");

        // Validate Name
        if (!item.Name || item.Name.trim() === "") {
          var nameCell = row.find("td:eq(0)");
          nameCell.addClass("k-invalid");
          nameCell.append('<div class="k-tooltip k-tooltip-error k-validator-tooltip k-invalid-msg" data-for="Name" id="Name-error"><span class="k-tooltip-content">Name is required.</span><span class="k-callout k-callout-n"></span></div>');
        }

        // Validate Age
        if (typeof item.Age !== "number" || item.Age <= 0) {
          var ageCell = row.find("td:eq(1)");
          ageCell.addClass("k-invalid");
          ageCell.append('<div class="validation-message">Age must be greater than 0.</div>');
        }
      });
    });
  });
</script>

<style>
  .k-invalid {
    border: 1px solid red !important;
    position: relative;
  }

  .validation-message {
    color: red;
    font-size: 12px;
    margin-top: 4px;
  }
</style>
```

### Key Points:
- Use the [`dataSource.view()`](/api/javascript/data/datasource/methods/view) method to fetch the current data items.
- Highlight invalid cells using the `k-invalid` CSS class or any custom class.
- Append validation messages as HTML elements inside the cells.

## See Also

- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview)
- [Kendo UI for jQuery DataSource](https://docs.telerik.com/kendo-ui/framework/datasource/overview)
