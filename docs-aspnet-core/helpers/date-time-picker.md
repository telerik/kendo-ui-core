---
title: DateTimePicker
page_title: DateTimePicker | UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the DateTimePicker tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_datetimepicker_aspnetcore
---

# DateTimePicker Tag Helper

The DateTimePicker tag helper helps you configure the Kendo UI DateTimePicker widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DateTimePicker by using the DateTimePicker tag helper.

###### Example

        <kendo-datetimepicker name="timepicker1"></kendo-datetimepicker>

## Configuration

The DateTimePicker tag helper configuration options are passed as attributes of the tag.

###### Example

```tab-cshtml

        @(Html.Kendo().DateTimePicker()
                .Name("end")
                .Value(DateTime.Today)
                .Min(DateTime.Today)
                .Events(e => e.Change("endChange"))
        )
```
```tab-tagHelper
        <kendo-datetimepicker name="end" value="DateTime.Today"
            min="DateTime.Today" on-change="endChange">
        </kendo-datetimepicker>
```

The `ParseFormats` option is of type `string[]` and can be assigned either:

* By a `ViewBag` property, or
* By a property of the model.

    ###### Example

            @{
                ViewBag.ParseDates = new string[] { "MMMM yyyy", "MMMM" };
            }

            <kendo-datetimepicker name="datetimepicker" parse-formats="ViewBag.ParseDates"></kendo-datetimepicker>

## See Also

* [Overview of Telerik UI for ASP.NET Core - RC1]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET MVC in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
