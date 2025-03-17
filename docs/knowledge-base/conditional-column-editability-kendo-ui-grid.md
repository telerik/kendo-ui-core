---
title: Making Specific Columns Editable in Kendo UI for jQueryGrid
description: Learn how to set individual columns as editable within the Kendo UI for jQuery Grid to control data input selectively.
type: how-to
page_title: How to Conditionally Set Columns as Editable in Kendo UI for jQuery Grid
slug: conditional-column-editability-kendo-ui-grid
tags: kendo-ui, grid, jquery, editable, columns
res_type: kb
ticketid: 1649628
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI Grid for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.4.1112</td>
</tr>
</tbody>
</table>

## Description

I need to make a single column in the Kendo UI Grid editable, while keeping other columns non-editable. How can I limit which Grid columns are editable or edit data items conditionally?

This knowledge base article also answers the following questions:
- How do I make a specific column editable in the Kendo UI Grid?
- Can I control the editability of Grid columns individually?
- How to conditionally set columns as editable in a Grid?

## Solution

To make a specific column in the Kendo UI Grid editable while keeping other columns non-editable, use the [`columns.editable`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editable) property. This property accepts a function that determines whether the column should be editable.

For example, to make only the `OtherField` column editable, configure the `editable` property as follows:

```javascript
{ field: "Field", title: "Field },
{ field: "OtherField", title: "Other Field", editable: function() { return false; } } // Make OtherField non-editable
```

For columns that should not be editable conditionally, set the `editable` property to a function that returns `false` conditionally. This effectively disables editing for those columns.

### Example

```javascript
{ field: "name",
       editable: function (dataItem) {
         return dataItem.name === "Bill"; // Name editor is created only if dataItem name is Bill
       }
      },
```

For a live example, refer to the below Dojo:

```dojo
<div id="grid"></div>
<script>
  $("#grid").kendoGrid({
    columns: [
      { field: "name",
       editable: function (dataItem) {
         return dataItem.name === "Bill"; // Name editor is created only if dataItem name is Bill
       }
      },
      {
        field: "salary",
        editable: function (dataItem) {
          return dataItem.name === "Jane"; // Salary editor is created only if dataItem name is Jane
        }
      }
    ],
    editable: true,
    dataSource: [ { name: "Jane", salary: 2000 }, { name: "Bill", salary: 2000 } ]
  });
</script>
```

## See Also

- [Grid Columns Editable Property Documentation](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.editable)
- [Overview of the Kendo UI Grid for jQuery](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [API Reference of the Grid Component](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
