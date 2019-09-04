---
title: Binding to Remote Data
page_title: Binding to Remote Data | Telerik UI Menu HtmlHelper for ASP.NET MVC
description: "Learn how to bind to remote data with Telerik UI Menu HtmlHelper for ASP.NET MVC."
slug: remotebinding_menu_aspnetmvc
position: 5
---

# Binding to Remote Data

Remote data binding enables you to bind the Menu to a server end-point that returns the items collection for the Menu.

The Menu supports remote data binding as of the R2 2019 release.

    ```
    public JsonResult GetCategories()
    {
        SampleEntities northwind = new SampleEntities();

        var result = northwind.Categories.Select((category) =>
            new
            {
                Name = category.CategoryName,
                Products = northwind.Products
                    .Where((product) => product.CategoryID == category.CategoryID)
                    .Select((product)=> new { Name = product.ProductName })
            }
        );

        return Json(result, JsonRequestBehavior.AllowGet);
    }
    ```

    ```ASPX
        <%: Html.Kendo().Menu()
            .Name("menu")
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Model(model => model.Children("Products"))
                .Read(read => read
                    .Action("GetCategories", "Menu")
                )
            )
        %>
    ```
    ```Razor
        @(Html.Kendo().Menu()
            .Name("menu")
            .DataTextField("Name")
            .DataSource(dataSource => dataSource
                .Model(model => model.Children("Products"))
                .Read(read => read
                    .Action("GetCategories", "Menu")
                )
            )
        )
    ```

## See Also

* [Remote Data Binding by the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu/remote-data-binding)
* [MenuItemBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](/api/menu)
