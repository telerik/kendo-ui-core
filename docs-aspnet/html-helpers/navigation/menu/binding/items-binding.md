---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI Menu component for {{ site.framework }} by using the items builder."
slug: itemsbinding_menu_aspnetmvc
position: 2
---

# Items Binding

The Menu enables you to declare its items and the properties of each item within the helper declaration.

The following example demonstrates how to configure the Menu items using the `Items()` configuration.

```HtmlHelper
@(Html.Kendo().Menu()
    .Name("menu") // The name of the Menu is mandatory. It specifies the "id" attribute of Menu's HTML element.
    .Items(items =>
    {
        items.Add().Text("Home").Action("Index", "Home");
        items.Add().Text("About").Action("About", "Home");
    })
)
```
{% if site.core %}
```TagHelper
<kendo-menu name="menu">
    <items>
        <menu-item text="Home" asp-action="Index" asp-controller="Home"></menu-item>
        <menu-item text="About" asp-action="About" asp-controller="Home"></menu-item>
    </items>
</kendo-menu>
```
{% endif%}

## See Also

* [Basic Usage of the Menu for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/menu)
* [Server-Side API of the Menu HtmlHelper](/api/menu)
{% if site.core %}
* [Server-Side API of the Menu TagHelper](/api/taghelpers/menu)
{% endif %}
