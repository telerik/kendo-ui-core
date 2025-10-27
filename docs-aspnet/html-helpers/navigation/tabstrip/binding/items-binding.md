---
title: Items Binding
page_title: Items Binding
description: "Manually define the properties of each item in the Telerik UI TabStrip HtmlHelper for ASP.NET MVC by using the items builder."
previous_url: /helpers/navigation/tabstrip/binding/items-binding
slug: itemsbinding_tabstrip_aspnetmvc
position: 2
---

# Items Binding

The TabStrip allows you to declare its items and the properties of each item within the helper declaration.

The following example demonstrates how to configure the TabStrip items using the `Items()` configuration.

```HtmlHelper
@(Html.Kendo().TabStrip()
    .Name("tabstrip") // The name of the TabStrip is mandatory. It specifies the "id" attribute of the TabStrip HTML element.
    .Items(items =>
    {
        items.Add().Text("Item 1")
        .Selected(true)
        .Icon("gear")
        .Content(@<text>
                <p>Item 1 content.</p>
            </text>);
        items.Add().Text("Item 2")
        .Icon("user-outline")
        .Content(@<text>
                <p>Item 2 content.</p>
            </text>);
    })
)
```

## See Also

* [Basic Usage of the TabStrip for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [Server-Side API of the TabStrip](/api/tabstrip)
