---
title: Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with Telerik UI TabStrip HtmlHelper for ASP.NET MVC."
previous_url: /helpers/navigation/tabstrip/binding/model-binding
slug: modelbinding_tabstrip_aspnetmvc
position: 3
---

# Model Binding

The TabStrip enables you to bind it to a hierarchical model and populate its tabs dynamically based on a server-side model collection.

To configure the TabStrip for local data binding using a model collection, follow the next steps:

1. Create a new Action method and pass the **Categories** table as the model.

    ```C#
    public ActionResult Index()
    {
        NorthwindDataContext northwind = new NorthwindDataContext();

        return View(northwind.Categories);
    }
    ```

1. Add the model to the View.

    ```Razor
    @model IEnumerable<MvcApplication1.Models.Category>
    ```

1. Define the TabStrip and bind it to the model data.

    ```Razor Index.cshtml
        @(Html.Kendo().TabStrip()
            .Name("tabstrip") // The name of the TabStrip is mandatory. It specifies the "id" attribute of the TabStrip HTML element.
            .BindTo(Model,(item,category)  =>
            {
                item.Text = category.CategoryName;
                item.ContentUrl = "/Home/TabContent?tabId=" + category.CategoryID;
            })
        )
    ```
    ```C# HomeController.cs
    public PartialViewResult TabContent(int tabId) 
    {
        NorthwindDataContext northwind = new NorthwindDataContext();
        var category = northwind.Categories.Where(x => x.CategoryID == tabId).FirstOrDefault();
        return PartialView("_TabContentPartial", category);
    }
    ```
    ```Razor _TabContentPartial.cshtml
    @model MvcApplication1.Models.Category

    @{
        Layout = null;
    }

    <!-- Tab content-->
    <h3>@Model.CategoryName</h3>
    <p>@Model.Description</p>
    ```

## See Also

* [Basic Usage of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/kendo.mvc.ui.fluent/tabstripbuilder)
* [TabStrip Server-Side API](/api/tabstrip)
