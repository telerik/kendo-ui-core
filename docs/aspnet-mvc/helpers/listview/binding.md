---
title: Binding
page_title: Ajax Binding of Kendo jQuery ListView widget
description: Learn the steps to configure Kendo UI ListView component for AJAX binding and easily enable client data processing during AJAX binding.
---

# ListView Binding

## Getting started

When configured for ajax binding the Kendo ListView for ASP.NET MVC will make ajax requests when doing paging.

To configure the Kendo ListView for ajax binding follow these steps:

1.  Add a new action method which will return data to populate the listview:

        public ActionResult Products_Read()
        {
            var products = new NorthwindDataContext().Products;
        }
2.  Add a new parameter of type `Kendo.UI.DataSourceRequest`.
It will contain the current listview request information.
Decorate that parameter with the `Kendo.UI.DataSourceRequestAttribute`. That attribute is responsible for populating the `DataSourceRequest` object.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;
        }
3.  Use the `ToDataSourceResult` extension method to convert your `IQueryable` or `IEnumerable` to a
`Kendo.UI.DataSourceResult` object. That extension method will page, filter, sort or group your data using the information provided by the
`DataSourceRequest` object. To use the `ToDataSourceResult` extension method import the `Kendo.Mvc.Extensions` namespace.

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            DataSourceResult result = products.ToDataSourceResult(request);
        }
4.  Return the `DataSourceResult` as JSON:

        public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request)
        {
            var products = new NorthwindDataContext().Products;

            DataSourceResult result = products.ToDataSourceResult(request);

            return Json(result);
        }
5.  In the view configure the listview to use the action method created in the previous steps:
    - ListView item template

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
    - WebForms

            <%: Html.Kendo().ListView<MvcApplication1.Models.Product>()
                .Name("ListView")
                .TagName("div")
                .ClientTemplateId("template")
                .DataSource(dataSource => dataSource
                    .Read(read => read.Action("Products_Read", "Home")) // Specify the action method and controller name
                )
                .Pageable()
            %>
    - Razor

            @(Html.Kendo().ListView<MvcApplication1.Models.Product>()
                .Name("ListView")
                .TagName("div")
                .ClientTemplateId("template")
                .DataSource(dataSource => dataSource
                    .Read(read => read.Action("Products_Read", "Home")) // Specify the action method and controller name
                )
                .Pageable()
            )


The `ToDataSourceResult` method uses the `DataSourceRequest` parameter and Linq expressions to apply paging, sorting, filtering and grouping.
The JSON response of the action method will contain only a single page of data. The listview will be bound to that data.

## Pass Additional Data to Action Method

To pass additional parameters to the action method use the `Data` setting. Provide the name of a JavaScript function which will return an object
containing the additional data:



### Action method

    public ActionResult Products_Read([DataSourceRequest]DataSourceRequest request, string firstName, string lastName)
    {
        //Implementation omitted
    }


### WebForms - Send additional data

    <%: Html.Kendo().ListView<MvcApplication1.Models.Product>()
            .Name("ListView")
            .TagName("div")
            .ClientTemplateId("template")
            .DataSource(dataSource => dataSource
                .Read(read => read.Action("Products_Read", "Home")
                                  .Data("additionalData")) // Specify the name of the JavaScript function that returns the data
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


### Razor - Send additional data

    @(Html.Kendo().ListView<MvcApplication1.Models.Product>()
        .Name("ListView")
        .TagName("div")
        .ClientTemplateId("template")
        .DataSource(dataSource => dataSource
            .Read(read => read.Action("Products_Read", "Home")
                .Data("additionalData")) // Specify the name of the JavaScript function that returns the data
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


## Enable Client Data Processing during Ajax Binding

By default Kendo ListView for ASP.NET MVC will request data from the server every time the user changes the page, filters the grid, sorts or groups. This behavior
can be changed by disabling `ServerOperation`:

    .DataSource(dataSource => dataSource
        .ServerOperation(false) // paging will be applied client-side
        .Read(read => read.Action("Products_Read", "Home"))
    )
