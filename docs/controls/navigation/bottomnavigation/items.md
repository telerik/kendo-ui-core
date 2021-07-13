---
title: Items
page_title: jQuery BottomNavigation Documentation | Items
description: "Get started with the jQuery BottomNavigation by Kendo UI and learn how to configure the items of the widget."
slug: items_bottomnavigation_widget
position: 2
---

# Items

The [`items`](/api/javascript/ui/bottomnavigation/configuration/items) configuration allows you to set specific attributes of the BottomNavigation items. You can set their text (optionally) and the icon. The configuration also allows you to add classes for the different items that are rendered when initializing the widget. You can also set the *selected* and *enabled* state for the items.

> **Note:** When the `items.url` configuration is set, the items will be rendered as `<a>` tags. Otherwise, they will be rendered as `<span>` tags.

The following example demonstrates the possible options for the *items* configuration of the BottomNavigation widget: 

```dojo
    <nav id="bottomNavigation"></nav>

    <script>
        $(document).ready(function () {
            var itemTemplate = '<span class="k-bottom-nav-item-icon k-icon k-i-calendar-date"></span>';
            $("#bottomNavigation").kendoBottomNavigation({
                items: [
                    { data: { view: "home" }, url: "#home", icon: "home", enabled:false, cssClass: "custom-css-class", text: "<strong>Home</strong>", encoded:false },
                    { data: { view: "calendar" }, url: "#calendar", template: itemTemplate, cssClass: "custom-css-class", text: "<emp>Calendar</emp>", encoded:false },
                    { data: { view: "profile" }, url: "#profile", icon: "user", cssClass: "custom-css-class", text: "Profile", selected: true }
                ]
            });
        })
    </script>
```

## See Also

* [Items demo of the BottomNavigation](https://demos.telerik.com/kendo-ui/bottomnavigation/items)
* [JavaScript API Reference of the BottomNavigation](/api/javascript/ui/bottomnavigation)