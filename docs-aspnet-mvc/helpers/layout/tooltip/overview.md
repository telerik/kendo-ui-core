---
title: Overview
page_title: Tooltip Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Tooltip HtmlHelper for ASP.NET MVC."
slug: overview_tooltiphelper_aspnetmvc
position: 1
---

# Tooltip HtmlHelper Overview

The Telerik UI Tooltip HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Tooltip widget.

The Tooltip displays a popup hint for a specified HTML element. Its content can be defined either as static text or loaded dynamically with AJAX.

* [Demo page for the Tooltip](https://demos.telerik.com/aspnet-mvc/tooltip)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Tooltip.

    ```ASPX
        <%: Html.Kendo().Tooltip()
            .For("#container") // The for option of the Tooltip is mandatory.
                            // It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
            .Filter("a[title]") // The jQuery selector which narrows the elements within the container for which the Tooltip will be shown.
            .Content("custom text")
        %>
    ```
    ```Razor
        @(Html.Kendo().Tooltip()
            .For("#container") // The for option of the Tooltip is mandatory.
                            // It is a jQuery selector which specifies the element or the container for the elements for which the Tooltip will be shown.
            .Filter("a[title]") // The jQuery selector which narrows the elements within the container for which the Tooltip will be shown.
            .Content("custom text")
        )
    ```

## Functionality and Features

The Tooltip provides options for [configuring its content]({% slug content_tooltiphelper_aspnetmvc %}).

## Events

You can subscribe to all Tooltip [events](/api/tooltip). For a complete example on basic Tooltip events, refer to the [demo on using the events of the Tooltip](https://demos.telerik.com/aspnet-mvc/tooltip/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Tooltip()
        .For("#container")
        .Events(e => e
            .Show("tooltip_show")
            .Hide("tooltip_hide")
        )
    %>
    <script>
        function tooltip_show() {
            // Handle the show event.
        }

        function tooltip_hide() {
            // Handle the hide event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Tooltip()
        .For("#container")
        .Events(e => e
            .Show("tooltip_show")
            .Hide("tooltip_hide")
        )
    )
    <script>
        function tooltip_show() {
            // Handle the show event.
        }

        function tooltip_hide() {
            // Handle the hide event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Tooltip()
        .For("#container")
        .Events(e => e
            .Show(@<text>
            function() {
                // Handle the show event inline.
            }
            </text>)
            .Hide(@<text>
            function() {
                // Handle the hide event inline.
            }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Tooltip instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Tooltip client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip#methods) to control its behavior.

    // Place the following after the Tooltip for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The For() of the Tooltip is used to get its client-side instance.
            var tooltip = $("#container").data("kendoTooltip");
        });
    </script>

## See Also

* [Basic Usage of the Tooltip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tooltip)
* [Using the API of the Tooltip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tooltip/api)
* [TooltipBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TooltipBuilder)
* [Tooltip Server-Side API](/api/tooltip)
