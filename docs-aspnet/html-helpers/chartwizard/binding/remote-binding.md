---
title: Remote Binding
page_title: Remote Data Binding
description: "Learn how to bind the Telerik UI for {{ site.framework }} Chart Wizard component to data received from a remote endpoint."
slug: htmlhelpers_remotebinding_chartwizard
position: 3
---

# Remote Binding

The Chart Wizard supports remote data binding that enables you to load the chart data through a remote endpoint.

For a runnable example, refer to the [demo on binding the Chart Wizard to remote data](https://demos.telerik.com/{{ site.platform }}/chartwizard/remote-data-binding).

To configure the Chart Wizard to bind to data received from a remote endpoint, follow the next steps:

1. Define a Model with the respective properties that must be accessible in the chart (for the axes and series).

    ```C#
        public class Product
        {
            public int ProductID { get; set; }
            public string ProductName { get; set; }
            public int Quantity { get; set; }
            public decimal Price { get; set; }
            public decimal Tax { get; set; }
            public decimal Total { get; set; }
            public decimal TotalTax { get; set; }
        }
    ```

1. Create an Action method and pass data collection to the `ToDataSourceResult()` extension method to convert the collection to a `DataSourceResult` object.

    ```C#
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

1. Within the `Index.cshtml` View, configure the Chart Wizard to use `DataSource` and specify the name of the Action that returns the data in the `Read()` option. Also, you must define the Model properties in the `DataColumns()` configuration to make them accessible through the chart configurator.

    ```HtmlHelper
        @(Html.Kendo().ChartWizard<Product>()
            .Name("chartwizard")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Read", "Home"))
            )
            .DataColumns(columns =>
            {
                columns.Add().Field(f => f.ProductName).Title("Product Name");
                columns.Add().Field(f => f.Quantity);
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

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
                    <read url="@Url.Action("Read", "Home")"/>
                </transport>
            </datasource>
            <data-columns>
                <data-column field="ProductName" title="Product Name"/>
                <data-column field="Quantity" />
            </data-columns>
        </kendo-chartwizard>
    ```
    {% endif %}

## See Also

* [Binding the Chart Wizard to Local Data]({% slug htmlhelpers_localbinding_chartwizard %})
* [Binding the Chart Wizard for {{ site.framework }} to Remote Data (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/remote-data-binding)
* [Server-Side API of the Chart Wizard HtmlHelper](/api/chartwizard)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
{% endif %}
