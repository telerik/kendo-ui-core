---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Tooltip HtmlHelper for {{ site.framework }}."
previous_url: /helpers/html-helpers/tooltip, /helpers/layout/tooltip/overview
slug: htmlhelpers_tooltip_aspnetcore
position: 1
---

# Tooltip HtmlHelper Overview

The Telerik UI Tooltip HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI Tooltip widget.

The Tooltip displays a popup hint for a specific HTML element. Its content can be defined either as static text or loaded dynamically with AJAX.

* [Demo page for the Tooltip](https://demos.telerik.com/{{ site.platform }}/tooltip/index)

## Initializing the Tooltip

The following example demonstrates how to define the Tooltip by using the Tooltip HtmlHelper.

```
   <span id="tooltip" class="k-button wider">Hover me!</span>

    @(Html.Kendo().Tooltip()
        .For("#tooltip")
        .Position(TooltipPosition.Top)
        .Content("Hello!")
    )
```

## Basic Configuration

The following example demonstrates the basic configuration of the Tooltip HtmlHelper.

```
    <span id="tooltip" class="k-button wider">
      <а href="#">Hover me</a>
    </span>

    @(Html.Kendo().Tooltip()
        .For("#tooltip")
        .Position(TooltipPosition.Top)
        .Content("Hello!")
        .Width(120)
        .AutoHide(false)
        .Filter("a")
        .Events(events => events.Hide("onHide").Show("onShow"))
    )
```

## Functionality and Features

* [Content Template]({% slug htmlhelpers_tooltip_aspnetcore_content %})
* [Loading content with AJAX]({% slug htmlhelpers_tooltip_aspnetcore_content %})

## Events

For a complete example on basic Tooltip events, refer to the [demo on using the events of the Tooltip](https://demos.telerik.com/{{ site.platform }}/tooltip/events).

## Referencing Existing Instances

To reference an existing Tooltip instance, use the [`jQuery.data()`](https://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Tooltip client-side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip#methods) to control its behavior.

```
    // Place the following after your Telerik UI Tooltip for {{ site.framework }} declaration.
    <script>
        $(document).ready(function() {
            // The For() configuration option of the Tooltip is used to get its client-side instance.
            var tooltip = $("#tooltip").data("kendoTooltip");
        });
    </script>
```

## See Also

* [Basic Usage of the Tooltip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tooltip)
* [Using the API of the Tooltip HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/tooltip/api)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
* [Server-Side API](/api/tooltip)
