---
title: Adaptive Tools
page_title: Adaptive Tools
description: "Learn how to enable the adaptive tools in the toolbar of the {{ site.framework }} Grid by Telerik UI."
components: ["grid"]
slug: adaptive_tools_gridhelper_aspnetcore
position: 6
---

# ToolBar Adaptive Tools

The Telerik UI Grid for {{ site.framework }} supports rendering selected toolbar tools in adaptive mode starting with version Q2 2025. This feature improves usability on smaller screens by displaying sorting, filtering, grouping, and editing UI elements in a mobile-friendly ActionSheet.

To enable the adaptive mode of the Grid, set the [`AdaptiveMode()`](/api/kendo.mvc.ui.fluent/gridbuilder#adaptivemode) configuration option.

The tools appear in the ActionSheet automatically on small or medium screen sizes. To ensure that the sorting, filtering, and grouping tools function as expected, specify the respective options&mdash;`Sortable()`, `Filterable()`, and `Groupable()`. If the Grid is configured for `Popup` editing, an ActionSheet will be displayed for editing or creating records. 

> The adaptive tools are not rendered or supported when the toolbar uses the `Overflow` mode.

## Sorting

To enable sorting in adaptive mode, configure the Grid with `Sortable()`.

* In [single-column sorting mode]({% slug htmlhelpers_grid_aspnetcore_sorting%}#single-column-sorting), the sorting popup will close immediately after a field is selected, and the Grid will be sorted accordingly.
* In [multi-column]({% slug htmlhelpers_grid_aspnetcore_sorting%}#multi-column-sorting) or [mixed-column]({% slug htmlhelpers_grid_aspnetcore_sorting%}#mixed-column-sorting) sorting modes, the popup will remain open until the user clicks the **Done** button. Sorting is applied in the background as fields are selected.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
            .Name("grid")
            .ToolBar(toolbar => toolbar.Sort())
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice);
                columns.Bound(p => p.UnitsInStock);
            })
            .Pageable()
            .Sortable(s => s.SortMode(GridSortMode.MultipleColumn).ShowIndexes(true))
            .AdaptiveMode(AdaptiveMode.Auto)
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Read(read => read.Action("Adaptive_Tool_Read", "Grid"))
            )
    )
```

{% if site.core %}
```TagHelper
	@addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid"
                adaptive-mode="AdaptiveMode.Auto"
                sortable="true"
                pageable="true">
        <toolbar>
            <toolbar-button name="sort" />
        </toolbar>
        <sortable mode="GridSortMode.Multiple" show-indexes="true" />
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice" />
            <column field="UnitsInStock" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <transport>
            <read url="@Url.Action("Adaptive_Tool_Read", "Grid")" />
        </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

## Filtering

To enable filtering in adaptive mode, define the `Filterable()` option. The specified filterable settings will be applied also in the filter adaptive tool.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Filter())
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Filterable(f => f.Multi(true));
            columns.Bound(p => p.UnitsInStock);
        })
        .Pageable()
        .Filterable(f => f.Extra(false))
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Adaptive_Tool_Read", "Grid"))
        )
    )
```

{% if site.core %}
```TagHelper
	@addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid"
                adaptive-mode="AdaptiveMode.Auto"
                filterable="true"
                pageable="true">
        <toolbar>
            <toolbar-button name="filter" />
        </toolbar>
        <filterable extra="false" />
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice">
                <filterable multi="true" />
            </column>
            <column field="UnitsInStock" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <transport>
            <read url="@Url.Action("Adaptive_Tool_Read", "Grid")" />
        </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

## Grouping

The adaptive grouping tool allows users to add, remove, and reorder grouped columns. By default, groups can be rearranged by using drag-and-drop within the popup. 
To enable the adaptive grouping tool, specify the `Groupable()` option and add the `Group` tool in the Grid's toolbar. Use `ReorderButtons(true)` to show arrow up and down arrow buttons in the popup for reordering of the groups.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Group())
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice);
            columns.Bound(p => p.UnitsInStock);
        })
        .Pageable()
        .Groupable()
        .AdaptiveMode(AdaptiveMode.Auto)
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Read(read => read.Action("Adaptive_Tool_Read", "Grid"))
        )
    )
