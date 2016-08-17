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

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").MinDate(DateTime.Now)
```
```tab-Current

    Html.Kendo().DatePicker().Name("DatePicker").Min(DateTime.Now)
```

### Max Dates

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").MaxDate(DateTime.Now)
```
```tab-Current

    Html.Kendo().DatePicker().Name("DatePicker").Max(DateTime.Now)
```

### Footer

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").TodayButton(“d”)
```
```tab-Current

    Html.Kendo().DatePicker().Name("DatePicker").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
```

### ShowButton

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").ShowButton(false)
```
```tab-Current

    Not Supported
```

### ButtonTitle

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").ButtonTitle(“choose date”)

```
```tab-Current

    Not Supported
```

### OpenOnFocus

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").OpenOnFocus(true)
```
```tab-Current

    Not Supported
```

### DateTime.MinValue

Set the `DateTime.MinValue` and show `nothing`.

```tab-Previous

    Html.Telerik().DatePicker().Name("DatePicker").Value(DateTime.MinValue)
```
```tab-Current

    Html.Kendo().DatePicker().Name("DatePicker").Value(value == DateTime.MinValue ? null : value)
```

## Client-Side API

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

### Disable

```tab-Previous

    var datePicker = $("#DatePicker").data("tDatePicker");
    datePicker.disable();
```
```tab-Current

    var datePicker = $("#datepicker").data("kendoDatePicker");
    datePicker.enable(false);
```

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
