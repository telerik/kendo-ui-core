---
title: Filter Menu Customization Not Firing the Filter Event When the Text is Cleared
description: An example on how to clear the filters when the text is cleared
type: how-to
page_title: How to Clear the Filters When the Text is Cleared | Kendo UI Grid
slug: grid-how-to-clear-the-filters-when-the-text-is-cleared
tags: grid, filter, clear
ticketid: 1136856
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

The steps for replication on [ColumnMenu demo](http://demos.telerik.com/kendo-ui/grid/column-menu)

1\. Note the count as 1-30 of 830 items.

2\. Click on the Ship Country column menu.

3\. Select Filter \> Select Contains from the dropdown and enter the text France. Click the Filter button.

4\. The grid refreshes and the count shows 1 - 30 of 77 items.

5\. Go back to Ship Country \> Filter menu and backspace the text France to blank.

6\. Click on the Filter button.

7\. Nothing happens, count stays as 1-30 of 77 items.



## Solution

  
Currently, this behavior is expected as when the filter has to be removed, we expect the user to click on the clear button next to the filter button.
  
In this scenario, we can suggest using the [ColumnMenuInit](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events-columnMenuInit) event to attach an event handler to the filter button, and if the value of the text box is an empty string to clear the filters with the [filter](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#methods-filter) method. 
  
Please refer to the example demonstrating this:

````html
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
````
