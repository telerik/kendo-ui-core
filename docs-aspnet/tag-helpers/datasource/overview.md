---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI DataSource TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_datasource_aspnetcore
previous_url: /helpers/tag-helpers/datasource
position: 1
---

# DataSource TagHelper Overview

The Telerik UI DataSource TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI DataSource widget.

The DataSource is an abstraction for using local data or remote data.

* [Demo page for the DataSource](https://demos.telerik.com/aspnet-core/datasource/tag-helper)

## Initializing the DataSource

The following example demonstrates how to define the DataSource by using the DataSource TagHelper.

      <kendo-datasource name="datasource"></kendo-datasource >

## Basic Configuration

The DataSource TagHelper configuration options are passed as attributes of the tag. The DataSource is an abstraction for binding the Kendo UI widgets to local and remote data and to handle various data operations with the `databound` Tag Helpers.

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

The DataSource HtmlHelper provides [three main types of data sources]({% slug types_datasource_aspnetcore %}). For more information on the Kendo UI for jQuery types of DataSource, refer to the [official Kendo UI for jQuery documentation](https://docs.telerik.com/kendo-ui/framework/datasource/overview).

## See Also

* [Basic Usage of the DataSource TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/datasource/tag-helper)
* [Server-Side API](/api/datasource)
