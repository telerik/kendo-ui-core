---
title: Chart
page_title: Chart | Migrate from Telerik Extensions
description: "Handle ASP.NET MVC server-side API for the Kendo UI Chart widget."
slug: chart_migrationextensions_aspnetmvc
---

# Server-side API

## DataBinding

DataBinding configuration is moved to DataSource:

### Old
    Html.Telerik().Chart<SalesData>()
    .Name("Chart")
    .DataBinding(dataBinding => dataBinding.Ajax().Select("_AjaxBinding", "Chart"))

### New
    Html.Kendo().Chart<SalesData>()
    .Name("Chart")
    .DataSource(ds => ds.Read(read => read.Action("_AjaxBinding", "Chart")))

# Client-side API

## Events

KendoUI Complete for ASP.NET MVC does not support action syntax i.e. “() => {}”

All widgets no longer have the OnLoad event. Please use $(document).ready() instead.

### Old
    .ClientEvents(events => events.OnError("onError"))

### New
    .DataSource(ds => ds.Events(events => events.Error("error")))

## See Also

Other articles on migrating from Telerik Extensions:

* [Migrate the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrate the Calendar]({% slug calendar_migrationextensions_aspnetmvc %})

To see the articles on migrating kendo UI controls from Telerik Extensions, browse [this section]({% slug combobox_migrationextensions_aspnetmvc %}).
