---
title: Disable the Command Button in Grids
description: Learn how to disable the command buttons in Kendo UI Grids.
type: how-to
page_title: Disable the Command Button - Kendo UI for jQuery Data Grid
slug: disable-the-grid-command-buttons
previous_url: /knowledge-base/how-to-disable-the-grid-command-buttons
tags: grid, command, disable, buttons
ticketid: 1133355
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for jQuery</td> 
 </tr>
  <tr>
  <td>Product Version</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

I want to render the command buttons of the Grid cells for the user to see, but to disable them depending on the `@User.IsInRole("RoleName")` status. I tried to achieve this behavior by using Javascript and adding the `k-disabled` class but the buttons are still clickable.

How can I disable the `command.Edit()` or the `command.Destroy()` button?

## Solution

Apply the logic on the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event and use jQuery.

1. Set the `k-disabled` class.
1. Only on the disabled buttons, remove the `delete` and `edit` specific classes.

```dojo
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataBound:function(e){
          $( ".k-disabled" ).each(function( index ) {
            $(this).removeClass('k-grid-remove-command')
            $(this).removeClass('k-grid-edit-command')
          });
        },
        columns: [
          { field: "name" },
          { command: [{ className: "k-disabled", name: "destroy", text: "Remove" },{ className: "k-disabled", name: "edit", text: "Edit" }] }
        ],
        editable: true,
        dataSource: [ { name: "Jane Doe" } ]
      });
    </script>
```
