---
title: Overview
page_title: Grid | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Kendo UI Grid tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_grid_aspnetcore
previous_url: /aspnet-core/helpers/tag-helpers/grid
position: 1
---

# Grid Tag Helper Overview

The Grid tag helper helps you configure the Kendo UI Grid widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Grid by using the Grid tag helper.

###### Example

        <kendo-grid name="grid"></kendo-grid>

## Configuration

The Grid tag helper configuration options are passed as attributes of the tag. The Grid uses the [DataSource tag helper]({% slug taghelpers_datasource_aspnetcore %}) to bind its data.

> **Important**
>
> To parse the value to a proper data type, set a `type` field in the DataSource schema model of the Grid tag helper.

For more information on the configuration options of the Grid, refer to the overview of the [MVC Grid HtmlHelper](https://docs.telerik.com/aspnet-mvc/helpers/grid/overview).

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

## Hierarchy

The Grid supports hierarchy and requires a [`DetailInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit) function which initializes the detail Grids by using the [Kendo UI Grid for jQuery](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview).

```tagHelper
        <kendo-grid name="grid" height="550" selectable="true" on-detail-init="onDetailInit">
            <datasource type="DataSourceTagHelperType.Custom" custom-type="odata" page-size="20">
                <transport>
                    <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Employees" />
                </transport>
            </datasource>
            <sortable enabled="true" />
            <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
            </pageable>

            <filterable enabled="true" />
            <columns>
                <column field="FirstName" title="First Name" width="240" />
                <column field="LastName" title="Last Name" />
                <column field="Country" title="Country" width="150" />
                <column field="City" title="City" width="150" />
            </columns>
        </kendo-grid>


        <script>
            function onDetailInit(e) {
                $("<div/>").appendTo(e.detailCell).kendoGrid({
                    dataSource: {
                        type: "odata",
                        transport: {
                            read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Orders"
                        },
                        serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true,
                        pageSize: 10,
                        filter: { field: "EmployeeID", operator: "eq", value: e.data.EmployeeID }
                    },
                    scrollable: false,
                    sortable: true,
                    pageable: true,
                    columns: [
                        { field: "OrderID", width: "110px" },
                        { field: "ShipCountry", title: "Ship Country", width: "110px" },
                        { field: "ShipAddress", title: "Ship Address" },
                        { field: "ShipName", title: "Ship Name", width: "300px" }
                    ]
                });
            }
        </script>
```
```cshtml
         @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.EmployeeViewModel>()
                .Name("grid")
                .Columns(columns =>
                {
                    columns.Bound(e => e.FirstName).Width(130);
                    columns.Bound(e => e.LastName).Width(130);
                    columns.Bound(e => e.Country).Width(130);
                    columns.Bound(e => e.City).Width(110);
                    columns.Bound(e => e.Title);

                })
                .Sortable()
                .Pageable()
                .Scrollable()
                .ClientDetailTemplateId("template")
                .HtmlAttributes(new { style = "height:600px;" })
                .DataSource(dataSource => dataSource
                    .Ajax()
                    .PageSize(6)
                    .Read(read => read.Action("HierarchyBinding_Employees", "Grid"))
                )
        )

        <script id="template" type="text/kendo-tmpl">
            @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.OrderViewModel>()
                    .Name("grid_#=EmployeeID#") // template expression, to be evaluated in the master context
                    .Columns(columns =>
                    {
                        columns.Bound(o => o.OrderID).Width(110);
                        columns.Bound(o => o.ShipCountry).Width(150);
                        columns.Bound(o => o.ShipAddress).ClientTemplate("\\#= ShipAddress \\#"); // escaped template expression, to be evaluated in the child/detail context
                        columns.Bound(o => o.ShipName).Width(300);
                    })
                    .DataSource(dataSource => dataSource
                        .Ajax()
                        .PageSize(10)
                        .Read(read => read.Action("HierarchyBinding_Orders", "Grid", new { employeeID = "#=EmployeeID#" }))
                    )
                    .Pageable()
                    .Sortable()
                    .ToClientTemplate()
            )
        </script>
