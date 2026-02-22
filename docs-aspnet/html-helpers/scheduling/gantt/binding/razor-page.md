---
title: Razor Pages
page_title: Razor Pages
description: "An example on how to configure the Telerik UI Gantt component for {{ site.framework }} in a Razor Page."
components: ["gantt"]
slug: htmlhelpers_gantt_razorpage_aspnetcore
position: 3
---

# Gantt in Razor Pages

This article describes how to seamlessly integrate and configure the Telerik UI Loader for {{ site.framework }} in Razor Pages applications.

> You can use any of the available [data binding approaches]({% slug htmlhelpers_gantt_databinding %}#data-binding-approaches) to bind the component to data in a Razor Pages application.

@[template](/_contentTemplates/core/razor-pages-general-info.md#referencing-handler-methods)

## Binding to Remote Data

To configure the CRUD operations of the Gantt DataSource within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` configurations for the tasks and dependencies. The URL in each of these options must refer to the method name in the `PageModel`.

    ```HtmlHelper
    @page
    @model IndexModel

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
            .Read(r => r.Url(Url.Page("Index", "Read")).Data("forgeryToken"))
            .Create(r => r.Url(Url.Page("Index", "Create")).Data("forgeryToken"))
            .Update(r => r.Url(Url.Page("Index", "Update")).Data("forgeryToken"))
            .Destroy(r => r.Url(Url.Page("Index", "Destroy")).Data("forgeryToken"))
        )
        .DependenciesDataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.DependencyID);
                m.PredecessorId(f => f.PredecessorID);
                m.SuccessorId(f => f.SuccessorID);
            })
            .Read(r => r.Url(Url.Page("Index", "DependenciesRead")).Data("forgeryToken"))
            .Create(r => r.Url(Url.Page("Index", "DependenciesCreate")).Data("forgeryToken"))
            .Update(r => r.Url(Url.Page("Index", "DependenciesUpdate")).Data("forgeryToken"))
            .Destroy(r => r.Url(Url.Page("Index", "DependenciesDestroy")).Data("forgeryToken"))
        )
    )
    ```
    ```TagHelper
    @page
    @model IndexModel
    @addTagHelper *, Kendo.Mvc
    
    <kendo-gantt name="gantt" snap="false" height="700" show-work-days="false" show-work-hours="false">
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
            <transport>
                <read url="@Url.Page("Index","Read")" data="forgeryToken"/>
                <update url="@Url.Page("Index","Update")" data="forgeryToken"/>
                <create url="@Url.Page("Index","Create")" data="forgeryToken"/>
                <destroy url="@Url.Page("Index","Destroy")" data="forgeryToken"/>
            </transport>
        </gantt-datasource>
        <dependency-datasource name="dependencies" type="DataSourceTagHelperType.Ajax">
            <transport>
                <read url="@Url.Page("Index", "DependenciesRead")" data="forgeryToken"/>
                <update url="@Url.Page("Index", "DependenciesUpdate")" data="forgeryToken" />
                <create url="@Url.Page("Index", "DependenciesCreate")" data="forgeryToken"/>
                <destroy url="@Url.Page("Index", "DependenciesDestroy")" data="forgeryToken"/>
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
    ```C# TaskViewModel
    using Kendo.Mvc.UI;
    using System.ComponentModel.DataAnnotations;

    public class TaskViewModel : IGanttTask
    {
        public int TaskID { get; set; }
        public int? ParentID { get; set; }
        public string Title { get; set; }

        private DateTime start;
        [Display(Name ="Start Time")]
        [DisplayFormat(DataFormatString="{0:MM/dd/yyyy}")]
        public DateTime Start
        {
            get
            {
                return start;
            }
            set
            {
                start = value.ToUniversalTime();
            }
        }

        private DateTime end;
        [Display(Name = "End Time")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime End
        {
            get
            {
                return end;
            }
            set
            {
                end = value.ToUniversalTime();
            }
        }

        private DateTime plannedStart;
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime PlannedStart
        {
            get
            {
                return plannedStart;
            }
            set
            {
                plannedStart = value.ToUniversalTime();
            }
        }

        private DateTime plannedEnd;
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime PlannedEnd
        {
            get
            {
                return plannedEnd;
            }
            set
            {
                plannedEnd = value.ToUniversalTime();
            }
        }

        public string TeamLead { get; set; }
        public bool Summary { get; set; }
        public bool Expanded { get; set; }
        public decimal PercentComplete { get; set; }
        public int OrderId { get; set; }
    }
    ```
    ```C# DependencyViewModel
    using System;
    using Kendo.Mvc.UI;

    public class DependencyViewModel : IGanttDependency
    {
        public int DependencyID { get; set; }
        public int PredecessorID { get; set; }
        public int SuccessorID { get; set; }
        public DependencyType Type { get; set; }
    }
    ```

For the complete project, refer to the [Gantt in Razor Pages example](https://github.com/telerik/ui-for-aspnet-core-examples/tree/master/Telerik.Examples.RazorPages/Telerik.Examples.RazorPages/Pages/Gantt).

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the Gantt](https://docs.telerik.com/kendo-ui/api/javascript/ui/gantt)
* [Server-Side HtmlHelper API of the Gantt](/api/gantt)
* [Server-Side TagHelper API of the Gantt](/api/taghelpers/gantt)
* [Knowledge Base Section](/knowledge-base)