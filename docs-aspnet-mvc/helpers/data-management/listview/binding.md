---
title: Ajax Binding
page_title: Binding | Telerik UI ListView HtmlHelper for ASP.NET MVC
description: "Configure the Telerik UI ListView for AJAX binding and easily enable client-data processing during AJAX binding."
slug: ajaxbinding_listviewhelper_aspnetmvc
position: 3
---

# Ajax Binding

When configured for Ajax binding, the ListView for ASP.NET MVC makes Ajax requests when doing paging.

## Getting Started

To configure the ListView for ASP.NET MVC for Ajax binding:

1. Add a new action method which returns data to populate the ListView.

      public ActionResult Products_Read()
        {
            var products = new NorthwindDataContext().Products;
        }

1. Add a new parameter of type `Kendo.UI.DataSourceRequest`. It will contain the current ListView request information. Decorate that parameter with the `Kendo.UI.DataSourceRequestAttribute`. This attribute is responsible for populating the `DataSourceRequest` object.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;
        }

1. Use the `ToDataSourceResult` extension method to convert your `IQueryable` or `IEnumerable` to a `Kendo.UI.DataSourceResult` object. This extension method will page, filter, sort, or group your data using the information provided by the `DataSourceRequest` object. To use the `ToDataSourceResult` extension method, import the `Kendo.Mvc.Extensions` namespace.

    The `ToDataSourceResult` method uses the `DataSourceRequest` parameter and Linq expressions to apply paging, sorting, filtering, and grouping. The JSON response of the action method will contain only a single page of data. The ListView will be bound to that data.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            DataSourceResult result = products.ToDataSourceResult(request);
        }

1. Return the `DataSourceResult` as JSON.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            DataSourceResult result = products.ToDataSourceResult(request);

            return Json(result);
        }

1. In the view, configure the ListView to use the action method created in the previous steps.

    ```Item-Template
        <script type="text/x-kendo-tmpl" id="template">
            <div class="product">
                <img src="@Url.Content("~/content/web/foods/")${ProductID}.jpg" alt="${ProductName} image" />
                <h3>${ProductName}</h3>
                <dl>
                    <dt>Price:</dt>
                    <dd>${kendo.toString(UnitPrice, "c")}</dd>
                </dl>
            </div>
        </script>
    ```
    ```ASPX
        <%: Html.Kendo().ListView<MvcApplication1.Models.Product>()
            .Name("ListView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Products_Read", "Home")) // Specify the action method and controller name
            )
            .Pageable()
        %>
    ```
    ```Razor
        @(Html.Kendo().ListView<MvcApplication1.Models.Product>()
            .Name("ListView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Products_Read", "Home")) // Specify the action method and controller name
            )
            .Pageable()
        )
    ```

## Adding More Parameters

To pass additional parameters to the action method, use the `Data` setting. Provide the name of a JavaScript function which will return an object that contains the additional data.

The following example demonstrates how to use the `Action` method.

    public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request, string firstName, string lastName)
    {
        // The implementation is omitted for brevity.
    }

The following example demonstrates how to send additional data.

```ASPX
    <%: Html.Kendo().ListView<MvcApplication1.Models.Product>()
            .Name("ListView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Products_Read", "Home")
                                .Data("additionalData")) // Specify the name of the JavaScript function that returns the data.
            )
            .Pageable()
    %>
    <script>
        function additionalData() {
            return {
                firstName: "John",
                lastName: "Doe"
            };
        }
    </script>
```
```Razor
    @(Html.Kendo().ListView<MvcApplication1.Models.Product>()
        .Name("ListView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("Products_Read", "Home")
                .Data("additionalData")) // Specify the name of the JavaScript function that returns the data.
        )
        .Pageable()
    )
    <script>
        function additionalData() {
            return {
                firstName: "John",
                lastName: "Doe"
            };
        }
    </script>
```

## Processing Client Data

By default, the Telerik UI ListView for ASP.NET MVC requests data from the server every time the user changes the page, filters the ListView, sorts, or groups. To change this behavior, disable `ServerOperation`.

    .DataSource(dataSource => dataSource
        .ServerOperation(false) // Paging will be applied client-side.
        .Read(read => read.Action("Products_Read", "Home"))
    )

## See Also

* [Binding to Remote Data by the ListView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listview/remote-data-binding)
* [Customizing the Data Source of the ListView HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/listview/custom-datasource)
* [Server-Side API](/api/listview)
