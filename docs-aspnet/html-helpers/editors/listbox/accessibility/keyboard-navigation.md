---
title: Keyboard Navigation
page_title: Keyboard Navigation
description: "Configure the Telerik UI ListBox for {{ site.framework }} to enable keyboard navigation."
slug: htmlhelpers_listbox_navigation_aspnetcore
position: 2
---

# Keyboard Navigation

By default, the keyboard navigation of the ListBox HtmlHelper is disabled.

The ListBox supports its keyboard navigation functionality through the `Navigatable` option. When set to `true`, you can initially select an item and then move within the ListBox by using the `Arrow` keys. The navigation occurs at item level regardless of what the selectable mode is. To select the current item, press `Space`.

The following example demonstrates how to enable the key navigation in the ListBox.

```
    @(Html.Kendo().ListBox()
        .Name("listbox")
        .ConnectWith("listbox2")
        .Selectable(ListBoxSelectable.Multiple)
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .DataSource(source => source
            .Read(read => read.Action("GetProducts", "ListBox"))
        )
        .Navigatable(true) // Enable the keyboard navigation
    )

    @(Html.Kendo().ListBox()
        .Name("listbox2")
        .BindTo(new List<ProductViewModel>())
        .DataValueField("ProductID")
        .DataTextField("ProductName")
        .Selectable(ListBoxSelectable.Single)
        .Navigatable(true) // Enable the keyboard navigation
    )
```

## See Also

* [Keyboard Navigation by the ListBox HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/listbox/keyboard-navigation)
* [Accessibility in {{ site.product }}]({% slug compliance_accessibility %})
