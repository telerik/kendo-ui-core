---
title: Items
page_title: jQuery Breadcrumb Documentation | Items
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn how to configure the items of the widget."
slug: items_breadcrumb_widget
position: 2
---

# Items

The [`items`](/api/javascript/ui/breadcrumb/configuration/items) configuration allows you to set specific attributes to the Breadcrumb items. You can set the text and the icon of an element and determine whether they would be visible or not. The configuration also allows you to add classes for the different elements which are rendered when initializing the widget. 

The default values of the [`showIcon`](/api/javascript/ui/breadcrumb/configuration/items.showicon) and [`showText`](/api/javascript/ui/breadcrumb/configuration/items.showtext) configurations are different for the two types of items. The `showIcon`'s default value is *true* for `rootItem` and *false* for `item`. The `showText` configuration is by default *false* for `rootitem` and *true* for `item`.

The following example demonstrates how the attributes of the Breadcrumb items can be set through the *items* configuration.

```dojo
    <nav id="breadcrumb"></nav>

    <script>
        $("#breadcrumb").kendoBreadcrumb({
            items: [
                { type: "rootitem", href: "mysite.com", text: "Home", icon: "home", showIcon: true, showText: true, itemClass: "root", iconClass: "root", linkClass: "root" },
                { type: "item", href: "/cloud", text: "Cloud", icon: "cloud", showText: false, showIcon: true, itemClass: "cloud", iconClass: "cloud", linkClass: "cloud" },
                { type: "item", href: "/login", text: "Login", icon: "login", showText: true, showIcon: false, itemClass: "login", iconClass: "login", linkClass: "login" }
            ]
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)
