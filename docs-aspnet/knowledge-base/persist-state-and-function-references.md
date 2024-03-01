---
title: Persist the State of the Grid alongside the Function Handlers
description: Learn how to persist the state of the {{ site.product }} Data Grid and include the function definitions in the saved options.
type: how-to
page_title: Persist the State of the {{ site.product }} Grid alongside the Function Handlers - {{ site.product }} Data Grid
slug: grid-persist-state-with-functions
tags: kendoui, jquery, data, grid, persist, state, save, options, restore, function, functions, handler, handlers
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® {{ site.product }} Grid</td> 
 </tr>
</table>


## Description

By default, the [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) method cannot serialize function definitions. Event handlers and other similar Grid configurations are lost when the state of the component is persisted with [`getOptions`](/api/javascript/ui/grid/methods/getoptions) and [`setOptions`](/api/javascript/ui/grid/methods/setoptions).

How can I persist the state of the Data Grid and include the function definitions in the saved options?

## Solution

To achieve the desired scenario, implement a custom JSON [`reviver`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse#using_the_reviver_parameter) parameter, which can serialize and deserialize the function definitions.

````C#
<script>
    $(document).ready(function () {
        $("#save").click(function (e) {
            e.preventDefault();
            var grid = $("#grid").data("kendoGrid");
            localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions());
        });

        $("#load").click(function (e) {
            e.preventDefault();
            var grid = $("#grid").data("kendoGrid");
            var options = localStorage["kendo-grid-options"];
            if (options) {
                var parsedOptions = JSON.parse(options)
                // Add the function reference
                parsedOptions.columns[0].command[0].click = showDetails;
                grid.setOptions(parsedOptions);
            }
        });
    });

    function showDetails(e) {
        e.preventDefault();
        var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
        console.log(dataItem);
    }
</script>

<div class="box wide">
    <button href="#" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" id="save">Save State</button>
    <button href="#" class="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary" id="load">Load State</button>
</div>
<br />
@(Html.Kendo().Grid<TelerikMvcApp9.Models.OrderViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Command(command => command.Custom("View Details").Click("showDetails")).Width(180);
                columns.Bound(p => p.OrderID).Filterable(false);
                columns.Bound(p => p.Freight);
                columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
                columns.Bound(p => p.ShipName);
                columns.Bound(p => p.ShipCity);
            })
            .Pageable()
            .Sortable()
            .Scrollable()
            .Filterable()
            .Groupable()
            .HtmlAttributes(new { style = "height:550px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )

````
