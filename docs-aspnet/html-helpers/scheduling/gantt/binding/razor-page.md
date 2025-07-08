---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Gantt component for {{ site.framework }} in a Razor Page."
slug: htmlhelpers_gantt_razorpage_aspnetcore
position: 3
---

# Gantt in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI Gantt for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the Gantt component in a Razor Pages scenario.

For the complete project, refer to the [Gantt in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Gantt).

## Getting Started

To configure the CRUD operations of the Gantt DataSource within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` in the [`DataSource`](/api/kendo.mvc.ui.fluent/ganttbuilder#datasourcesystemaction) configuration. The URL in each of these options must refer to the method name in the `PageModel`.

```HtmlHelper
    @page
    @model IndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
    @(Html.Kendo().Gantt<TaskViewModel, DependencyViewModel>()
        .Name("gantt")
        .Columns(columns =>
        {
            columns.Bound(c => c.TaskID).Title("ID").Width(80);
            columns.Bound(c => c.Title).Width(250).Editable(true).Sortable(true);
            columns.Bound(c => c.Start).Width(150).Editable(true).Sortable(true);
            columns.Bound(c => c.End).Width(150).Editable(true).Sortable(true);
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
                m.Field<string>(f=>f.TaskID);
            })
            .Read(r => r.Url("/Gantt/GanttIndex?handler=Read").Data("forgeryToken"))
            .Create(r => r.Url("/Gantt/GanttIndex?handler=Create").Data("forgeryToken"))
            .Update(r => r.Url("/Gantt/GanttIndex?handler=Update").Data("forgeryToken"))
            .Destroy(r => r.Url("/Gantt/GanttIndex?handler=Destroy").Data("forgeryToken"))
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
            })
            .Read(r => r.Url("/Gantt/GanttIndex?handler=DependenciesRead").Data("forgeryToken"))
        )
    )
    <script>
        function forgeryToken() {
            return kendo.antiForgeryTokens();
        }
    </script>
```

```TagHelper
    @page
    @model IndexModel
    @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
    @Html.AntiForgeryToken()
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
    	 	</transport>
    	</gantt-datasource>
    	<dependency-datasource name="dependencies" type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="/Index?handler=Read" data="forgeryToken"/>
                    <update url="/Index?handler=Update" data="forgeryToken" />
                    <create url="/Index?handler=Create" data="forgeryToken"/>
                    <destroy url="/Index?handler=Destroy" data="forgeryToken"/>
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

1. Add an `AntiForgeryToken` at the top of the page.
    ```
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```
1. Send the `AntiForgeryToken` with the Read request.
    ```JavaScript
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```
    
    Additional parameters can also be supplied.
    ```JavaScript
        <script>
            function forgeryToken() {
                return {
                    __RequestVerificationToken: kendo.antiForgeryTokens().__RequestVerificationToken,
                    additionalParameter: "test"
                }
            }
        </script>
    ```
1. Within the `cshtml.cs` file, add a handler method for each data operation.
    ```C# Index.cshtml.cs
        public JsonResult OnPostRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(tasks.ToDataSourceResult(request));
        }
    
        public JsonResult OnPostCreate([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            task.TaskID = Guid.NewGuid().ToString();
    
            if (ModelState.IsValid)
            {
                tasks.Add(task);
            }
            return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    
        public JsonResult OnPostUpdate([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            int index = tasks.IndexOf(tasks.FirstOrDefault(item => { return item.TaskID == task.TaskID; }));
            tasks[index] = task;
    
            return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    
        public JsonResult OnPostDestroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            int index = tasks.IndexOf(tasks.FirstOrDefault(item => { return item.TaskID == task.TaskID; }));
            tasks.RemoveAt(index);
    
            return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
        }
    
        public JsonResult OnPostDependenciesRead([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(dependencies.ToDataSourceResult(request));
        }
    
        public JsonResult OnPostDependenciesCreate([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            if (ModelState.IsValid)
            {
                dependencies.Add(dependency);
            }
    
            return new JsonResult(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }
    
        public JsonResult OnPostDependenciesUpdate([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            int index = dependencies.IndexOf(dependencies.FirstOrDefault(item => { return item.DependencyID == dependency.DependencyID; }));
            dependencies[index] = dependency;
    
            return new JsonResult(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }
    
        public JsonResult OnPostDependenciesDestroy([DataSourceRequest] DataSourceRequest request, DependencyViewModel dependency)
        {
            int index = dependencies.IndexOf(dependencies.FirstOrDefault(item => { return item.DependencyID == dependency.DependencyID; }));
            dependencies.RemoveAt(index);
    
            return new JsonResult(new[] { dependency }.ToDataSourceResult(request, ModelState));
        }
    ```
## See Also
* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Gantt](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Server-Side HtmlHelper API of the Gantt](/api/gantt)
* [Server-Side TagHelper API of the Gantt](/api/taghelpers/gantt)
* [Knowledge Base Section](/knowledge-base)