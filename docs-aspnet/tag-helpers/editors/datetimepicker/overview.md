---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DateTimePicker TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/date-time-picker, /helpers/tag-helpers/date-time-picker
slug: taghelpers_datetimepicker_aspnetcore
position: 1
---

# DateTimePicker TagHelper Overview

The Telerik UI DateTimePicker TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DateTimePicker widget.

The DateTimePicker allows the user to select a value from a calendar, a time drop-down list, or through direct input.

* [Demo page for the DateTimePicker](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)

## Initializing the DateTimePicker

The following example demonstrates how to define the DateTimePicker by using the DateTimePicker TagHelper.

        <kendo-datetimepicker name="timepicker1"></kendo-datetimepicker>

## Basic Configuration

The DateTimePicker TagHelper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().DateTimePicker()
                .Name("end")
                .Value(DateTime.Today)
                .Min(DateTime.Today)
                .Events(e => e.Change("endChange"))
        )
```
```tagHelper
        <kendo-datetimepicker name="end" value="DateTime.Today"
            min="DateTime.Today" on-change="endChange">
        </kendo-datetimepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property or by a property of the model.

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-datetimepicker name="datetimepicker" parse-formats="ViewBag.ParseDates"></kendo-datetimepicker>

## See Also

* [Basic Usage of the DateTimePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
* [Server-Side API](/api/datetimepicker)
