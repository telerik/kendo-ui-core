---
title: Server Binding
page_title: Server Binding | Telerik UI MultiSelect HtmlHelper for ASP.NET MVC
description: "Learn how to implement server binding with Telerik UI MultiSelect HtmlHelper for ASP.NET MVC."
slug: serverbinding_multiselect_aspnetmvc
position: 3
---

# Server Binding

During the server data-binding mode, the data is serialized to the client and no Ajax requests are made.

To configure the ComboBox for server binding to the Northwind **Products** table by using Linq to SQL:

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **Products** table as the model.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Products);
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Product>>" %>
    ```
    ```Razor
        @model IEnumerable<MvcApplication1.Models.Product>
    ```

1. Add a server bound MultiSelect.

    ```ASPX
        <%: Html.Kendo().MultiSelect()
            .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   // Pass the list of Products to the MultiSelect.
        %>
    ```
    ```Razor
        @(Html.Kendo().MultiSelect()
            .Name("productMultiSelect") // The name of the MultiSelect is mandatory. It specifies the "id" attribute of the MultiSelect.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the MultiSelect as a text.
            .DataValueField("ProductID") // Specify which property of the Product to be used by the MultiSelect as a value.
            .BindTo(Model)   // Pass the list of Products to the MultiSelect.
        )
    ```

## See Also

* [Basic Usage of the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect)
* [MultiSelectBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [MultiSelect Server-Side API](/api/multiselect)