```

## Editing

The Grid supports data editing operations (create, update, destroy) by configuring its data source.

To enable the data editing capabilities:

* Set the `editable` option of the Grid.
* Declare the field definitions through `DataSource schema`.
* Configure the DataSource for performing CRUD data operations by defining its `transport->create/update/destroy` attributes.

```tagHelper
<kendo-grid name="grid" height="550">
    <datasource  page-size="20" type="DataSourceTagHelperType.Custom" custom-type="odata" batch="true">
        <transport>
            <read url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products" />
            <update url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products/Update"  />
            <destroy url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products/Destroy"   />
            <create url="https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products/Create" />
        </transport>
        <schema  >
            <model id="ProductID">
                <fields>
                    <field name="ProductName"></field>
                    <field name="UnitPrice" type="number"></field>
                    <field name="UnitsInStock" type="number"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    <editable mode="incell" />
    <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
    </pageable>
    <toolbar>
        <toolbar-button name="create" text="Add new record"></toolbar-button>
        <toolbar-button name="save" text="Save Changes"></toolbar-button>
        <toolbar-button name="cancel" text="Cancel Changes"></toolbar-button>
    </toolbar>
    <columns>
        <column field="ProductName" title="Product Name" width="240" />
        <column field="UnitPrice" title="Unit Price" />
        <column field="UnitsInStock" title="Units In Stock" />
        <column field="Discontinued" title="Discontinued" width="150" />
        <column>
            <commands>
                <column-command text="Delete" name="destroy"></column-command>
            </commands>
        </column>
    </columns>
</kendo-grid>
```
```cshtml
@(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
    .Name("Grid")
    .Columns(columns => {
        columns.Bound(p => p.ProductName);
        columns.Bound(p => p.UnitPrice).Width(140);
        columns.Bound(p => p.UnitsInStock).Width(140);
        columns.Bound(p => p.Discontinued).Width(100);
        columns.Command(command => command.Destroy()).Width(150);
    })
    .ToolBar(toolbar => {
        toolbar.Create();
        toolbar.Save();
    })
    .Editable(editable => editable.Mode(GridEditMode.InCell))
    .Pageable()
    .Navigatable()
    .Sortable()
    .Scrollable()
    .DataSource(dataSource => dataSource
        .Ajax()
        .Batch(true)
        .PageSize(20)
        .ServerOperation(false)
        .Events(events => events.Error("error_handler"))
        .Model(model => model.Id(p => p.ProductID))
        .Create("Editing_Create", "Grid")
        .Read("Editing_Read", "Grid")
        .Update("Editing_Update", "Grid")
        .Destroy("Editing_Destroy", "Grid")
    )
)
```

## Custom Editors

The following example demonstrates how to set a Kendo UI DropDownList as a custom column editor for the Grid by specifying the `editor` field of the `ProductName` column. The value of this field points to a JavaScript function which instantiates the column editor for the corresponding column cells.

###### Example

```
<kendo-grid name="grid" height="550">
    <datasource  page-size="20">
        <transport>
            <read url="/Grid/Editing_Read" />
            <update url="/Grid/Editing_Update" type="POST" />


        </transport>
        <schema  data="Data" total="Total">
            <model id="ProductID">
                <fields>
                    <field name="ProductName" type="string"></field>
                    <field name="UnitPrice" type="number"></field>
                    <field name="UnitsInStock" type="number"></field>
                    <field name="Discontinued" type="boolean"></field>
                </fields>
            </model>
        </schema>
    </datasource>
    <groupable enabled="true" />
    <editable mode="inline" enabled="true" />
    <sortable enabled="true" />
    <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
    </pageable>
    <filterable enabled="true" />
    <columns>
        <column field="ProductName" editor="productNameEditor" title="Product Name" width="240" />
        <column field="UnitPrice" title="UnitPrice" />
        <column field="UnitsInStock" title="UnitsInStock" />
        <column field="Discontinued" title="Discontinued" width="150" />
        <column>
            <commands>
                <column-command  name="edit"></column-command>
            </commands>
        </column>
    </columns>
</kendo-grid>

<script>
    function productNameEditor(container, options) {
        var grid = $('#grid').data('kendoGrid');
        $('<input required name="' + options.field + '"/>')
            .appendTo(container)
            .kendoDropDownList({
                dataSource: {
                    data: grid.dataSource.data().map(function (x) {
                        return x.ProductName;
                    }).filter(function (value,index, self) {
                        return self.indexOf(value) === index;
                    })
                }
            });
    }
</script>
```

## Column Templates

The Grid allows for a flexible customization of its columns in terms of layout and appearance through its column template feature.

The following example demonstrates how to specify your own custom layout for the Grid columns by using images and property bindings from the underlying data source. The templates are defined by using JavaScript functions.

###### Example

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

## Events

You can subscribe to all Grid [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events).

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

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects with the CLI]({% slug gettingstartedcli_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