```

{% if site.core %}
```TagHelper
	@addTagHelper *, Kendo.Mvc

    <kendo-grid name="grid"
                adaptive-mode="AdaptiveMode.Auto"
                pageable="true"
                groupable="true">
        <toolbar>
            <toolbar-button name="group" />
        </toolbar>
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice" />
            <column field="UnitsInStock" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
        <transport>
            <read url="@Url.Action("Adaptive_Tool_Read", "Grid")" />
        </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

## Editing

The Grid supports editing in adaptive mode for all available editing modes: `Popup`, `InLine`, and `InCell`.

When using `Popup` or `InLine` Grid edit mode, you must enable the `Selectable()` configuration option to enable editing or deleting rows in adaptive mode. For `InCell` editing, `Selectable()` is needed only for deleting rows.

When multiple rows are selected, the data operations will apply to the most recently selected row.

### Popup Editing

In adaptive mode, when the Grid uses `Popup` editing, the Edit and Create actions open a mobile-friendly ActionSheet, allowing users to input or update data in a compact and responsive layout suitable for smaller screens.

To delete a record, the user must select the respective row and click the **Delete** toolbar button.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Items(i =>
        {
            i.Create();
            i.Edit();
            i.Spacer();
            i.Destroy();
        }))
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(150);
            columns.Bound(p => p.UnitsInStock).Width(150);
        })
        .Pageable()
        .Filterable()
        .Sortable()
        .AdaptiveMode(AdaptiveMode.Auto)
        .Selectable(s => s.Mode(GridSelectionMode.Single).Type(GridSelectionType.Row))
        .Editable(e => e.Mode(GridEditMode.PopUp))
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
                model.Field(p => p.Category).DefaultValue(
                    ViewData["defaultCategory"] as Kendo.Mvc.Examples.Models.CategoryViewModel);


            })
            .Create(update => update.Action("Adaptive_Tool_Create", "Grid"))
            .Read(read => read.Action("Adaptive_Tool_Read", "Grid"))
            .Update(update => update.Action("Adaptive_Tool_Update", "Grid"))
            .Destroy(update => update.Action("Adaptive_Tool_Destroy", "Grid"))
        )
    )
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    <kendo-grid name="grid"
                adaptive-mode="AdaptiveMode.Auto"
                selectable="single,row"
                pageable="true"
                sortable="true"
                filterable="true">
        <toolbar show-inactive-tools="false">
            <toolbar-button name="create" />
            <toolbar-button name="edit" />
            <toolbar-button name="spacer" type="spacer" />
            <toolbar-button name="destroy" />
        </toolbar>
        <editable mode="popup" />
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice" width="150" />
            <column field="UnitsInStock" width="150" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" editable="false" />
                    </fields>
                </model>
            </schema>
        <transport>
            <read url="@Url.Action("Adaptive_Tool_Read", "Grid")" />
            <create url="@Url.Action("Adaptive_Tool_Create", "Grid")" />
            <update url="@Url.Action("Adaptive_Tool_Update", "Grid")" />
            <destroy url="@Url.Action("Adaptive_Tool_Destroy", "Grid")" />
        </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

### InLine Editing

In adaptive mode, when using `InLine` editing mode, the Grid displays the editable fields directly within the selected row while the rest of the Grid remains visible. On smaller screens, the editing UI is optimized within an ActionSheet to maintain usability.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
        .Name("grid")
        .ToolBar(toolbar => toolbar.Items(i =>
        {
            i.Create();
            i.Edit();
            i.Save();
            i.CancelEdit();
        }))
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(150);
            columns.Bound(p => p.UnitsInStock).Width(150);
        })
        .Pageable()
        .Filterable()
        .Sortable()
        .AdaptiveMode(AdaptiveMode.Auto)
        .Selectable(s => s.Mode(GridSelectionMode.Single).Type(GridSelectionType.Row))
        .Editable(e => e.Mode(GridEditMode.InLine))
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model =>
            {
                model.Id(p => p.ProductID);
                model.Field(p => p.ProductID).Editable(false);
                model.Field(p => p.Category).DefaultValue(
                    ViewData["defaultCategory"] as Kendo.Mvc.Examples.Models.CategoryViewModel);


            })
            .Create(update => update.Action("Adaptive_Tool_Create", "Grid"))
            .Read(read => read.Action("Adaptive_Tool_Read", "Grid"))
            .Update(update => update.Action("Adaptive_Tool_Update", "Grid"))
            .Destroy(update => update.Action("Adaptive_Tool_Destroy", "Grid"))
        )
    )
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    <kendo-grid name="grid"
                adaptive-mode="AdaptiveMode.Auto"
                selectable="single,row">

        <pageable enabled="true" />
        <sortable enabled="true" />
        <filterable enabled="true" />

        <toolbar>
            <toolbar-button name="create" />
            <toolbar-button name="edit" />
            <toolbar-button name="save" />
            <toolbar-button name="cancelEdit" />
        </toolbar>
        <editable mode="inline" />
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice" width="150" />
            <column field="UnitsInStock" width="150" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" editable="false" />
                    </fields>
                </model>
            </schema>
        <transport>
            <read url="@Url.Action("Adaptive_Tool_Read", "Grid")" />
            <create url="@Url.Action("Adaptive_Tool_Create", "Grid")" />
            <update url="@Url.Action("Adaptive_Tool_Update", "Grid")" />
            <destroy url="@Url.Action("Adaptive_Tool_Destroy", "Grid")" />
        </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

