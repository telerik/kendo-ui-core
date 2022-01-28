---
title: Icons
page_title: jQuery Breadcrumb Documentation | Icons
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn how to configure the icons of the items and the delimiters of the widget."
slug: icons_breadcrumb_widget
position: 3
---

# Icons

The Breadcrumb allows to configure the icons of the items and the delimiters.

## Root Icon

The root icon is the first icon and is rendered as a `home` icon. It can be changed through the [`items.icon`](/api/javascript/ui/breadcrumb/configuration/items) configuration. It is also clickable and it will reset the value of the component.

## Item Icon

The icons rendered for each element after the root icon. It is also clickable and can be configured through the [`items.icon`](/api/javascript/ui/breadcrumb/configuration/items).

## Delimiter Icon

The icons that separate the items of the Breadcrumb. 

### Example

The following example demonstrates how to configure different icons.

```dojo
    <nav id="breadcrumb"></nav>

    <script>
        $("#breadcrumb").kendoBreadcrumb({
            items: [
                { type: "rootitem", href: "mysite.com", text: "Telerik UI", icon: "globe", showIcon: true, showText: true },
                { type: "item", href: "/navigation", text: "Navigation", icon: "cloud", showText: true, showIcon: false },
                { type: "item", href: "/breadcrumb", text: "Breadcrumb", showText: true },
            ],
            delimiterIcon: "k-i-line"
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)
* [Icons of the Breadcrumb (Demo)](https://demos.telerik.com/kendo-ui/breadcrumb/icons)