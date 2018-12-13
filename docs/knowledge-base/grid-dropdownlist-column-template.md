---
title: Make DropDownList Column Always Visible
description: An example on how to add a DropDownList column template to the Kendo UI Grid.
type: how-to
page_title: Implement DropDownList Column Template | Kendo UI Grid
slug: grid-dropdownlist-column-template
tags: grid, column, template, dropdownlist
ticketid: 1138249
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

How can I make the drop-down list editors always visible in the Grid?

## Solution

> **Important**
>
> The implementation of this functionality might lead to slow Grid performance.

1. Use the [`columns.template`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/configuration/columns.template) configuration to add inputs to the column cells.
1. In the [`dataBound`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/databound) event handler, initialize a DropDownList for each input.

```dojo
<div id="grid"></div>
<script>
    var ddlDataSource = [{
            value: 1,
            displayValue: "one"
        },
        {
            value: 2,
            displayValue: "two"
        },
        {
            value: 3,
            displayValue: "three"
        }
    ];

    $("#grid").kendoGrid({
        columns: [{
            field: "value",
            template: columnTemplateFunction
        }],
        dataSource: [{
                value: 1
            },
            {
                value: 2
            },
            {
                value: 3
            }
        ],
        dataBound: function(e) {
            var grid = e.sender;
            var items = e.sender.items();

            items.each(function(e) {
                var dataItem = grid.dataItem(this);
                var ddt = $(this).find('.dropDownTemplate');

                $(ddt).kendoDropDownList({
                    value: dataItem.value,
                    dataSource: ddlDataSource,
                    dataTextField: "displayValue",
                    dataValueField: "value",
                    change: onDDLChange
                });
            });
        }
    });

    function columnTemplateFunction(dataItem) {
        var input = '<input class="dropDownTemplate"/>'

        return input
    };

    function onDDLChange(e) {
        var element = e.sender.element;
        var row = element.closest("tr");
        var grid = $("#grid").data("kendoGrid");
        var dataItem = grid.dataItem(row);

        dataItem.set("value", e.sender.value());
    };
</script>
```
