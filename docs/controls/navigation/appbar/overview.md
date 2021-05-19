---
title: Overview
page_title: jQuery AppBar Documentation | AppBar Overview
description: "Get started with the jQuery AppBar by Kendo UI and learn how to initialize the widget."
slug: overview_kendoui_appbar_widget
position: 1
CTAControlName: AppBar
---

# AppBar Overview

The AppBar widget is used mainly for navigation. At the same time, it is template-driven, which makes it very flexible - it can render whatever you throw at it. To take full advantage of its functionality, you can include various [Content Items]({% slug items_kendoui_appbar_widget %}) in the AppBar widget, for example:
* Titles
* Icons
* Actions (like redirect buttons)

Visit the [AppBar demo page](https://demos.telerik.com/kendo-ui/appbar/index) to see it in action.

{% if site.has_cta_panels == true %}
{% include cta-panel-overview.html %}
{% endif %}

## Initializing the AppBar

It is recommended to initialize the widget from a div HTML element.

The following example demonstrates how to initialize the AppBar from an existing `<div>` element.

```dojo
    <div id="appbar"></div>
    <script>
    $("#appbar").kendoAppBar({
        items: [
            {
                template: "<span><input /><span>"
            }
        ]
    });
    </script>
```

## Functionality and Features

* [Items]({% slug items_kendoui_appbar_widget %})
* [Position]({% slug position_kendoui_appbar_widget %})

## See Also

* [Overview of the AppBar (Demo)](https://demos.telerik.com/kendo-ui/appbar/index)
* [JavaScript API Reference of the AppBar](/api/javascript/ui/appbar)
