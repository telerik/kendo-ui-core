---
title: Overview
page_title: MultiSelect Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI MultiSelect HtmlHelper for ASP.NET MVC."
slug: overview_multiselecthelper_aspnetmvc
position: 1
---

# MultiSelect HtmlHelper Overview

The Telerik UI MultiSelect HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI MultiSelect widget.

The MultiSelect displays a list of options and allows multiple selections from this list. The widget represents a richer version of the `<select>` element and provides support for local and remote data binding, item and tag templates, and configurable options for controlling the list behavior.

* [Demo page for the MultiSelect](https://demos.telerik.com/aspnet-mvc/multiselect)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/multiselect) demonstrates how to define a MultiSelect by using the MultiSelect HtmlHelper.

## Functionality and Features

* [Data binding]({% slug binding_multicselect_aspnetmvc %})
* [Virtualization]({% slug virtualization_multiselect_aspnetmvc %})
* [Grouping]({% slug grouping_multiselect_aspnetmvc %})

## Events

You can subscribe to all MultiSelect [events](/api/multiselect). For a complete example on basic MultiSelect events, refer to the [demo on using the events of the MultiSelect](https://demos.telerik.com/aspnet-mvc/multiselect/events).

### Handling by Handler Name

The examples below demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multiselect_select")
            .Change("multiselect_change")
        )
    %>
    <script>
        function multiselect_select() {
            // Handle the select event.
        }

        function multiselect_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("multiselect_select")
            .Change("multiselect_change")
        )
    )
    <script>
        function multiselect_select() {
            // Handle the select event.
        }

        function multiselect_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().MultiSelect()
        .Name("multiselect")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select(@<text>
            function() {
                // Handle the select event inline.
            }
            </text>)
            .Change(@<text>
            function() {
                // Handle the change event inline.
            }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing MultiSelect instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [MultiSelect client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/multiselect#methods) to control its behavior.

    // Place the following after the MultiSelect for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the MultiSelect is used to get its client-side instance.
            var multiselect = $("#productMultiSelect").data("kendoMultiSelect");
        });
    </script>

## See Also

* [Basic Usage by the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect)
* [Using the API of the MultiSelect HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/multiselect/api)
* [MultiSelectBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MultiSelectBuilder)
* [MultiSelect Server-Side API](/api/multiselect)
