---
title: Overview
page_title: DatePicker Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DatePicker tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /aspnet-core/helpers/date-picker, /aspnet-core/helpers/tag-helpers/date-picker
slug: taghelpers_datepicker_aspnetcore
position: 1
---

# DatePicker Tag Helper Overview

The DatePicker enables the user to enter or pick a date value.

The DatePicker tag helper extension is a server-side wrapper for the [Kendo UI DatePicker](https://demos.telerik.com/kendo-ui/datepicker/index) widget and enables you to configure the Kendo UI DatePicker widget in ASP.NET Core applications.

## Initializing the DatePicker

The following example demonstrates how to define the DatePicker by using the DatePicker tag helper.

      <kendo-datepicker name="datepicker1"></kendo-datepicker>

## Basic Configuration

The DatePicker tag helper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().DatePicker()
                .Name("monthpicker")
                .Start(CalendarView.Year)
                .Depth(CalendarView.Year)
                .Format("MMMM yyyy")
                .Value(DateTime.Now)
        )
```
```tagHelper

        <kendo-datepicker name="monthpicker" start="CalendarView.Year" depth="CalendarView.Year"
            format="MMMM yyyy" value="DateTime.Now">
        </kendo-datepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either by a `ViewBag` property or by a property of the model.

        @{
            ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
        }

        <kendo-datepicker name="datepicker" parse-formats="ViewBag.ParseDates"></kendo-datepicker>

## See Also

* [Basic Usage of the DatePicker Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
* [JavaScript API Reference of the DatePicker](https://docs.telerik.com/kendo-ui/api/javascript/ui/datepicker)
