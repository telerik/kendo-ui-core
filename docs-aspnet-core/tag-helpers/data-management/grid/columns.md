---
title: Columns
page_title: Columns | Telerik UI Grid TagHelper for ASP.NET Core
description: "Learn the basics when working with the Telerik UI Grid TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: columntemplates_grid_aspnetcore
position: 4
---

# Columns

The Grid allows for a flexible customization of its columns in terms of layout and appearance through its column template feature.

## Templates

The following example demonstrates how to specify your own custom layout for the Grid columns by using images and property bindings from the underlying data source. The templates are defined by using JavaScript functions.

```tagHelper
    <kendo-grid name="grid" height="550">
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
            <column field="ContactName" template="#=template(data)#" title="Contact Name" width="240" />
            <column field="ContactTitle" title="Contact Title" />
            <column field="CompanyName" title="Company Name" />
            <column field="Country" title="Country" width="150" />
        </columns>
    </kendo-grid>


    <script>
        function template(data) {
            return `<div class='customer-photo'
                    style= 'background-image: url(http://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);' ></div >
                    <div class='customer-name'>${ data.ContactName} </div>
                    `
        }
    </script>

    <style type="text/css">
        .customer-photo {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-size: 32px 35px;
            background-position: center center;
            vertical-align: middle;
            line-height: 32px;
            box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
            margin-left: 5px;
        }

        .customer-name {
            display: inline-block;
            vertical-align: middle;
            line-height: 32px;
            padding-left: 3px;
        }
    </style>
```
```cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.Customer>()
		.Name("grid")
		.Columns(columns =>
		{
			columns.Bound(c => c.ContactName).Width(140).ClientTemplate("#=template(data)#");
			columns.Bound(c => c.ContactTitle).Width(190);
			columns.Bound(c => c.CompanyName);
			columns.Bound(c => c.Country).Width(110);
		})
		.HtmlAttributes(new { style = "height: 380px;" })
		.Scrollable()
		.Groupable()
		.Sortable()
		.Pageable(pageable => pageable
			.Refresh(true)
			.PageSizes(true)
			.ButtonCount(5))
		.DataSource(dataSource => dataSource
			.Ajax()
			.Read(read => read.Action("Customers_Read", "Grid"))
		)
)

    <script>
        function template(data) {
            return `<div class='customer-photo'
                    style= 'background-image: url(http://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);' ></div >
                    <div class='customer-name'>${ data.ContactName} </div>
                    `
        }
    </script>

    <style type="text/css">
        .customer-photo {
            display: inline-block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background-size: 32px 35px;
            background-position: center center;
            vertical-align: middle;
            line-height: 32px;
            box-shadow: inset 0 0 1px #999, inset 0 0 10px rgba(0,0,0,.2);
            margin-left: 5px;
        }

        .customer-name {
            display: inline-block;
            vertical-align: middle;
            line-height: 32px;
            padding-left: 3px;
        }
    </style>
```

## Multi-Column Headers

The Grid supports multi-column headers by specifying column groups which incorporate inner column structures.

In the following example, the **Contact Info** and **Location** columns have nested columns that are depicted by a nested column tag helpers. Operations like sorting and filtering are supported on each column level regardless of the selected multi-header pattern.

```tagHelper
    <kendo-grid name="grid" reorderable="true"resizable="true" height="550">
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
        <column-menu enabled="true"/>
        <columns>
            <column field="ContactName" title="Contact Name" width="240" />
            <column title="Contact Info" >
                <columns>
                    <column field="ContactTitle" title="Contact Title" width="200" />
                    <column field="ContactName" title="Contact Name" width="200" />
                    <column title="Location">
                        <columns>
                            <column field="Country" width="200" />
                            <column field="City" width="200" />
                        </columns>
                    </column>
                    <column field="Phone" />
                </columns>
            </column>
        </columns>
    </kendo-grid>
```
```cshtml
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.CustomerViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(c => c.CompanyName).Width(420);
            columns.Group(group => group
                .Title("Contact Info")
                .Columns(info => {
                    info.Bound(x => x.ContactTitle).Width(200);
                    info.Bound(x => x.ContactName).Width(200);
                    info.Group(g => g.Title("Location")
                        .Columns(location =>
                        {
                            location.Bound(c => c.Country).Width(200);
                            location.Bound(c => c.City).Width(200);
                        })
                    );
                    info.Bound(x => x.Phone);
                })
            );
        })
        .ColumnMenu()
        .Resizable(resizable => resizable.Columns(true))
        .Reorderable(reorderable => reorderable.Columns(true))
        .HtmlAttributes(new { style = "height: 550px;" })
        .Scrollable()
        .Groupable()
        .Sortable()
        .Pageable()
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("MultiColumn_Customers_Read", "Grid"))
        )
    )
```

## See Also

* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
* [Server-Side API](/api/grid)
