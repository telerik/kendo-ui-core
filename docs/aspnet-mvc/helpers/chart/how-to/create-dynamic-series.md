---
title: Create View Model Bound Dynamic Series
page_title: Create View Model Bound Dynamic Series | Kendo UI Chart HtmlHelper
description: "Create dynamic Chart series bound to a view model in ASP.NET MVC applications."
slug: howto_cerateviewmodelboundseries_chartaspnetmvc
---

# Create View Model Bound Dynamic Series

It is not always possible to know the series and model structure in advance. In such cases, build the series list dynamically and typically bind them to collections defined on the view model.

> **Important**
>
> If you have a static model you want to split in multiple series based on a field value, refer to the demo on [binding to grouped data](http://demos.telerik.com/aspnet-mvc/bar-charts/grouped-data).

A simple scenario might bind each series to an array of primitive values.

###### Example

```
@(Html.Kendo().Chart()
      .Name("Chart")
      .Series(series => {
         foreach (var def in Model.Series) {
           series.Column(def.Data).Name(def.Name).Stack(def.Stack);
         }
      })
      .CategoryAxis(axis => axis
         .Categories(Model.Categories)
      )
  )
```

You can also bind the series to a collection of data items, specifying field bindings.

###### Example

```
@(Html.Kendo().Chart()
      .Name("Chart")
      .Series(series => {
         foreach (var def in Model.Series) {
           series.Column(def.Data).Field(def.Field).Name(def.Name).Stack(def.Stack);
         }
      })
      .CategoryAxis(axis => axis
         .Categories(Model.Categories)
      )
  )
```

To see the full examples, refer to the GitHub repository of the [sample project on dynamic series](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/chart/dynamic-series).

## See Also

Other articles and how-to examples on the Kendo UI Chart HtmlHelper:

* [Chart HtmlHelper Overview]({% slug overview_dropdownlisthelper_aspnetmvc %})
* [How to Bind to SignalR Hubs in ASP.NET MVC Apps]({% slug howto_bindtosignalr_chartaspnetmvc %})
* [How to Create Charts in Ajax Grid Columns in ASP.NET MVC Apps]({% slug howto_createchartinajaxgridcolumn_chartaspnetmvc %})
