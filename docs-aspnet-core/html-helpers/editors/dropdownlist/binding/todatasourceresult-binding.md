---
title: Custom Data Binding
page_title: Custom Data Binding | Telerik UI DropDownList HtmlHelper for ASP.NET Core
description: "Learn how to implement custom ToDataSourceResult data binding in the Telerik UI DropDownList HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_dropdownlist_todatasourceresultbinding_aspnetcore
position: 3
---

# Custom Data Binding

You can configure the Telerik UI DropDownList for data binding to use a custom DataSource and thus bind to a `ToDataSourceResult` instance.

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

        @(Html.Kendo().DropDownList()
            .Name("productDropDownList") // The name of the DropDownList is mandatory. It specifies the "id" attribute of the widget.
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

## See Also

* [Customizing the Data Source of the DropDownList HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dropdownlist/custom-datasource)
* [Server-Side API](/api/dropdownlist)
