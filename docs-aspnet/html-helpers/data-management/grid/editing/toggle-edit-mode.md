---
title: Toggle Edit Mode
page_title: Toggle Edit Mode
description: "Learn how to toggle the edit mode of the Telerik UI for {{ site.framework }} Grid."
components: ["grid"]
position: 7
slug: toggle_edit_mode_grid
---


# Toggle Edit Mode

As of the R3 2024 release, the {{ site.product }} Grid enables you to toggle its editable state. The feature provides the ability to switch the Grid between Readonly and Editable mode. The Grid can be initialized in either of the states and they can be toggled on the client-side, depending on the application logic.

For a runnable example, refer to the [Grid Toggle Edit Mode demo](https://demos.telerik.com/{{ site.platform }}/grid/toggle-edit-mode).

## Setting the Readonly Mode

To enable the Readonly mode, use the `Editable.Readonly()` configuration method.

```HtmlHelper
    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
         .Name("grid")
         .Columns(columns =>
         {
             columns.Bound(p => p.ProductName);
             columns.Bound(p => p.UnitPrice).Width(140);
             columns.Bound(p => p.UnitsInStock).Width(140);
             columns.Bound(p => p.Discontinued).Width(100);
             columns.Command(command =>
             {
                 command.Edit();
                 command.Destroy();
             }).Width(150);
         })
         .ToolBar(toolbar =>
         {
             toolbar.Create();
         })
        .Editable(editable => editable
            .Mode(GridEditMode.InLine)
            .Readonly(true)
        )
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .ServerOperation(false)
            .Model(model => model.Id(p => p.ProductID))
            .Create("Editing_Create", "Grid")
            .Read("Editing_Read", "Grid")
            .Update("Editing_Update", "Grid")
            .Destroy("Editing_Destroy", "Grid")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-grid name="Grid">
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20"
                    server-operation="false">
            <schema data="Data" total="Total">
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" type="number" editable="false"></field>
                        <field name="ProductName" type="string"></field>
                        <field name="UnitPrice" type="number"></field>
                        <field name="UnitsInStock" type="number"></field>
                        <field name="Discontinued" type="boolean"></field>
                    </fields>
                </model>
            </schema>
            <transport>
                <read url="@Url.Action("Editing_Read", "Grid")" />
                <update url="@Url.Action("Editing_Update", "Grid")" />
                <create url="@Url.Action("Editing_Create", "Grid")" />
                <destroy url="@Url.Action("Editing_Destroy", "Grid")" />
            </transport>
        </datasource>
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice" width="140" />
            <column field="UnitsInStock" width="140" />
            <column field="Discontinued" width="100" />
            <column width="150">
                <commands>
                    <column-command text="Edit" name="edit"></column-command>
                    <column-command text="Delete" name="destroy"></column-command>
                </commands>
            </column>
        </columns>
        <toolbar>
            <toolbar-button name="create"></toolbar-button>
        </toolbar>
        <editable mode="inline" readonly="true" />
    </kendo-grid>
```
{% endif %}

## Toggling the Edit Mode

The {{ site.product }} Grid allows you to programmatically alter the editable state of the component through the following methods:

* [`disableEditing()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/disableediting)&mdash;Disables editing operations.
* [`enableEditing()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/methods/enableediting)&mdash;Enables editing operations.


```JavaScript
    $(document).ready(function(){
        // Determine whether either of the methods should be invoked.
        $("#grid").getKendoGrid().disableEditing();
        $("#grid").getKendoGrid().enableEditing();
    })
```

## See Also

{% if site.core %}
* [ASP.NET Core DataGrid Homepage](https://www.telerik.com/aspnet-core-ui/grid)
{% endif %}
* [Toggle Edit Mode of the Grid HtmlHelper for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/grid/toggle-edit-mode)
* [Server-Side API](/api/grid)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)