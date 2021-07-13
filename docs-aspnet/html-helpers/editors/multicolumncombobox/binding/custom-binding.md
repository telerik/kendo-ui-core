---
title: Custom Binding
page_title: Custom Binding
description: "Learn how to implement custom binding with Telerik UI MultiColumnComboBox HtmlHelper for {{ site.framework }}."
previous_url: /helpers/editors/multicolumncombobox/binding/custom-binding
slug: custombinding_multicolumncombobox_aspnetmvc
position: 5
---

# Custom Binding

You can use a custom DataSource and bind the MultiColumnComboBox to a `ToDataSourceResult` instance.

## Setting Up the Project

1. Make sure you followed all the steps from the [introductory article on Telerik UI for {{ site.framework }}]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create an action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the Products table as JSON result.

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Add an Ajax-bound MultiColumnComboBox.

    ```Razor
        @(Html.Kendo().MultiColumnComboBox()
            .Name("productMultiColumnComboBox")
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiColumnComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiColumnComboBox as a value.
            .Columns(columns =>
            {
                columns.Add().Field("ProductName").Title("Product Name").Width("200px")
                columns.Add().Field("ProductID").Title("Product ID").Width("200px");
            })
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

The following example demonstrates how to configure the MultiColumnComboBox to send parameters to the server.

```Razor
    @(Html.Kendo().MultiColumnComboBox()
        .Name("productMultiColumnComboBox") // The name of the MultiColumnComboBox is mandatory. It specifies the "id" attribute of the MultiColumnComboBox.
        .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiColumnComboBox as a text.
        .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiColumnComboBox as a value.
        .Filter(FilterType.Contains)
        .DataSource(source =>
        {
            source.Read(read =>
            {
                read.Action("GetProducts", "Home") // Set the Action and Controller names.
                    .Data("onAdditionalData");
            });
        })
        .SelectedIndex(0) // Select the first item.
    )

    <script>
        function onAdditionalData() {
            return {
                text: $("#productMultiColumnComboBox").data("kendoMultiColumnComboBox").text()
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

The MultiColumnComboBox has a default event handler for the `Data` callback of the DataSource which is used when no event handler is defined. The MultiColumnComboBox sends the value of the input only if the end user starts to type in it.

    function requestData(selector) {
        var multicolumncombobox = $(selector).data("kendoMultiColumnComboBox"),
            filters = multicolumncombobox.dataSource.filter(),
            value = multicolumncombobox.input.val();

        if (!filter || !filter.filters.length) {
            value = "";
        }

        return { text: value };
    }

## See Also

* [Basic Usage of the MultiColumnComboBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/multicolumncombobox/index)
* [MultiColumnComboBoxBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/MultiColumnComboBoxBuilder)
* [MultiColumnComboBox Server-Side API](/api/multicolumncombobox)
