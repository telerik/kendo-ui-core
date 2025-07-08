---
title: Ajax Binding
page_title: Ajax Binding
description: "Learn how to configure the Telerik UI Gantt for {{ site.framework }} to use Ajax binding"
slug: htmlhelpers_gantt_ajaxbinding_aspnetcore
position: 1
---

# Ajax Binding

You can bind the Telerik UI Gantt for {{ site.framework }} using Ajax binding to load and process tasks and dependencies through server-side Action methods.

For a complete example, refer to the [Basic Usage Demo of the Gantt component](https://demos.telerik.com/{{ site.platform }}/gantt/basic-usage).

To configure the Gantt for Ajax data binding, follow the next steps:

1. Set up the Gantt’s DataSource configuration
 - Specify the action methods for the CRUD operations in the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` and  `DependencyDataSource` configurations.
 - Define the unique Model identifier in the `Id()` option of the `Model` configuration of each DataSource. In addition, map the required Model fields, such as `ParentID`, `Start`, `End`, `Expanded`, and more, in the `Model` configuration.
 - Configure the additional Gantt settings like views, columns, and more.

```HtmlHelper
    @using Kendo.Mvc.Examples.Models.Gantt;
    
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(50);
            columns.Bound(c => c.Title).Editable(true).Sortable(true);
            columns.Group(g =>
            {
                g.Bound(c => c.Start).Width(100).Editable(true).Sortable(true);
                g.Bound(c => c.End).Width(100).Editable(true).Sortable(true);
            }).Title("Timings");
        })
        .Views(views =>
        {
            views.DayView();
            views.WeekView(weekView => weekView.Selected(true));
            views.MonthView();
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
            .Read("Basic_Usage_ReadTasks", "Gantt")
            .Destroy("Basic_Usage_DestroyTask", "Gantt")
            .Update(update => update.Action("Basic_Usage_UpdateTask", "Gantt").Data("onUpdateCreate"))
            .Create(create => create.Action("Basic_Usage_CreateTask", "Gantt").Data("onUpdateCreate"))
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
            })
            .Read("Basic_Usage_ReadDependencies", "Gantt")
            .Create("Basic_Usage_CreateDependency", "Gantt")
            .Destroy("Basic_Usage_DestroyDependency", "Gantt")
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

{% if site.core %}

```TagHelper
    @addTagHelper *, Kendo.Mvc
    
    <kendo-gantt snap="false" height="700" show-work-days="false" show-work-hours="false" name="gantt">
    	<columns>
    	 	<gantt-column  field="TaskID" title="ID" width="50px">
    	 	</gantt-column>
    		<gantt-column editable="true" field="title" title="Title" width="255px">
    	 	</gantt-column>
            <gantt-column title="Timings">
                <columns>
                    <gantt-column field="start" editable="true" title="Start Date" width="100">
                        <sortable  enabled="true"/>
                    </gantt-column>
                    <gantt-column field="end" editable="true" title="End Date" width="100">
                        <sortable enabled="true" />
                    </gantt-column>
                </columns>
            </gantt-column>
    	</columns>
    	<views>
    	 	<gantt-view type="GanttViewType.Day">
    	 	</gantt-view>
    	 	<gantt-view selected="true" type="GanttViewType.Week">
    	 	</gantt-view>
    	 	<gantt-view type="GanttViewType.Month">
    	 	</gantt-view>
    	</views>
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
    	 	 	<update data="onUpdateCreate" url="@Url.Action("Basic_Usage_UpdateTask","Gantt")" />
    	 	 	<create data="onUpdateCreate" url="@Url.Action("Basic_Usage_CreateTask","Gantt")" />
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
    <script>
        // Send the dates for the newly creted/updated tasks as UTC strings
        function onUpdateCreate(e) {
            e.End = e.End.toISOString();
            e.Start = e.Start.toISOString();
        }
    </script>
```
{% endif %}

2. Define the Action methods in the Controller
   * Create action methods for reading, creating, updating, and deleting tasks and dependencies.
   * Each action method must return a JSON result using the `ToDataSourceResult(request, ModelState)` method for proper binding and validation handling.

```Controller
    public partial class GanttController : Controller
    {
        public ActionResult Basic_Usage()
        {
            return View();
        }

        public virtual JsonResult Basic_Usage_ReadTasks([DataSourceRequest] DataSourceRequest request)
        {
            return Json(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Basic_Usage_DestroyTask([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Delete(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Basic_Usage_CreateTask([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Insert(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Basic_Usage_UpdateTask([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Basic_Usage_ReadDependencies([DataSourceRequest] DataSourceRequest request)
        {
            return Json(dependencyService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Basic_Usage_DestroyDependency([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            if (ModelState.IsValid)
            {
                dependencyService.Delete(dependency);
            }

            return Json(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Basic_Usage_CreateDependency([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            if (ModelState.IsValid)
            {
                dependencyService.Insert(dependency);
            }

            return Json(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }
    }
```

## See Also

* [Gantt Basic Usage Demo](https://demos.telerik.com/{{ site.platform }}/gantt/basic-usage)
* [Gantt Server-Side API](/api/gantt)
{% if site.core %}
* [Server-Side TagHelper API of the Gantt](/api/taghelpers/gantt)
{% endif %}
