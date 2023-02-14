---
title: Persisting Function References of Custom Command Buttons in the Grid
page_title: Persisting Function References of Custom Command Buttons in the Grid
description: An example on how to persist the function references of the custom command buttons after serialization in the Telerik UI for {{ site.product }} Grid.
type: how-to
slug: grid-persist-state-and-function-references
tags: grid, persist, state, function, reference
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
  <td>Created with the 2022.3.1109 version</td>
 </tr>
</table>

## Description

How can I persist the function references of the custom command buttons in the {{ site.product }} Grid after serialization?


## Solution

To achieve the desired scenario:

1. Create two separate buttons which will be responsible for the loading and persisting of the Grid's state.
1. Handle the [`click`](https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event) event of both buttons. 
1. Store the options of the Grid by using the [`getOptions()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/getoptions) method while serializing them within the `LocalStorage` of the application by using the [`kendo.stringify()`](https://docs.telerik.com/kendo-ui/api/javascript/kendo/methods/stringify) method.
1. Just before you pass the options to the [`setOptions`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/setoptions) method of the Grid upon the state's persistence, add the function reference to the parsed JSON file retrieved from the `LocalStorage`.

```Index.cshtml
    <a href="#" class="k-button k-button-md k-rounded-md k-button-solid-base"  id="save">Save State</a>
    <a href="#" class="k-button k-button-md k-rounded-md k-button-solid-base" id="load">Load State</a>

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.ContactName).Width(400);
            columns.Command(c => c.Custom("View Details").Click("onClick")).Width(200);
        })
        .HtmlAttributes(new { style = "height: 550px;" })
        .Scrollable()
        .Groupable()
        .Filterable(ftb => ftb.Mode(GridFilterMode.Row))
        .Sortable()
        .ColumnMenu()
        .Resizable(rsb=>rsb.Columns(true))
        .Reorderable(r => r.Columns(true))
        .Pageable(pageable => pageable
        .Refresh(true)
        .PageSizes(true)
        .ButtonCount(5))
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Customers_Read", "Grid"))
        )
    )
```
```Script.js
    <script>
        function onClick(){
            alert("Details command is clicked !");
        }
        $(document).ready( function () {
            var grid = $("#grid").data("kendoGrid");
            $("#save").click(function (e) { // Handle the Save button's click event.
                e.preventDefault();
                localStorage["kendo-grid-options"] = kendo.stringify(grid.getOptions()); // Store the options within the LocalStorage.
            });

            $("#load").click(function (e) { // Handle the Load button's click event.
                e.preventDefault();
                var parsedOptions = JSON.parse(localStorage["kendo-grid-options"]); 
                if (parsedOptions) {
                    parsedOptions.columns[1].command[0].click = onClick; // Add the function reference of the custom command.
                    grid.setOptions(parsedOptions);
                }
            });
        });
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on persisting function references to a custom command in the Grid](https://netcorerepl.telerik.com/cwlwmMOt161GtEqa56).

## See Also

* [Client-Side API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Server-Side API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Telerik REPL: Persist Function References to a Custom Command in the Grid](https://netcorerepl.telerik.com/cwlwmMOt161GtEqa56)





