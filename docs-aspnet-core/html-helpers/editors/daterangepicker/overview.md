---
title: Overview
page_title: DateRangePicker | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI DateRangePicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/daterangepicker
slug: htmlhelpers_daterangepicker_aspnetcore
position: 1
---

# DateRangePicker HtmlHelper Overview

The DateRangePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DateRangePicker](https://demos.telerik.com/kendo-ui/daterangepicker/index) widget.

For more information on the HtmlHelper, refer to the article on the [DateRangePicker HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/daterangepicker/overview).

## Configuration

The following example demonstrates the basic configuration for the DateRangePicker.

###### Example

```
    @(Html.Kendo().DateRangePicker()
        .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DateRangePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the min date of the DateRangePicker.
        .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Sets the range of the DateRangePicker.
    )
```

## Event Handling

You can subscribe to all DateRangePicker [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
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

## Reference

### Existing Instances

To reference an existing Kendo UI DateRangePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference has been established, use the [DateRangePicker API](http://docs.telerik.com/kendo-ui/api/javascript/ui/daterangepicker#methods) to control its behavior.

The following example demonstrates how to access an existing DateRangePicker instance.

###### Example

        // Place this after your Kendo UI DateRangePicker for ASP.NET Core declaration.
        <script>
        $(function() {
        // Notice that the Name() of the DateRangePicker is used to get its client-side instance.
            var daterangepicker = $("#daterangepicker").data("kendoDateRangePicker");
        });
        </script>

## See Also

* [Overview of the JavaScript Kendo UI DateRangePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/daterangepicker/overview)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
