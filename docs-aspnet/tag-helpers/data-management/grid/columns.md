---
title: Columns
page_title: Columns
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
                    style= 'background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);' ></div >
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
                    style= 'background-image: url(https://demos.telerik.com/kendo-ui/content/web/Customers/${data.CustomerID}.jpg);' ></div >
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

## Virtualization

The Grid provides a built-in option for virtualizing its columns. To enable it, set the `scollable.virtual` property to `"columns"`. As a result, the columns outside the current visible aria of the Grid will not be rendered and this will improve the rendering performance. When scrolling is performed the visual subset of columns is changed accordingly.

> To work properly, the column virtualization requires you to set the widths of the columns.

To enable virtualized columns:

```
    <kendo-grid name="grid" height="550">
        <scrollable virtual=@("columns")/>
    </kendo-grid>
```

To enable both virtualized columns and rows:

```
    <kendo-grid name="grid" height="550">
        <scrollable virtual=@("rows, columns")/>
    </kendo-grid>

```

## Sticky Columns

Sticky columns enable you to display specific columns at all times while the user scrolls the Grid horizontally. This specific column will be scrollable as well, however, it will fix its position to the left/right when it reaches left/right Grid border.

For a runnable example, refer to the demo on [implementing sticky columns in the Grid](https://demos.telerik.com/{{ site.platform }}/grid/sticky-columns).

```tagHelper
    <column-menu enabled="true"/>
    <columns>
        <column field="ContactName" sticky="true" stickable="true" title="Contact Name" width="240" />
        <column field="ContactTitle" stickable="true" title="Contact Title" />
        <column field="CompanyName" stickable="true" title="Company Name" />
        <column field="Country" stickable="true" title="Country" width="150" />
    </columns>
```
```cshtml
    .ColumnMenu()
    .Columns(columns =>
    {
        columns.Bound(o => o.ContactName).Sticky(true).Stickable(true).Width(150);
        columns.Bound(o => o.ContactTitle).Stickable(true).Width(250);
        columns.Bound(o => o.CompanyName).Stickable(true).Width(350);
        columns.Bound(o => o.Country).Stickable(true).Width(300);

    })
```
> When it comes to the Grid Sticky Columns there are some known limitation. For more information please refer to [this section of the documentation.](https://docs.telerik.com/aspnet-core/html-helpers/data-management/grid/columns/sticky#known-limitations)

## Column Menu

The Grid provides a built-in option for triggering column operations through a menu.

To enable the column menu, use the `column-menu` tag helper. As a result, the column headers of the Grid render a column menu which allows the user to sort, filter, or change the visibility of the column. The column menu also detects when a specific column operation is disabled through the column definition and excludes the corresponding UI from its rendering. For a runnable example, refer to the [demo on implementing a column menu in the Grid](https://demos.telerik.com/aspnet-core/grid/tag-helper).

The columns are not sorted by default, they have the same order as the columns in the grid. To sort the columns, nest the `column-menu-columns` child tag helper with the `sort` attribute and pass `asc` or `desc` as a value. 

To create groups, use the nested `column-menu-columns-groups` tag helper. The `columns` attribute expects a collection of the model properties. The menu will automatically use the title from the grid columns if such is defined.

```tagHelper
    <column-menu>
        <column-menu-columns sort="asc">
            <column-menu-columns-groups>
                <column-menu-columns-group title="Company Info" columns='new string[] { "CompanyName", "Country" }' />
                <column-menu-columns-group title="Contact Info" columns='new string[] { "ContactName", "ContactTitle" }' />
            </column-menu-columns-groups>
        </column-menu-columns>
    </column-menu>
```

## See Also

* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
* [Server-Side API](/api/grid)
