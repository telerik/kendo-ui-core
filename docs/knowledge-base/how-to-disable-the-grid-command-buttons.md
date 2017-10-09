---
title: Grid Command Button Disabling
description: An example on how to disable the Grid command buttons
type: how-to
page_title: How to Disable the Grid Command Buttons
slug: how-to-disable-the-grid-command-buttons
tags: grid, command, disable, buttons
ticketid: 1133355
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
  <tr>
  <td>Made with version</td>
  <td>2017.3.913</td>
 </tr>
</table>


## Description

Is there any way to disable a command.Edit() or a command.Destroy() button? I don't want to hide them, the user should see there's an option for both functions, but I want to disable them depending on the @User.IsInRole("RoleName") status. I tried several ways: using Javascript and adding k-state-disabled class will make them disabled-look but they are still clickable.

## Solution

The desired result can be achieved by setting the "k-state-disabled" class and removing the delete and edit specific classes only on the disabled buttons. This can be achieved on the [dataBound](http://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-dataBound) event using jQuery. 
  
Please check the following example:
  
````html
    <div id="grid"></div>
    <script>
      $("#grid").kendoGrid({
        dataBound:function(e){
          $( ".k-state-disabled" ).each(function( index ) {
            $(this).removeClass('k-grid-delete')
            $(this).removeClass('k-grid-edit')
          });
        },
        columns: [
          { field: "name" },
          { command: [{ className: "k-state-disabled", name: "destroy", text: "Remove" },{ className: "k-state-disabled", name: "edit", text: "Edit" }] }
        ],
        editable: true,
        dataSource: [ { name: "Jane Doe" } ]
      });
    </script>
````

