---
title: Model Binding
page_title: Model Binding
description: "Learn how to implement model binding with Telerik UI TabStrip HtmlHelper for ASP.NET MVC."
previous_url: /helpers/navigation/tabstrip/binding/model-binding
slug: modelbinding_tabstrip_aspnetmvc
position: 4
---

# Model Binding

The Telerik UI TabStrip enables you to bind it to a hierarchical model.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a new action method and pass the **Categories** table as the model.

        public ActionResult Index()
        {
            NorthwindDataContext northwind = new NorthwindDataContext();

            return View(northwind.Categories);
        }

1. Make your view strongly typed.

    ```Razor
        @model IEnumerable<MvcApplication1.Models.Category>
    ```

1. Add a TabStrip.

    ```Razor
        @(Html.Kendo().TabStrip()
            .Name("tabstrip") // The name of the TabStrip is mandatory. It specifies the "id" attribute of the TabStrip.
            .BindTo(Model,(item,category)  =>
            {
                item.Text = category.CategoryName;
            })
        )
    ```

## See Also

* [Basic Usage of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TabStripBuilder)
* [TabStrip Server-Side API](/api/tabstrip)
