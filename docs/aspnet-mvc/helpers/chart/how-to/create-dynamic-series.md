---
title: Create Dynamic Series
page_title: Create Dynamic Series
description: How to create dynamic chart series bound to a view model.
---

# Create Dynamic Series bound to a View Model

It is not always possible to know the series and model structure in advance.

In such case you can choose to build the series list dynamically,
typically binding them to collections defined on the view model.

> See [Binding to Grouped Data](http://demos.telerik.com/aspnet-mvc/bar-charts/grouped-data) if you have a static model that you want to split in
multiple series based on a field value.

A simple scenario might bind each series to an array of primitive values:
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

You can also bind the series to a collection of data items, specifying field bindings:

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

See the full [Dynamic Series sample project](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/chart/dynamic-series) on GitHub.

