---
title: Overview
page_title: TimePicker Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI TimePicker HtmlHelper for ASP.NET MVC."
slug: overview_timepickerhelper_aspnetmvc
position: 1
---

# TimePicker HtmlHelper Overview

The Telerik UI TimePicker HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI TimePicker widget.

The TimePicker enables users to select time values from a predefined list or enter new ones.

* [Demo page for the TimePicker](https://demos.telerik.com/aspnet-mvc/timepicker)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

      public ActionResult Index()
        {
            return View();
        }

1. Add a TimePicker.

    ```ASPX
        <%: Html.Kendo().TimePicker()
            .Name("timepicker") // The name of the TimePicker is mandatory. It specifies the "id" attribute of the TimePicker.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the TimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the TimePicker.
            .Value(DateTime.Now) // Set the value of the TimePicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().TimePicker()
            .Name("timepicker") // The name of the TimePicker is mandatory. It specifies the "id" attribute of the TimePicker.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the TimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the TimePicker.
            .Value(DateTime.Now) // Set the value of the TimePicker.
        )
    ```

## Events

You can subscribe to all TimePicker [events](/api/timepicker). For a complete example on basic TimePicker events, refer to the [demo on using the events of the TimePicker](https://demos.telerik.com/aspnet-mvc/timepicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().TimePicker()
            .Name("timepicker")
            .Events(e => e
                .Open("timepicker_open")
                .Close("timepicker_close")
                .Change("timepicker_change")
            )
    %>
    <script>
        function timepicker_open() {
            // Handle the open event.
        }

        function timepicker_close() {
            // Handle the close event.
        }

        function timepicker_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().TimePicker()
            .Name("timepicker")
            .Events(e => e
                .Open("timepicker_open")
                .Close("timepicker_close")
                .Change("timepicker_change")
            )
    )
    <script>
        function timepicker_open() {
            // Handle the open event.
        }

        function timepicker_close() {
            // Handle the close event
        }

        function timepicker_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

  @(Html.Kendo().TimePicker()
        .Name("timepicker")
        .Events(e => e
            .Open(@<text>
            function() {
                // Handle the open event inline.
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

To reference an existing TimePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [TimePicker client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker#methods) to control its behavior.

    // Place the following after the TimePicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the TimePicker is used to get its client-side instance.
            var timepicker = $("#timepicker").data("kendoTimePicker");
        });
    </script>

## See Also

* [Basic Usage by the TimePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/timepicker)
* [Using the API of the TimePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/timepicker/api)
* [TimePickerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/TimePickerBuilder)
* [TimePicker Server-Side API](/api/timepicker)
