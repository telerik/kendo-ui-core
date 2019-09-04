---
title: Model Binding
page_title: Model Binding | Telerik UI Menu HtmlHelper for ASP.NET MVC
description: "Learn how to implement model binding with Telerik UI Menu HtmlHelper for ASP.NET MVC."
slug: modelbinding_menu_aspnetmvc
position: 4
---

# Model Binding

The Telerik UI Menu enables you to bind it to a hierarchical model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method and pass the **Categories** table as the model. The **Categories** table has to be associated to the **Products** table.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Categories);
        }

1. Make your view strongly typed.

    ```ASPX
        <%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master"
            Inherits="System.Web.Mvc.ViewPage<IEnumerable<MvcApplication1.Models.Category>>" %>
    ```
    ```Razor
        @model IEnumerable<MvcApplication1.Models.Category>
    ```

1. Add a Menu.

    ```ASPX
        <%: Html.Kendo().Menu()
            .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the Menu.
            .BindTo(Model, mappings =>
            {
                mappings.For<category>(binding => binding // Define the first level of the Menu.
                    .ItemDataBound((item, category) => // Define the mapping between the Menu item properties and the model properties.
                    {
                        item.Text = category.CategoryName;
                    })
                    .Children(category => category.Products)); // Define which property of the model contains the children.
                mappings.For<product>(binding => binding
                    .ItemDataBound((item, product) =>
                    {
                        item.Text = product.ProductName;
                    }));
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().Menu()
            .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the Menu.
            .BindTo(Model, mappings =>
            {
                mappings.For<category>(binding => binding // Define the first level of the Menu.
                    .ItemDataBound((item, category) => // Define the mapping between the Menu item properties and the model properties.
                        {
                        item.Text = category.CategoryName;
                        })
                    .Children(category => category.Products)); // Define which property of the model contains the children.
                mappings.For<product>(binding => binding
                    .ItemDataBound((item, product) =>
                    {
                        item.Text = product.ProductName;
                    }));
            })
        )
    ```

## See Also

* [Model Binding by the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu/modelbinding)
* [MenuItemBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](/api/menu)
