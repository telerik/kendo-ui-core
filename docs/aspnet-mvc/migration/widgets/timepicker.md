---
title: TimePicker
page_title: API documentation for Kendo UI TimePicker widget for ASP.NET MVC
description: How to define min and max dates in the server-side API of Kendo UI TimePicker control for ASP.NET MVC.
---

# Server-Side API

Defining Min and Max dates:

#### Old

    Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)
    Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)

#### New
    
    Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)
    Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)

Footer:

#### Old
    
    Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)

#### New
    
    Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)

# Client-Side API

## Events

All Events No Longer Have the “On” Prefix.

All Widgets No Longer Have The OnLoad Event. Please Use **$(document).ready()** Instead.

**Disable**:

#### Old

    var datePicker = $("#DatePicker").data("tTimePicker");
    datePicker.disable();

#### New

    var datePicker = $("#datepicker").data("kendoTimePicker");
    datePicker.enable(false);
