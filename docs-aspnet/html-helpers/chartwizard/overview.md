---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI for {{ site.framework }} Chart Wizard component and how to initialize it."
slug: htmlhelpers_overview_chartwizard
position: 0
---

# {{ site.framework }} Chart Wizard Overview

{% if site.core %}
The Telerik UI Chart Wizard TagHelper and HtmlHelper for {{ site.framework }} are server-side wrappers for the Kendo UI Chart Wizard widget.
{% else %}
The Telerik UI Chart Wizard HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Chart Wizard widget.
{% endif %}

The Chart Wizard lets you configure the visual representation in various charts by selecting different data from an external source or a particular [Grid]({%slug htmlhelpers_grid_aspnetcore_overview%}) data. 

The component has a user-friendly interface that allows you to specify the chart type and its elements, such as series, axes, chart area, title, legend, and more. When you configure the desired chart, you can export it to PDF, SVG, or PNG files.

* [Demo page for the Chart Wizard HtmlHelper](https://demos.telerik.com/{{ site.platform }}/chartwizard)
{% if site.core %}
* [Demo page for the Chart Wizard TagHelper](https://demos.telerik.com/aspnet-core/chartwizard)
{% endif %}

## Initializing the Chart Wizard

The following example demonstrates how to define the Chart Wizard.

```HtmlHelper
    @model List<Product>

    @(Html.Kendo().ChartWizard<Product>()
        .Name("chartwizard")
        .BindTo(Model)
        .DataColumns(columns =>
        {
            columns.Add().Field(f => f.ProductName).Title("Product Name");
            columns.Add().Field(f => f.Quantity);
        })
    )
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvcl
    @model List<Product>

    <kendo-chartwizard name="chartwizard">
        <datasource type="DataSourceTagHelperType.Ajax" server-operation="false" data="@Model">
        </datasource>
        <data-columns>
            <data-column field="ProductName" title="Product Name" />
            <data-column field="Quantity" />
        </data-columns>
    </kendo-chartwizard>
```
```Controller
    public IActionResult Index()
    {
        var chartData = new List<Product>()
        {
            new Product { ProductID = 1, ProductName = "Calzone",  Quantity = 1 },
            new Product { ProductID = 2, ProductName = "Margarita", Quantity = 2 },
            new Product { ProductID = 3, ProductName = "Pollo Formaggio", Quantity = 5 }
        };
        return View(chartData);
    }
```
{% else %}
```Controller
    public ActionResult Index()
    {
        var chartData = new List<Product>()
        {
            new Product { ProductID = 1, ProductName = "Calzone",  Quantity = 1 },
            new Product { ProductID = 2, ProductName = "Margarita", Quantity = 2 },
            new Product { ProductID = 3, ProductName = "Pollo Formaggio", Quantity = 5 }
        };
        return View(chartData);
    }
```
{% endif %}
```Model
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }
```

## Basic Configuration

The [DataSource]({% slug htmlhelpers_datasource_aspnetcore %}) component offers the most versatile data binding approach. To connect the Chart Wizard to a data set retrieved from a remote endpoint, configure the `DataSource` and specify the Model properties in the `DataColumns` configuration.

The following example demonstrates the basic configuration of the Chart Wizard bound to remote data.

```HtmlHelper
    @(Html.Kendo().Button()
        .Name("open-wizard")
        .Icon("chart-column-clustered")
        .Content("Open Chart Wizard")
        .Events(ev=>ev.Click("onClick"))
    )

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
        .Window(window => window.Visible(false))
    )

    <script>
        function onClick() {
            $("#chartwizard").data("kendoChartWizard").open();
        }
    <script>
```
{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc

    <kendo-button name="open-wizard" on-click="onClick" icon="chart-column-clustered">
        Open Chart Wizard
    </kendo-button>

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
        <window visible="false"></window>
    </kendo-chartwizard>

    <script>
        function onClick() {
            $("#chartwizard").data("kendoChartWizard").open();
        }
    <script>
```
{% endif %}
```Controller
    public JsonResult Read([DataSourceRequest] DataSourceRequest request)
    {
        return Json(ProductsData().ToDataSourceResult(request));
    }

    private static List<Product> ProductsData()
    {
        return new List<Product>()
        {
            new Product { ProductID = 216321, ProductName = "Calzone", Quantity = 1 },
            new Product { ProductID = 546897, ProductName = "Margarita", Quantity = 2 },
            new Product { ProductID = 456231, ProductName = "Pollo Formaggio", Quantity = 1 }
        };
    }
```
```Model
    public class Product
    {
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
    }
```

## Functionality and Features

* [Data Binding]({% slug htmlhelpers_databinding_overview_chartwizard %})&mdash;The Chart Wizard supports local and remote data binding.
* [Export Options]({% slug htmlhelpers_export_chartwizard %})&mdash;You can export the generated chart in different file formats.
* [Window Configuration]({% slug htmlhelpers_window_chartwizard %})&mdash;Define the desired settings of the Window that holds the Chart Wizard.
* [Events]({% slug htmlhelpers_events_chartwizard %})&mdash;The component emits a variety of events that allow you to implement custom functionality.
* [Accessibility]({% slug htmlhelpers_chartwizard_accessibility %})&mdash;The Chart Wizard is accessible for screen readers, supports WAI-ARIA attributes, and delivers [keyboard shortcuts]({% slug keynav_chartwizard %}) for faster navigation.

## Next Steps

* [Getting Started with the Chart Wizard]({% slug chartwizard_getting_started %})
* [Basic Usage of the Chart Wizard HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard)
{% if site.core %}
* [Basic Usage of the Chart Wizard TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/chartwizard)
* [Chart Wizard in Razor Pages]({% slug razorpages_chartwizard %})
{% endif %}

## See Also

* [Using the API of the Chart Wizard for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/api)
* [Server-Side API of the Chart Wizard HtmlHelper](/api/chartwizard)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
{% endif %}
* [Client-Side API of the Chart Wizard](https://docs.telerik.com/kendo-ui/api/javascript/ui/chartwizard)
