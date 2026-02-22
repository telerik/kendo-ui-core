---
title: Selection Aggregates
page_title: Selection Aggregates
description: "Get started with the Telerik UI Grid and learn how to enable selection aggregates that allow users to see precalculated aggregates when they select cells or rows in the Grid table."
components: ["grid"]
slug: selection_aggregates_grid_aspnetcore
position: 12
---

# Selection Aggregates

The Grid allows you calculate aggregated metrics based on the data of the selected cells or rows.

This functionality allows you to get a quick snapshot containing metrics about the selected data. You can use the built-in approach and display these metrics at the bottom of the Grid or create your own elements that will display the data.

The Grid supports the following built-in aggregates for all selected cells:

* `Max`&mdash;The greatest number. Valid for numeric fields.
* `Min`&mdash;The smallest number. Valid for numeric fields.
* `Sum`&mdash;The sum of all numbers. Valid for numeric fields.
* `Average`&mdash;The average of all numbers. Valid for numeric fields.
* `Count`&mdash;The total number of cells.
* `Earliest`&mdash;The earliest date. Valid for `Date` fields.
* `Latest`&mdash;The latest date. Valid for `Date` fields.
* `IsTrue`&mdash;The total number of boolean fields with the value `true`.
* `IsFalse`&mdash;The total number of boolean fields with the value `false`.

## Enabling Selection Aggregates

To display selection aggregates, the Grid must meet the following requirements:

