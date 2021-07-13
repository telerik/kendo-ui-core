---
title: Navigation
page_title: jQuery Breadcrumb Documentation | Navigation
description: "Get started with the jQuery Breadcrumb by Kendo UI and learn how to use the Navigation configuration of the widget."
slug: navigation_breadcrumb_widget
position: 5
---

# Navigation 

The [`navigational`](/api/javascript/ui/breadcrumb/configuration/navigational) configuration determines whether automatic navigation will be enabled. The default value is false. When set to true, the url will be added to the `href` attribute of the Breadcrumb items.

The below example demonstrates the automatic navigation:

```dojo
    <nav id="breadcrumb" style="width:300px"></nav>

    <script>
        $("#breadcrumb").kendoBreadcrumb({
            navigational: true,
            bindToLocation: true
        });
    </script>
```

The [`bindToLocation`](/api/javascript/ui/breadcrumb/configuration/bindtolocation) configuration sets the value ot the widget to the current url ( the location object). In addition, that url will be added to the `href` attribute of the Breadcrumb items through the `navigational` configuration.

When the configuration is disabled, you need to implement the navigation programmatically.

## See Also

* [Navigation of the Breadcrumb (Demo)](https://demos.telerik.com/kendo-ui/breadcrumb/navigation)
* [JavaScript API Reference of the Breadcrumb](/api/javascript/ui/breadcrumb)
