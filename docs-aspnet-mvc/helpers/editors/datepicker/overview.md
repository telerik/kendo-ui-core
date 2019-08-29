---
title: Overview
page_title: DatePicker Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI DatePicker HtmlHelper for ASP.NET MVC."
slug: overview_datepickerhelper_aspnetmvc
position: 1
---

# DatePicker HtmlHelper Overview

The Telerik UI DatePicker HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DatePicker widget.

The DatePicker enables the user to enter or pick a date value.

* [Demo page for the DatePicker](https://demos.telerik.com/aspnet-mvc/datepicker)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add a DatePicker.

    ```ASPX
        <%: Html.Kendo().DatePicker()
            .Name("datepicker") // The name of the DatePicker is mandatory. It specifies the "id" attribute of the DatePicker.
            .Min(new DateTime(1900, 1, 1)) // Set the min date of the DatePicker.
            .Max(new DateTime(2099, 12, 31)) // Set the min date of the DatePicker.
            .Value(DateTime.Today) // Set the value of the DatePicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().DatePicker()
            .Name("datepicker") // The name of the DatePicker is mandatory. It specifies the "id" attribute of the DatePicker.
            .Min(new DateTime(1900, 1, 1)) // Set the min date of the DatePicker.
            .Max(new DateTime(2099, 12, 31)) // Set the min date of the DatePicker.
            .Value(DateTime.Today) // Set the value of the DatePicker.
        )
    ```

## Events

You can subscribe to all DatePicker [events](/api/datepicker). For a complete example on DatePicker events, refer to the [demo on handling DatePicker events](https://demos.telerik.com/aspnet-mvc/datepicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().DatePicker()
        .Name("datepicker")
        .Events(e => e
            .Open("datepicker_open")
            .Close("datepicker_close")
            .Change("datepicker_change")
        )
    %>
    <script>
        function datepicker_open() {
            // Handle the open event.
        }

        function datepicker_close() {
            // Handle the close event.
        }

        function datepicker_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().DatePicker()
        .Name("datepicker")
        .Events(e => e
            .Open("datepicker_open")
            .Close("datepicker_close")
            .Change("datepicker_change")
        )
    )
    <script>
        function datepicker_open() {
            // Handle the open event.
        }

        function datepicker_close() {
            // Handle the close event.
        }

        function datepicker_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().DatePicker()
      .Name("datepicker")
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
```

## Referencing Existing Instances

To reference an existing DatePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and use the [DatePicker client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker#methods) to control its behavior.

    // Place the following after theDatePicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the DatePicker is used to get its client-side instance.
            var datepicker = $("#datepicker").data("kendoDatePicker");
        });
    </script>

## See Also

* [Basic Usage of the DatePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/datepicker/index)
* [Using the API of the DatePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/datepicker/api)
* [DatePickerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DatePickerBuilder)
* [DatePicker Server-Side API](/api/datepicker)
