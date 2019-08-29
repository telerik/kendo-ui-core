---
title: Overview
page_title: DatePicker Overview | Telerik UI for ASP.NET Core HTML Helpers
description: "Learn the basics when working with the Telerik UI DatePicker HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/datepicker
slug: htmlhelpers_datepicker_aspnetcore
position: 1
---

# DatePicker HtmlHelper Overview

The Telerik UI DatePicker HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DatePicker widget.

The DatePicker enables the user to enter or pick a date value.

* [Demo page for the DatePicker](https://demos.telerik.com/aspnet-core/datepicker/index)

## Basic Configuration

The following example demonstrates the basic configuration for the DatePicker HtmlHelper.

```
    @(Html.Kendo().DatePicker()
        .Name("datepicker") // The name of the DatePicker is mandatory. It specifies the "id" attribute of the widget.
        .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DatePicker.
        .Max(new DateTime(2099, 12, 31)) // Sets the max date of the DatePicker.
        .Value(DateTime.Today) // Sets the value of the DatePicker.
    )
```

## Functionality and Features

* [Disabled dates]({% slug htmlhelpers_datepicker_aspnetcore_disableddates %})
* [Selected dates]({% slug htmlhelpers_datepicker_aspnetcore_selecteddates %})
* [Start view and navigation depth]({% slug htmlhelpers_datepicker_aspnetcore_navdepth %})
* [Validation]({% slug htmlhelpers_datepicker_aspnetcore_validation %})
* [Calendar types]({% slug htmlhelpers_datepicker_aspnetcore_calendartypes %})
* [Week number column]({% slug htmlhelpers_datepicker_aspnetcore_weeknumbercolumn %})
* [DateInput integration]({% slug htmlhelpers_datepicker_aspnetcore_dateinputintegration %})
* [Templates]({% slug htmlhelpers_datepicker_aspnetcore_templates %})
* [Accessibility]({% slug htmlhelpers_datepicker_aspnetcore_accessibility %})

## Events

You can subscribe to all DatePicker [events](/api/datepicker). For a complete example on DatePicker events, refer to the [demo on handling DatePicker events](https://demos.telerik.com/aspnet-core/datepicker/events).

The following example demonstrates how to subscribe to events by a handler name.

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

## Referencing Existing Instances

To reference an existing Telerik UI DatePicker instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) method. Once a reference is established, use the [DatePicker API](/api/datepicker) to control its behavior.

        // Place the following after your Telerik UI DatePicker for ASP.NET Core declaration.
        <script>
        $(function() {
        // The Name() of the DatePicker is used to get its client-side instance.
            var datepicker = $("#datepicker").data("kendoDatePicker");
        });
        </script>

## See Also

* [Basic Usage of the DatePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/index)
* [Using the API of the DatePicker HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/api)
* [Server-Side API](/api/datepicker)
