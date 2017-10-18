---
title: How To Open the Popup of a Custom DropDownList Editor in Grid with Batch Editing on Cell Click.
description: An example on how to display the list of a Grid's DropDown with one click instead of two.
type: how-to
page_title: How To Open the Popup of a Custom DropDownList Editor in Grid with Batch Editing on Cell Click.
slug: grid-dropdown-list-first-click
tags: show, list, dropdown, dropdownlist, grid, first, click, single
ticketid: 1087864
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

When using a DropDownList Custom Editor in an editable Grid, the first click will focus on the cell and show the Dropdown, while the second click will show the list. I want to show the list on the first click of the cell.

## Solution

In order to implement this functionality, we can subscribe to the [edit event of the Kendo UI Grid API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-edit) which is triggered when you click on the cell, check if the cell contains a DropDownList, and if it does, triggering the [open method of the Kendo UI DropDownList API](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#methods-open): 

````javascript
edit:function(e){
   var dropdown = e.container.find('[data-role=dropdownlist]').data('kendoDropDownList');
   if(dropdown){
      dropdown.open();
   }
}
````

## See Also

In order to see a working example, [take a look at the following Kendo UI Dojo](http://dojo.telerik.com/OWIGe).
