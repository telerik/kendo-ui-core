---
title: Overview
page_title: ComboBox | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ComboBox HtmlHelper for ASP.NET MVC."
slug: overview_combobox_aspnetmvc
position: 1
---

# ComboBox HtmlHelper Overview

The Telerik UI ComboBox HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ComboBox widget.

The ComboBox displays a list of values and allows for a single selection from the list.

* [Demo page for the ComboBox](https://demos.telerik.com/aspnet-mvc/combobox)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/combobox) demonstrates how to define a ComboBox by using the ComboBox HtmlHelper.

## Functionality and Features

* [Data binding]({% slug binding_combobox_aspnetmvc %})
* [Virtualization]({% slug virtualization_combobox_aspnetmvc %})
* [Grouping]({% slug grouping_combobox_aspnetmvc %})

## Events

You can subscribe to all ComboBox [events](/api/combobox). For a complete example on basic ComboBox events, refer to the [demo on using the events of the ComboBox](https://demos.telerik.com/aspnet-mvc/combobox/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().ComboBox()
        .Name("combobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("combobox_select")
            .Change("combobox_change")
        )
    %>
    <script>
    function combobox_select() {
        // Handle the select event.
    }

    function combobox_change() {
        // Handle the change event.
    }
    </script>
```
```Razor
    @(Html.Kendo().ComboBox()
        .Name("combobox")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("combobox_select")
            .Change("combobox_change")
        )
    )
    <script>
        function combobox_select() {
            // Handle the select event.
        }

        function combobox_change() {
            // Handle the change event.
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```
    @(Html.Kendo().ComboBox()
        .Name("combobox")
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

To reference an existing ComboBox instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ComboBox client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/combobox#methods) to control its behavior.

    // Place the following after the ComboBox for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ComboBox is used to get its client-side instance.
            var combobox = $("#productComboBox").data("kendoComboBox");
        });
    </script>

## See Also

* [Basic Usage of the ComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/combobox)
* [Using the API of the ComboBox HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/combobox/api)
* [ComboBoxBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ComboBoxBuilder)
* [ComboBox Server-Side API](/api/combobox)
