---
title: Include SelectAll for the Columns Section in Kendo UI Grid ColumnMenu
description: An example for rendering SelectAll in the column menu of the Grid columns
type: how-to
page_title: Displaying SelectAll in the ColumnMenu for Showing and Hiding the Columns
slug: grid-include-selectall-in-columnmenu
tags: kendoui, kendo, grid, column menu, select all
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How to render _"Select All"_ in the Column Menu for showing and hiding all columns with a checkbox? 

## Solution

You can render such checkbox within the __columnMenuInit__ event of the Grid, but it will not be possible to remove all columns, because there should be at least one visible column in the Grid. 

```html
  <style>
    .custom-class{
      padding: 5px 5px 5px 15px;
      background: #999;
      color: #fff;
    }
  </style>
  <div id="example">
        <div id="grid"></div>
        <script>
            $(document).ready(function () {
                $("#grid").kendoGrid({
                    columnMenuInit: function (e) {
                        var mylist = e.container.find(".k-columns-item>ul");
                        var listitems = mylist.children('li').get();                  
                      
                        $(listitems).find("input").click(function(e){
                          if(!$(this).hasClass("custom-class")){
                             var allChecked = $(this).closest("ul").find("li.k-item input:checked").length == $(this).closest("ul").find("li.k-item input").length;
                             $(".custom-class input")[0].checked = allChecked;
                          }
                        })
                        
                        $("<li class='custom-class'><span class='k-link'><input type='checkbox' checked onclick='checkAll(this)'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item>ul>li").first());
                      
                    },
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "//demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
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
                    columnMenu: true,
                    pageable: true,
                    columns: [{
                        field: "OrderID",
                        title: "Order ID",
                        width: 120
                    }, {
                        field: "ShipCountry",
                        title: "Ship Country"
                    }, {
                        field: "ShipName",
                        title: "Ship Name"
                    }, {
                        field: "ShipAddress",
                        title: "Ship Address",
                        filterable: false
                    }
                    ]
                });
            });

            function checkAll(el) {
                var checked = el.checked;
                $(el).closest("li").siblings().each(function (e) {                         
                    if (!$(this).hasClass("custom-class") && $(this).find("input")[0].checked != checked) {
                        $(this).find("input").click();
                        $(this).removeClass("k-state-hover");
                    }
                })
            }
        </script>
    </div>
```
