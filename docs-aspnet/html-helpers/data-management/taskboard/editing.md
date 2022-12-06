---
title: Editing
page_title: Editing
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and learn how to implement its editing functionality."
slug: htmlhelpers_taskboard_aspnetcore_editing
position: 5
---

# Editing

The TaskBoard allows column and card editing. By default, editing in the TaskBoard is enabled for both columns and cards.

## Editing Configuration

To set up editing:

1. [Configure the Model and the CRUD operations in the DataSource](#configuring-the-data-source)
1. [Set the `Editable` configuration (optional)](#setting-the-editable-option)

The following example demonstrates how to configure CRUD (Create, Read, Update, Destroy) data operations for columns and the cards of the TaskBoard. For an example of the editing functionality, refer to the [Editing (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/editing).

```HtmlHelper
    @(Html.Kendo().TaskBoard<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel, Kendo.Mvc.Examples.Models.TaskBoard.Column>()
        .Name("taskBoard")
        .ColumnSettings(columnSettings => columnSettings
            .DataTextField("Text")
            .DataStatusField("ID")
        )
        .Columns(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.ID))
            .Read("Editing_Columns_Read", "TaskBoard")
            .Create("Editing_Columns_Create", "TaskBoard")
            .Update("Editing_Columns_Update", "TaskBoard")
            .Destroy("Editing_Columns_Destroy", "TaskBoard")
        )
        .DataTitleField("Title")
        .DataStatusField("OwnerID")
        .DataDescriptionField("Description")
        .DataCategoryField("ID")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.TaskID))
            .Read(read => read.Action("Tasks_Read", "TaskBoard"))
            .Create(create => create.Action("Tasks_Create", "TaskBoard"))
            .Update(update => update.Action("Tasks_Update", "TaskBoard"))
            .Destroy(destroy => destroy.Action("Tasks_Destroy", "TaskBoard"))
        )
    )
```
{% if site.core %}
```TagHelper
  <kendo-taskboard 
		datacategoryfield="ID" 
		datadescriptionfield="Description" 
		datastatusfield="OwnerID" 
		datatitlefield="Title"
		name="taskBoard" >
        <taskboard-columns>
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema data="Data" total="Total" errors="Errors">
                    <model id="ID"></model>
                </schema>
                <transport>
                    <read url="@Url.Action("Editing_Columns_Read", "TaskBoard")" />
                    <update url="@Url.Action("Editing_Columns_Update", "TaskBoard")" />
                    <create url="@Url.Action("Editing_Columns_Create", "TaskBoard")"/>
                    <destroy url="@Url.Action("Editing_Columns_Destroy", "TaskBoard")"/>
                </transport>
            </datasource>
        </taskboard-columns>
		<datasource type="DataSourceTagHelperType.Ajax">
	 		<schema data="Data" total="Total" errors="Errors">
				 <model id="TaskID"></model>
	 		</schema>
	 		<transport>
	 	 		<read url="@Url.Action("Tasks_Read", "TaskBoard")" />
	 	 	    <update url="@Url.Action("Tasks_Update", "TaskBoard")" />
	 	 	    <create url="@Url.Action("Tasks_Create", "TaskBoard")"/>
	 	 	    <destroy url="@Url.Action("Tasks_Destroy", "TaskBoard")"/>
	 		</transport>
		</datasource>
		<column-settings datastatusfield="ID" datatextfield="Text">
		</column-settings>
		<editable enabled="true">
		</editable>
	</kendo-taskboard>

```
{% endif %}
```Controller
    public partial class TaskBoardController : Controller
    {
        private SchedulerTaskService taskService;

        private List<Column> columns = GetColumns() as List<Column>;

        public TaskBoardController()
        {
            this.taskService = new SchedulerTaskService();
        }

        [Demo]
        public ActionResult Editing()
        {
            return View();
        }

        public virtual JsonResult Tasks_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Tasks_Destroy([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Delete(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Tasks_Create([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Insert(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Tasks_Update([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Editing_Columns_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(columns.ToDataSourceResult(request));
        }

        public virtual JsonResult Editing_Columns_Destroy([DataSourceRequest] DataSourceRequest request, Column column)
        {
            if (ModelState.IsValid)
            {
                columns.Remove(columns.Where(x => x.ID == column.ID).FirstOrDefault());
            }

            return Json(new[] { column }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Editing_Columns_Create([DataSourceRequest] DataSourceRequest request, Column column)
        {
            if (ModelState.IsValid)
            {
                column.ID = ++columns.LastOrDefault().ID;
                columns.Add(column);
            }

            return Json(new[] { column }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Editing_Columns_Update([DataSourceRequest] DataSourceRequest request, Column column)
        {
            if (ModelState.IsValid)
            {
                var columnToUpdate = columns.Where(x => x.ID == column.ID).FirstOrDefault();
                if (columnToUpdate != null)
                {
                    columnToUpdate = column;
                }
            }

            return Json(new[] { column }.ToDataSourceResult(request, ModelState));
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

        protected override void Dispose(bool disposing)
        {
            taskService.Dispose();
            base.Dispose(disposing);
        }
    }
```

### Configuring the Data Source

The TaskBoard uses two different data source instances for its columns and cards.

Configure the actions, which the DataSource will call when an "Update", "Destroy", or a "Create" operation is triggered. An important part of the CRUD operations is the response from the service, which needs to return the manipulated data, so that the TaskBoard can apply the changes to the DataSource accordingly. For more information on the CRUD capabilities of the DataSource, refer to [DataSource CRUD]({% slug htmlhelper_datasourcecrud %}).

The following example demonstrates how to configure the data source of the columns.

```HtmlHelper
    .Columns(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(p => p.ID))
        .Read("Editing_Columns_Read", "TaskBoard")
        .Create("Editing_Columns_Create", "TaskBoard")
        .Update("Editing_Columns_Update", "TaskBoard")
        .Destroy("Editing_Columns_Destroy", "TaskBoard")
    )
```
{% if site.core %}
```TagHelper
        <taskboard-columns>
            <datasource type="DataSourceTagHelperType.Ajax">
                <schema data="Data" total="Total" errors="Errors">
                    <model id="ID"></model>
                </schema>
                <transport>
                    <read url="@Url.Action("Editing_Columns_Read", "TaskBoard")" />
                    <update url="@Url.Action("Editing_Columns_Update", "TaskBoard")" />
                    <create url="@Url.Action("Editing_Columns_Create", "TaskBoard")"/>
                    <destroy url="@Url.Action("Editing_Columns_Destroy", "TaskBoard")"/>
                </transport>
            </datasource>
        </taskboard-columns>

```
{% endif %}

The following example demonstrates how to configure the data source of the cards.

```HtmlHelper
    .DataSource(dataSource => dataSource
        .Ajax()
        .Model(model => model.Id(p => p.TaskID))
        .Read(read => read.Action("Tasks_Read", "TaskBoard"))
        .Create(create => create.Action("Tasks_Create", "TaskBoard"))
        .Update(update => update.Action("Tasks_Update", "TaskBoard"))
        .Destroy(destroy => destroy.Action("Tasks_Destroy", "TaskBoard"))
    )
```
{% if site.core %}
```TagHelper

		<datasource type="DataSourceTagHelperType.Ajax">
	 		<schema data="Data" total="Total" errors="Errors">
				 <model id="TaskID"></model>
	 		</schema>
	 		<transport>
	 	 		<read url="@Url.Action("Tasks_Read", "TaskBoard")" />
	 	 	    <update url="@Url.Action("Tasks_Update", "TaskBoard")" />
	 	 	    <create url="@Url.Action("Tasks_Create", "TaskBoard")"/>
	 	 	    <destroy url="@Url.Action("Tasks_Destroy", "TaskBoard")"/>
	 		</transport>
		</datasource>

```
{% endif %}

### Setting the Editable Option

Editing is enabled by default, but the `Editable` configuration exposes a number of customization options.

The following example demonstrates how to set the `Editable` configuration.

```HtmlHelper
    .Editable(ed => ed.Form(f => f.Items(it =>
    {
        it.Add().Field("Title").Label("Title");
        it.Add().Field("Description").Label("Description");
        it.Add().Field("Category").Label("Priority").Editor(e =>
        {
            e.DropDownList()
            .DataTextField("Text")
            .DataValueField("Value")
            .BindTo(new List<SelectListItem>() {
                new SelectListItem() {
                    Text = "Low",
                    Value = "1"
                },
                new SelectListItem() {
                    Text = "High",
                    Value = "2"
                },
                new SelectListItem() {
                    Text = "Critical",
                    Value = "3"
                }
            })
            .Template("<span style='color: red'>#:Text#</span>")
            .ValueTemplate("<span style='color: blue'>#:Text#</span>");
        });
    })))
```

## See Also

* [Editing of the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/editing)
* [JavaScript API Reference of the TaskBoard](https://docs.telerik.com/kendo-ui/api/javascript/ui/taskboard)
