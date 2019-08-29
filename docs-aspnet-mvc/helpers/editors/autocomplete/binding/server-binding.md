---
title: Server Binding
page_title: Server Binding | Telerik UI AutoComplete HtmlHelper for ASP.NET MVC
description: "Learn how to implement server binding with Telerik UI AutoComplete HtmlHelper for ASP.NET MVC."
slug: serverbinding_autocomplete_aspnetmvc
position: 3
---

# Server Binding

During the server data-binding mode, the data is serialized to the client and no Ajax requests are made.

To configure the AutoComplete for server binding to the Northwind **Products** table by using Linq to SQL:

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

1. Add a server-bound AutoComplete.

    ```ASPX
        <%: Html.Kendo().AutoComplete()
            .Name("productAutoComplete") // The name of the AutoComplete is mandatory. It specifies the "id" attribute of the AutoComplete.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the AutoComplete.
            .BindTo(Model)   // Pass the list of Products to the AutoComplete.
            .Filter("contains") // Define the type of the filter, which AutoComplete will use.
        %>
    ```
    ```Razor
        @(Html.Kendo().AutoComplete()
            .Name("productAutoComplete") // The name of the AutoComplete is mandatory. It specifies the "id" attribute of the AutoComplete.
            .DataTextField("ProductName") // Specify which property of the Product to be used by the AutoComplete.
            .BindTo(Model) // Pass the list of Products to the AutoComplete.
            .Filter("contains") // Define the type of the filter, which AutoComplete will use.
        )
    ```

## See Also

* [Server-Side API](/api/autocomplete)
