---
title: Chart
page_title: Server-side and client-side API of Kendo UI Chart widget with ASP.NET MVC
description: This documentation provides information about DataBinding configuration of Kendo UI Chart component, as well as events which are supported in the client-side API.
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
