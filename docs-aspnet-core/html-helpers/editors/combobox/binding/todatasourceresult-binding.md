---
title: Custom Data Binding
page_title: Custom Data Binding | Telerik UI ComboBox HtmlHelper for ASP.NET Core
description: "Learn how to implement custom ToDataSourceResult data binding in the Telerik UI ComboBox HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_combobox_todatasourceresultbinding_aspnetcore
position: 4
---

# Custom Data Binding

You can configure the Telerik UI ComboBox for data binding to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

For a runnable example, refer to the [demo on customizing the data source of the ComboBox](https://demos.telerik.com/aspnet-core/combobox/custom-datasource).

1. Create an action method which renders the view.

        public IActionResult Index()
        {
            return View();
        }

1. Create a new action method and pass the **Products** table as JSON result.

        public JsonResult GetProducts([DataSourceRequest] DataSourceRequest request)
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return Json(northwind.Products.ToDataSourceResult(request));
        }

1. Add an Ajax-bound ComboBox.

        @(Html.Kendo().ComboBox()
            .Name("productComboBox") // The name of the ComboBox is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the ComboBox as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the ComboBox as a value.
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

## See Also

* [Customizing the Data Source of the ComboBox HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/combobox/custom-datasource)
* [API Reference of the ComboBox HtmlHelper for ASP.NET Core](/api/combobox)
