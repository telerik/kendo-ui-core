---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DateRangePicker TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
previous_url: /helpers/html-helpers/daterangepicker, /helpers/editors/daterangepicker/overview
slug: taghelpers_daterangepicker_aspnetcore
position: 1
---

# DateRangePicker TagHelper Overview

The Telerik UI DateRangePicker TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DateRangePicker widget.

The DateRangePicker allows users to select a date range from a calendar or through a direct input. It is a container that holds start and end date inputs. The helper supports custom templates for its `month` view, configuration options for minimum and maximum dates, a start view, and navigation depth.


* [Demo page for the DateRangePicker](https://demos.telerik.com/aspnet-core/daterangepicker/tag-helper)

## Initializing the DateRangePicker

The following example demonstrates how to define the DateRangePicker by using the DateRangePicker TagHelper.

      <kendo-daterangepicker name='daterangepicker'></kendo-daterangepicker>

## Basic Configuration

The DateRangePicker TagHelper configuration options are passed as attributes of the tag.

```cshtml

        @(Html.Kendo().DateRangePicker()
                .Name("daterangepicker") // The name of the DateRangePicker is mandatory. It specifies the "id" attribute of the DateRangePicker.
                .Min(new DateTime(1900, 1, 1)) // Sets the min date of the DateRangePicker.
                .Max(new DateTime(2099, 12, 31)) // Sets the min date of the DateRangePicker.
                .Format("dd/MM/yyyy")
                .Range(r => r.Start(DateTime.Now).End(DateTime.Now.AddDays(10))) // Sets the range of the DateRangePicker.
        )
```
```tagHelper

        <kendo-daterangepicker name="daterangepicker" min="new DateTime(1900, 1, 1)" max="new DateTime(2099, 12, 31)" format="dd/MM/yyyy">
                <range start="DateTime.Now" end="DateTime.Now.AddDays(10)"/>
        </kendo-daterangepicker>
```

## See Also

* [Basic Usage of the DateRangePicker TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/daterangepicker/tag-helper)
* [Server-Side API](/api/daterangepicker)
