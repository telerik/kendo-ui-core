---
title: Overview
page_title: DataSource Overview | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DataSource tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_datasource_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/datasource
position: 1
---

# DataSource Tag Helper Overview

The DataSource is an abstraction for using local data or remote data

The DataSource tag helper extension is a server-side wrapper for the [Kendo UI DataSource](https://docs.telerik.com/kendo-ui/framework/datasource/overview) and enables you to configure the Kendo UI DataSource component in ASP.NET Core applications.

## Initializing the DataSource

The following example demonstrates how to define the DataSource by using the DataSource tag helper.

        <kendo-datasource name="datasource"></kendo-datasource >

## Basic Configuration

The DataSource tag helper configuration options are passed as attributes of the tag. The DataSource is an abstraction for binding the Kendo UI widgets to local and remote data and to handle various data operations with the `databound` Kendo UI tag helpers.

```tagHelper
    <kendo-datasource name="dataSource" type="DataSourceTagHelperType.Ajax" server-operation="false" page-size="5">
        <transport>
            <read url="/DataSource/Products_Read" />
        </transport>
        <sorts>
            <sort field="fieldName" direction="asc" />
        </sorts>
    </kendo-datasource>
```
```cshtml
    @(Html.Kendo().DataSource<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("dataSource1")
        .Ajax(dataSource => dataSource
          .Read(read => read.Action("Products_Read", "DataSource"))
          .ServerOperation(false)
          .PageSize(5)
          .Sort(sort => sort.Add("FieldName").Ascending())
        )
    )
```

## Functionality and Features

The DataSource provides [three types of data sources]({% slug types_datasource_aspnetcore %}).

## See Also

* [Basic Usage of the Grid Tag Helper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datasource/tag-helper)
* [JavaScript API Reference of the Kendo UI DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource)
