---
title: Overview
page_title: ProgressBar Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI ProgressBar HtmlHelper for ASP.NET MVC."
slug: overview_progressbarhelper_aspnetmvc
position: 1
---

# ProgressBar HtmlHelper Overview

The Telerik UI ProgressBar HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI ProgressBar widget.

The ProgressBar offers rich functionalities for displaying and tracking the progress of a task. It supports multiple types, horizontal and vertical orientation, and also different directions.

* [Demo page for the ProgressBar](https://demos.telerik.com/aspnet-mvc/progressbar)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a ProgressBar.

    ```ASPX
        <%= Html.Kendo().ProgressBar()
            .Name("progressBar") // The name of the ProgressBar is mandatory. It specifies the "id" attribute of the widget.
            .Type(ProgressBarType.Percent)
        %>
    ```
    ```Razor
        @(Html.Kendo().ProgressBar()
            .Name("progressBar") // The name of the ProgressBar is mandatory. It specifies the "id" attribute of the widget.
            .Type(ProgressBarType.Percent)
        )
    ```

## Events

You can subscribe to all ProgressBar [events](/api/progressbar). For a complete example on basic ProgressBar events, refer to the [demo on using the events of the ProgressBar](https://demos.telerik.com/aspnet-mvc/progressbar/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%= Html.Kendo().ProgressBar()
            .Name("progressBar")
            .Events(e => {
                    e.Change("onChange");
                    e.Complete("onComplete");
            })
    %>
    <script>
        function onChange(e) {
            // Handle the change event.
        }

        function onComplete(e) {
            // Handle the complete event.
        }
    </script>
```
```Razor
    @(Html.Kendo().ProgressBar()
            .Name("progressBar")
            .Events(e => {
                    e.Change("onChange");
                    e.Complete("onComplete");
            })
    )
    <script>
        function onChange(e) {
                    // Handle the change event.
        }

        function onComplete(e) {
            // Handle the complete event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().ProgressBar()
        .Name("progressBar")
        .Events(e => e.Change(@<text>
                function() {
                    // Handle the change event.
                }
            </text>)
        )
    )

## Referencing Existing Instances

To reference an existing ProgressBar instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [ProgressBar client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/progressbar#methods) to control its behavior.

    // Place this after your ProgressBar for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the ProgressBar is used to get its client-side instance.
            var progressbar = $("#progressBar").data("kendoProgressBar");
        });
    </script>

## See Also

* [Basic Usage of the ProgressBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/progressbar)
* [Using the API of the ProgressBar HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/progressbar/api)
* [ProgressBarBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/ProgressBarBuilder)
* [ProgressBar Server-Side API](/api/progressbar)
