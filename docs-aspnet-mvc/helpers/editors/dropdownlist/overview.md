---
title: Overview
page_title: DropDownList Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI DropDownList HtmlHelper for ASP.NET MVC."
slug: overview_dropdownlisthelper_aspnetmvc
position: 1
---

# DropDownList HtmlHelper Overview

The Telerik UI DropDownList HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DropDownList widget.

The DropDownList displays a list of values and allows for a single selection from the list. The user input is restricted within the predefined options.

* [Demo page for the DropDownList](https://demos.telerik.com/aspnet-mvc/dropdownlist)

## Basic Configuration

[This runnable demo](https://demos.telerik.com/aspnet-mvc/dropdownlist) demonstrates how to define a DropDownList by using the DropDownList HtmlHelper.

## Functionality and Features

* [Data binding]({% slug binding_ddl_aspnetmvc %})
* [Virtualization]({% slug virtualization_dropdownlisthelper_aspnetmvc %})
* [Grouping]({% slug grouping_dropdownlisthelper_aspnetmvc %})

## Events

You can subscribe to all DropDownList [events](/api/dropdownlist). For a complete example on basic DropDownList events, refer to the [demo on using the events of the DropDownList](https://demos.telerik.com/aspnet-mvc/dropdownlist/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("dropdownlist_select")
            .Change("dropdownlist_change")
        )
    %>
    <script>
        function dropdownlist_select() {
            // Handle the select event.
        }

        function dropdownlist_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
        .BindTo(new string[] { "Item1", "Item2", "Item3" })
        .Events(e => e
            .Select("dropdownlist_select")
            .Change("dropdownlist_change")
        )
    )
    <script>
        function dropdownlist_select() {
            // Handle the select event.
        }

        function dropdownlist_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().DropDownList()
        .Name("dropdownlist")
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

To reference an existing Kendo UI DropDownList instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DropDownList client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist#methods) to control its behavior.

    // Place the following after the DropDownList for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the DropDownList is used to get its client-side instance.
            var dropdownlist = $("#productDropDownList").data("kendoDropDownList");
        });
    </script>

## See Also

* [Basic Usage of the DropDownList HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/dropdownlist)
* [DropDownListBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DropDownListBuilder)
* [DropDownList Server-Side API](/api/dropdownlist)
