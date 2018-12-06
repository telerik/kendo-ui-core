---
title: DatePicker
page_title: DatePicker | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI DatePicker widget."
slug: datepicker_migrationextensions_aspnetmvc
---

# DatePicker Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI DatePicker widget.

## Server-Side API

### Min Dates

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").MinDate(DateTime.Now)
```
```Current

    Html.Kendo().DatePicker().Name("DatePicker").Min(DateTime.Now)
```

### Max Dates

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").MaxDate(DateTime.Now)
```
```Current

    Html.Kendo().DatePicker().Name("DatePicker").Max(DateTime.Now)
```

### Footer

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").TodayButton(“d”)
```
```Current

    Html.Kendo().DatePicker().Name("DatePicker").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
```

### ShowButton

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").ShowButton(false)
```
```Current

    Not Supported
```

### ButtonTitle

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").ButtonTitle(“choose date”)

```
```Current

    Not Supported
```

### OpenOnFocus

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").OpenOnFocus(true)
```
```Current

    Not Supported
```

### DateTime.MinValue

Set the `DateTime.MinValue` and show `nothing`.

```Previous

    Html.Telerik().DatePicker().Name("DatePicker").Value(DateTime.MinValue)
```
```Current

    Html.Kendo().DatePicker().Name("DatePicker").Value(value == DateTime.MinValue ? null : value)
```

## Client-Side API

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

### Disable

```Previous

    var datePicker = $("#DatePicker").data("tDatePicker");
    datePicker.disable();
```
```Current

    var datePicker = $("#datepicker").data("kendoDatePicker");
    datePicker.enable(false);
```

## See Also

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Kendo UI controls from Telerik Extensions, browse the [**Widgets** folder]({% slug autocomplete_migrationextensions_aspnetmvc %}).
