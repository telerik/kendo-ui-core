---
title: Chart
page_title: Migrating the Chart Extension | Telerik UI for ASP.NET MVC
description: "Handle the Telerik UI ASP.NET MVC server-side API for migrating the Chart Extension."
previous_url: /migration/widgets/chart
slug: chart_migrationextensions_aspnetmvc
---

# Migrating the Chart Extension

To migrate the Telerik UI Chart Extension for ASP.NET MVC to Telerik UI for ASP.NET MVC, use the available and updated API.

* The `DataBinding` configuration was moved to the `DataSource`.

    ```Previous

        Html.Telerik().Chart<SalesData>()
        .Name("Chart")
        .DataBinding(dataBinding => dataBinding.Ajax().Select("_AjaxBinding", "Chart"))
    ```
    ```Current

        Html.Kendo().Chart<SalesData>()
        .Name("Chart")
        .DataSource(ds => ds.Read(read => read.Action("_AjaxBinding", "Chart")))
    ```

* Telerik UI for ASP.NET MVC does not support action syntax, that is, `“() => {}”`. The helpers do not feature the `OnLoad` event anymore and require you to use `$(document).ready()` instead.

    ```Previous

        .ClientEvents(events => events.OnError("onError"))
    ```
    ```Current

        .DataSource(ds => ds.Events(events => events.Error("error")))
    ```

## See Also

* [Migrating the AutoComplete]({% slug autocomplete_migrationextensions_aspnetmvc %})
* [Migrating from Telerik UI Extensions (Overview of Changes)]({% slug overview_migrationextensions_aspnetmvc %})
