---
title: TimePicker
page_title: TimePicker | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI TimePicker widget."
slug: timepicker_migrationextensions_aspnetmvc
---

# TimePicker Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI TimePicker widget.

## Server-Side API

### Min Date

```tab-Previous

    Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)

```
```tab-Current

    Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)

```

### Max Date

```tab-Previous

      Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)
```
```tab-Current

      Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)
```

### Footer

```tab-Previous

    Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)
```
```tab-Current

    Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
```

## Client-Side API

### Events

None of the events has the `On` prefix anymore.

None of the widgets features the `OnLoad` event anymore. Use the `$(document).ready()` instead.

#### Disable

```tab-Previous

    var datePicker = $("#DatePicker").data("tTimePicker");
    datePicker.disable();
```
```tab-Current

    var datePicker = $("#datepicker").data("kendoTimePicker");
    datePicker.enable(false);
```

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
