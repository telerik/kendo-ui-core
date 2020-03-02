---
title: Create View Model Bound Dynamic Series
page_title: Create View Model Bound Dynamic Series
description: "Create dynamic Chart series bound to a view model in ASP.NET MVC applications."
previous_url: /helpers/charts/how-to/create-dynamic-series
slug: howto_cerateviewmodelboundseries_chartaspnetmvc
---

# Create View Model Bound Dynamic Series

It is not always possible to know the series and model structure in advance. In such cases, build the series list dynamically and typically bind them to collections defined on the view model.

> If you have a static model you want to split in multiple series based on a field value, refer to the demo on [binding to grouped data](https://demos.telerik.com/aspnet-mvc/bar-charts/grouped-data).

A simple scenario might bind each series to an array of primitive values.

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

* [Overview of the Chart HtmlHelper]({% slug htmlhelpers_dropdownlist_aspnetcore %})
* [ChartBuilder Server-Side API](/api/Kendo.Mvc.UI.Fluent/ChartBuilder)
