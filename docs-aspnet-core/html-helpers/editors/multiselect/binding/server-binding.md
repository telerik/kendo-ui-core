---
title:  Server Binding
page_title: Server Binding | Telerik UI MultiSelect HtmlHelper for ASP.NET Core
description: "Learn how to implement server binding in the Telerik UI MultiSelect HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_multiselect_serverbinding_aspnetcore
position: 3
---

# Server Binding

You can configure the Telerik UI MultiSelect for server binding to the Northwind **Products** table which uses Linq to SQL.

1. Create a new action method and pass the **Products** table as the model.

        public IActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

        @model IEnumerable<MvcApplication1.Models.Product>


1. Add a server bound MultiSelect.

        @(Html.Kendo().MultiSelect()
            .Name("productDropDownList") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the widget.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   // Pass the list of Products to the MultiSelect.
        )

## See Also

* [Server Filtering by the MultiSelect HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiselect/serverfiltering)
* [Client Filtering by the MultiSelect HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/multiselect/clientfiltering)
* [Server-Side API](/api/multiselect)
