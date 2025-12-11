---
title: Resources
page_title: Resources
description: "Use resources in the Telerik UI Gantt component for {{ site.framework }}."
components: ["gantt"]
slug: htmlhelpers_gantt_resources_aspnetcore
position: 6
---

# Resources

The Gantt allows you to assign resources to tasks. A resource is optional metadata that can be associated with a Gantt task.

The resources are set through the `Resources` configuration method.

When setting resources from a remote endpoint, the Gantt expects the data items to have the following signature: `{ id: 0, name: "Resource 1", color: "green", format: "p0" }`. In case the **ResourceViewModel** is different and requires mapping, use a custom `DataSource` to configure the mapping:

```HtmlHelper
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Resources(r => r
            .Field("resources")
            .DataColorField("MyColorField")
            .DataTextField("MyNameField")
            .DataSource(d => d
                .Custom()
                .Schema(s => s
                    .Model(m => m.Id("MyIDField"))
                    .Data("Data")
                )
                .Transport(t =>
                {
                    t.Read("ReadResources", "Gantt");
                })
            )
        )
    )
```
{% if site.core %}
```TagHelper
    <kendo-gantt name="gantt">
    	<resources datacolorfield="MyColorField" datatextfield="MyNameField" field="resources">
            <datasource type="DataSourceTagHelperType.Custom">
                <schema data="Data" total="Total" errors="Errors">
                    <model id="MyIDField">
                        <fields>
                            <field name="MyIDField" type="number"></field>
                            <field name="MyColorField" type="string"></field>
                            <field name="MyNameField" type="string"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read  url="@Url.Action("ReadResources","Gantt")" />
                </transport>
            </datasource>
        </resources>
    </kendo-gantt>
```
{% endif %}

## Assignments

An assignment is a one-to-one mapping between a Gantt task and a Gantt resource containing the number of units for which a resource is assigned to a task.

The assignments are set through the `Assignments` configuration method.

The following example demonstrates how to set resources in the Gantt and how to map them to tasks by setting assignments.

```HtmlHelper
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.Title).Editable(true).Sortable(true);
            columns.Resources("resources").Editable(true).Title("Assigned Resources");
        })
        .Views(views =>
        {
            views.DayView();
            views.WeekView();
            views.MonthView(monthView => monthView.Selected(true));
        })
        .Height(700)
        .ShowWorkHours(false)
        .ShowWorkDays(false)
        .Snap(false)
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.TaskID);
                m.ParentId(f => f.ParentID);
                m.Field(f => f.Expanded).DefaultValue(true);
            })
            .Read("ReadTasks", "Gantt")
            .Destroy("DestroyTask", "Gantt")
            .Update(update => update.Action("UpdateTask", "Gantt").Data("onUpdateCreate"))
            .Create(create => create.Action("CreateTask", "Gantt").Data("onUpdateCreate"))
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
            })
            .Read("ReadDependencies", "Gantt")
            .Create("CreateDependency", "Gantt")
            .Destroy("DestroyDependency", "Gantt")
        )
        .Resources(r => r
            .Field("resources")
            .DataColorField("Color")
            .DataTextField("Name")
            .DataSource(d => d
                .Custom()
                .Schema(s => s
                    .Model(m => m.Id("ID"))
                    .Data("Data")
                )
                .Transport(t =>
                {
                    t.Read("ReadResources", "Gantt");
                })
            )
        )
        .Assignments<ResourceAssignmentViewModel>(a => a
            .DataTaskIdField("TaskID")
            .DataResourceIdField("ResourceID")
            .DataValueField("Units")
            .DataSource(d => d
                .Model(m =>
                {
                    m.Id(f => f.ID);
                })
                .Read("ReadAssignments", "Gantt")
                .Create("CreateAssignment", "Gantt")
                .Destroy("DestroyAssignment", "Gantt")
                .Update("UpdateAssignment", "Gantt")
            )
        )
    )

    <script>
        // Send the dates for the newly creted/updated tasks as UTC strings
        function onUpdateCreate(e) {
            e.End = e.End.toISOString();
            e.Start = e.Start.toISOString();
        }
    </script>
```

For a complete example on using resources in the Gantt, refer to the [Resources demo](https://demos.telerik.com/{{ site.platform }}/gantt/resources).

## See Also

* [Server-Side API](/api/scheduler)
