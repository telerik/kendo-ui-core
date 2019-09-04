---
title: Overview
page_title: TabStrip Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI TabStrip HtmlHelper for ASP.NET MVC."
slug: overview_tabstrip_aspnetmvc
position: 1
---

# TabStrip HtmlHelper Overview

The Telerik UI TabStrip HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI TabStrip widget.

The TabStrip displays a collection of tabs with associated content. It is composed of an unordered list of items which represent tabs, and a collection of `div` elements, which contain the content for each tab.

* [Demo page for the TabStrip](https://demos.telerik.com/aspnet-mvc/tabstrip)

## Basic Configuration

[This runnable example](https://demos.telerik.com/aspnet-mvc/tabstrip) demonstrates the basic configuration of the TabStrip HtmlHelper for ASP.NET MVC.

## Functionality and Features

* [Binding]({% slug tabstrip_databinding_aspnetmvc %})
* [Forms]({% slug forms_tabstrip_aspnetmvc %})
* [Security trimming]({% slug securitytrimming_tabstrip_aspnetmvc %})

## Events

You can subscribe to all TabStrip [events](/api/tabstrip). For a complete example on basic TabStrip events, refer to the [demo on using the events of the TabStrip](https://demos.telerik.com/aspnet-mvc/tabstrip/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().TabStrip()
            .Name("tabstrip")
            .Events(e => e
                .Select("tabstrip_select")
            )
    %>
    <script>
        function tabstrip_select() {
            // Handle the select event.
        }
    </script>
```
```Razor
    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Events(e => e
                .Select("tabstrip_select")
        )
    )
    <script>
        function tabstrip_select() {
            // Handle the select event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().TabStrip()
        .Name("tabstrip")
        .Events(e => e
            .Select(@<text>
                function() {
                    // Handle the Select event inline.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing Kendo UI TabStrip instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TabStrip client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/tabstrip#methods) to control its behavior.

  // Place the following after the TabStrip for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the TabStrip is used to get its client-side instance.
            var tabstrip = $("#tabstrip").data("kendoTabStrip");
        });
    </script>

## See Also

* [Basic Usage of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip)
* [Using the API of the TabStrip HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/tabstrip/api)
* [TabStripBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TabStripBuilder)
* [TabStrip Server-Side API](/api/tabstrip)
