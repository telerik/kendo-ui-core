---
title: Overview
page_title: Menu Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Menu HtmlHelper for ASP.NET MVC."
slug: overview_menu_aspnetmvc
position: 1
---

# Menu HtmlHelper Overview

The Telerik UI Menu HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Menu widget.

The Menu displays hierarchical data as a multi-level menu. It provides rich styling for unordered lists of items, and can be used for both navigation and execution of JavaScript commands.

* [Demo page for the Menu](https://demos.telerik.com/aspnet-mvc/menu)

## Basic Configuration

[This runnable example](https://demos.telerik.com/aspnet-mvc/menu) demonstrates the basic configuration of the Menu HtmlHelper for ASP.NET MVC.

## Functionality and Features

* [Binding]({% slug menu_databinding_aspnetmvc %})
* [Security trimming]({% slug securitytrimming_menu_aspnetmvc %})

## Events

You can subscribe to all Menu [events](/api/menu#events). For a complete example on basic Menu events, refer to the [demo on using the events of the Menu](https://demos.telerik.com/aspnet-mvc/menu/events).

### Handling by Handler Names

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Menu()
            .Name("menu")
            .Events(e => e
                .Open("menu_open")
                .Close("menu_close")
            )
    %>
    <script>
        function menu_close() {
            // Handle the close event.
        }

        function menu_open() {
            // Handle the open event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Menu()
            .Name("menu")
            .Events(e => e
                .Open("menu_open")
                .Close("menu_close")
            )
    )
    <script>
        function menu_close() {
            // Handle the close event.
        }

        function menu_open() {
            // Handle the open event.
        }
    </script>
```

### Handling by Template Delegates

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Menu()
            .Name("menu")
            .Events(e => e
                .Open(@<text>
                function() {
                    // Handle the open event inline.
                }
                </text>)
                .Close(@<text>
                function() {
                    // Handle the close event inline.
                }
                </text>)
            )
    )

### Handling by HTML Attributes

The following example demonstrates how to subscribe to the `select` event of a single Menu item.

    @(Html.Kendo().Menu()
        .Name("menu")
        .Items(items =>
        {
            items.Add().Text("First Item");
            items.Add().Text("Second Item").HtmlAttributes(new { @onclick = "alert('select');" });
        })
    )

## Referencing Existing Instances

To reference an existing Menu instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. After you establish a reference, use the [Menu client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/menu#methods) to control the behavior of the widget.

    // Place the following after the Menu for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Menu is used to get its client-side instance.
            var menu = $("#menu").data("kendoMenu");
        });
    </script>

## See Also

* [Basic Usage of the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu)
* [Using the API of the Menu HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/menu/api)
* [MenuItemBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuItemBuilder)
* [MenuBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/MenuBuilder)
* [Menu Server-Side API](/api/menu)
