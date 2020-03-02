---
title: Custom Binding
page_title: Custom Binding
description: "Learn how to implement custom binding with Telerik UI AutoComplete HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/autocomplete/binding/custom-binding
slug: custombinding_autocomplete_aspnetmvc
position: 4
---

# Custom Binding

You can use a custom DataSource and bind the AutoComplete to a `ToDataSourceResult` instance.

## Setting Up the Project

1. Make sure you followed all the steps from the [introductory article on Telerik UI for {{ site.framework }}]({% slug overview_aspnetmvc6_aspnetmvc %}).
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

1. Add an Ajax-bound AutoComplete.

    ```Razor
        @(Html.Kendo().AutoComplete()
            .Name("productAutoComplete")
            .DataTextField("ProductName") // Specify which property of the Product to be used by the autocomplete as a text.
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
                          schema.Data("Data") // Define the [data](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.data) option.
                                .Total("Total"); // Define the [total](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-schema.total) option.
                      });
            })
        )
    ```

## Sending Parameters to the Server

The following example demonstrates how to configure the AutoComplete to send parameters to the server.

```Razor
    @(Html.Kendo().AutoComplete()
        .Name("productAutoComplete")
        .DataTextField("ProductName") // Specify which property of the Product will be used by the AutoComplete.
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home")
                    .Data("onAdditionalData");
            });
        })
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productAutoComplete").val()
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

## See Also

* [Custom Binding by the AutoComplete HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/autocomplete/custom-datasource)
* [Server-Side API](/api/autocomplete)
