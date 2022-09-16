---
title: Create a DropDownList Command Column in the Grid
description: "An example on how to add a DropDownList commands template within the {{ site.product }} Grid."
type: how-to
page_title: Implement Always Visible DropDownList Command Templates in the {{ site.product }} Grid 
slug: grid-dropdownlist-command-template
tags: grid, column, template, dropdownlist, command, custom
ticketid: 1575207
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2022.2.802 version</td>
 </tr>
</table>

## Description

How can I implement an always visible DropDownList command template for the {{ site.product }} Grid?

## Solution

To achieve the desired scenario: 

1. Specify a DropDownList command template by using the [`.Template()`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridCustomActionCommandBuilder#templatesystemstring) configuration option for a custom command.
1. Within the template, specify an empty `<input>` tag and decorate it with a common class that will be used for rendering a DropDownList for each rows respectively.
1. Create a common `DataSource` for the DropDownList.
1. Traverse through each records by handling the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/GridEventBuilder#databoundsystemstring) event of the Grid. To initialize the DropDownlists, use the previously decorated common class for the custom command input.
1. Handle each of the command options by subscribing to the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/Kendo.Mvc.UI.Fluent/DropDownListEventBuilder#changesystemstring) event of the DropDownLists.

```Index.cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Discontinued).Width(100);
            columns.Command(command => { command.Custom("myCommand").Template("<input class='dropDownTemplate'/>"); }).Width(172);
        })
        .ToolBar(toolbar =>toolbar.Create())
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Pageable()
        .Sortable()
        .Events(e => e.DataBound("onDataBound"))
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.ProductID))
            .Create(update => update.Action("EditingInline_Create", "Grid"))
            .Read(read => read.Action("EditingInline_Read", "Grid"))
            .Update(update => update.Action("EditingInline_Update", "Grid"))
            .Destroy(update => update.Action("EditingInline_Destroy", "Grid"))
        )
    )
```
```Script.js
<script type="text/javascript">
    var ddlDataSource = [ // Create a common DataSource.
            {
                value: 1,
                displayValue: "Command1"
            },
            {
                value: 2,
                displayValue: "Command2"
            }
    ];
    function onDataBound(e){
        var grid = e.sender; // Get the Grid's reference.

        var items = e.sender.items(); // Get the Grid's data items.

        items.each(function(e) { // Traverse through each of the items.
            var dataItem = grid.dataItem(this); 
            var ddt = $(this).find('.dropDownTemplate'); // Retrieve the current input element.

            $(ddt).kendoDropDownList({ // Initialize a DropDownList.
                value: dataItem.value,
                change: onChange,
                dataSource: ddlDataSource,
                optionLabel: "Select a command...",
                dataTextField: "displayValue",
                dataValueField: "value"
            });
        });
    }
    function onChange(e){ 
        var command = e.sender.text(); // Get the current text.

        switch(command){
            case "Command1":
                alert(command+" "+"is selected.");
                break;
            case "Command2":
                alert(command+" "+"is selected.")
                break;          
            default:
                break;  
        }
    }
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on implementing a DropDownList command column in the Grid](https://netcorerepl.telerik.com/ccaZvdPx13soCW7O04).

## See Also

* [API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [API Reference of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
* [Telerik REPL: Implement DropDownList Command Columns in the Grid](https://netcorerepl.telerik.com/ccaZvdPx13soCW7O04)
