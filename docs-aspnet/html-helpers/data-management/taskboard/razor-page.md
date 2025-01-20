---
title: Razor Pages
page_title: Razor Pages
description: "Telerik UI TaskBoard for {{ site.framework }} in a Razor Pages application."
slug: razorpages_taskboard_aspnetcore
position: 11
---

# TaskBoard in Razor Pages

Razor Pages is an alternative to the MVC pattern that makes page-focused coding easier and more productive. This approach consists of a `cshtml` file and a `cshtml.cs` file (by design, the two files have the same name). 

You can seamlessly integrate the Telerik UI TaskBoard for {{ site.framework }} in Razor Pages applications.

This article describes how to configure the TaskBoard component in a Razor Pages scenario.

## Getting Started

To configure the CRUD operations of the TaskBoard DataSource within a Razor Pages application, follow the next steps:

1. Specify the `Read`, `Create`, `Update`, and `Destroy` options of the `DataSource` in the [`Columns`](/api/kendo.mvc.ui.fluent/taskboardbuilder#columnssystemaction) and TaskBoard configurations . The URL in each of these options must refer to the method name in the `PageModel`.

    ```HtmlHelper_Index.cshtml
        @page
        @model IndexModel

        @(Html.Kendo().TaskBoard<TaskViewModel, Column>()
            .Name("taskBoard")
            .ColumnSettings(columnSettings => columnSettings
                .DataTextField("Text")
                .DataStatusField("ID")
            )
            .Columns(dataSource => dataSource
                .Ajax()
                .Model(model => model.Id(p => p.ID))
                .Read(r => r.Url("/Index?handler=Editing_Columns_Read").Data("forgeryToken"))
                .Create(r => r.Url("/Index?handler=Editing_Columns_Create").Data("forgeryToken"))
                .Update(r => r.Url("/Index?handler=Editing_Columns_Update").Data("forgeryToken"))
                .Destroy(r => r.Url("/Index?handler=Editing_Columns_Destroy").Data("forgeryToken"))
            )
            .DataTitleField("Title")
            .DataStatusField("OwnerID")
            .DataDescriptionField("Description")
            .DataCategoryField("ID")
            .TemplateId("card-template")
            .DataSource(dataSource => dataSource
                .Ajax()
                .Model(model => model.Id(p => p.TaskID))
                .Read(r => r.Url("/Index?handler=Tasks_Read").Data("forgeryToken"))
                .Create(r => r.Url("/Index?handler=Tasks_Create").Data("forgeryToken"))
                .Update(r => r.Url("/Index?handler=Tasks_Update").Data("forgeryToken"))
                .Destroy(r => r.Url("/Index?handler=Tasks_Destroy").Data("forgeryToken"))
            )
        )
    ```
    ```TagHelper_Index.cshtml
        @page
        @model IndexModel
        @addTagHelper *, Kendo.Mvc

        <kendo-taskboard name="taskBoard"
            datacategoryfield="ID"
            datadescriptionfield="Description"
            datastatusfield="OwnerID" 
            datatitlefield="Title"
            template-id="card-template">
            <column-settings datastatusfield="ID" datatextfield="Text"></column-settings>
            <editable enabled="true"></editable>
            <taskboard-columns>
                <datasource type="DataSourceTagHelperType.Ajax">
                    <schema data="Data" total="Total" errors="Errors">
                        <model id="ID">
                            <fields>
                                <field name="ID" type="number"></field>
                                <field name="Text" from="Text" type="string"></field>
                            </fields>
                        </model>
                    </schema>
                    <transport>
                        <read url="/Index?handler=Editing_Columns_Read" data="forgeryToken"/>
                        <update url="/Index?handler=Editing_Columns_Update" data="forgeryToken"//>
                        <create url="/Index?handler=Editing_Columns_Create" data="forgeryToken"//>
                        <destroy url="/Index?handler=Editing_Columns_Destroy" data="forgeryToken"//>
                    </transport>
                </datasource>
            </taskboard-columns>
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema data="Data" total="Total" errors="Errors">
                    <model id="TaskID">
                        <fields>
                            <field name="TaskID" type="number"></field>
                            <field name="Title" type="string"></field>
                            <field name="Description" type="string"></field>
                            <field name="Start" type="date"></field>
                            <field name="End" type="date"></field>
                            <field name="OwnerID" type="number" default-value="0"></field>
                        </fields>
                    </model>
                </schema>
                <transport>
                    <read url="/Index?handler=Tasks_Read" data="forgeryToken"/>
                    <update url="/Index?handler=Tasks_Update" data="forgeryToken" />
                    <create url="/Index?handler=Tasks_Create" data="forgeryToken"/>
                    <destroy url="/Index?handler=Tasks_Destroy" data="forgeryToken"/>
                </transport>
            </datasource>
        </kendo-taskboard>
    ```
    ```tab-card-template
        <script id="card-template" type="text/x-kendo-template">
            <div class="template-container">
                <div class="template-header">
                    <span class="template-title">#: Title #</span>
                    <span class="template-menu">#=cardMenuButton#</span>
                </div>
                <p>#= (Description == null) ? ' ' : Description #</p>
                <p>#:kendo.toString( Start, "MMMM dd")#</p>
            </div>
        </script>
    ```
    
1. Add an `AntiForgeryToken` at the top of the page.

    ```C#
        @inject Microsoft.AspNetCore.Antiforgery.IAntiforgery Xsrf
        @Html.AntiForgeryToken()
    ```

1. Send the `AntiForgeryToken` with the CRUD requests.

    ```JS
        <script>
            function forgeryToken() {
                return kendo.antiForgeryTokens();
            }
        </script>
    ```

    Additional parameters can also be supplied.

    ```JS
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

    ```tab-Index.cshtml.cs

        private ISchedulerEventService<TaskViewModel> taskService;
        public const string SessionKeyID = "ID";
        private List<Column> columns = GetColumns() as List<Column>;

        public IndexModel(ISchedulerEventService<TaskViewModel> schedulerTaskService)
        {
            taskService = schedulerTaskService;
        }

        public virtual JsonResult OnPostTasks_Read([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult OnPostTasks_Destroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Delete(task, ModelState);
            }
            return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostTasks_Create([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Insert(task, ModelState);
            }
            return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostTasks_Update([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }
            return new JsonResult(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostEditing_Columns_Read([DataSourceRequest] DataSourceRequest request)
        {
            return new JsonResult(GetColumns().ToDataSourceResult(request));
        }

        public virtual JsonResult OnPostEditing_Columns_Destroy([DataSourceRequest] DataSourceRequest request, Column column)
        {
            if (ModelState.IsValid)
            {
                columns.Remove(columns.Where(x => x.ID == column.ID).FirstOrDefault());
            }
            return new JsonResult(new[] { column }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostEditing_Columns_Create([DataSourceRequest] DataSourceRequest request, Column column)
        {
            if (ModelState.IsValid)
            {
                if (column.ID == 0)
                {
                    column.ID = GetColumns().Last().ID + 1;
                    HttpContext.Session.SetInt32(SessionKeyID, column.ID);
                }
            }
            return new JsonResult(new[] { column }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult OnPostEditing_Columns_Update([DataSourceRequest] DataSourceRequest request, Column column)
        {
            if (ModelState.IsValid)
            {
                var taskToUpdate = columns.Where(x => x.ID == column.ID).FirstOrDefault();
                if (taskToUpdate != null)
                {
                    taskToUpdate = column;
                }
            }
            return new JsonResult(new[] { column }.ToDataSourceResult(request, ModelState));
        }

        private static IList<Column> GetColumns()
        {
            IList<Column> taskBoardColumns = new List<Column>()
            {
                new Column { ID = 1, Text = "Pending", Status = "pending" },
                new Column { ID = 2, Text = "Under Review", Status = "underReview" },
                new Column { ID = 3, Text = "Scheduled", Status = "scheduled" }
            };
            return taskBoardColumns;
        }
    ```
    ```tab-Model
        using Kendo.Mvc.UI;

        public class TaskViewModel : ISchedulerEvent
        {
            public int TaskID { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            private DateTime start;
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

            public string StartTimezone { get; set; }
            private DateTime end;
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

            public string EndTimezone { get; set; }
            public string RecurrenceRule { get; set; }
            public int? RecurrenceID { get; set; }
            public string RecurrenceException { get; set; }
            public bool IsAllDay { get; set; }
            public int? OwnerID { get; set; }
        }

        public class Column
        {
            public int ID { get; set; }
            public string Text { get; set; }
            public string Status { get; set; }
        }
    ```

## See Also

* [Using Telerik UI for ASP.NET Core in Razor Pages](https://docs.telerik.com/aspnet-core/getting-started/razor-pages#using-telerik-ui-for-aspnet-core-in-razor-pages)
* [Client-Side API of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
* [Server-Side HtmlHelper API of the TaskBoard](/api/taskboard)
* [Server-Side TagHelper API of the TaskBoard](/api/taghelpers/taskboard)
* [Knowledge Base Section](/knowledge-base)
