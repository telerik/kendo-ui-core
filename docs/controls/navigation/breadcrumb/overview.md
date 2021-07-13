---
title: Overview
page_title: jQuery Breadcrumb Documentation | Breadcrumb Overview
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_breadcrumb_widget
position: 1
---

# Breadcrumb Overview

The Breadcrumb is an intuitive UI component that allows navigation within a folder structure or web page. It provides an easy way to navigate backwards by one or multiple steps.

* [Demo page for the Breadcrumb](https://demos.telerik.com/kendo-ui/breadcrumb/index) 

## Initializing the Breadcrumb

To initialize the Breadcrumb, use the `<nav>` tag.

The following example demonstrates how to initialize the Breadcrumb from an existing `<nav>` element.

```dojo
    <nav id="breadcrumb"></nav>
    
    <script>
        $("#breadcrumb").kendoBreadcrumb({
            items: [
                {
                    type: "rootitem",
                    href: "https://demos.telerik.com/kendo-ui/",
                    text: "All Components",
                    showText: true,
                    icon: "home",
                    showIcon: true
                },
                {
                    type: "item",
                    href: "/breadcrumb",
                    text: "Breadcrumb",
                    showText: true
                },
                {
                    type: "item",
                    href: "/index",
                    text: "Basic Usage",
                    showText: true
                }
            ]
        });
    </script>
```

## Functionality and Features

* [Icons]({% slug icons_breadcrumb_widget %})
* [Items]({% slug items_breadcrumb_widget %})
* [Editing]({% slug editing_breadcrumb_widget %})
* [Navigation]({% slug navigation_breadcrumb_widget %})
* [Overflowing]({% slug overflowing_breadcrumb_widget %})
* [Accessibility]({% slug accessibility_kendoui_breadcrumb_widget %})

## See Also

* [Basic Usage of the Breadcrumb (Demo)](https://demos.telerik.com/kendo-ui/breadcrumb/index)
* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)
