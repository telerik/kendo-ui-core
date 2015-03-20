---
title: DateTimePicker
page_title: Server-side API documentation for Kendo UI jQuery DateTimePicker widget with ASP.NET MVC
description: How to define min and max dates, as well as start/end time in the server-side API of Kendo UI DateTimePicker component.
---

# Server-side API

Defining min and max dates:

#### Old
    
    Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)
    Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)

#### New
    
    Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)
    Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)

Footer:

#### Old
    
    Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)

##3# New
    
    Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)

StartTime and EndTime:

    Not implemented in Kendo UI

# Client-side API

## Events

All events no longer have the “On” prefix.

All widgets no longer have the OnLoad event. Please use **$(document).ready()** instead.

### Disable

#### Old
    
    var datePicker = $("#DatePicker").data("tDateTimePicker");
    datePicker.disable();

#### New
    
    var datePicker = $("#datepicker").data("kendoDateTimePicker");
    datePicker.enable(false);
