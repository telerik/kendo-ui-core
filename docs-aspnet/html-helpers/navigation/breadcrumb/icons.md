---
title: Icons
page_title: Icons
description: "Learn how to configure the icons of the items and the delimiters of the widget."
slug: htmlhelpers_breadcrumb_aspnetcore_icons
position: 3
---

# Icons

The Breadcrumb allows to configure the icons of the items and the delimiters.

## Root Icon

The root icon is the first icon and is rendered as a `home` icon. It can be changed through the `items.icon` configuration. It is also clickable and it will reset the value of the component.

## Item Icon

The icons rendered for each element after the root icon. It is also clickable and can be configured through the `items.icon`.

## Delimiter Icon

The icons that separate the items of the Breadcrumb. 

### Example

The following example demonstrates how to configure different icons.

```Razor
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .Items(items =>
        {
            items.Add()
                .Type(BreadcrumbItemType.RootItem)
                .Href("https://demos.telerik.com/kendo-ui/")
                .Text("All Components")
                .ShowText(true)
                .Icon("globe");
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/breadcrumb")
                .Text("Breadcrumb")
                .ShowText(true)
                .Icon("gear")
                .ShowIcon(true);
            items.Add()
                .Type(BreadcrumbItemType.Item)
                .Href("/icons")
                .Text("Icons")
                .ShowText(true)
                .ItemClass("item")
                .IconClass("item")
                .LinkClass("item");
        })
        .DelimiterIcon("line")
    )
```

## See Also

* [Icons of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/icons)
