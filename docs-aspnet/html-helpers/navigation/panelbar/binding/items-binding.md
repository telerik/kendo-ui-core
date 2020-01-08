---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI PanelBar HtmlHelper for {{ site.framework }} by using the items builder."
slug: itemsbinding_panelbarhelper_aspnetmvc
position: 2
---

# Items Binding

The PanelBar enables you to manually define the properties of each item.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for {{ site.framework }}]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a PanelBar.

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

* [Basic Usage of the PanelBar HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/panelbar)
* [PanelBarBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/PanelBarBuilder)
* [PanelBar Server-Side API](/api/panelbar)
