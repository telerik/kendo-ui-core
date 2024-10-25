---
title: Data Binding
page_title: Data Binding
description: "Get started with the Telerik UI for {{ site.framework }} TaskBoard and bind the component to local or remote data."
slug: htmlhelpers_taskboard_aspnetcore_databinding
position: 2
---

# Data Binding

The TaskBoard provides options for binding it to [local](#binding-to-local-data) and [remote data](#binding-to-remote-data).

## Binding to Local Data

Local data is the data that is available on the client when the TaskBoard is initialized.

The following example demonstrates how to bind the TaskBoard data saved in the ViewData.

```HtmlHelper
    @(Html.Kendo().TaskBoard()
        .Name("taskBoard")
        .Columns(c =>
        {
            c.Add().Text("To-do").Status("todo");
            c.Add().Text("In Progress").Status("inProgress");
            c.Add().Text("Done").Status("done");
        })
        .DataDescriptionField("Description")
        .DataStatusField("Status")
        .DataTitleField("Title")
        .DataOrderField("Order")
        .BindTo((IEnumerable<Kendo.Mvc.Examples.Models.TaskBoard.CardViewModel>)ViewBag.Cards)
    )
```
{% if site.core %}
```TagHelper
    @{
        var cards=(IEnumerable<CardViewModel>)ViewBag.Cards;
    }

	<kendo-taskboard 
		dataorderfield="Order" 
		datacategoryfield="Color"
		datadescriptionfield="Description" 
		datastatusfield="Status"
		datatitlefield="Title" height="750" name="taskBoard"
        bind-to="cards">
		<taskboard-columns>
            <column text="To-do" status="todo"></column>
            <column text="In progress" status="inProgress"></column>
            <column text="Done" status="done"></column>
        </taskboard-columns>
		<column-settings datastatusfield="Status" datatextfield="Text">
		</column-settings>
	</kendo-taskboard>

```
{% endif %}
```Controller
    public partial class TaskBoardController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Cards = GetCards();

            return View();
        }

        private static IList<CardViewModel> GetCards()
        {
            IList<CardViewModel> cards = new List<CardViewModel>()
            {
                new CardViewModel { ID = 1, Title = "Ads Analytics", Order = 1, Description = "Review ads performance", Status ="todo", Color= "blue" },
                new CardViewModel { ID = 2, Title = "SEO Analytics", Order = 2, Description = "Review SEO results", Status ="todo", Color= "blue" },
                new CardViewModel { ID = 3, Title = "Content", Order = 3, Description = "Plan content for podcasts", Status ="todo", Color= "orange" },
                new CardViewModel { ID = 4, Title = "Customer Research", Order = 4, Description = "Refine feedback from user interviews", Status ="inProgress", Color= "orange" },
                new CardViewModel { ID = 5, Title = "Campaigns", Order = 5, Description = "Collaborate with designers on new banners", Status ="inProgress", Color= "orange" },
                new CardViewModel { ID = 6, Title = "Customer Journey", Order = 6, Description = "Review shopping cart experience", Status ="done", Color= "green" },
                new CardViewModel { ID = 7, Title = "Content", Order = 7, Description = "Publish new blogpost", Status ="done", Color= "green" },
                new CardViewModel { ID = 8, Title = "Post-Release Party", Order = 8, Description = "Plan new release celebration", Status ="done", Color= "blue" },
            };

            return cards;
        }
    }
```

## Binding to Remote Data

You can also bind the TaskBoard to remote data. Remote data binding enables the retrieval of data from the server. For more information, refer to the [DataSource Overview article]({% slug htmlhelpers_datasource_aspnetcore %}).

The following example demonstrates how to enable remote binding in the TaskBoard by configuring the columns DataSource and the DataSource for the cards.

```HtmlHelper
    @(Html.Kendo().TaskBoard<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel, Kendo.Mvc.Examples.Models.TaskBoard.Column>()
        .Name("taskBoard")
        .ColumnSettings(columnSettings => columnSettings
            .DataTextField("Text")
            .DataStatusField("ID")
        )
        .Columns(dataSource => dataSource
            .Ajax()
            .Read("Remote_Data_Binding_Columns_Read", "TaskBoard")
        )
        .DataTitleField("Title")
        .DataStatusField("OwnerID")
        .DataDescriptionField("Description")
        .DataCategoryField("ID")
        .TemplateId("card-template")
        .DataSource(dataSource => dataSource
            .Ajax()
            .Model(model => model.Id(p => p.TaskID))
            .Read(read => read.Action("Remote_Data_Binding_Read", "TaskBoard"))
            .Update(update => update.Action("Remote_Data_Binding_Update", "TaskBoard"))
        )
        .Editable(false)
    )
```
{% if site.core %}
```TagHelper
   <kendo-taskboard 
		datacategoryfield="ID" 
		datadescriptionfield="Description" 
		datastatusfield="OwnerID" 
		datatitlefield="Title"
		height="500"
		template-id="card-template" 
		name="taskBoard">
       <taskboard-columns>
            <datasource type="DataSourceTagHelperType.Ajax">
                <transport>
                    <read url="@Url.Action("Remote_Data_Binding_Columns_Read", "TaskBoard")"/>
                </transport>
            </datasource>
        </taskboard-columns>
		<datasource type="DataSourceTagHelperType.Ajax">
	 		<schema data="Data" total="Total" errors="Errors">
				 <model id="TaskID"></model>
	 		</schema>
	 		<transport>
	 	 		<read url="@Url.Action("Remote_Data_Binding_Read", "TaskBoard")" />
	 	 		<update url="@Url.Action("Remote_Data_Binding_Update", "TaskBoard")" />
	 		</transport>
		</datasource>
		<column-settings datastatusfield="ID" datatextfield="Text">
		</column-settings>
		<editable enabled="false">
		</editable>
	</kendo-taskboard>

```
{% endif %}
```JavaScript
    <script id="card-template" type="text/x-kendo-template">
        <div class="template-container">
            <span class="template-header">
                <span class="template-title">#: Description #</span>
                <span class="template-menu">#=cardMenuButton#</span>
            </span>
            # if (Image != "") { #
            <img src="@Url.Content("~/shared/web/taskboard/" + "#= Image #")" style="height:135px; width: 270px;">
            # } #
        </div>
    </script>
```
```Controller
    public partial class TaskBoardController : Controller
    {
        public ActionResult Remote_Data_Binding()
        {
            return View();
        }

        public virtual JsonResult Remote_Data_Binding_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(taskService.GetAll().ToDataSourceResult(request));
        }

        public virtual JsonResult Remote_Data_Binding_Update([DataSourceRequest] DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                taskService.Update(task, ModelState);
            }

            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

        public virtual JsonResult Remote_Data_Binding_Columns_Read([DataSourceRequest] DataSourceRequest request)
        {
            return Json(Remote_Data_Binding_GetColumns().ToDataSourceResult(request));
        }

        private static IList<Column> Remote_Data_Binding_GetColumns()
        {
            IList<Column> taskBoardColumns = new List<Column>()
            {
                new Column { ID = 1, Text = "Pending", Status = "pending" },
                new Column { ID = 2, Text = "Under Review", Status = "underReview" },
                new Column { ID = 3, Text = "Scheduled", Status = "scheduled" }
            };

            return taskBoardColumns;
        }
    }
```

## See Also

* [Local Data Binding in the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/local-data-binding)
* [Remote Data Binding in the TaskBoard (Demo)](https://demos.telerik.com/{{ site.platform }}/taskboard/remote-data-binding)
