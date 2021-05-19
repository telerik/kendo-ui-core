---
title: Editing
page_title: jQuery Breadcrumb Documentation | Editing
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn how to enable editing and alter the Breadcrumb value."
slug: editing_breadcrumb_widget
position: 4
---

# Editing

You can edit the path set through the Breadcrumb widget if the [`editable`](/api/javascript/ui/breadcrumb/configuration/editable) configuration is enabled. When you click in an empty area of the component or on the current page, the Breadcrumb will enter into editing mode. That will also happen when you `enter` press if the Breadcrumb is focused.

Editing mode shows an input field containing the current value of the widget. Users are allowed to type a new path.

The below example demonstrates how to enable editing of the Breadcrumb.

```dojo
    <nav id="breadcrumb"></nav>

    <script>
        $("#breadcrumb").kendoBreadcrumb({
            items: [
                { type: "rootitem", href: "mysite.com", text: "Telerik UI", icon: "globe", showIcon: true, showText: true },
                { type: "item", href: "/navigation", text: "Navigation", icon: "cloud", showText: true, showIcon: false },
                { type: "item", href: "/breadcrumb", text: "Breadcrumb", showText: true },
            ],
            editable: true
        });
    </script>
```

## See Also

* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)