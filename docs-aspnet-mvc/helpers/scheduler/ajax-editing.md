---
title: Ajax Binding
page_title: Ajax Binding | Kendo UI Scheduler HtmlHelper
description: "Populate the Scheduler with nodes in ASP.NET MVC applications by using Ajax requests."
slug: ajaxbinding_schedulerhelper_aspnetmvc
position: 2
---

# Ajax Editing

Below are listed the steps for you to follow when configuring the Kendo UI Scheduler for ASP.NET MVC to do editing of the sample database (the **Tasks** table) included in the offline demos.

## Configuration

### Create the Application

Create a new ASP.NET MVC 4 application. If you have installed the [Telerik UI for ASP.NET MVC Visual Studio Extensions]({% slug overview_aspnetmvc %}#kendo-ui-for-asp.net-mvc-visual-studio-extensions), create a Telerik UI for ASP.NET MVC application. Name the application `KendoSchedulerAjaxEditing`.If you decide not to use the Visual Studio extensions, follow the steps from the [introductory article]({% slug overview_aspnetmvc %}) to add Telerik UI for ASP.NET MVC to the application.

### Set the Entity Model

 Add a new `Entity Framework Data Model`. Right-click the `~/Models` folder in the solution explorer and pick **Add** > **New Item**. Choose **Data** > **ADO.NET Entity Data Model** in the **Add New Item** dialog. Name the model `Sample.edmx` and click **Next**. This starts the **Entity Data Model Wizard**.

**Figure 1. The new entity model**

![New entity data model](/aspnet-mvc/helpers/scheduler/images/entity-data-model.png)

### Configure the Connection

Pick the **Generate from database** option and click **Next**. Configure a connection to the sample database. Click **Next**.

**Figure 2. Choose the connection**

![Choose the connection](/aspnet-mvc/helpers/scheduler/images/entity-data-model.png)

### Choose the Database Object

Choose the **Tasks** table from the `Which database objects do you want to include in your model?`. Leave all other options as they are set by default. Click **Finish**.

**Figure 3. Choose the Tasks table**

![Choose the Tasks table](/aspnet-mvc/helpers/scheduler/images/database-objects.png)

### Include the New Class

Add a new class to the `~/Models` folder. Name it `TaskViewModel`.

###### Example

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

            public string RecurrenceRule { get; set; }
            public int? RecurrenceID { get; set; }
            public string RecurrenceException { get; set; }
            public bool IsAllDay { get; set; }
            public int? OwnerID { get; set; }
        }

### Add the Action Methods

**Step 1** Open `HomeController.cs` and add a new action method which will return the `Tasks` as JSON. The Scheduler will make Ajax requests to this action.

###### Example

        public ActionResult Tasks_Read([DataSourceRequest]DataSourceRequest request)
        {
            using (var sampleDB = new SampleEntities())
            {

                IQueryable<TaskViewModel> tasks = sampleDB.Tasks.ToList().Select(task => new TaskViewModel() {
                    TaskID = task.TaskID,
                    Title = task.Title,
                    //Specify the DateTimeKind to be UTC.
                    Start = DateTime.SpecifyKind(task.Start, DateTimeKind.Utc),
                    End = DateTime.SpecifyKind(task.End, DateTimeKind.Utc),
                    Description = task.Description,
                    IsAllDay = task.IsAllDay,
                    RecurrenceRule = task.RecurrenceRule,
                    RecurrenceException = task.RecurrenceException,
                    RecurrenceID = task.RecurrenceID,
                    OwnerID = task.OwnerID
                }).AsQueryable();

                return Json(tasks.ToDataSourceResult(request));
            }
        }

**Step 2** Add a new action method to `HomeController.cs`. It will be responsible for saving new data items. Name the method `Tasks_Create`.

