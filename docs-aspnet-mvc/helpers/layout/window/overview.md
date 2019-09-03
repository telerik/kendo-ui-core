---
title: Overview
page_title: Window Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Window HtmlHelper for ASP.NE MVC."
slug: overview_windowhelper_aspnetmvc
position: 1
---

# Window HtmlHelper Overview

The Telerik UI Window HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Window widget.

The Window displays content in a modal or non-modal HTML window. By default, the user can move, resize, and close a Window. Its content can also be defined either as static HTML or dynamically loaded with AJAX.

* [Demo page for the Window](https://demos.telerik.com/aspnet-mvc/window)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Window.

    ```ASPX
        <% Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the Window.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .Content(() => // Define the content of the Window.
            {
                %>
                    Static content of the Window
                <%
            })
            .Draggable() //Enable the dragging of the Window.
            .Resizable() //Enable the resizing of the Window.
            .Width(600)  // Set the width of the Window.
            .Render(); //Render the Window.
        %>
    ```
    ```Razor
        @(Html.Kendo().Window()
            .Name("window") // The name of the Window is mandatory. It specifies the "id" attribute of the Window.
            .Title("About Alvar Aalto") // Set the title of the Window.
            .Content(@<text> // Define the content of the Window.
                    The static content of the Window.
            </text>)
            .Draggable() //Enable the dragging of the Window.
            .Resizable() //Enable the resizing of the Window.
            .Width(600)  // Set the width of the Window.
        )
    ```

## Functionality and Features

* [Content]({% slug content_windowhelper_aspnetmvc %})
* [Forms]({% slug using_formsinwindow_aspnetmvc %})

## Events

You can subscribe to all Window [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/window#events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Window()
            .Name("window")
            .Events(e => e
                .Open("window_open")
            .Close("window_close")
        )
    %>
    <script>
        function window_open() {
            // Handle the open event.
        }

        function window_close() {
            // Handle the close event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Window()
            .Name("window")
            .Events(e => e
                .Open("window_open")
                .Close("window_close")
            )
    )
    <script>
        function window_open() {
            // Handle the open event.
        }

        function window_close() {
            // Handle the close event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Window()
        .Name("window")
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

## Referencing Existing Instances

To reference an existing Window instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Window client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/window#methods) to control its behavior.

    // Place the following after the Window for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Window is used to get its client-side instance.
            var window = $("#window").data("kendoWindow");
        });
    </script>

## See Also

* [Basic Usage of the Window HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mc/window)
* [Using the API of the Window HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/window/api)
* [WindowBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/WindowBuilder)
* [Window Server-Side API](/api/window)
