---
title: Calendar
page_title: Calendar | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI Calendar widget."
slug: calendar_migrationextensions_aspnetmvc
---

# Calendar Migration

This article demonstrates the ASP.NET MVC server-side API for the Kendo UI Calendar widget.

## Server-Side API

### Events

```tab-Previous

    Html.Telerik().Calendar().Name("Calendar").ClientEvents( events => events.OnChange(“change”))
```
```tab-Current

    Html.Kendo().Calendar().Name("Calendar").Events( events => events.Change(“change”))
```

### Min Date

```tab-Previous

    Html.Telerik().Calendar().Name("Calendar").MinDate(DateTime.Now)
```
```tab-Current

    Html.Telerik().Calendar().Name("Calendar").MaxDate(DateTime.Now)
```

### Max Date

```tab-Previous

    Html.Kendo().Calendar().Name("Calendar").Min(DateTime.Now)
```
```tab-Current

    Html.Kendo().Calendar().Name("Calendar").Max(DateTime.Now)
```

### Footer

```tab-Previous

    Html.Telerik().Calendar().Name("Calendar").TodayButton(“d”)</code></td>
```
```tab-Current

    Html.Kendo().Calendar().Name("Calendar").Footer(“#= kendo.toString(data, ‘MM/dd/yyyy’)”)
```

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Chart]({% slug chart_migrationextensions_aspnetmvc %})

To see the articles on migrating Кendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
