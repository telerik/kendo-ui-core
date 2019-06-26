---
title: Overview
page_title: DateTimePicker Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DateTimePicker tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/date-time-picker, /aspnet-core/helpers/tag-helpers/date-time-picker
slug: taghelpers_datetimepicker_aspnetcore
position: 1
---

# DateTimePicker Tag Helper Overview

The Kendo UI DateTimePicker allows the user to select a value from a calendar, a time drop-down list, or through direct input.

The DateTimePicker tag helper extension is a server-side wrapper for the [Kendo UI DateTimePicker](https://demos.telerik.com/kendo-ui/datetimepicker/index) widget and enables you to configure the Kendo UI DateTimePicker widget in ASP.NET Core applications.

## Initializing the DateTimePicker

The following example demonstrates how to define the DateTimePicker by using the DateTimePicker tag helper.

        <kendo-datetimepicker name="timepicker1"></kendo-datetimepicker>

## Basic Configuration

The DateTimePicker tag helper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the DateTimePicker Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datetimepicker/tag-helper)
* [JavaScript API Reference of the DateTimePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datetimepicker)
