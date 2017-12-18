---
title: Conditionally display columns
description: Show edit and delete buttons conditionally in the Kendo UI Grid
type: how-to
page_title: Show grid command column based on a condition
slug: grid-show-edit-and-delete-buttons-conditionally
tags: grid, condition, hide, buttons, update, delete, destroy, column
ticketid: 1143185
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid | Kendo UI Grid for ASP.NET MVC</td>
 </tr>
 </tr>
</table>


## Description

Some of my columns sould not be visible for some users, how can achieve that? I also would like to achieve conditional display of an edit and delete button.

## Solution
  
The Kendo UI Grid for ASP.NET MVC columns configuration has a Hidden() property that expects a boolean that can be used for such purpose.  
  
[`columns.hidden`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.hidden)  
  
For example, in the controller, you can pass a value in the ViewBag for some key and give it a true or false value. Then access it in the Razor template: 

#### Razor Example 
  
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

#### JavaScript Example

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

## See Also

To fine tune a command individually, you can use the [`command visible`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#configuration-columns.command.visible) function 
