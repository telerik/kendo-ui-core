---
title: Create Nested Hierarchy of Components Using Grid Selectoins
description: "An example on how to use Grid selection in hierarchy of Components"
type: how-to
page_title: Use Grid selection in a hierarchy of components
slug: grid-selection-in-nested-components
tags: grid, wizard, window, hierarchy, selection
ticketid: 1582155
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
  <td>Created with the 2022.3.913 version</td>
 </tr>
</table>

## Description

How can I use the selection of a Grid in a hierarchy of Components?

## Solution

To achieve the desired scenario: 

1. Implement a Custom Command Button in the Toolbar.
1. Handle the ["Click"](https://api.jquery.com/click/) Event of the Custom Command Button.
1. In the Click Event handler, get the selected rows of the Main Grid. Use the ["select"](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/select) method for the case.
1. Create a collection of the [dataItems](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/dataitem) by using the selected rows.
1. [Open](https://docs.telerik.com/kendo-ui/api/javascript/ui/window/methods/open) the Window.
1. For the Content part of the Window, we are implementing a div element for the Telerik UI Wizard. Now we can initialize it.
1. Implement the desired steps in the Wizard - Grid, Percent Input, Stored Procedure.
1. Use the collection from point 4 as a dataSource for the newly created Grid.
1. Here is an example:

```Index.cshtml
        @(Html.Kendo().Grid<TelerikMvcApp50.Models.OrderViewModel>()
            .Name("grid")
            .ToolBar(t => t.Custom().Text("Adjust Multiple Standard Prices").HtmlAttributes(new { id = "customCommand" }))
            .Columns(columns =>
            {
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
            .Selectable(s => s.Mode(GridSelectionMode.Multiple))
            .HtmlAttributes(new { style = "height:550px;" })
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Orders_Read", "Grid"))
            )
        )

        @(Html.Kendo().Window()
           .Name("window")
           .Title("About Alvar Aalto")
           .Content(@<text><div id="wizard"></div></text>)
           .Draggable()
           .Resizable()
           .Width(600)
           .Visible(false)
           .Modal(true)
           .Position(p => p.Top(200).Left(200))
           .Actions(actions => actions.Pin().Minimize().Maximize().Close())
           .Events(e => e.Close("onWindowClose"))
)
```
```JavaScript
<script>
    var percentInputFlag = false;

    $("#customCommand").click(function (e) {
        e.preventDefault();

        var grid = $("#grid").data("kendoGrid");

        var rows = grid.select(),
            items = [];

        var window = $("#window").data("kendoWindow");

        rows.each(function (e) {
            var grid = $("#grid").data("kendoGrid");
            var dataItem = grid.dataItem(this);
            items.push(dataItem);
        });

        window.open();

        $("#wizard").kendoWizard({
            pager: true,
            select: function (e) {
                if (e.step.options.title == "Percent Step" && !percentInputFlag) {
                    $("#percentInput").kendoNumericTextBox({
                        label: "Percent input"
                    });
                    percentInputFlag = true;
                }
            },
            done: function (e) {
                e.originalEvent.preventDefault();
            },
            steps: [    
                {
                    title: "Grid Details",
                    content: "<div id='childGrid'></div>"
                },
                {
                    title: "Percent Step",
                    content: "Percent input: <input id='percentInput' type='number' value='30' min='0' max='100'/>"
                },
                {
                    title: "Stored Procedure",
                    content: "<h2>Execute the Stored Procedure</h2>"
                }
            ],
            
        });

        createChildGrid(items);
        
    });

    function createChildGrid(items) {
        $("#childGrid").kendoGrid({
            dataSource: items,
            height: 350,
            groupable: true,
            sortable: true,
            pageable: {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            },
            columns: [{
                field: "ShipName",
                title: "ShipName"
            }, {
                field: "ShipCity",
                title: "ShipCity"
            }]
        });
    }

    function onWindowClose() {
        percentInputFlag = false;
    }
</script>
```

## See Also

* [Grid Overview Demo](https://demos.telerik.com/aspnet-mvc/grid)
* [Window Overview Demo](https://demos.telerik.com/aspnet-mvc/window)
* [Wizard Overview Demo](https://demos.telerik.com/aspnet-mvc/wizard)
