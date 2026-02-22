---
title: Sorting Kendo UI for jQuery  Grid Columns with Nested Object Properties
description: Learn how to enable sorting for columns in the Kendo UI for jQuery Grid when using nested object properties.
type: how-to
page_title: How to Sort Grid Columns Bound to Nested Objects in Kendo UI for jQuery
slug: kendo-grid-jquery-sorting-nested-objects
tags: kendo, ui, grid, jquery, sorting, nested, objects
res_type: kb
components: ["grid"]
ticketid: 1680261
---

## Description
When using the Kendo UI for jQuery Grid, binding columns to nested objects may result in some functionalities, such as sorting and filtering, not working as expected. This knowledge base article also answers the following questions:
- How to sort Kendo UI for jQuery Grid columns that are bound to nested object properties?
- Can I enable sorting on a column bound to a property of an object in the Kendo UI for jQuery Grid?
- What is the approach to sorting Grid columns with nested object data in Kendo UI for jQuery?

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
<tr>
<td>2025.1.227</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
</tbody>
</table>

## Solution
To enable sorting for columns in the Kendo UI for jQuery Grid when the data source contains nested object properties, bind the column directly to the nested property. This method ensures that the Grid can sort, filter, and display data as expected.

For instance, if you have a `person` object with `name` and `id` fields and you want to sort by the `person.name` field, configure the Grid's column as follows:

```javascript
{
     "field": "person.name",
     "template": "<strong>#: person.name # </strong>"
}
```

This configuration directly binds the column to the `person.name` property, enabling sorting functionality for that column.

For a practical implementation, refer to the following example: 
```dojo
<div id="grid"></div>
<script>
var items = [];
for (var i = 0; i <= 10; i++) {
  items[i] = {
      person: {id: i, name: "name " + i, age: 20 + i},
      id: i+100
  }
}

var ds = new kendo.data.DataSource({
  data: items,
  pageSize: 10
});

$("#grid").kendoGrid({
  columns: getColumns(),
  dataSource: ds,
  sortable: true
});

function getColumns() {
  return [{
      field: "person.name"
  }, {
      field: "person.age",
      template: "<strong>#: person.age # </strong>"
  },{
      field: "id"
  }];
}
</script>
```

## See Also
- [Kendo UI for jQuery Grid Overview](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Kendo UI for jQuery Grid API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
- [Filter a Column with a DropDownList Editor When the Column Is Bound To a Complex Object](https://docs.telerik.com/kendo-ui/knowledge-base/grid-filter-column-with-dropdownlist)
