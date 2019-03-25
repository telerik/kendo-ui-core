---
title:  Binding to Remote Data
page_title: Binding to Remote Data | Kendo UI Menu HtmlHelper for ASP.NET Core
description: "Learn how to bind to remote data with Kendo UI Menu HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_menu_bindingremotedata_aspnetcore
position: 3
---

# Binding to Remote Data

Remote data binding is available as of the R2 2019 release.

This feature enables you to bind the Menu to a server end-point that returns the items collection for the Menu.

1. Implement an action method in your controller that returns the collection for the Menu.

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

1. Use the DataSource to configure the action url to the end-point. Setup the DataTextField to configure which field to be bound to the items' text. And if the children items are not in an items field, you should configure the Model with the corresponding field that holds the children collection.

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

* [JavaScript API Reference of the Menu](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu)
* [Menu HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/menu/overview)
* [Menu Official Demos](http://demos.telerik.com/aspnet-core/menu/index)