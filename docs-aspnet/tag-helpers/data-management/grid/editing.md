---
title: Editing
page_title: Editing
description: "Learn the basics when working with the Telerik UI Grid TagHelper for ASP.NET Core (MVC 6 or ASP.NET Core MVC)."
slug: editing_grid_aspnetcore
position: 3
---

# Editing

The Grid supports data editing operations (create, update, destroy) by configuring its data source.

## Getting Started

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

## See Also

* [Basic Usage of the Grid TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/grid/tag-helper)
* [Server-Side API](/api/grid)
