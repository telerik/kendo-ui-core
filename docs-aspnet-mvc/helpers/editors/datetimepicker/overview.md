---
title: Overview
page_title: DateTimePicker Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the DateTimePicker HtmlHelper for ASP.NET MVC."
slug: overview_datetimepickerhelper_aspnetmvc
position: 1
---

# DateTimePicker HtmlHelper Overview

The Telerik UI DateTimePicker HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI DateTimePicker widget.

The DateTimePicker allows the user to select a value from a calendar, a time drop-down list, or through direct input.

* [Demo page for the DateTimePicker](https://demos.telerik.com/aspnet-mvc/datetimepicker)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a DateTimePicker.

    ```ASPX
        <%: Html.Kendo().DateTimePicker()
            .Name("datetimepicker") // The name of the DateTimePicker is mandatory. It specifies the "id" attribute of the DateTimePicker.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the DateTimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the DateTimePicker.
            .Value(DateTime.Now) // Set the value of the DateTimePicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().DateTimePicker()
            .Name("datetimepicker") // The name of the DateTimePicker is mandatory. It specifies the "id" attribute of the DateTimePicker.
            .Min(new DateTime(2010, 1, 1, 10, 0, 0)) // Set the min time of the DateTimePicker.
            .Max(new DateTime(2010, 1, 1, 20, 0, 0)) // Set the min date of the DateTimePicker.
            .Value(DateTime.Now) // Set the value of the DateTimePicker.
        )
    ```

## Events

You can subscribe to all DateTimePicker [events](/api/datetimepicker). For a complete example on basic DateTimePicker events, refer to the [demo on using the events of the DateTimePicker](https://demos.telerik.com/aspnet-mvc/datetimepicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
        .Events(e => e
            .Open("datetimepicker_open")
            .Close("datetimepicker_close")
            .Change("datetimepicker_change")
        )
    %>
    <script>
        function datetimepicker_open() {
            // Handle the open event.
        }

        function datetimepicker_close() {
            // Handle the close event.
        }

        function datetimepicker_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
        .Events(e => e
            .Open("datetimepicker_open")
            .Close("datetimepicker_close")
            .Change("datetimepicker_change")
        )
    )
    <script>
        function datetimepicker_open() {
            // Handle the open event.
        }

        function datetimepicker_close() {
            // Handle the close event.
        }

        function datetimepicker_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

    @(Html.Kendo().DateTimePicker()
        .Name("datetimepicker")
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

To reference an existing Kendo UI DateTimePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateTimePicker client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker#methods) to control its behavior.

    // Place the following after the DateTimePicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the DateTimePicker is used to get its client-side instance.
            var datetimepicker = $("#datetimepicker").data("kendoDateTimePicker");
        });
    </script>

## See Also

* [Basic Usage of the DateTimePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/datetimepicker)
* [Using the API of the DateTimePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/datetimepicker/api)
* [DateTimePickerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DateTimePickerBuilder)
* [DateTimePicker Server-Side API](/api/datetimepicker)
