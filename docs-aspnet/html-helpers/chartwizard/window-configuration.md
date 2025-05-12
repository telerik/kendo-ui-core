---
title: Window Configuration
page_title: Telerik UI Chart Wizard Documentation - Window Configuration
description: "Configure the settings of the Window component that holds the Telerik UI for {{ site.framework }} Chart Wizard."
slug: htmlhelpers_window_chartwizard
position: 4
---

# Window Configuration

By design, the Chart Wizard is displayed in a [Window]({% slug htmlhelpers_window_aspnetcore%}) component. 

To configure the Window settings like dimensions, position, resizing, and more, utilize the `Window()` configuration. The Window of the Chart Wizard has all the functionalities available in the standalone [Window]({% slug htmlhelpers_window_aspnetcore%}) component.

The following example demonstrates how to customize the Window of the Chart Wizard. The Window opens when a button is clicked.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("open-wizard")
        .Icon("chart-column-clustered")
        .Content("Open Chart Wizard")
        .Events(ev=>ev.Click("onClick"))
    )

    <div class="container">
        @(Html.Kendo().ChartWizard<Product>()
            .Name("chartwizard")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Read", "ChartWizard"))
            )
            .DataColumns(columns =>
            {
                columns.Add().Field(f => f.ProductName).Title("Product Name");
                columns.Add().Field(f => f.Quantity);
            })
            .Window(window =>
            {
                window.Visible(false);
                window.Modal(false);
                window.Actions(actions => actions
                    .Minimize()
                    .Maximize()
                    .Close()
                );
                window.Resizable(resizable => resizable.Enabled(true));
                window.Draggable(d => d.Containment(".container"));
                window.Height(550);
                window.Width(700);
            })
        )
    </div>

    <script>
        function onClick() {
            $("#chartwizard").data("kendoChartWizard").open();
        }
    <script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvcl

    @{
        string[] windowActions = new string[] { "Minimize", "Maximize", "Close" };
    }

    <kendo-button name="open-wizard" on-click="onClick" icon="chart-column-clustered">
        Open Chart Wizard
    </kendo-button>

    <div class="container">
        <kendo-chartwizard name="chartwizard">
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema data="Data" total="Total" errors="Errors">
                    <model>
                        <fields>
                            <field name="ProductName" type="string"></field>
                            <field name="Quantity" type="number"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="@Url.Action("Read", "ChartWizard")"/>
                </transport>
            </datasource>
            <data-columns>
                <data-column field="ProductName" title="Product Name"/>
                <data-column field="Quantity" />
            </data-columns>
            <window visible="false" modal="false" width="700" height="550" actions="windowActions" draggable="true">
                <draggable containment=".container"/>
            </window>
        </kendo-chartwizard>
    </div>

    <script>
        function onClick() {
            $("#chartwizard").data("kendoChartWizard").open();
        }
    <script>
```
{% endif %}

## See Also

* [Window Configuration of the Chart Wizard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/window-configuration)
* [Server-Side API of the Chart Wizard HtmlHelper](/api/chartwizard)
* [Server-Side API of the Window HtmlHelper](/api/window)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
* [Server-Side API of the Window TagHelper](/api/taghelpers/window)
{% endif %}