---
title: Types
page_title: Types
description: "Learn about the types of DataSource supported by the Telerik UI DataSource TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: types_datasource_aspnetcore
position: 2
---

# DataSource Types

The DataSource HtmlHelper supports built-in types of data binding.

The available DataSource types of data binding are:
* [Ajax](#ajax-datasource)
* [WebApi](#webapi-datasource)
* [Custom](#custom-datasource)

## Ajax DataSource

Use the `server-operation` property to enable or disable server operations:
* When enabled, all data operations like paging, sorting, grouping, etc. will be performed server-side. 
* When disabled, all data operations will be performed on the client, and the entire data set will be available for the DataSource. This approach is also applicable for the WebAPI type of binding.

    <kendo-datasource name="dataSource" type="DataSourceTagHelperType.Ajax" server-operation="false" page-size="5">
        <transport>
            <read url="/DataSource/Products_Read" />
        </transport>
    </kendo-datasource>

## WebAPI DataSource

When you use the WebAPI DataSource type of data binding in an editable Grid, define the field types in the `schema` to use the correct editors for the field.

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

## Custom DataSource

The Custom DataSource type of data binding is the default type of binding and provides full control over the [client-side API options of the Kendo UI for jQuery DataSource](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource). For example, instead of using the `serverOperation` property, which is only applicable for the Ajax and WebApi types of data binding, you have to separately state the server operations (server-filtering, server-sorting, server-paging, server-grouping, and server-aggregates).

> The custom DataSource type of data binding is suitable for working with the `oData` and `oData-v4` services because of the [`type`](https://docs.telerik.com/kendo-ui/api/javascript/data/datasource/configuration/type) property and of the usage of predefined transport and schema settings for consuming such services. Since the custom type binding is the default type, you can omit it in the DataSource declaration.

The following example demonstrates how to consume an OData service.

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

The following example demonstrates how to use a simple remote service.

	<kendo-datasource name="dataSource1">
	    <transport>
	        <read url="https://demos.telerik.com/kendo-ui/service/Products"
	        dataType:  "jsonp",  // "jsonp" is required for cross-domain requests; use "json" for same-domain requests.
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

* [Server-Side API](/api/datasource)
