---
title: Local Binding
page_title: Chart Wizard Documentation | Chart Wizard Local Data Binding
description: "Learn how to bind the Telerik UI for {{ site.framework }} Chart Wizard component to a local data collection."
slug: htmlhelpers_localbinding_chartwizard
position: 2
---

# Local Binding

The Chart Wizard supports local data binding that enables you to pass an arbitrary Model directly within the boundaries of the component.

For a runnable example, refer to the [demo on binding the Chart Wizard to local data](https://demos.telerik.com/{{ site.platform }}/chartwizard/local-binding).

To configure the Chart Wizard to bind to a local data collection available on the View, follow the next steps:

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

1. Create a data collection of type `Product` in the Controller Action and pass it to the View that holds the Chart Wizard definition.

    {% if site.core %}
    ```HomeController.cs      
        public IActionResult Index()
        {
            // Returns a collection of type "Product".
            var chartData = productsService.Read();

            /* For a quick test, you can mock the data, and copy and paste this snippet.
            var chartData = new List<Product>()
            {
                new Product { ProductID = 1, ProductName = "Pizza", Quantity = 3, Price = 18m, Tax = 3.6m, TotalTax = 10.8m, Total = 54m },
                new Product { ProductID = 2, ProductName = "Ice Cream", Quantity = 5, Price = 5.40m, Tax = 1.08m, TotalTax = 5.4m, Total = 27m },
                new Product { ProductID = 3, ProductName = "Panna Cotta", Quantity = 2, Price = 8m, Tax = 1.6m, TotalTax = 3.2m, Total = 16m },
                new Product { ProductID = 4, ProductName = "Proschuto", Quantity = 4, Price = 21m, Tax = 4.2m, TotalTax = 9.6m, Total = 48m },
                new Product { ProductID = 5, ProductName = "Cheese", Quantity = 6, Price = 15m, Tax = 3m, TotalTax = 18m, Total = 90m }
            };
            */
            return View(chartData);
        }
    ```
    {% else %}
    ```HomeController.cs  
        public ActionResult Index()
        {
            // Returns a collection of type "Product".
            var chartData = productsService.Read();

            /* For a quick test, you can mock the data, and copy and paste this snippet.
            var chartData = new List<Product>()
            {
                new Product { ProductID = 1, ProductName = "Pizza", Quantity = 3, Price = 18m, Tax = 3.6m, TotalTax = 10.8m, Total = 54m },
                new Product { ProductID = 2, ProductName = "Ice Cream", Quantity = 5, Price = 5.40m, Tax = 1.08m, TotalTax = 5.4m, Total = 27m },
                new Product { ProductID = 3, ProductName = "Panna Cotta", Quantity = 2, Price = 8m, Tax = 1.6m, TotalTax = 3.2m, Total = 16m },
                new Product { ProductID = 4, ProductName = "Proschuto", Quantity = 4, Price = 21m, Tax = 4.2m, TotalTax = 9.6m, Total = 48m },
                new Product { ProductID = 5, ProductName = "Cheese", Quantity = 6, Price = 15m, Tax = 3m, TotalTax = 18m, Total = 90m }
            };
            */
            return View(chartData);
        }  
    ```
    {% endif %}

1. Within the `Index.cshtml` View, set the Model to the data collection `List<Product>`, define the Chart Wizard, and pass the data collection either to the constructor of the component or to the `BindTo()` option. Also, you must specify the Model properties in the `DataColumns()` configuration to make them accessible through the chart configurator.

    ```HtmlHelper
        @model List<Product>

        @(Html.Kendo().ChartWizard<Product>(Model)
            .Name("chartwizard")
            .DataColumns(columns =>
            {
                columns.Add().Field(f => f.ProductName);
                columns.Add().Field(f => f.Quantity);
                columns.Add().Field(f => f.Price);
                columns.Add().Field(f => f.Tax);
                columns.Add().Field(f => f.Total);
                columns.Add().Field(f => f.TotalTax);
            })
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc
        @model List<Product>

        <kendo-chartwizard name="chartwizard">
            <datasource type="DataSourceTagHelperType.Ajax" server-operation="false" data="@Model">
            </datasource>
            <data-columns>
                <data-column field="ProductName"/>
                <data-column field="Quantity" />
                <data-column field="Price" />
                <data-column field="Tax" />
                <data-column field="Total" />
                <data-column field="TotalTax" />
            </data-columns>
        </kendo-chartwizard>
    ```
    {% endif %}

## See Also

* [Binding the Chart Wizard to Remote Data]({% slug htmlhelpers_remotebinding_chartwizard %})
* [Binding the Chart Wizard for {{ site.framework }} to Local Data (Demo)](https://demos.telerik.com/{{ site.platform }}/chartwizard/local-binding)
* [Server-Side API of the Chart Wizard HtmlHelper](/api/chartwizard)
{% if site.core %}
* [Server-Side API of the Chart Wizard TagHelper](/api/taghelpers/chartwizard)
{% endif %}
