---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DataSource HtmlHelper for {{ site.framework }}."
slug: htmlhelpers_datasource_aspnetcore
position: 1
---

# DataSource HtmlHelper Overview

The Telerik UI DataSource HtmlHelper for {{ site.framework }} is a server-side wrapper for the Kendo UI DataSource widget.

The DataSource is an abstraction for using local data or remote data. In most cases, the DataSource definition is declared as part of the configurations for the Telerik UI HTML Helpers. The standalone DataSource HtmlHelper is suitable for scenarios that require a shared data source.

* [Demo page for the DataSource](https://demos.telerik.com/{{ site.platform }}/datasource/index)

## Initializing the DataSource

The following example demonstrates how to define the DataSource by using the DataSource HtmlHelper. You can use `Name()` to access the DataSource instance on the client and utilize the [API methods and events of the Kendo UI for jQuery DataSource widget](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource).

```htmlHelper
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(d=>d.Read(r => r.Action("ReadOrders", "Home")))
    )

    <script>
        myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action.
    </script>
```
```HomeController

    public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // Orders can be IQueriable or IEnumerable.
        return Json(orders.ToDataSourceResult(request));
    }
```

## Basic Configuration

You can declare the DataSource HtmlHelper configuration options by using the available methods&mdash;for example, you can define the page size, page, sort order, filter, group, aggregates, and the model. The configuration accepts the definition for all CRUD operations and facilitates the sending of additional data such as the `AntiForgeryTokens`.

    @(Html.AntiForgeryToken())

    <script>
        // Send the forgery tokens as additional data.
        function forgeryTokens() {
            return kendo.antiForgeryTokens();
        }    
    </script>
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(dataSource =>
        {
          dataSource
            .Read(read => read.Action("ReadOrders", "Home").Data("forgeryTokens"))
            .Sort(sort => sort.Add(field => field.ShipCountry).Ascending())
            .Filter(filter=>filter.Add(field=>field.ShipCountry).StartsWith("A"))
            .Group(group=>group.Add(field=>field.OrderID))
            .PageSize(20)
            .ServerOperation(true)
            .Model(model =>
                {
                model.Id(field => field.OrderID);
                model.Field(field => field.OrderID).Editable(false);
                model.Field(field => field.ShipCountry).DefaultValue("USA");
            });
        })
    )
    <script>
       myDataSource.fetch();
    </script>

## Functionality and Features

* [DataSource Types]({% slug htmlhelper_datasourcetypes_aspnetcore %})
* [Headers]({% slug htmlhelper_datasourceheaders_aspnetcore %})

## See Also

* [Basic Usage of the DataSource HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/datasource/index)
* [Server-Side API](/api/datasource)
