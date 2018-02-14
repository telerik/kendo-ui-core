---
title: Conditionally Display Columns
description: Conditionally show Edit and Delete buttons in the Kendo UI Grid.
type: how-to
page_title: Show Command Column Based on Conditions | Kendo UI Grid
slug: grid-show-edit-and-delete-buttons-conditionally
tags: grid, condition, hide, buttons, update, delete, destroy, column
ticketid: 1143185
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>UI for ASP.NET MVC</td>
 </tr>
 </tr>
</table>


## Description

How can I hide some of the Grid columns and conditionally display **Edit** and **Delete** buttons?

## Solution

The column configuration of the Grid for ASP.NET MVC has a `Hidden()` ([`columns.hidden`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.hidden)) property that expects a Boolean value which can be used for such purposes.

The following example demonstrates how to pass a value in the ViewBag for a key and give it a `true` or `false` value in the controller, and then access it in the Razor template.

To individually fine-tune a command, use the [`command visible`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.command.visible) function.

###### Razor Example

```
public ActionResult Index()
{
    ViewBag.IsAdmin = true;
    return View();
}

@(Html.Kendo()
  .Grid<DetailGrids.Models.Inventory>()
  .Name("InvGrid")
  .Columns(columns =>
  {
    columns.Bound(p => p.OnOrder).Width(125).Hidden(ViewBag.IsAdmin);
    columns.Command(command => { command.Edit(); command.Destroy(); }).Hidden(!ViewBag.IsAdmin);
  })
)
```

###### JavaScript Example

```
var isAdmin = false;
$("#grid").kendoGrid({
  columns: [
    { field: "name" },
    { command: [{ name: "edit" }], hidden: !isAdmin }
  ],
  editable: "popup",
  dataSource: [ { name: "Jane" }, { name: "Bill" } ]
});
```
