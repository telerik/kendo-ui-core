---
title: Overview
page_title: DateRangePicker | Telerik UI for ASP.NET MVC HtmlHelpers
description: "Get started with the server-side wrapper for the Kendo UI DateRangePicker widget for ASP.NET MVC."
slug: overview_daterangepickerhelper_aspnetmvc
position: 1
---

# DateRangePicker HtmlHelper Overview

The DateRangePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/index) widget.

## Configuration

Below are listed the steps for you to follow when configuring the Kendo UI DateRangePicker.

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create a new action method which renders the view.

    ###### Example

        public ActionResult Index()
        {
            return View();
        }

1. Add the DateRangePicker.

    ```ASPX
        <%: Html.Kendo().DateRangePicker()
            .Name("daterangepicker") //The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(1900, 1, 1)) //Set the min date of the DateRangePicker.
            .Max(new DateTime(2099, 12, 31)) //Set the min date of the DateRangePicker.
            .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) //Set the value of the DateRangePicker.
        %>
    ```
    ```Razor
        @(Html.Kendo().DateRangePicker()
            .Name("daterangepicker") //The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the widget.
            .Min(new DateTime(1900, 1, 1)) //Set the min date of the DateRangePicker.
            .Max(new DateTime(2099, 12, 31)) //Set the min date of the DateRangePicker.
            .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) //Set the value of the DateRangePicker.
        )
    ```

## Event Handling

You can subscribe to all DateRangePicker [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#events).

### By Handler Name

The following example demonstrates how to subscribe to events by a handler name.

###### Example

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
            //Handle the open event
        }

        function daterangepicker_close() {
            //Handle the close event
        }

        function daterangepicker_change() {
            //Handle the change event
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
            //Handle the open event
        }

        function daterangepicker_close() {
            //Handle the close event
        }

        function daterangepicker_change() {
            //Handle the change event
        }
    </script>
```

### By Template Delegate

The following example demonstrates how to subscribe to events by a template delegate.

###### Example

```Razor
    @(Html.Kendo().DateRangePicker()
      .Name("daterangepicker")
      .Events(e => e
          .Open(@<text>
            function() {
                //Handle the open event inline.
            }
          </text>)
          .Change(@<text>
            function() {
                //Handle the change event inline.
            }
            </text>)
      )
    )
```

## Reference

### Existing Instances

To reference an existing Kendo UI DateRangePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method and use the [DateRangePicker API](http://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#methods) to control its behavior.

###### Example

    // Place this after your Kendo UIDateRangePicker for ASP.NET MVC declaration.
    <script>
        $(function() {
            // Notice that the Name() of the DateRangePicker is used to get its client-side instance.
            var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");
        });
    </script>

## See Also

* [Telerik UI for ASP.NET MVC API Reference: DateRangePickerBuilder](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/DateRangePickerBuilder)
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI DateRangePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/daterangepicker/overview)
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
