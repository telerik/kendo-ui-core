---
title: Events
page_title: Events
description: "Learn how to handle the events of the Telerik UI Gantt component for {{ site.framework }}."
slug: gantt_events
position: 5
---

# Events

You can subscribe to [all Gantt events](/api/kendo.mvc.ui.fluent/gantteventbuilder) and then use them to further customize the behavior of the component.

The example below demonstrates how to use the [`Move` event](api/kendo.mvc.ui.fluent/gantteventbuilder#movesystemstring) that the Gantt generates when the user moves a task.

```HtmlHelper
@using Kendo.Mvc.UI
@using MyApplication.Models;

<p class="title">Gantt</p>

@(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
	.Name("gantt")
	.Columns(columns =>
	{
		columns.Bound(c => c.TaskID).Title("ID").Width(50);
		columns.Bound(c => c.Title).Editable(true).Sortable(true);
		columns.Bound(c => c.Start).Title("Start Date").Format("{0:dd/MM/yyyy}").Width(100).Editable(true).Sortable(true);
		columns.Bound(c => c.End).Title("End Date").Format("{0:dd/MM/yyyy}").Width(100).Editable(true).Sortable(true);
		columns.Bound(c => c.PlannedStart).Hidden(true).Title("Planned Start Date").Format("{0:dd/MM/yyyy}");
		columns.Bound(c => c.PlannedEnd).Hidden(true).Title("Planned End Date").Format("{0:dd/MM/yyyy}");
	})
	.Views(views =>
	{
		views.WeekView(weekView => weekView.Selected(true));
		views.MonthView();
	})
	.ListWidth("400px")
	.ShowPlannedTasks(true)
	.Toolbar(t => t.Add().Name("plannedTasks"))
	.Height(700)
	.Events(events => events
		.Move("onMove")
	)
	.DataSource(d => d
		.Model(m =>
		{
			m.Id(f => f.TaskID);
			m.ParentId(f => f.ParentID);
			m.OrderId(f => f.OrderId);
			m.Field(f => f.Expanded).DefaultValue(true);
			m.Field(f => f.Start);
			m.Field(f => f.End);
			m.Field(f => f.PercentComplete);
			m.Field(f => f.PlannedStart);
			m.Field(f => f.PlannedEnd);
			m.Field(f => f.Summary);
		})
		.Read(read => read.Action("ReadTasks", "Home"))
		.Destroy(destroy => destroy.Action("DestroyTask", "Home"))
		.Update(update => update.Action("UpdateTask", "Home"))
		.Create(create => create.Action("CreateTask", "Home"))
	)
	.DependenciesDataSource(d => d
		.Model(m =>
		{
			m.Id(f => f.DependencyID);
			m.PredecessorId(f => f.PredecessorID);
			m.SuccessorId(f => f.SuccessorID);
			m.Type(f => f.Type);
		})
		.Read("ReadDependencies", "Home")
		.Create("CreateDependency", "Home")
		.Update("UpdateDependency", "Home")
		.Destroy("DestroyDependency", "Home")
	)
)

<script>	
	function onMove(e) {
		console.log(e.task);
	}
</script>
```
{% if site.core %}
```TagHelper
@addTagHelper *, Kendo.Mvc

<p class="title">Gantt</p>
<kendo-gantt height="700" list-width="400px" show-planned-tasks="true" name="gantt"
	on-move="onMove">
	<columns>
	 	<gantt-column field="TaskID" title="ID" width="50px">
	 	</gantt-column>
		<gantt-column field="title" width="200px" editable="true" sortable="true">
	 	</gantt-column>
	 	<gantt-column field="start" format="{0:dd/MM/yyyy}" title="Start Date" editable="true" sortable="true">
	 	</gantt-column>
	 	<gantt-column field="end" format="{0:dd/MM/yyyy}" title="End Date" editable="true" sortable="true">
	 	</gantt-column>
	 	<gantt-column field="plannedStart" format="{0:dd/MM/yyyy}" title="Planned Start Date" hidden="true">
	 	</gantt-column>
	 	<gantt-column field="plannedEnd" format="{0:dd/MM/yyyy}" title="Planned End Date" hidden="true">
	 	</gantt-column>
	</columns>
	<views>
	 	<gantt-view selected="true" type="GanttViewType.Week">
	 	</gantt-view>
	 	<gantt-view type="GanttViewType.Month">
	 	</gantt-view>
	</views>
	<toolbars>
	 	<toolbar name="plannedTasks">
	 	</toolbar>
	</toolbars>
	<gantt-datasource type="DataSourceTagHelperType.Ajax" server-paging="false">
	 	<schema>
			<model id="TaskID" parent-id="parentID">
				<fields>
					<field name="TaskID" type="number"></field>
					<field name="parentId" from="ParentID" type="number" default-value="null"></field>
					<field name="title" from="Title" type="string"></field>
					<field name="start" from="Start" type="date"></field>
					<field name="end" from="End" type="date"></field>
					<field name="summary" from="Summary" type="boolean"></field>
					<field name="expanded" from="Expanded" type="boolean" default-value="true"></field>
					<field name="percentComplete" from="PercentComplete" type="number"></field>
					<field name="plannedStart" from="PlannedStart" type="date"></field>
                    <field name="plannedEnd" from="PlannedEnd" type="date"></field>
				</fields>
			</model>
	 	</schema>
	 	<transport >
	 	 	<read url="@Url.Action("ReadTasks","Home")" />
			<update url="@Url.Action("UpdateTasks","Home")" />
			<destroy url="@Url.Action("DestroyTasks","Home")" />
			<create url="@Url.Action("CreateTasks","Home")" />
	 	</transport>
	</gantt-datasource>
	<dependency-datasource name="dependencies" type="DataSourceTagHelperType.Ajax">
        <transport>
            <read url="@Url.Action("ReadDependencies", "Home")" />
            <create url="@Url.Action("CreateDependency", "Home")" />
			<update url="@Url.Action("UpdateDependency", "Home")" />
            <destroy url="@Url.Action("DestroyDependency", "Home")" />
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

<script>	
	function onMove(e) {
		console.log(e.task);
	}
</script>
```
{% endif %}

## Next Steps

* [Using the Gantt Events (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/events)

## See Also

* [Using the API of the Gantt for {{ site.framework }} (Demo)](https://demos.telerik.com/{{ site.platform }}/gantt/api)
* [Server-Side API of the Gantt](/api/gantt)
* [Client-Side API of the Gantt](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
