---
title: Overview
page_title: jQuery BottomNavigation Documentation | BottomNavigation Overview
description: "Get started with the jQuery BottomNavigation by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_bottomnavigation_widget
position: 1
---

# BottomNavigation Overview

The Kendo UI BottomNavigation bar allows movement between primary destinations in an application. The main purpose of the component is to offer a navigation element whose options are represented by an icon and text.

Visit the [Demo page for the BottomNavigation](https://demos.telerik.com/kendo-ui/bottomnavigation/index) to see it in action.

## Initializing the BottomNavigation

To initialize the BottomNavigation, use the `<nav>` tag.

The following example demonstrates how to initialize the BottomNavigation from an existing `<nav>` element:

```dojo
    <nav id="bottomnavigation"></nav>
    
    <script>
        $("#bottomnavigation").kendoBottomNavigation({
            items: [
                { text: "Home", icon: "home" },
                { text: "Info", icon: "info" },
                { text: "Contact", icon: "email" }
            ]
        });
    </script>
```

## Functionality and Features

* [Items]({% slug items_bottomnavigation_widget %}) - the configuration allows you to set various attributes like icons and text.
* [Appearance]({% slug appearance_bottomnavigation_widget %}) - the configuration allows you to modify the appearance of the component.
* [Templates]({% slug templates_bottomnavigation_widget %}) - the configuration allows you to customize how the items will be rendered.
* [Accessibility]({% slug accessibility_kendoui_bottomnavigation_widget %}) - the BottomNavigation supports various accessibility standards.

## See Also

* [Overview of the BottomNavigation (Demo)](https://demos.telerik.com/kendo-ui/bottomnavigation/index)
* [JavaScript API Reference of the BottomNavigation](/api/javascript/ui/bottomnavigation)