###### Example

        public ActionResult Tasks_Create([DataSourceRequest]DataSourceRequest request, TaskViewModel task)
        {

            if (ModelState.IsValid)
            {
                using (var sampleDB = new SampleEntities())
                {
                    //Create a new Task entity and set its properties from the posted TaskViewModel.
                    var entity = new Task
                    {
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        RecurrenceRule = task.RecurrenceRule,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID
                    };

                    //Add the entity.
                    sampleDB.Tasks.AddObject(entity);
                    //Insert the entity in the database.
                    sampleDB.SaveChanges();
                    //Get the TaskID generated by the database.
                    task.TaskID = entity.TaskID;
                }
            }
            //Return the inserted task. The Scheduler needs the generated TaskID. Also return any validation errors.
            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

**Step 3** Add a new action method to `HomeController.cs`. It will be responsible for saving updated data items. Name the method `Tasks_Update`.

###### Example

        public ActionResult Tasks_Update([DataSourceRequest]DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                using (var sampleDB = new SampleEntities())
                {
                    //Create a new Task entity and set its properties from the posted TaskViewModel.
                    var entity = new Task
                    {
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        RecurrenceRule = task.RecurrenceRule,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID
                    };
                    //Attach the entity.
                    sampleDB.Tasks.Attach(entity);
                    //Change its state to Modified so the Entity Framework can update the existing task instead of creating a new one.
                    //sampleDB.Entry(entity).State = EntityState.Modified;
                    //Or use ObjectStateManager if using a previous version of Entity Framework.
                    sampleDB.ObjectStateManager.ChangeObjectState(entity, EntityState.Modified);
                    //Update the entity in the database
                    sampleDB.SaveChanges();
                }
            }
            //Return the updated task. Also return any validation errors.
            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

**Step 4** Add a new action method to `HomeController.cs`. It will be responsible for saving deleted data items. Name the method `Tasks_Destroy`.

###### Example

        public ActionResult Tasks_Destroy([DataSourceRequest]DataSourceRequest request, TaskViewModel task)
        {
            if (ModelState.IsValid)
            {
                using (var sampleDB = new SampleEntities())
                {
                    //Create a new Task entity and set its properties from the posted TaskViewModel.
                    var entity = new Task
                    {
                        TaskID = task.TaskID,
                        Title = task.Title,
                        Start = task.Start,
                        End = task.End,
                        Description = task.Description,
                        RecurrenceRule = task.RecurrenceRule,
                        RecurrenceException = task.RecurrenceException,
                        RecurrenceID = task.RecurrenceID,
                        IsAllDay = task.IsAllDay,
                        OwnerID = task.OwnerID
                    };
                    //Attach the entity.
                    sampleDB.Tasks.Attach(entity);
                    //Delete the entity.
                    //sampleDB.Tasks.Remove(entity);
                    //Or use DeleteObject if using a previous versoin of Entity Framework.
                    sampleDB.Tasks.DeleteObject(entity);
                    //Delete the entity in the database.
                    sampleDB.SaveChanges();
                }
            }
            //Return the removed task. Also return any validation errors.
            return Json(new[] { task }.ToDataSourceResult(request, ModelState));
        }

**Step 5** In the view, configure the Scheduler to use the action methods created in the previous steps.

###### Example

```tab-ASPX

        <%= Html.Kendo().Scheduler<KendoSchedulerAjaxEditing.Models.TaskViewModel>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
            .Height(600)
            .Views(views =>
            {
                views.DayView();
                views.WeekView(weekView => weekView.Selected(true));
                views.MonthView();
                views.AgendaView();
            })
            .Timezone("Etc/UTC")
            .DataSource(d => d
                .Model(m => {
                    m.Id(f => f.TaskID);
                    m.Field(f => f.OwnerID).DefaultValue(1);
                    //Set the recurrence ID field from the model:
                    m.RecurrenceId(f => f.RecurrenceID);
                })
                .Read("Tasks_Read", "Home")
                .Create("Tasks_Create", "Home")
                .Destroy("Tasks_Destroy", "Home")
                .Update("Tasks_Update", "Home")
            )
        %>
```
```tab-Razor

        @(Html.Kendo().Scheduler<KendoSchedulerAjaxEditing.Models.TaskViewModel>()
            .Name("scheduler")
            .Date(new DateTime(2013, 6, 13))
            .StartTime(new DateTime(2013, 6, 13, 7, 00, 00))
            .Height(600)
            .Views(views =>
            {
                views.DayView();
                views.WeekView(weekView => weekView.Selected(true));
                views.MonthView();
                views.AgendaView();
            })
            .Timezone("Etc/UTC")
            .DataSource(d => d
                .Model(m => {
                    m.Id(f => f.TaskID);
                    m.Field(f => f.OwnerID).DefaultValue(1);
                    //Set the recurrence ID field from the model:
                    m.RecurrenceId(f => f.RecurrenceID);
                })
                .Read("Tasks_Read", "Home")
                .Create("Tasks_Create", "Home")
                .Destroy("Tasks_Destroy", "Home")
                .Update("Tasks_Update", "Home")
            )
        )
```

**Step 6** Build and run the application.

**Figure 4. The final result**

![Final result](/aspnet-mvc/helpers/scheduler/images/scheduler.png)

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Scheduler:

* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [Scaffolding of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Resources of the Scheduler HtmlHelper]({% slug scaffoldingscheduler_aspnetmvc %})
* [Scheduler HtmlHelper How-To Examples]({% slug howto_bindtowebapicontroller_scheduleraspnetmvc %})
* [Overview of the Kendo UI Scheduler Widget]({% slug overview_kendoui_scheduler_widget %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_barcodehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
