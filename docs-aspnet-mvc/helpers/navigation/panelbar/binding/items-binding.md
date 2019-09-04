---
title: Items Binding
page_title: Items Binding | Telerik UI PanelBar HtmlHelper for ASP.NET MVC
description: "Manually define the properties of each item in the Telerik UI PanelBar HtmlHelper for ASP.NET MVC by using the items builder."
slug: itemsbinding_panelbarhelper_aspnetmvc
position: 2
---

# Items Binding

The PanelBar enables you to manually define the properties of each item.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a PanelBar.

    ```ASPX
        <%: Html.Kendo().PanelBar()
            .Name("panelbar") // The name of the PanelBar is mandatory. It specifies the "id" attribute of the PanelBar.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add item with text "Item1".
                items.Add().Text("Item 2"); // Add item with text "Item2".
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().PanelBar()
            .Name("panelbar") // The name of the panelbar is mandatory. It specifies the "id" attribute of the PanelBar.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add item with text "Item1".
                items.Add().Text("Item 2"); // Add item with text "Item2".
            })
        )
    ```

## See Also

* [Basic Usage of the PanelBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/panelbar)
* [PanelBarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)