* The Grid must be [`Selectable`](/api/kendo.mvc.ui.fluent/gridselectionsettingsbuilder) where the `CellAgregates` property is specified. The aggregates work with `Cell`, `Row`, and `Checkbox` selection.
* The [`Model.Id`](/api/kendo.mvc.ui.fluent/datasourcemodeldescriptorfactory#idsystemlinqexpressionsexpression) field must be defined so that the aggregates can be calculated.

To enable the display of aggregates, use either of the following approaches:

* Configure the aggregates inside the `.Selectable` configuration of the Grid by using the [`CellAggregates`](/api/kendo.mvc.ui.fluent/gridselectionsettingsbuilder#cellaggregatessystemboolean) property. In this way, the Grid will display all available selection aggregates.

    ```HtmlHelper
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .CellAggregates(true)
            .CheckboxSelection(true)
        )
    ```
    {% if site.core %}
    ```TagHelper
        <selectable mode="multiple,row" cell-aggregates="true" checkbox-selection="true"/>
    ```
    {% endif %}

* Pass an array to the `CellAggregates` property. This will allow you to display selection aggregates only for the aggregates that you specify in the array.

    ```HtmlHelper
        .Selectable(selectable => selectable
            .Mode(GridSelectionMode.Multiple)
            .CellAggregates(new string[]{"sum","count","earliest","isTrue"})
        )
    ```
    {% if site.core %}
    ```TagHelper
        @{
          var customAggregates = new string[]{"sum","count","earliest","isTrue"};
        }
    
        <selectable mode="multiple,row" cell-aggregates="customAggregates"/>
    ```
    {% endif %}


## Displaying Selection Aggregates in Status Bar

The Grid allows you to render the selection aggregates in a built-in bar under the table cells—the Status Bar.

To show the selection aggregates in the Status Bar, define a template by using [`StatusBarTemplate`](/api/kendo.mvc.ui.fluent/gridbuilder#statusbartemplatesystemstring), and return the desired HTML result.

The following example demonstrates how to access the calculated cell aggregates and display them in a `div` element that is placed in the Grid's Status Bar.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("rowSelection")
        .Columns(columns =>
        {
            columns.Bound(o => o.ShipCountry).Width(200);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .Pageable(pageable => pageable.ButtonCount(5))
        .Selectable(selectable => selectable
        .Mode(GridSelectionMode.Multiple)
            .CellAggregates(true)
        )
        .PersistSelection(true)
        .StatusBarTemplate(Html.Kendo().Template()
            .AddHtml("${data.aggregates.count>0?`<div>Cells count: ${data.aggregates['count']} Min: ${data.aggregates['min']} Max: ${data.aggregates['max']} Sum: ${data.aggregates['sum']} Average: ${formatAggregate(data.aggregates['average'], 'average')} Earliest Date: ${formatAggregate(data.aggregates['earliest'], 'earliest')} Latest Date: ${formatAggregate(data.aggregates['latest'], 'latest')}</div>`:'No rows are selected'}")
        )
        .Navigatable()
        .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(5)
        .Model(model => model.Id(p => p.OrderID))
        .Read(read => read.Action("Orders_Read", "Grid"))
        )
    )

    <script>
        function formatAggregate(aggregate, key) {
            if (key === "average" || key === "sum" || key === "max" || key === "min") {
                return kendo.toString(aggregate, "n");
            }
            if (key === "earliest" || key === "latest") {
                return kendo.toString(aggregate, "dd/MM/yyyy");
            }
            return aggregate;
        }
    </script>
```
{% if site.core %}
```TagHelper
    <kendo-grid name="rowSelection" navigatable="true" persist-selection="true">
        <selectable mode="multiple,row" cell-aggregates="true" status-bar-template-handler="statusBarHandler"/>
        <columns>
            <column field="ShipCountry" width="100">
            </column>
            <column field="Freight" width="100">
            </column>
            <column field="OrderDate" width="100">
            </column>
        </columns>
        <datasource page="0" batch="false" type="DataSourceTagHelperType.Ajax" page-size="10">
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID">
                    <fields>
                        <field name="OrderDate" type="Date"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
    </kendo-grid>

    <script>
        function statusBarHandler() {
            let result = "";
            const aggregates = arguments[0].aggregates
            for (const aggregate in aggregates) {
                const value = aggregates[aggregate];
                if (value || value === 0) {
                    result += `${capitalizeFirstLetter(aggregate)}: <b>${formatAggregate(aggregates[aggregate], aggregate)}</b> `;
                }
            }
            return result;
        }
        function formatAggregate(aggregate, key) {
            if (key === "average" || key === "sum" || key === "max" || key === "min") {
                return kendo.toString(aggregate, "n");
            }
            if (key === "earliest" || key === "latest") {
                return kendo.toString(aggregate, "dd/MM/yyyy");
            }
            return aggregate;
        }
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    </script>
```
{% endif %}

## Displaying Selection Aggregates Externally

To display the aggregates within a custom element or component, handle the Grid [`Change`](/api/kendo.mvc.ui.fluent/grideventbuilder#changesystemstring) event and access the precalculated aggregates from the exposed event data.

The following example demonstrates how to access the calculated cell aggregates and display them in an external `div` element.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
        .Name("cellSelection")
        .Columns(columns =>
        {
            columns.Bound(o => o.ShipCountry).Width(200);
            columns.Bound(p => p.Freight).Width(200);
            columns.Bound(p => p.OrderDate).Format("{0:dd/MM/yyyy}");
        })
        .ToolBar(toolbar => toolbar.Custom()
            .ClientTemplate(Html.Kendo().Template()
                .AddComponent(component=>component.Button()
                    .Name("display-aggregates")
                    .Content("Dislay Aggregates")
                    .Enable(false)
                    .Events(e=>e.Click("onDisplayAggregatesBttn"))
                )
            )
        )
        .Pageable(pageable => pageable.ButtonCount(5))
        .Selectable(selectable => selectable
        .Mode(GridSelectionMode.Multiple)
           .Type(GridSelectionType.Cell)
           .CellAggregates(true)
        )
        .Navigatable()
        .DataSource(dataSource => dataSource
        .Ajax()
        .PageSize(5)
        .Model(m => m.Id(f => f.OrderID))
        .Read(read => read.Action("Orders_Read", "Grid"))
        )
        .Events(e => e.Change("onChange"))
    )

    @(Html.Kendo().Dialog()
        .Name("dialog")
        .Title("Selection Aggregates")
        .Visible(false)
        .Width(450)
        .Modal(false)
        .Actions(actions =>
        {
            actions.Add().Text("Close").Primary(true);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-grid name="cellSelection" navigatable="true" persist-selection="true" on-change="onChange">
        <selectable mode="multiple,cell" cell-aggregates="true" />
        <columns>
            <column field="ShipCountry" width="100">
            </column>
            <column field="Freight" width="100">
            </column>
            <column field="OrderDate" width="100" format="{0:dd/MM/yyyy}">
            </column>
        </columns>
        <toolbar>
            <toolbar-button>
                <toolbar-command-template>
                    <kendo-button name="display-aggregates" on-click="onDisplayAggregatesBttn" enable="false">
                        <content>Display Aggregates</content>
                    </kendo-button>
                </toolbar-command-template>
            </toolbar-button>
        </toolbar>
        <datasource page="0" type="DataSourceTagHelperType.Ajax" page-size="5" server-operation="true">
            <schema data="Data" total="Total" errors="Errors">
                <model id="OrderID">
                    <fields>
                        <field name="ShipCountry" type="string"></field>
                        <field name="ProductName" type="string"></field>
                        <field name="OrderDate" type="Date"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Orders_Read","Grid")" />
            </transport>
        </datasource>
    </kendo-grid>

    <kendo-dialog name="dialog" title="Selection Aggregates" width="450" modal="false" visible="false">
        <actions>
            <action text="Close">
            </action>
        </actions>
    </kendo-dialog>
```
{% endif %}
```JavaScript
    let aggregates;
    function onChange(e) {
        let displayAggregatesBttn = $("#display-aggregates").data("kendoButton");
        displayAggregatesBttn.enable(true);
        aggregates = e.cellAggregates;
    }
    function onDisplayAggregatesBttn(e) {
        let dialogContent = aggregatesTemplate(aggregates);
        let dialog = $("#dialog").data("kendoDialog");
        dialog.content(dialogContent);
        dialog.open();
    }
    function aggregatesTemplate(aggregates) {
        var result = '<div class="k-d-flex k-gap-sm">';
        for (const aggregate in aggregates) {
            const value = aggregates[aggregate];
            if (value || value === 0) {
                result += `<div class="k-selection-aggregates-item"><span class="k-selection-aggregates-item-text">${aggregate}: </span><span class="k-selection-aggregates-item-value">${formatAggregate(aggregates[aggregate], aggregate)}</span></div>`;
            }
        }
        result += '</div>';
        return result;
    }
```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Grid Checkbox Selection (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/selection)
* [Grid Aggregates (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/aggregates)
* [API Reference of the Grid](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [JavaScript API Reference of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
