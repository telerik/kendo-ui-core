---
title: Navigation
page_title: Navigation
description: "Learn how to use the Navigation configuration of the widget."
slug: htmlhelpers_breadcrumb_aspnetcore_navigation
position: 5
---

# Navigation 

The `Navigational`configuration determines whether automatic navigation will be enabled. The default value is false. When set to true, the url will be added to the `href` attribute of the Breadcrumb items.

The below example demonstrates the automatic navigation:

```Razor
    @(Html.Kendo().Breadcrumb()
        .Name("breadcrumb")
        .BindToLocation(true)
        .Navigational(true)
    )
```

The `BindToLocation` configuration sets the value ot the widget to the current url (the location object). In addition, that url will be added to the `href` attribute of the Breadcrumb items through the `Navigational` configuration.

When the configuration is disabled, you need to implement the navigation programmatically.

## See Also

* [Navigation of the Breadcrumb HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/breadcrumb/navigation)

