---
title: Overview
page_title: DataSource | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI DataSource tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_datasource_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/datasource
position: 1
---

# DataSource Tag Helper Overview

The DataSource tag helper helps you configure the Kendo UI DataSource component in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the DataSource by using the DataSource tag helper.

###### Example

        <kendo-datasource name="datasource"></kendo-datasource >

## Configuration

The DataSource tag helper configuration options are passed as attributes of the tag. The DataSource is an abstraction for binding the Kendo UI widgets to local and remote data and to handle various data operations with the `databound` Kendo UI TagHelpers.

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

## DataSource Types

The DataSource supports the following types of binding:

1. Ajax&mdash;You have to set the server operations together by using the `server-operation` property. This approach is also applicable for the WebApi type of binding.

    ###### Example

        <kendo-datasource name="dataSource" type="DataSourceTagHelperType.Ajax" server-operation="false" page-size="5">
            <transport>
                <read url="/DataSource/Products_Read" />
            </transport>
        </kendo-datasource>

2. WebApi&mdash;When you use the WebApi type of binding in an editable Grid, define the field types in the `schema` to use the correct editors for the field.

    ###### Example

        <kendo-datasource name="dataSource1" type="DataSourceTagHelperType.WebApi" server-operation="true">
            <transport>
                <read url="/api/Product" />
            </transport>
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number"></field>
                    </fields>
                </model>
            </schema>
        </kendo-datasource>

3. Custom (`default`)&mdash; The custom type binding allows a full control over the DataSource options listed in the  [client-side API](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource). For example the server operations have to be separately set (server-filtering, server-sorting, server-paging, server-grouping, and server-aggregates) instead of using `serverOperation` property (only applicable for Ajax and WebApi types of binding).
> The custom type binding is suitable for working with `oData` and `oData-v4` services. This is achievable because of [type](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/type) property and usage of predefined transport and schema settings for consuming such services. Since the custom type binding is the default type it can be omitted in the DataSource declaration. Please refer to the examples below in order to get a better idea of what the custom type binding can be used for.

###### Example with consuming an odata service

	<kendo-datasource name="dataSource1" custom-type="odata">
	    <transport>
	        <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
	    </transport>
	</kendo-datasource>

	<kendo-grid name="grid" datasource-id="dataSource1">
	    <pageable enabled="true">
	    </pageable>
	    <columns>
	        <column field="ShipName"></column>
	        <column field="ShipCity"></column>
	    </columns>
	    <scrollable enabled="true" />
	</kendo-grid>

###### Example with simple remote service

	<kendo-datasource name="dataSource1">
	    <transport>
	        <read url="https://demos.telerik.com/kendo-ui/service/Products"
	        dataType:  "jsonp",  // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
	        />
	    </transport>
	</kendo-datasource>

	<kendo-grid name="grid" datasource-id="dataSource1">
	    <pageable enabled="true">
	    </pageable>
	    <columns>
	        <column field="ProductName"></column>
	        <column field="UnitPrice" format="{0:c}"></column>
	        <column field="UnitsInStock"></column>
	        <column field="Discontinued"></column>
	    </columns>
	    <scrollable enabled="true" />
	</kendo-grid>


## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
