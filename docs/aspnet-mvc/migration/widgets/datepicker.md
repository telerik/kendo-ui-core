---
title: DatePicker
page_title: Server-side API documentation for Kendo UI jQuery DatePicker widget with ASP.NET MVC
description: How to define min and max dates in the server-side API of Kendo UI DatePicker component. Documentation for the events which are enabled in the client-side API.

title: DatePicker
page_title: DatePicker | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI DatePicker widget."
slug: datepicker_migrationextensions_aspnetmvc
---

# DatePicker

Server-Side API

Defining min and max dates:

#### Old

    Html.Telerik().DatePicker().Name("DatePicker").MinDate(DateTime.Now)
    Html.Telerik().DatePicker().Name("DatePicker").MaxDate(DateTime.Now)

#### New

    Html.Kendo().DatePicker().Name("DatePicker").Min(DateTime.Now)
    Html.Kendo().DatePicker().Name("DatePicker").Max(DateTime.Now)

Footer:

#### Old

    Html.Telerik().DatePicker().Name("DatePicker").TodayButton(“d”)

#### New

    Html.Kendo().DatePicker().Name("DatePicker").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)

howButton and ButtonTitle:

#### Old

    Html.Telerik().DatePicker().Name("DatePicker").ButtonTitle(“choose date”)
    Html.Telerik().DatePicker().Name("DatePicker").ShowButton(false)

#### New

    Not Supported

**OpenOnFocus**:

#### Old

    Html.Telerik().DatePicker().Name("DatePicker").OpenOnFocus(true)

#### New

    Not Supported

**Set DateTime.MinValue and show `nothing`**:

#### Old

    Html.Telerik().DatePicker().Name("DatePicker").Value(DateTime.MinValue)

#### New

    Html.Kendo().DatePicker().Name("DatePicker").Value(value == DateTime.MinValue ? null : value)

# Client-Side API

## Events

All events no longer have the “On” prefix.

All widgets no longer have the OnLoad event. Please use **$(document).ready()** instead.

### Disable

#### Old

    var datePicker = $("#DatePicker").data("tDatePicker");
    datePicker.disable();

#### New

    var datePicker = $("#datepicker").data("kendoDatePicker");
    datePicker.enable(false);

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
