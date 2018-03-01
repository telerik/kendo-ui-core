---
title: Grid
page_title: Grid | Telerik UI for ASP.NET Core Tag Helpers
description: "Learn the basics when working with the Grid tag helper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: taghelpers_grid_aspnetcore
---

# Grid Tag Helper Overview

The Grid tag helper helps you configure the Kendo UI Grid widget in ASP.NET Core applications.

## Basic Usage

The following example demonstrates how to define the Grid by using the Grid tag helper.

###### Example

        <kendo-grid name="grid"></kendo-grid>

## Configuration

The Grid tag helper configuration options are passed as attributes of the tag. The Grid uses the [DataSource tag helper]({% slug taghelpers_datasource_aspnetcore %}) to bind its data.

For more details on the Grid configurations, refer to the overview of the [MVC Grid HtmlHelper](https://docs.telerik.com/aspnet-mvc/helpers/grid/overview).

###### Example

```tab-tagHelper
    <kendo-grid name="grid">
        <datasource type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="Grid/Orders_Read" />
            </transport>
        </datasource>
        <groupable enabled="true" />
        <sortable enabled="true" />
        <pageable button-count="5" refresh="true" page-sizes="new int[] { 5, 10, 20 }">
        </pageable>
        <filterable enabled="true" />
        <columns>
            <column field="ContactName" title="Contact Name" width="240">
                <filterable multi="true"></filterable>
            </column>
            <column field="ContactTitle" title="Contact Title" />
            <column field="CompanyName" title="Company Name" />
            <column field="Country" title="Country" width="150" />
        </columns>
    </kendo-grid>
```
```tab-cshtml

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
```

## Events

You can subscribe to all Grid [events](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid#events).

###### Example

```tab-tagHelper
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
```tab-cshtml

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

### Editing

The code snippet below shows a Grid that has CRUD operations configured. 

```tab-tagHelper
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
```tab-cshtml
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

## Hierarchy

The Grid supports hierarchy and requirea a [`DetailInit`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/detailinit) function which will initialize the detail Grids by using the [Kendo UI Grid for jQuery](https://docs.telerik.com/kendo-ui/controls/data-management/grid/overview).

###### Example

```tab-tagHelper
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
```tab-cshtml
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

### Editing

The Kendo UI grid widget supports data editing operations (create, update, destroy) via a simple configuration of its data source. All you have to do to enable data editing capabilities for the widget is to:

* set the grid's `editable` configuration option
* declare field definitions through the `DataSource schema`
* configure the DataSource for performing CRUD data operations defining its `transport->create/update/destroy` attributes


```tab-tagHelper
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
```tab-cshtml
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

## Editing custom editor

The sample below demonstrates how to set a custom editor (Kendo UI dropdown list in this case) as grid column editor by specifying the `ProductName` column's `editor` field. The value of this field points to a JavaScript function which instantiates the column editor for the corresponding column cells.

###### Example

```tab-tagHelper
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

## See Also

* [Overview of Telerik UI for ASP.NET Core]({% slug overview_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects]({% slug gettingstarted_aspnetmvc6_aspnetmvc %})
* [Get Started with Telerik UI for ASP.NET Core in ASP.NET Core Projects on Linux]({% slug gettingstartedlinux_aspnetmvc6_aspnetmvc %})
* [Known Issues with Telerik UI for ASP.NET Core]({% slug knownissues_aspnetmvc6_aspnetmvc %})
