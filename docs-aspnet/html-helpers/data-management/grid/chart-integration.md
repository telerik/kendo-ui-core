---
title: Chart Integration
page_title: Chart Wizard Integration
description: "Get started with the Telerik UI Grid for {{ site.framework }} and learn how to quickly create the a chart by using the Grid dataset."
slug: htmlhelpers_grid_chart_integration
position: 25
---

# Chart Integration

Integrating charts within the Grid creates a visual representation of the data, making trends, patterns, and outliers more clear compared to raw table data.

Utilize the [Chart Wizard]({% slug htmlhelpers_overview_chartwizard %}) component to create the desired chart using the Grid data or particular Grid rows, and export it to `PDF`, `SVG`, or `PNG` files.

## Getting Started

To create different types of charts from the Grid row and cell selection, proceed with the following steps:

1. Define a Grid and enable multiple rows selection functionality.

    ```HtmlHelper
        @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
            .Name("grid")
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductID);
                columns.Bound(p => p.ProductName).Title("Product Name");
                columns.Bound(p => p.UnitPrice).Title("Unit Price");
                columns.Bound(p => p.UnitsInStock).Title("Units In Stock");
                columns.Bound(p => p.Discontinued);
            })
            .Pageable()
            .Selectable(selectable => selectable
                .Mode(GridSelectionMode.Multiple)
                .Type(GridSelectionType.Row))
            .Scrollable()
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(15)
                .Read("Products_Read", "Grid")
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-grid name="grid" selectable="multiple,row>
            <datasource type="DataSourceTagHelperType.Ajax" page-size="15">
                <schema data="Data" total="Total" errors="Errors">
                    <model id="ProductID">
                        <fields>
                            <field name="ProductID" type="number"></field>
                            <field name="ProductName" type="string"></field>
                            <field name="UnitPrice" type="number"></field>
                            <field name="UnitsInStock" type="number"></field>
                            <field name="Discontinued" type="boolean"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="@Url.Action("Products_Read", "Grid")" />
                </transport>
            </datasource>
            <columns>
                <column field="ProductID" />
                <column field="ProductName"title="Product Name" />
                <column field="UnitPrice" title="Unit Price" />
                <column field="UnitsInStock" title="Units In Stock" />
                <column field="Discontinued" />
            </columns>
            <pageable enabled="true" />
            <scrollable enabled="true" />
        </kendo-grid>
    ```
    {% endif %}

1. Define a hidden Chart Wizard component.

    ```HtmlHelper
        @(Html.Kendo().ChartWizard<Product>()
            .Name("chartwizard")
            .Window(window => window.Visible(false))
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-chartwizard name="chartwizard">
            <window visible="false">
            </window>
        </kendo-chartwizard>
    ```
    {% endif %}

1. Within the `$(document).ready()` function, when the Grid is initialized, get a reference to the Grid and use the `setOptions()` method to update the [built-in context menu]({% slug grid_aspnetcore_contextmenu%}) of the Grid with custom commands. Using the context menu commands, you can select the type of chart that must be generated.

    ```JS
        $(document).ready(function(){
            var grid =  $("#grid").data("kendoGrid");
            if(grid) {
                grid.setOptions({ contextMenu: {
                    body: [
                        {
                            text: "Generate Chart",
                            icon: "chart-area-stacked",
                            items: [{
                                text: "Bar Chart",
                                icon: "chart-bar-clustered",
                                items: [
                                    { name: "Bar", icon:"chart-bar-clustered", text: 'Bar', command: "GenerateChartWizardBar"},
                                    { name: "Stacked Bar", icon:"chart-bar-stacked", text: 'Stacked Bar', command: "GenerateChartWizardBarStacked"},
                                    { name: "100% Stacked Bar", icon:"chart-bar-stacked100", text: '100% Stacked Bar', command: "GenerateChartWizardBarStacked100"}
                                ]
                                },
                                { text: "Pie Chart", icon:"chart-pie", command: "GenerateChartWizardPie" },
                                {
                                    text: "Column Chart",
                                    icon: "chart-column-clustered",
                                    items: [
                                        { name: "Column", icon:"chart-column-clustered", text: 'Column', command: "GenerateChartWizardColumn"},
                                        { name: "Stacked Column", icon:"chart-column-stacked", text: 'Stacked Column', command: "GenerateChartWizardColumnStacked"},
                                        { name: "100% Stacked Column", icon:"chart-column-stacked100", text: '100% Stacked Column', command: "GenerateChartWizardColumnStacked100"}
                                    ]
                                },
                                {
                                    text: "Line Chart",
                                    icon: "chart-line",
                                    items: [
                                        { name: "Line", icon:"chart-line", text: 'Line', command: "GenerateChartWizardLine"},
                                        { name: "Stacked Line", icon:"chart-line-stacked", text: 'Stacked Line', command: "GenerateChartWizardLineStacked"},
                                        { name: "100% Stacked Line", icon:"chart-line-stacked100", text: '100% Stacked Line', command: "GenerateChartWizardLineStacked100"}
                                    ]
                                },
                                { text: "Scatter Chart", icon: "chart-scatter", command: "GenerateChartWizardScatter" }
                            ]},
                            'select'
                        ]}
                });
            }
        });
    ```

1. Define the logic that executes when the respective custom command is selected, and call the `createWizard()` function that updates the Chart Wizard settings and opens its window to preview the generated chart.

    ```JS
        function createWizard(type, stack){
            const grid = $("#grid").data("kendoGrid"); // Get a reference to the Grid component.
            const data = kendo.ui.ChartWizard.generateDataRows(grid.getSelectedData(), grid.columns); // To enable the generation of a chart, pass the Grid selection and the Grid columns to the generateDataRows() method.
            const chartWizard = $("#chartwizard").data("kendoChartWizard"); // Get a reference to the Chart Wizard.

            // Update the default Chart Wizard settings with the Grid's data and columns.
            chartWizard.setOptions({
                dataSource: data,
                defaultState: {
                    seriesType: type,
                    stack: stack
                },
                dataColumns: grid.columns
            });
            chartWizard.open(); // Open the Chart Wizard.
        }

        $(document).ready(function(){

            kendo.ui.grid.commands["GenerateChartWizardBar"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    createWizard('bar', false);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardBarStacked"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    var stacked = true;
                    createWizard('bar', stacked);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardBarStacked100"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    var stacked = {type: '100%'};
                    createWizard('bar', stacked);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardColumn"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    createWizard('column', false);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardColumnStacked"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    var stacked = true;
                    createWizard('column', stacked);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardColumnStacked100"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    var stacked = {type: '100%'};
                    createWizard('column', stacked);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardLine"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    createWizard('line', false);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardLineStacked"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    var stacked = true;
                    createWizard('line', stacked);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardLineStacked100"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    var stacked = {type: '100%'};
                    createWizard('line', stacked);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardPie"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    createWizard('pie', false);
                }
            });

            kendo.ui.grid.commands["GenerateChartWizardScatter"] = kendo.ui.grid.GridCommand.extend({
                exec: function (e) {
                    createWizard('scatter', false);
                }
            });
        });
    ```

## See Also

* [Integrating the Grid HtmlHelper for {{ site.framework }} with Chart Wizard (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/chart-integration)
* [Server-Side API of the Grid for {{ site.framework }}](/api/grid)
{% if site.core %}
* [Server-Side TagHelper API of the Grid for {{ site.framework }}](/api/taghelpers/grid)
{% endif %}
* [Client-Side API of the Grid](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Client-Side API of the Chart Wizard](https://docs.telerik.com/kendo-ui/api/javascript/ui/chartwizard)
