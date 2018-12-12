---
title: Clear Filters When Text Is Cleared in Grid
description: An example on how to clear the filters when the text is cleared in a Kendo UI Grid.
type: how-to
page_title: Clear the Filters When the Text is Cleared | Kendo UI Grid
slug: grid-how-to-clear-the-filters-when-the-text-is-cleared
tags: grid, filter, clear
ticketid: 1136856
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
  <td>Windows 7 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>Chrome 61.0.3163.100</td>
 </tr> <tr>
  <td>Made with Version</td>
  <td>2017.3.1018</td>
 </tr></table>


## Description

How can I make the filter menu customization in the Grid fire the `filter` event when the text is cleared?

To replicate the [**ColumnMenu** demo](http://demos.telerik.com/kendo-ui/grid/column-menu):

1. Note the count as 1-30 of 830 items.
1. Click the **Ship Country** column menu.
1. From the drop-down, select **Filter** > **Contains**.
1. Enter **France** and click the **Filter** button.
1. The Grid refreshes and the count shows 1-30 of 77 items.
1. Go back to the **Ship Country** > **Filter** menu and backspace **France** to blank.
1. Click the **Filter** button. As a result, nothing happens and the count stays as 1-30 of 77 items.

## Solution

The described behavior is expected because when the filter has to be removed, the user is expected to click the **Clear** button next to the **Filter** button.

In this scenario, use the [`ColumnMenuInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/columnmenuinit) event to attach an event handler to the **Filter** button and, if the value of the text box is an empty string, to clear the filters with the [`filter`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/methods/filter) method.

```dojo
<div id="example">
            <div id="grid"></div>

            <script>
                $(document).ready(function() {
                    $("#grid").kendoGrid({
                        dataSource: {
                            type: "odata",
                            transport: {
                                read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                            },
                            schema: {
                                model: {
                                    fields: {
                                        OrderID: { type: "number" },
                                        ShipCountry: { type: "string" },
                                        ShipName: { type: "string" },
                                        ShipAddress: { type: "string" }
                                    }
                                }
                            },
                            pageSize: 30,
                            serverPaging: true,
                            serverFiltering: true,
                            serverSorting: true
                        },
                        height: 550,
                        sortable: true,
                        filterable: true,
                      	columnMenuInit:function(e){
                          $(e.container).find('.k-primary').click(function(event){
                          	var val = $(e.container).find('[title="Value"]').val()
                            if(val == ""){
                              e.sender.dataSource.filter({})
                            }

                          })
                        },
                        columnMenu: true,
                        pageable: true,
                        columns: [ {
                                field: "OrderID",
                                title: "Order ID",
                                width: 120
                            }, {
                                field: "ShipCountry",
                                title: "Ship Country"
                            }, {
                                field: "ShipName",
                                title: "Ship Name"
                            },  {
                                field: "ShipAddress",
                                filterable: false
                            }
                        ]
                    });
                });
            </script>
        </div>
```
