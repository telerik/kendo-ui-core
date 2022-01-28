---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI TimePicker TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/time-picker, /helpers/tag-helpers/time-picker
slug: taghelpers_timepicker_aspnetcore
position: 1
---

# TimePicker TagHelper Overview

The Telerik UI TimePicker TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI TimePicker widget.

The TimePicker enables users to select time values from a predefined list or enter new ones.

* [Demo page for the TimePicker](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)

## Initializing the TimePicker

The following example demonstrates how to define the TimePicker by using the TimePicker TagHelper.

        <kendo-timepicker name="timepicker1"></kendo-timepicker>

## Basic Configuration

The TimePicker TagHelper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().TimePicker()
                .Name("end")
                .Value("8:30 AM")
                .Min("8:00 AM")
                .Max("7:30 AM")
        )
```
```tagHelper

        <kendo-timepicker name="end" value="new DateTime(1900, 1, 1, 8, 30, 0)"
            min="new DateTime(1900, 1, 1, 8, 0, 0)" max="new DateTime(1900, 1, 1, 7, 30, 0)">
        </kendo-timepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property or by a property of the model.

            @{
                ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
            }

            <kendo-timepicker name="timepicker" parse-formats="ViewBag.ParseDates"></kendo-timepicker>

## See Also

* [Basic Usage of the TimePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/timepicker/tag-helper)
* [Server-Side API](/api/timepicker)
