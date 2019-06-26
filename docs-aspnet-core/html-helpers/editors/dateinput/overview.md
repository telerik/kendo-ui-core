---
title: Overview
page_title: DateInput Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Kendo UI DateInput HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/html-helpers/dateinput
slug: htmlhelpers_dateinput_aspnetcore
position: 1
---

# DateInput HtmlHelper Overview

The DateInput represents an input field that recognizes and formats scheduling values such as dates.

The DateInput HtmlHelper extension is a server-side wrapper for the [Kendo UI DateInput](https://demos.telerik.com/kendo-ui/dateinput/index) widget. For more information on the DateInput HtmlHelper for ASP.NET MVC, refer to the [UI for ASP.NET MVC documentation](https://docs.telerik.com/aspnet-mvc/helpers/dateinput/overview).

## Basic Configuration

The following example demonstrates the basic configuration for the DateInput.

```
    @(Html.Kendo().DateInput()
        .Name("dateinput") // The name of the DateInput is mandatory. It specifies the "id" attribute of the widget.
        .Value(DateTime.Today) // Set the value of the DateInput.
    )
```

## Events

You can subscribe to all DateInput [events](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#events). For a complete example on basic DateInput events, refer to the [demo on using the events of the DateInput](https://demos.telerik.com/aspnet-core/dateinput/events).

The following example demonstrates how to subscribe to events by a handler name.

```
    @(Html.Kendo().DateInput()
        .Name("dateinput")
        .Events(e => e
            .Change("dateInput_change")
        )
    )
    <script>
    function dateInput_change() {
        // Handle the change event.
    }
    </script>
```

## Referencing Existing Instances

To reference an existing Kendo UI DateInput instance, use the [`jQuery.data()`](http://api.jquery.com/jQuery.data/) configuration option. Once a reference is established, use the [DateInput API](http://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput#methods) to control its behavior.

        // Place this after your Kendo UI DateInput for ASP.NET Core declaration.
        <script>
        $(function() {
        // The Name() of the DateInput is used to get its client-side instance.
            var dateInput = $("#dateinput").data("kendoDateInput");
        });
        </script>

## See Also

* [Basic Usage of the DateInput HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dateinput/index)
* [Using the API of the DateInput HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/dateinput/api)
* [JavaScript API Reference of the DateInput](https://docs.telerik.com/kendo-ui/api/javascript/ui/dateinput)
