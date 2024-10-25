---
title: Selection
page_title: Selection
description: "Learn how to enable the selection functionality of the Telerik UI Grid for {{ site.framework }}."
slug: htmlhelpers_grid_aspnetcore_selection
position: 8
---

# Selection

By default, the selection functionality of the Telerik UI Grid for {{ site.framework }} is disabled.

> As of the 2022 R3 release, the [`Change`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/grideventbuilder#changesystemstring) event will now be fired only when the Grid performs selection or deselection.

## Getting Started

To control the selection in the Grid, use the `Selectable` property.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("rowSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple))
		...
```
{% if site.core %}
```TagHelper
    <kendo-grid name="rowSelection" selectable="multiple">
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

## Select Modes

The Grid supports the following select modes:
* [Single and multiple selection (demo)](https://demos.telerik.com/{{ site.platform }}/grid/selection)
* [Checkbox selection (demo)](https://demos.telerik.com/{{ site.platform }}/grid/checkbox-selection)

You can set the select mode of the Grid to `Multiple` or `Single`. Additionally, the component provides the `Row` and `Cell` select types which allow multiple or single selection of rows or cells.

> If the [`Selectable.Mode`] configuration property is set to `GridSelectionMode.Single`, configuring the [`Select`](/api/kendo.mvc.ui.fluent/gridcolumnfactory#select) column of the Grid overrides [`Selectable.Mode`] and sets the selection mode to `Multiple`. 

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("cellSelection")
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Cell))
        ...
```
{% if site.core %}
```TagHelper
    <kendo-grid name="cellSelection" selectable="multiple,cell">
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

## Dragging to Select

The Grid allows you to conditionally drag to select when the multiple selection mode is configured for rows or cells through the `DragToSelect` property.

```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("cellSelection")
        .Selectable(selectable => selectable
            .DragToSelect(false)
            .Mode(GridSelectionMode.Multiple)
            .Type(GridSelectionType.Row))
        ...
```
{% if site.core %}
```TagHelper
       <kendo-grid name="cellSelection">
             <selectable dragToSelect="false" mode="multiple,row"/>
             <!--Other configuration-->
       </kendo-grid>      
```
{% endif %}

## Persisting the Selection

The Grid also provides a built-in functionality for persisting the selection through the `PersistSelection` property and its setting it to `true`.

> To persist the selection in the Grid, you also need to configure the `ID` field in the schema of the DataSource. For a runnable example, refer to the [demo on persisting the state of the Grid](https://demos.telerik.com/{{ site.platform }}/grid/persist-state).

```HtmlHelper
    .PersistSelection(true)
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(p => p.OrderID))
```
{% if site.core %}
```TagHelper
    <kendo-grid name="grid" persist-selection="true" selectable="true">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="OrderID"></model>
            </schema>
            <!--Other DataSource configuration-->
        </datasource>
        <!--Other configuration-->
    </kendo-grid>
```
{% endif %}

## Getting Selected Row Data

To get data from the selected rows, use the `Change` event of the Grid:

1. Specify the name of the JavaScript function which will handle the event.

    ```HtmlHelper
        .Events(ev => ev.Change("onChange"))
    ```
    {% if site.core %}
    ```TagHelper
        <kendo-grid name="grid" on-change="onChange">
            <!--Other configuration-->
        </kendo-grid>
    ```
    {% endif %}


1. Declare the event handler and access the selected data items.

    <script>
        function onChange(e) {
            var selectedRows = this.select(); //Get the selected Grid rows.
            var selectedDataItems = [];
            for (var i = 0; i < selectedRows.length; i++) { //Loop through the selected row elements.
                var dataItem = this.dataItem(selectedRows[i]); //Get the dataItem of each row.
                selectedDataItems.push(dataItem); //Store the dataItem of each selected row in the array.
            }

            console.log(selectedDataItems); // "selectedDataItems" contains all selected data items.
        }
    </script>

## Clearing Selected Row Data

To clear the selected row data, use the [`clearSelectionMethod`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/clearselection).

```
<script>
    function clearSelection(){ // Custom function.
        var grid = $("#grid").data("kendoGrid");
        grid.clearSelection();
    }
</script>
```

## See Also

* [Multiple Selection by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/selection)
* [Checkbox Selection by the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/checkbox-selection)
* [Persisting the State of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/persist-state)
* [Server-Side API of the Grid for {{ site.framework }}](/api/grid)
