---
title: Setting a Default Filter Operator in Kendo UI for jQuery Grid with Column Menu
description: Learn how to set a default filter operator for columns in the Kendo UI for jQuery Grid when using the column menu filter mode.
type: how-to
page_title: How to Set Default Filter Operator for Kendo UI for jQuery Grid Column Menu
slug: how-to-set-default-filter-operator-kendo-ui-grid
tags: kendo-ui, grid, filter, default operator, column menu
res_type: kb
ticketid: 1674080
---

## Description

When configuring the Kendo UI for jQuery Grid with the column menu filter mode, you might want to set a default filter operator for a specific column. For example, setting the default operator to "not equal to" for a string column. This knowledge base article also answers the following questions:
- How can I change the default filter operator in the Kendo UI for jQuery Grid?
- Is there a way to specify a default filter condition for columns in the Grid?
- Can I set a default filter operator for a Grid column using the column menu?

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Kendo UI for jQuery Grid</td>
</tr>
</tbody>
</table>

## Solution

To change the default filter operator for a column in the Kendo UI for jQuery Grid with a "columnMenu" of "tabbed" and "filterable" mode set to "menu", utilize the `columnMenuInit` event. This event allows you to access and modify the dropdown list for the filter menu, thereby setting a new default operator.

Here is how you can achieve this:

1. Bind to the Grid's `columnMenuInit` event.

2. Within the event handler, check the field for which the column menu is initialized.

3. Find the DropDownList component in the `e.container` element.

4. Set the desired value (operator) for the DropDownList and trigger a change event.

Below is a code example that demonstrates how to set the default operator to "not equal" (`"neq"`) for a column with the field name "name".

```javascript
columnMenuInit:function(e){
  if(e.field === "name"){
    var ddl = e.container.find("[data-role='dropdownlist']").data("kendoDropDownList"); 
    ddl.value("neq");
    ddl.trigger("change");
  }
},
```

For a practical implementation, refer to this [example](https://dojo.telerik.com/AXaopZtE/8).

## See Also

- [Kendo UI for jQuery Grid Documentation](https://docs.telerik.com/kendo-ui/controls/grid/overview)
- [Column Menu](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) Event of the Kendo UI Grid
- [DropDownList Value Method](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/methods/value) in the Kendo UI API Documentation
