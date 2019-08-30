---
title: Custom Binding
page_title: Custom Binding | Telerik UI DropDownList HtmlHelper for ASP.NET MVC
description: "Learn how to implement custom binding with Telerik UI DropDownList HtmlHelper for ASP.NET MVC."
slug: custombinding_dropdownlisthelper_aspnetmvc
position: 1
---

# Custom Binding

You can use a custom DataSource and bind the ComboBox to a `ToDataSourceResult` instance.

## Setting Up the Project

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create an action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Add an Ajax-bound DropDownList.

    ```ASPX
        <%: Html.Kendo().DropDownList()
            .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the DropDownList.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .Type("aspnetmvc-ajax") // Set this type if you want to use DataSourceRequest and ToDataSourceResult instances.
                    .Transport(transport =>
                    {
                        transport.Read("GetProducts", "Home");
                    })
                    .Schema(schema =>
                    {
                    schema.Data("Data") // Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                        .Total("Total"); // Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                    });
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the DropDownList.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
            .DataSource(source =>
            {
                source.Custom()
                    .ServerFiltering(true)
                    .Type("aspnetmvc-ajax") // Set this type if you want to use DataSourceRequest and ToDataSourceResult instances.
                    .Transport(transport =>
                    {
                        transport.Read("GetProducts", "Home");
                    })
                    .Schema(schema =>
                    {
                        schema.Data("Data") // Define the [data](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                            .Total("Total"); // Define the [total](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                    });
            })
        )
    ```

## Sending Parameters to the Server

The following example demonstrates how to configure the DropDownList to send parameters to the server.

```ASPX
    <%: Html.Kendo().DropDownList()
        .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the DropDownList.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
                source.Read(read =>
                {
                        read.Action("GetProducts", "Home")
                            .Data("onAdditionalData");
                });
        })
    %>
    <script>
        function onAdditionalData() {
            return {
                text: $("#productDropDownList").data("kendoDropDownList").text()
            };
        }
    </script>
```
```Razor
    @(Html.Kendo().DropDownList()
        .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the DropDownList.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the DropDownList as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the DropDownList as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") // Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
        })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productDropDownList").data("kendoDropDownList").filterInput.val()
            };
        }
    </script>
```

The following example demonstrates how the `GetProducts` method is used.

    public JsonResult GetProducts(string text)
    {
        var northwind = new SampleEntities();

        var products = northwind.Products.Select(product => new ProductViewModel
                {
                ProductID = product.ProductID,
                ProductName = product.ProductName,
                UnitPrice = product.UnitPrice ?? 0,
                UnitsInStock = product.UnitsInStock ?? 0,
                UnitsOnOrder = product.UnitsOnOrder ?? 0,
                Discontinued = product.Discontinued
                });

        if (!string.IsNullOrEmpty(text))
        {
            products = products.Where(p => p.ProductName.Contains(text));
        }

        return Json(products, JsonRequestBehavior.AllowGet);
    }

The DropDownList has a default event handler for the `Data` callback of the DataSource which is used when no event handler is defined. The DropDownList sends the value of the input only if the end user starts to type in it.

    function requestData(selector) {
        var dropdownlist = $(selector).data("kendoDropDownList"),
            filters = dropdownlist.dataSource.filter(),
            value = dropdownlist.filterInput.val();

        if (!filter || !filter.filters.length) {
            value = "";
        }

        return { text: value };
    }

## See Also

* [Basic Usage of the DropDownList HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dropdownlist)
* [DropDownListBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DropDownListBuilder)
* [DropDownList Server-Side API](/api/dropdownlist)
