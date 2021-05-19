---
title: Include SelectAll for Grid Column Sections in ColumnMenu
description: An example on how to render SelectAll in the column menu of the Grid columns.
type: how-to
page_title: Display SelectAll in the ColumnMenu for Showing and Hiding Columns | Kendo UI Grid for jQuery
slug: grid-include-selectall-in-columnmenu
tags: kendoui, kendo, grid, column menu, select all
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

How can I render a **Select All** option in the column menu of the Grid and show and hide all columns through a checkbox?

## Solution

Render the checkbox within the `columnMenuInit` event of the Grid.

> You will always need to have at least one visible column in the Grid.

```dojo
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
                    columnMenuOpen: function (e) {
                        var mylist = e.container.find(".k-columns-item>ul");
                        var listitems = mylist.children('li').get();                  

                        $(listitems).find("input").click(function(e){
                          if(!$(this).hasClass("custom-class")){
                             var allChecked = $(this).closest("ul").find("li.k-item input:checked").length == $(this).closest("ul").find("li.k-item input").length;
                             $(".custom-class input")[0].checked = allChecked;
                          }
                        })
                        e.container.find(".custom-class").remove()
                      	e.container.find('.k-filter-item').find('[role="menuitemcheckbox"]').remove()
                        $("<li class='custom-class'><span class='k-link'><input type='checkbox' checked onclick='checkAll(this)'/>SelectAll</span></li>").insertBefore(e.container.find(".k-columns-item ul li").first());
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
