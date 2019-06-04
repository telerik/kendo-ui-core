---
title: Show Confirmation in TreeList When Doing Drag-and-Drop
description: An example on how to show a confirmation dialog before changing the position of a dropped row in the Kendo UI TreeList.
type: how-to
page_title: Show Confirmation for Dragged and Dropped Items | Kendo UI TreeList for jQuery
slug: treelist-show-confirmation-on-drop
ticketid: 1130225
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product</td>
		<td>Progress Kendo UI TreeList</td>
	</tr>
	<tr>
		<td>Product Version</td>
		<td>2016.3.1026</td>
	</tr>
</table>


## Description

How can I add a dialog confirmation to the TreeList on dragging a row and prevent the transfer of the row if the user selects **Cancel**?

## Solution

The dialog confirmation is an asynchronous action. To add it during the drag-and-drop, prevent the drop action so it does not complete while you wait for a confirmation from the user. When the user confirms the drag action, manually change the parent `id` of the dragged element to move it under the new parent.

1. Handle the `drop` event and call `e.preventDefault()`.
1. Show a confirmation dialog.
1. In the confirmation callback function, change the parent `id` value of the dragged row to the `id` value of the destination row.

```dojo
    <div id="example">
      <div id="treelist"></div>

      <script id="photo-template" type="text/x-kendo-template">
               <div class='employee-photo'
                    style='background-image: url(../content/web/treelist/people/#:data.EmployeeID#.jpg);'></div>
               <div class='employee-name'>#: FirstName #</div>
      </script>

      <script>
        var service = "https://demos.telerik.com/kendo-ui/service";

        $("#treelist").kendoTreeList({
          dataSource: {
            transport: {
              read: {
                url: service + "/EmployeeDirectory/All",
                dataType: "jsonp"
              }
            },
            schema: {
              model: {
                id: "EmployeeID",
                parentId: "ReportsTo",
                fields: {
                  ReportsTo: { field: "ReportsTo",  nullable: true },
                  EmployeeID: { field: "EmployeeId", type: "number" },
                  Extension: { field: "Extension", type: "number" }
                },
                expanded: true
              }
            }
          },
          height: 540,
          editable: {
            move: true
          },
          columns: [
            { field: "FirstName", title: "First Name", width: 280,
             template: $("#photo-template").html() },
            { field: "LastName", title: "Last Name", width: 160 },
            { field: "Position" }
          ],
          drop: function(e){
            if(e.valid){
              e.preventDefault();
              kendo.confirm("Are you sure that you want to move "+ e.source.FirstName
                            + " under " + e.destination.FirstName + "?").then(function () {
                e.source.set("ReportsTo", e.destination.EmployeeID);
                e.sender.refresh();
              });
            }
          }
        });
      </script>

      <style>
        .employee-photo {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-size: 32px 35px;
          background-position: center center;
          vertical-align: middle;
          line-height: 32px;
          box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
          margin-left: 5px;
        }

        .employee-name {
          display: inline-block;
          vertical-align: middle;
          line-height: 32px;
          padding-left: 3px;
        }
      </style>
    </div>
```
