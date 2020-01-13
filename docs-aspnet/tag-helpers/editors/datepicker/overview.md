---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DatePicker TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/date-picker, /helpers/tag-helpers/date-picker
slug: taghelpers_datepicker_aspnetcore
position: 1
---

# DatePicker TagHelper Overview

The Telerik UI DatePicker TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DatePicker widget.

The DatePicker enables the user to enter or pick a date value.

* [Demo page for the DatePicker](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)

## Initializing the DatePicker

The following example demonstrates how to define the DatePicker by using the DatePicker TagHelper.

      <kendo-datepicker name="datepicker1"></kendo-datepicker>

## Basic Configuration

The DatePicker TagHelper configuration options are passed as attributes of the tag.

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

* [Basic Usage of the DatePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datepicker/tag-helper)
* [Server-Side API](/api/datepicker)
