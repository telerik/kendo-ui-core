---
title: Overview
page_title: DateRangePicker Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the  DateRangePicker HtmlHelper for ASP.NET MVC."
slug: overview_daterangepickerhelper_aspnetmvc
position: 1
---

# DateRangePicker HtmlHelper Overview

The Telerik UI DateRangePicker HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI DateRangePicker widget.

The DateRangePicker is a container for holding start and end date inputs.

* [Demo page for the DateRangePicker](https://demos.telerik.com/aspnet-mvc/daterangepicker)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

        public ActionResult Index()
        {
            return View();
        }

1. Add the DateRangePicker.

    ```ASPX
        <%: Html.Kendo().DateRangePicker()
            .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the DateRangePicker.
            .Min(new DateTime(1900, 1, 1)) // Set the min date of the DateRangePicker.
            .Max(new DateTime(2099, 12, 31)) // Set the min date of the DateRangePicker.
            .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Set the value of the DateRangePicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().DateRangePicker()
            .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the DateRangePicker.
            .Min(new DateTime(1900, 1, 1)) // Set the min date of the DateRangePicker.
            .Max(new DateTime(2099, 12, 31)) // Set the min date of the DateRangePicker.
            .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Set the value of the DateRangePicker.
        )
    ```

## Events

You can subscribe to all DateRangePicker [events](/api/daterangepicker). For a complete example on basic DateRangePicker events, refer to the [demo on using the events of the DateRangePicker](https://demos.telerik.com/aspnet-mvc/daterangepicker/events).

### Handling by Handler Name

The following example demonstrates how to subscribe to events by a handler name.

```ASPX
    <%: Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Events(e => e
            .Open("daterangepicker_open")
            .Close("daterangepicker_close")
            .Change("daterangepicker_change")
        )
    %>
    <script>
        function daterangepicker_open() {
            // Handle the open event.
        }

        function daterangepicker_close() {
            // Handle the close event.
        }

        function daterangepicker_change() {
            // Handle the change event.
        }
    </script>
```
```Razor
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker")
        .Events(e => e
            .Open("daterangepicker_open")
            .Close("daterangepicker_close")
            .Change("daterangepicker_change")
        )
    )
    <script>
        function daterangepicker_open() {
            // Handle the open event.
        }

        function daterangepicker_close() {
            // Handle the close event.
        }

        function daterangepicker_change() {
            // Handle the change event.
        }
    </script>
```

### Handling by Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

```Razor
    @(Html.Kendo().DateRangePicker()
      .Name("daterangepicker")
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

To reference an existing DateRangePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and use the [DateRangePicker client-side API](http://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#methods) to control its behavior.

    // Place the following after theDateRangePicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // The Name() of the DateRangePicker is used to get its client-side instance.
            var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");
        });
    </script>

## See Also

* [Basic Usage of the DateRangePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/daterangepicker/index)
* [Using the API of the DateRangePicker HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/daterangepicker/api)
* [DateRangePickerBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder)
* [DateRangePicker Server-Side API](/api/daterangepicker)
