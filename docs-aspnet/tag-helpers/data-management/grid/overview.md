---
title: Overview
page_title: Overview
description: "Learn the basics when working with the Telerik UI Grid TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_grid_aspnetcore
previous_url: /helpers/tag-helpers/grid
position: 1
---

# Grid TagHelper Overview

The Telerik UI Grid TagHelper for ASP.NET Core is a server-side wrapper for the Kendo UI Grid widget.

The Grid is a powerful control for displaying data in a tabular format. It provides options for executing data operations, such as paging, sorting, filtering, grouping, and editing, which determine the way the data is presented and manipulated. The Grid supports data binding to local and remote sets of data by using the Kendo UI for jQuery DataSource component.

* [Demo page for the Grid](https://demos.telerik.com/aspnet-core/grid/tag-helper)

## Initializing the Grid

The following example demonstrates how to define the Grid by using the Grid TagHelper.

      <kendo-grid name="grid"></kendo-grid>

## Basic Configuration

The Grid TagHelper configuration options are passed as attributes of the tag. The Grid uses the [DataSource tag helper]({% slug taghelpers_datasource_aspnetcore %}) to bind its data.

> To parse the value to a proper data type, set a `type` field in the DataSource schema model of the Grid TagHelper.

```tagHelper
<kendo-grid name="grid" height="550">
    <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
        <transport>
            <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders" />
        </transport>
        <schema>
            <model>
                <fields>
                    <field name="OrderDate" type="Date"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    <groupable enabled="true" />
    <sortable enabled="true" />
    <filterable enabled="true" />
    <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
    </pageable>
    <columns>
        <column field="OrderID" width="120" />
        <column field="OrderDate" title="Order Date" format="{0:MM/dd/yyyy}" />
        <column field="ShipName" title="Ship Name" width="300" />
        <column field="ShipCity" title="Ship City" width="250" />
    </columns>
</kendo-grid>
```
```cshtml
@(Html.Kendo().Grid<TelerikAspNetCoreApp4.Models.OrderViewModel>()
    .Name("grid")
    .Columns(columns =>
    {
        columns.Bound(p => p.OrderID).Width(120);
        columns.Bound(p => p.OrderDate).Format("{0:MM/dd/yyyy}");
        columns.Bound(p => p.ShipName).Width(300);
        columns.Bound(p => p.ShipCity).Width(250);
    })
    .Groupable()
    .Sortable()
    .Filterable()
    .Pageable(pageable => pageable
    .ButtonCount(5)
    .Refresh(true)
    .PageSizes(new[] { 5, 10, 20 }))
    .DataSource(dataSource => dataSource
        .Custom()
        .Transport(transport => transport
        .Read(read => read.Action("Orders_Read", "Grid")))
        .Schema(schema => schema
            .Data("Data")
            .Model(model => {
                model.Field("OrderDate", typeof(DateTime));
            })
        )
    )
)
```

## Functionality and Features

* [Hierarchy]({% slug hierarchy_grid_aspnetcore %})
* [Editing]({% slug editing_grid_aspnetcore %})
* [Columns]({% slug columntemplates_grid_aspnetcore %})
* [Selection]({% slug taghelpers_grid_aspnetcore_selection %})

## Events

You can subscribe to all Grid events.

```tagHelper
        <kendo-grid name="grid" height="550" on-change="onChange" selectable="true">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Customers" />
                </transport>
            </datasource>
            <groupable enabled="true" />
            <sortable enabled="true" />
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
            </pageable>

            <filterable enabled="true" />
            <columns>
                <column field="ContactName" title="Contact Name" width="240" />
                <column field="ContactTitle" title="Contact Title" />
                <column field="CompanyName" title="Company Name" />
                <column field="Country" title="Country" width="150" />
            </columns>
        </kendo-grid>

        <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
        </script>
```
```cshtml

    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.ContactName).Title("Contact Name").Width(240).Filterable(ftb => ftb.Multi(true));
            columns.Bound(c => c.ContactTitle).Title("Contact Title");
            columns.Bound(c => c.CompanyName).Title("Company Name");
            columns.Bound(c => c.Country).Title("Country").Width(150);
        })
        .Groupable()
        .Events(events => events
            .Change("onChange")
        )
        .Sortable()
        .Pageable(pageable => pageable
            .Refresh(true)
            .PageSizes(true)
            .ButtonCount(5))
        .DataSource(dataSource => dataSource
            .Ajax()
            .Read(read => read.Action("Orders_Read", "Grid"))
            .PageSize(20)
        )
    )

    <script>
            function onChange(e) {
                var selectedRow = this.select();
                var dataItem = this.dataItem(selectedRow);
                console.log(dataItem)
            }
   </script>
```

## See Also

* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
* [Server-Side API](/api/grid)
