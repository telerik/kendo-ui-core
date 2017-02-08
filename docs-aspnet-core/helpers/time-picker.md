---
title: TimePicker
page_title: TimePicker | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the TimePicker tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_timepicker_aspnetcore
---

# TimePicker Tag Helper

The TimePicker tag helper helps you configure the Kendo UI TimePicker widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the TimePicker by using the TimePicker tag helper.

###### Example

        <kendo-timepicker name="timepicker1"></kendo-timepicker>

## Configuration

The TimePicker tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().TimePicker()
                .Name("end")
                .Value("8:30 AM")
                .Min("8:00 AM")
                .Max("7:30 AM")
        )
```
```tab-tagHelper

        <kendo-timepicker name="end" value="new DateTime(1900, 1, 1, 8, 30, 0)"
            min="new DateTime(1900, 1, 1, 8, 0, 0)" max="new DateTime(1900, 1, 1, 7, 30, 0)">
        </kendo-timepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either:

* By a `ViewBag` property, or
* By a property of the model.

    ###### Example

            @{
                ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
            }

            <kendo-timepicker name="timepicker" parse-formats="ViewBag.ParseDates"></kendo-timepicker>

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
