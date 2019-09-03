---
title: Overview
page_title: Splitter Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Splitter HtmlHelper for ASP.NET MVC."
slug: overview_splitterhelper_aspnetmvc
position: 1
---

# Splitter HtmlHelper Overview

The Telerik UI Splitter HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Splitter widget.

The Splitter provides a dynamic layout of resizable and collapsible panes. It converts the children of an HTML element into an interactive layout by adding resize and collapse handles depending on its configuration. The vertical and horizontal orientation of the Splitter can be combined to build complex layouts.

* [Demo page for the Splitter](https://demos.telerik.com/aspnet-mvc/splitter)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a Splitter.

    ```ASPX
        <%: Html.Kendo().Splitter()
            .Name("splitter") // The name of the Splitter is mandatory. It specifies the "id" attribute of the Splitter.
            .Panes(panes =>
            {
                panes.Add().Content("Item 1"); // Add the pane.
                panes.Add().Content("Item 2"); // Add the pane.
            })
        %>
    ```
    ```Razor
        @(Html.Kendo().Splitter()
            .Name("splitter") // The name of the Splitter is mandatory. It specifies the "id" attribute of the Splitter.
            .Panes(panes =>
            {
                panes.Add().Content("Item 1"); // Add the pane.
                panes.Add().Content("Item 2"); // Add the pane.
            })
        )
    ```

## Events

You can subscribe to all Splitter [events](/api/splitter). For a complete example on basic Splitter events, refer to the [demo on using the events of the Splitter](https://demos.telerik.com/aspnet-mvc/splitter/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize("splitter_resize")
            )
    %>
    <script>
        function splitter_resize() {
            // Handle the Resize event.
        }
    </script>
```
```Razor
    @(Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize("splitter_resize")
            )
    )
    <script>
        function splitter_resize() {
            // Handle the Resize event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().Splitter()
            .Name("splitter")
            .Events(e => e
                .Resize(@<text>
                function() {
                    // Handle the Resize event inline.
                }
                </text>)
            )
    )

## Referencing Existing Instances

To reference an existing Splitter instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [Splitter client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/splitter#methods) to control its behavior.

    // Place the following after the Splitter for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the Splitter is used to get its client-side instance.
            var splitter = $("#splitter").data("kendoSplitter");
        });
    </script>

## See Also

* [Basic Usage of the Splitter HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/splitter)
* [Using the API of the Splitter HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/splitter/api)
* [SplitterBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/SplitterBuilder)
* [Splitter Server-Side API](/api/splitter)
