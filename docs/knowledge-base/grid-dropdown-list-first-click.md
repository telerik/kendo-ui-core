---
title: Open Popup of Custom DropDownList Editor on Cell Click in Grid with Batch Editing
description: An example on how to display the list of a Grid DropDownList with one click instead of two.
type: how-to
page_title: Open the Popup of a Custom DropDownList Editor on Cell Click in Batch Editing | Kendo UI Grid
slug: grid-dropdown-list-first-click
tags: show, list, dropdown, dropdownlist, grid, first, click, single
ticketid: 1087864
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
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

When using a custom DropDownList editor in an editable Grid, the first click focuses on the cell and shows the drop-down and the second click shows the list.

How can I show the drop-down list in the editable Grid with one cell click?

## Solution

Subscribe to the [`edit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/edit) event of the Grid.

The `edit` event:
1. Triggers when the user clicks on the cell.
1. Checks if the cell contains a DropDownList.
1. If the cell contains a DropDownList, the event triggers the [`open`](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/methods/open) method of the DropDownList.

```javascript
edit:function(e){
   var dropdown = e.container.find('[data-role=dropdownlist]').data('kendoDropDownList');
   if(dropdown){
      dropdown.open();
   }
}
```

For the complete implementation, refer to [this Dojo example](http://dojo.telerik.com/OWIGe).
