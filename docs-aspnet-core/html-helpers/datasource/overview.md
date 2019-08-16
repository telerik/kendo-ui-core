---
title: Overview
page_title: DataSource Overview | Telerik UI for ASP.NET Core HtmlHelpers
description: "Learn the basics when working with the Telerik UI DataSource HtmlHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: htmlhelpers_datasource_aspnetcore
position: 1
---

# DataSource HtmlHelper Overview

The Telerik UI DataSource HtmlHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DataSource widget. To use the built-in data source types, include the following script in your _Layout.cshtml file after the kendo scripts. 

    <script src="https://kendo.cdn.telerik.com/{{ site.mvcCoreVersion }}/js/kendo.aspnetmvc.min.js"></script>

The DataSource is an abstraction for using local data or remote data. The DataSource definition is declared as part of the HtmlHelpers' configurations in most cases. The standalone data source HtmlHelper is most needed in scenarios that require a Shared DataSource.

* [Demo page for the DataSource](https://demos.telerik.com/aspnet-core/datasource/index)

## Initializing the DataSource

The following example demonstrates how to define the DataSource by using the DataSource HtmlHelper. The `Name()` of the widget can be used to access its instance on the client and use its [jQuery API methods and events](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource). 

```htmlHelper
    @(Html.Kendo().DataSource<OrderViewModel>()
        .Name("myDataSource")
        .Ajax(d=>d.Read(r => r.Action("ReadOrders", "Home")))
    )

    <script>
        myDataSource.read(); // A POST request will be sent to the HomeController ReadOrders action
    </script>  
```
```HomeController

    public IActionResult ReadOrders([DataSourceRequest]DataSourceRequest request)
    {
        // orders can be IQueriable or IEnumerable
        return Json(orders.ToDataSourceResult(request));
    }
```

## Basic Configuration

The DataSource HtmlHelper configuration options are declared using the different available methods. You can set the pageSize, page, sort order, filter, group, aggregates and define the model. The configuration accepts the definition for all CRUD operations and facilitates sending additional data like the AntiForgeryTokens.

    @(Html.AntiForgeryToken())

    <script>
        // send forgery tokens as additional data
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

The DataSource provides [three main types of data sources]({% slug htmlhelper_datasourcetypes_aspnetcore %}).In addition to that it features SignalR, Hierarchical DataSource as well as Gantt, Gantt Dependency and Pivot which are used by the corresponding widgets.

## See Also

* [Basic Usage of the DataSource HtmlHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datasource/html-helper)
* [API Reference of the DataSource Helper for ASP.NET Core](/api/datasource)
* [API Reference of the jQuery DataSource widget](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
