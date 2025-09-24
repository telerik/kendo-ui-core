---
title: Column Menu
page_title: Column Menu
description: "Get started with Telerik UI Gantt component for {{ site.framework }} and learn how to enable its column menu feature."
slug: htmlhelpers_gantt_columnmenu_aspnetcore
position: 8
---

# Column Menu

The Gantt provides a built-in option for triggering column operations through a menu.

To enable the Column Menu use [`.ColumnMenu()`](/api/kendo.mvc.ui.fluent/ganttbuilder#columnmenusystemboolean) configuration method. As a result, the column headers of the Gantt's TreeList render a column menu, which allows the user to sort, filter, reorder, or change the visibility of a column. The column menu also detects when a specific column operation is disabled through the column definition and does not render the corresponding UI. For a runnable example, refer to the [demo on configuring the Columns in the Gantt](https://demos.telerik.com/{{ site.platform }}/gantt/columns).

## Column Reordering

As of {{ site.product }} R2 SP1 2023, the Gantt TreeList's Column Menu provides an option to change the position of the target column by using **Move next** and **Move previous** buttons.

```HtmlHelper
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound(c => c.Title).Editable(true).Sortable(true);
            columns.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
            columns.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
        })
        .ColumnMenu(true)
        .Reorderable(true)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
            .Read("Columns_ReadTasks", "Gantt")
            .Destroy("Columns_DestroyTask", "Gantt")
            .Update(update => update.Action("Columns_UpdateTask", "Gantt"))
            .Create(create => create.Action("Columns_CreateTask", "Gantt"))
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
            })
            .Read("Columns_ReadDependencies", "Gantt")
            .Create("Columns_CreateDependency", "Gantt")
            .Destroy("Columns_DestroyDependency", "Gantt")
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-gantt name="gantt" column-menu="true" reorderable="true">
        <columns>
            <gantt-column  field="TaskID" title="ID" width="50px">
            </gantt-column>
            <gantt-column editable="true" field="title" title="Title" width="255px">
            </gantt-column>
            <gantt-column field="start" editable="true" title="Start Date" width="100">
            </gantt-column>
            <gantt-column field="end" editable="true" title="End Date" width="100">
            </gantt-column>
        </columns>
        <gantt-datasource type="DataSourceTagHelperType.Ajax">
            <schema data="Data" total="Total" errors="Errors">
                <model id="TaskID" parent-id="">
                    <fields>
                        <field name="TaskID" type="number"></field>
                        <field name="parentId" from="ParentID" type="number" default-value="null"></field>
                        <field name="title" from="Title" type="string"></field>
                        <field name="start" from="Start" type="date"></field>
                        <field name="end" from="End" type="date"></field>
                        <field name="summary" from="Summary" type="boolean"></field>
                        <field name="expanded" from="Expanded" type="boolean" default-value="true"></field>
                        <field name="percentComplete" from="PercentComplete" type="number"></field>
                        <field name="orderId" from="OrderId" type="number"></field>
                    </fields>
                </model>
            </schema>
            <transport >
                <read  url="@Url.Action("Basic_Usage_ReadTasks","Gantt")" />
                <update url="@Url.Action("Basic_Usage_UpdateTask","Gantt")" />
                <create url="@Url.Action("Basic_Usage_CreateTask","Gantt")" />
                <destroy  url="@Url.Action("Basic_Usage_DestroyTask","Gantt")" />
            </transport>
        </gantt-datasource>
        <dependency-datasource name="dependencies" type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Action("Basic_Usage_ReadDependencies", "Gantt")" />
                <create url="@Url.Action("Basic_Usage_CreateDependency", "Gantt")" />
                <destroy url="@Url.Action("Basic_Usage_DestroyDependency", "Gantt")" />
            </transport>
            <schema>
                <model id="DependencyID">
                    <fields>
                        <field name="DependencyID" type="number"></field>
                        <field name="predecessorId" from="PredecessorID" type="number"></field>
                        <field name="successorId" from="SuccessorID" type="number"></field>
                        <field name="type" from="Type" type="number"></field>
                    </fields>
                </model>
            </schema>
        </dependency-datasource>
    </kendo-gantt>
```
{% endif %}

## See Also

* [Configuring the columns of the Gantt component for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/columns)
{% if site.core %}
* [Basic Usage of the Gantt TagHelper for ASP.NET Core (Demo)](https://demos.telerik.com/aspnet-core/gantt/tag-helper)
{% endif %}
* [Server-Side API](/api/gantt)
* [Client-Side API](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
