---
title: Row Reordering
page_title: Row Reordering
description: "Learn more about the dragging features of the Telerik UI Gantt component for {{ site.framework }}."
components: ["gantt"]
slug: htmlhelpers_gantt_row_reorder_aspnetcore
position: 7
---

# Reorder Rows through Click-Move-Click

As of {{ site.product }} UI R2 SP1 2023, users can reorder the Gantt's TreeList rows by using the click-move-click functionality provided by the [`Editable.ClickMoveClick`](/api/kendo.mvc.ui.fluent/gantteditablesettingsbuilder#clickmoveclicksystemboolean) option. To use this functionality, you must also add a `.Draggable()` column that allows the draggable icon to appear. Once enabled, users can move the row by clicking the icon to start moving the row, and then clicking again to place the row in its new position.

```HtmlHelper
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Draggable().Width(70);
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound(c => c.Title).Editable(true).Sortable(true);
            columns.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
            columns.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
        })
        .Editable(editable => editable.ClickMoveClick(true))
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
    <kendo-gantt name="gantt">
        <columns>
            <gantt-column draggable="true" width="70px"></gantt-column>
            <gantt-column field="TaskID" title="ID" width="50px">
            </gantt-column>
            <gantt-column editable="true" field="title" title="Title" width="255px">
            </gantt-column>
            <gantt-column field="start" editable="true" title="Start Date" width="100">
            </gantt-column>
            <gantt-column field="end" editable="true" title="End Date" width="100">
            </gantt-column>
        </columns>
        <editable click-move-click="true" />
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

# Reorder Rows by Dragging and Dropping

You can enable users to reorder the Gantt's TreeList rows by using the drag and drop functionality provided by the [`.Editable.Reorder`](/api/kendo.mvc.ui.fluent/gantteditablesettingsbuilder#reordersystemboolean) configuration option.

The following example demonstrates how you can reorder the TreeList rows of the Gantt component using drag and drop:

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
        .Editable(editable => editable.Reorder(true))
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
    <kendo-gantt name="gantt">
        <columns>
            <gantt-column field="TaskID" title="ID" width="50px">
            </gantt-column>
            <gantt-column editable="true" field="title" title="Title" width="255px">
            </gantt-column>
            <gantt-column field="start" editable="true" title="Start Date" width="100">
            </gantt-column>
            <gantt-column field="end" editable="true" title="End Date" width="100">
            </gantt-column>
        </columns>
        <editable reorder="true" />
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