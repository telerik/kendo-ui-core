---
title: Placing Edit or Update Buttons to Grid Toolbar
description: An example on how to use the toolbar template with the edit and update commands within the {{ site.product }} Grid.
page_title: Placing Edit or Update Buttons to Grid Toolbar
slug: grid-edit-command-toolbar
tags: grid, toolbar, edit, update, command, template, custom, replace, move, core, mvc, telerik, component, wrapper
res_type: kb
components: ["general"]
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Grid</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1114 version</td>
 </tr>
</table>

## Description

How can I limit the number of columns in the Grid and move the **Edit** and **Update** buttons to the toolbar to save space when using the {{ site.product }} Grid?


## Solution

To achieve the desired result:

1. Enable selection for the Grid.
1. Define a toolbar template that will hold all custom buttons used for editing.
1. Handle the click event for the buttons to enter/exit edit mode.


```Razor Index.cshtml

    <script type="text/x-kendo-template" id="template"> // ToolBar Template
        <div class="editBtnContainer">
             <button type="button" class="k-button k-button-md k-rounded-md k-button-solid  k-button-solid-base k-grid-custom">Edit</button>          

        </div>
        <div class="updateCancelContainer">
                <a role="button" class="k-button k-button-md k-rounded-md k-button-solid    k-button-solid-base k-grid-save-command" href="\\#"> 
            <span class="k-icon k-i-check k-button-icon"></span>Update</a>
            <a role="button" class="k-button k-button-md k-rounded-md k-button-solid    k-button-solid-base k-grid-cancel-command" href="\\#">
            <span class="k-icon k-i-cancel k-button-icon"></span>Cancel</a>
        </div>
    </script>


    @(Html.Kendo().Grid<Kendo.Mvc.Examples.Models.ProductViewModel>()
        .Name("grid")
        .Columns(columns =>
        {
            columns.Bound(p => p.ProductName);
            columns.Bound(p => p.UnitPrice).Width(100);
            columns.Bound(p => p.UnitsInStock).Width(100);
            columns.Bound(p => p.Discontinued).Width(100);
        })
        .ToolBar(toolbar => toolbar.ClientTemplateId("template"))
        .Editable(editable => editable.Mode(GridEditMode.InLine))
        .Selectable(selectable => selectable.Mode(GridSelectionMode.Single))
        .Pageable()
        .Sortable()
        .Scrollable()
        .HtmlAttributes(new { style = "height:430px;" })
        .DataSource(dataSource => dataSource
            .Ajax()
            .PageSize(20)
            .Model(model => model.Id(p => p.ProductID))
            .Create(update => update.Action("EditingInline_Create", "Grid"))
            .Read(read => read.Action("EditingInline_Read", "Grid"))
            .Update(update => update.Action("EditingInline_Update", "Grid"))
            .Destroy(update => update.Action("EditingInline_Destroy", "Grid"))
        )
    )

```

{% if site.core %}
```TagHelper

    <script type="text/x-kendo-template" id="template"> // ToolBar Template
        <div class="editBtnContainer">
             <button type="button" class="k-button k-button-md k-rounded-md k-button-solid  k-button-solid-base k-grid-custom">Edit</button>          

        </div>
        <div class="updateCancelContainer">
                <a role="button" class="k-button k-button-md k-rounded-md k-button-solid    k-button-solid-base k-grid-save-command" href="\\#"> 
            <span class="k-icon k-i-check k-button-icon"></span>Update</a>
            <a role="button" class="k-button k-button-md k-rounded-md k-button-solid    k-button-solid-base k-grid-cancel-command" href="\\#">
            <span class="k-icon k-i-cancel k-button-icon"></span>Cancel</a>
        </div>
    </script>

    <kendo-grid name="grid" height="430">
        <selectable mode="single"/>
        <datasource type="DataSourceTagHelperType.Ajax" page-size="20">
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
                <read url="@Url.Action("EditingInline_Read", "Grid")"/>
                <update url="@Url.Action("EditingInline_Update", "Grid")"/>
                <create url="@Url.Action("EditingInline_Create", "Grid")"/>
                <destroy url="@Url.Action("EditingInline_Destroy", "Grid")"/>
            </transport>
        </datasource>
        <toolbar client-template-id="template">
        </toolbar>
        <columns>
            <column field="ProductName"/>
            <column field="UnitPrice" width="100"/>
            <column field="UnitsInStock" width="100"/>
            <column field="Discontinued" width="100"/>
        </columns>
        <editable mode="inline"/>
        <pageable enabled="true"/>
        <sortable enabled="true"/>
        <scrollable enabled="true"/>
    </kendo-grid>
```
{% endif %}

```JS script.js
    $(document).ready(function(){

        $(".k-grid-custom.k-button").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            var selectedRow = grid.select()[0];
            if (selectedRow) {
                grid.editRow(selectedRow);

                $(".editBtnContainer, .updateCancelContainer").toggle();
            }
        });

        $(".k-grid-save-command").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            grid.dataSource.sync();
            $(".editBtnContainer, .updateCancelContainer").toggle();
        });

        $(".k-grid-cancel-command").on("click", function (e) {
            e.preventDefault();
            var grid = $("#grid").getKendoGrid();
            grid.cancelChanges();
            $(".editBtnContainer, .updateCancelContainer").toggle();
        });

    })
```
```C# Styles.css
    .updateCancelContainer {
        display: none;
    }
```

For a complete implementation of the suggested approach, refer to the following Telerik REPL {% if site.core %} examples {% else %} example {% endif %}:

* [Telerik REPL (HtmlHelper)](https://netcorerepl.telerik.com/cyabaXYA35fEE7He32)
{% if site.core %}
* [Telerik REPL (TagHelper)](https://netcorerepl.telerik.com/cyabaXYA35fEE7He32)
{% endif %}


## More {{ site.framework }} Grid Resources

* [{{ site.framework }} Grid Documentation]({%slug htmlhelpers_grid_aspnetcore_overview%})

* [{{ site.framework }} Grid Demos](https://demos.telerik.com/{{ site.platform }}/grid/index)

{% if site.core %}
* [{{ site.framework }} DataGrid Product Page](https://www.telerik.com/aspnet-core-ui/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Grid Product Page](https://www.telerik.com/aspnet-mvc/grid)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}


## See Also

* [Telerik REPL: Placing Edit or Update Buttons to Grid Toolbar (HtmlHelper)](https://netcorerepl.telerik.com/cyabaXYA35fEE7He32)
{% if site.core %}
* [Telerik REPL: Placing Edit or Update Buttons to Grid Toolbar (TagHelper)](https://netcorerepl.telerik.com/GSavuXaK35ImHWNc34)
* [Server-Side TagHelper API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/grid)
{% endif %}
* [Server-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/grid)
* [Client-Side API Reference of the Grid for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

