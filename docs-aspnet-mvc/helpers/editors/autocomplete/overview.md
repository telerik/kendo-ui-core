---
title: Overview
page_title: AutoComplete Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Get started with the server-side wrapper for the Telerik UI AutoComplete HtmlHelper for ASP.NET MVC."
slug: overview_autocompletehelper_aspnetmvc
position: 1
---

# AutoComplete HtmlHelper Overview

The Telerik UI AutoComplete HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI AutoComplete widget.

The AutoComplete provides suggestions depending on the typed text and allows multiple value entries.

* [Demo page for the AutoComplete](https://demos.telerik.com/aspnet-mvc/autocomplete)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/autocomplete) demonstrates how to define an AutoComplete by using the AutoComplete HtmlHelper.

## Functionality and Features

* [Data binding]({% slug binding_autocomplete_aspnetmvc %})
* [Virtualization]({% slug virtualization_autocomplete_aspnetmvc %})
* [Grouping]({% slug grouping_autocomplete_aspnetmvc %})

## Events

You can subscribe to all AutoComplete [events](/api/autocomplete). For a complete example on basic AutoComplete events, refer to the [demo on using the events of the AutoComplete](https://demos.telerik.com/aspnet-mvc/autocomplete/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("autocomplete_select")
            .Change("autocomplete_change")
        )
    %>
    <script>
        function autocomplete_select() {
            // Handle the select event.
        }

        function autocomplete_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("autocomplete_select")
            .Change("autocomplete_change")
        )
    )
    <script>
        function autocomplete_select() {
            // Handle the select event.
        }

        function autocomplete_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().AutoComplete()
        .Name("autocomplete")
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
```

## Referencing Existing Instances

To reference an existing AutoComplete instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [AutoComplete client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/autocomplete#methods) to control its behavior.

    // Place this after the AutoComplete for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the AutoComplete is used to get its client-side instance.
            var autocomplete = $("#productAutoComplete").data("kendoAutoComplete");
        });
    </script>

## See Also

* [Basic Usage of the AutoComplete HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/autocomplete)
* [Using the API of the AutoComplete HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/autocomplete/api)
* [Server-Side API](/api/autocomplete)
