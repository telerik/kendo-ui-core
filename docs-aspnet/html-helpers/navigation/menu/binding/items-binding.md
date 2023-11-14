---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI Menu component for {{ site.framework }} by using the items builder."
slug: itemsbinding_menu_aspnetmvc
position: 2
---

# Items Binding

The Menu enables you to manually define the properties of each item.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for {{ site.framework }}]({% slug overview_aspnetmvc6_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a simple Menu.

    ```HtmlHelper
        @(Html.Kendo().Menu()
            .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of the Menu.
            .Items(items =>
            {
                items.Add().Text("Item 1"); // Add an item with the text "Item1".
                items.Add().Text("Item 2"); // Add an item with the text "Item2".
            }
        )
    ```
    ```TagHelper
        <kendo-menu name="menu">
        <items>
            <menu-item text="Home" asp-action="Index" asp-controller="Home"></menu-item>
            <menu-item text="Second Page" asp-action="SecondIndex" asp-controller="Home"></menu-item>
        </items>
        </kendo-menu>
    ```

## See Also

* [Basic Usage of the Menu HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu)
* [MenuItemBuilder Server-Side API](/api/kendo.mvc.ui.fluent/menuitembuilder)
* [MenuBuilder Server-Side API](/api/kendo.mvc.ui.fluent/menubuilder)
* [Menu Server-Side API](/api/menu)
