---
title: Trigger SaveChanges outside the Grid
description: An example on how to invoke the saveChanges method from a button in the Kendo UI Grid.
type: how-to
page_title: Save Grid Changes from External Button | Kendo UI Grid for jQuery
slug: grid-savechanges-external-button
tags: grid, saveChanges, button
ticketid: 1135977
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
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I save the changes in the Kendo UI Grid by using an outside button?

## Solution

1. Select the Grid.
1. Use the [`saveChanges`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/savechanges) method.

```dojo
<button id="saveChanges">Save Changes</button>
<br /><br />
<div id="grid"></div>

<script>
    $("#grid").kendoGrid({
        columns: [{
                field: "name"
            },
            {
                field: "age"
            }
        ],
        dataSource: {
            data: [{
                    id: 1,
                    name: "Jane Doe",
                    age: 30
                },
                {
                    id: 2,
                    name: "John Doe",
                    age: 33
                }
            ],
            schema: {
                model: {
                    id: "id"
                }
            }
        },
        editable: true
    });
    $("#saveChanges").kendoButton({
        click: function(e) {
            var grid = $("#grid").data("kendoGrid");
            grid.saveChanges();
        }
    })
</script>
```
