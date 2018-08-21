---
title: Overview
page_title: DatePicker | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI DatePicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/datepicker
slug: htmlhelpers_datepicker_aspnetcore
position: 1
---

# DatePicker HtmlHelper Overview

The DatePicker HtmlHelper extension is a server-side wrapper for the [Kendo UI DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index) widget.

For more information on the HtmlHelper, refer to the article on the [DatePicker HtmlHelper for ASP.NET MVC](http://docs.telerik.com/aspnet-mvc/helpers/datepicker/overview).

## Configuration

The following example demonstrates the basic configuration for the DatePicker.

###### Example

```
    @(Html.Kendo().DatePicker()
        .Name("datepicker") // The name of the DatePicker is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DatePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the min date of the DatePicker.
        .Value(DateTime.Today) // Sets the value of the DatePicker.
    )
```

## Event Handling

You can subscribe to all DatePicker [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker#events).

The following example demonstrates how to subscribe to events by a handler name.

###### Example

```
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
        //Handle the open event
    }

    function datepicker_close() {
        //Handle the close event
    }

    function datepicker_change() {
        //Handle the change event
    }
    </script>
```

## Reference

### Existing Instances

To reference an existing Kendo UI DatePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method.  Once a reference has been established, use the [DatePicker API](http://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker#methods) to control its behavior.

The following example demonstrates how to access an existing DatePicker instance.

###### Example

        //Place this after your Kendo UI DatePicker for ASP.NET Core declaration.
        <script>
        $(function() {
        //Notice that the Name() of the DatePicker is used to get its client-side instance.
            var datepicker = $("#datepicker").data("kendoDatePicker");
        });
        </script>

## See Also

* [Overview of the JavaScript Kendo UI DatePicker Widget](http://docs.telerik.com/kendo-ui/controls/editors/datepicker/overview)
* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
