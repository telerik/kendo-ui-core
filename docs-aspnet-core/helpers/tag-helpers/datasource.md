---
title: DataSource
page_title: DataSource | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the DataSource tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_datasource_aspnetcore
---

# DataSource Tag Helper Overview

The DataSource tag helper helps you configure the Kendo UI DataSource component in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DataSource by using the DataSource tag helper.

###### Example

        <kendo-datasource name="datasource"></kendo-datasource >

## Configuration

The DataSource tag helper configuration options are passed as attributes of the tag. The DataSource is an abstraction for binding the Kendo UI widgets to local and remote data and to handle various data operations with the `databound` Kendo UI TagHelpers.

###### Example

```tab-tagHelper
    <kendo-datasource name="dataSource" type="DataSourceTagHelperType.Ajax" server-operation="false" page-size="5">
        <transport>
            <read url="/DataSource/Products_Read" />
        </transport>
        <sorts>
            <sort field="fieldName" direction="asc" />
        </sorts>
    </kendo-datasource>
```
```tab-cshtml
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

## DataSource Types

The DataSource supports the following types of binding:

1. Ajax&mdash;You have to set the server operations together by using the `server-operation` property. This approach is also applicable for the WebApi type of binding.
1. WebApi&mdash;When you use the WebApi type of binding in an editable Grid, define the field types in the `schema` to use the correct editors for the field.

    ###### Example

        <schema>
        <model id="ProductID">
            <fields>
            <field name="ProductID" type="number"></field>
            </fields>
        </model>
        </schema>

1. Custom&mdash;You can use this mode with the `oData` and `oData-v4` services. When the DataSource type is set to `custom`, the server operations have to be separately set (server-filtering, server-sorting, server-paging, server-grouping, and server-aggregates). The `serverOperation` property is only used in the Ajax and WebApi types of binding.

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
