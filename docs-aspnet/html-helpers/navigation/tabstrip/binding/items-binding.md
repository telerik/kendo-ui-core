---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI TabStrip HtmlHelper for ASP.NET MVC by using the items builder."
previous_url: /helpers/navigation/tabstrip/binding/items-binding
slug: itemsbinding_tabstrip_aspnetmvc
position: 2
---

# Items Binding

The TabStrip enables you to manually define the properties of each item.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a TabStrip.

    ```Razor
        @(Html.Kendo().TabStrip()
            .Name("tabstrip") // The name of the TabStrip is mandatory. It specifies the "id" attribute of the TabStrip.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add item with text "Item1".
                items.Add().Text("Item 2"); // Add item with text "Item2".
            })
        )
    ```

## See Also

* [Basic Usage of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [TabStripBuilder Server-Side API](https://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TabStripBuilder)
* [TabStrip Server-Side API](/api/tabstrip)
