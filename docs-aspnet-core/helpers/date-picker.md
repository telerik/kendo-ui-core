---
title: DatePicker
page_title: DatePicker | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the DatePicker tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_datepicker_aspnetcore
---

# DatePicker Tag Helper

The DatePicker tag helper helps you configure the Kendo UI DatePicker widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DatePicker by using the DatePicker tag helper.

###### Example

        <kendo-datepicker name="datepicker1"></kendo-datepicker>

## Configuration

The DatePicker tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().DatePicker()
                .Name("monthpicker")
                .Start(CalendarView.Year)
                .Depth(CalendarView.Year)
                .Format("MMMM yyyy")
                .Value(DateTime.Now)
        )
```
```tab-tagHelper

        <kendo-datepicker name="monthpicker" start="CalendarView.Year" depth="CalendarView.Year"
            format="MMMM yyyy" value="DateTime.Now">
        </kendo-datepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either:

* By a `ViewBag` property, or
* By a property of the model.

    ###### Example

            @{
                ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
            }

            <kendo-datepicker name="datepicker" parse-formats="ViewBag.ParseDates"></kendo-datepicker>

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
