---
title: Share Selection between MultiSelect and Grid
description: An example on how to select rows from the MultiSelect in the Kendo UI Grid and choose values by selecting Grid rows in the MultiSelect.
type: how-to
page_title: Select Rows From MultiSelect | Kendo UI Grid for jQuery
slug: grid-multiselect-share-selection
tags: grid, multiselect, selection
ticketid: 1144164
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
  <td>Progress Kendo UI MultiSelect</td>
 </tr>
 <tr>
  <td>Progress Kendo UI version</td>
  <td>Created with the 2017.3.1026 version</td>
 </tr>
</table>

## Description

How can I select rows in the Grid by choosing values in the MultiSelect, and vice versa?

## Solution

To share a selection between a MultiSelect and a Grid:

1. In the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/events/change) event handler of the MultiSelect, based on the [`dataItems`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/dataitems), add the `k-state-selected` class and set the `checked` property of the checkbox for every row in the Grid.
1. In the [`change`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/change) event handler of the Grid, based on the [`select`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) items, change the [`value`](https://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect/methods/value) of the MultiSelect.

    ```dojo
    <select id="multiselect" multiple="multiple"></select>
    <div id="grid"></div>
    <script>
        $("#multiselect").kendoMultiSelect({
            dataSource: {
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/products",
                        dataType: "jsonp"
                    }
                }
            },
            dataTextField: "ProductName",
            dataValueField: "ProductID",
            change: function(e) {
                var grid = $("#grid").data("kendoGrid");
                var gridItems = grid.dataSource.data();
                var dataItems = e.sender.dataItems();
                var ids = [];
                var selectedRows = grid.element.find(".k-state-selected");

                dataItems.forEach(function(e) {
                    var id = e.ProductID;
                    ids.push(id);
                });

                selectedRows.each(function(e) {
                    var row = $(this);

                    row.removeClass("k-state-selected");
                    row.find("[data-role='checkbox']")[0].checked = false;
                });


                for (var i = 0; i < gridItems.length; i++) {
                    var dataItem = gridItems[i];
                    var id = dataItem.ProductID;

                    if (ids.indexOf(id) >= 0) {
                        var uid = dataItem.uid;
                        var row = grid.element.find("[data-uid=" + uid + "]");

                        $(row).addClass("k-state-selected");
                        $(row).find("[data-role='checkbox']")[0].checked = true;
                    }
                }
            }
        });
        $("#grid").kendoGrid({
            columns: [{
                    selectable: true
                },
                {
                    field: "ProductName"
                }
            ],
            change: function(e) {
                var multiSelect = $("#multiselect").data("kendoMultiSelect");
                var grid = e.sender;
                var rows = grid.select();
                var ids = [];

                rows.each(function(e) {
                    var id = grid.dataItem(this).ProductID;

                    ids.push(id);
                });

                multiSelect.value(ids);
            },
            dataSource: {
                transport: {
                    read: {
                        url: "https://demos.telerik.com/kendo-ui/service/products",
                        dataType: "jsonp"
                    }
                }
            }
        });
    </script>
    ```