### InCell Editing

In adaptive mode, the `InCell` editing allows users to edit individual cells by clicking into them. After a cell is edited and loses focus, the toolbar displays the **Save changes** and **Cancel changes** buttons.

To delete a specified record, the user must first select the row, then click the **Delete** button in the toolbar.

```HtmlHelper
    @(Html.Kendo().Grid<ProductViewModel>()
            .Name("grid")
            .ToolBar(toolbar => toolbar.Items(i =>
            {
                i.Create();
                i.Save();
                i.CancelEdit();
                i.Destroy();
            }))
            .Columns(columns =>
            {
                columns.Bound(p => p.ProductName);
                columns.Bound(p => p.UnitPrice).Width(150);
                columns.Bound(p => p.UnitsInStock).Width(150);
            })
            .Pageable()
            .Filterable()
            .Sortable()
            .AdaptiveMode(AdaptiveMode.Auto)
            .Selectable(s => s.Mode(GridSelectionMode.Single).Type(GridSelectionType.Row))
            .Editable(e => e.Mode(GridEditMode.InCell))
            .DataSource(dataSource => dataSource
                .Ajax()
                .PageSize(20)
                .Model(model =>
                {
                    model.Id(p => p.ProductID);
                    model.Field(p => p.ProductID).Editable(false);
                    model.Field(p => p.Category).DefaultValue(
                        ViewData["defaultCategory"] as Kendo.Mvc.Examples.Models.CategoryViewModel);
    
    
                })
                .Create(update => update.Action("Adaptive_Tool_Create", "Grid"))
                .Read(read => read.Action("Adaptive_Tool_Read", "Grid"))
                .Update(update => update.Action("Adaptive_Tool_Update", "Grid"))
                .Destroy(update => update.Action("Adaptive_Tool_Destroy", "Grid"))
            )
    )
```

{% if site.core %}
```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    <kendo-grid name="grid"
                adaptive-mode="AdaptiveMode.Auto"
                selectable="single,row">

        <pageable enabled="true" />
        <sortable enabled="true" />
        <filterable enabled="true" />
        <toolbar>
            <toolbar-button name="create" />
            <toolbar-button name="save" />
            <toolbar-button name="cancelEdit" />
            <toolbar-button name="destroy" />
        </toolbar>
        <editable mode="incell" />
        <columns>
            <column field="ProductName" />
            <column field="UnitPrice" width="150" />
            <column field="UnitsInStock" width="150" />
        </columns>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
            <schema>
                <model id="ProductID">
                    <fields>
                        <field name="ProductID" editable="false" />
                    </fields>
                </model>
            </schema>
        <transport>
            <read url="@Url.Action("Adaptive_Tool_Read", "Grid")" />
            <create url="@Url.Action("Adaptive_Tool_Create", "Grid")" />
            <update url="@Url.Action("Adaptive_Tool_Update", "Grid")" />
            <destroy url="@Url.Action("Adaptive_Tool_Destroy", "Grid")" />
        </transport>
        </datasource>
    </kendo-grid>
```
{% endif %}

## See Also
{% if site.core %}
* [{{ site.framework }} Grid Overview](https://www.telerik.com/aspnet-core-ui/grid)
{% else %}
* [{{ site.framework }} Grid Overview](https://www.telerik.com/aspnet-mvc/grid)
{% endif %}
* [Adaptive Tools Demo](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-tools)
* [Adaptive Tools Editing Demo](https://demos.telerik.com/{{ site.platform }}/grid/toolbar-editing)
* [Server-Side API](/api/grid)
