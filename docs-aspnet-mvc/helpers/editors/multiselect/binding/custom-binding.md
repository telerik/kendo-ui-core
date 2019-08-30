---
title: Custom Binding
page_title: Custom Binding | Telerik UI MultiSelect HtmlHelper for ASP.NET MVC
description: "Learn how to implement custom binding with Telerik UI MultiSelect HtmlHelper for ASP.NET MVC."
slug: custombinding_multiselect_aspnetmvc
position: 1
---

# Custom Binding

You can use a custom DataSource and bind the MultiSelect to a `ToDataSourceResult` instance.

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

1. Add an Ajax-bound MultiSelect.

    ```ASPX
        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect")
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
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
        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect")
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
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

The following example demonstrates how to configure the MultiSelect to send parameters to the server.

```ASPX
    <%: Html.Kendo().MultiSelect()
        .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
                source.Read(read =>
                {
                        read.Action("GetProducts", "Home")
                            .Data("onAdditionalData");
                });

                source.serverFiltering(true);
        })
    %>
    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiSelect").data("kendoMultiSelect").input.val()
            };
        }
    </script>
```
```Razor
    @(Html.Kendo().MultiSelect()
        .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") // Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
            source.ServerFiltering(true);
        })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiSelect").data("kendoMultiSelect").input.val()
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

The MultiSelect has a default event handler for the `Data` callback of the DataSource which is used when no event handler is defined. The MultiSelect sends the value of the input only if the end user starts to type in it.

    function requestData(selector) {
      return { text: $(selector).data("kendoMultiSelect").input.val() };
    }

## Preselecting Values on Initial Load

When `AutoBind: false` (deferred binding) is used, specify a list of data items instead of just a list of strings. This functionality is available as of the Q1 SP1 2013 release.

```ASPX
    <%= Html.Kendo().MultiSelect()
        .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
        .DataTextField("ProductName") //Specifies which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") //Specifies which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .AutoBind(false)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") // Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
        })
        .Value(new List<Product> {
            new Product { ProductName = "Chai", ProductID = 1 },
            new Product { ProductName = "Chang", ProductID = 2 }
        })
    %>
```
```Razor
    @(Html.Kendo().MultiSelect()
        .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
        .Filter(FilterType.Contains)
        .AutoBind(false)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") // Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
        })
        .Value(new List<Product> {
            new Product { ProductName = "Chai", ProductID = 1 },
            new Product { ProductName = "Chang", ProductID = 2 }
        })
    )
```

## See Also

* [Basic Usage of the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect)
* [MultiSelectBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [MultiSelect Server-Side API](/api/multiselect)
