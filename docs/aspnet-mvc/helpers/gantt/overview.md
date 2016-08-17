---
title: Overview
page_title: Overview | Kendo UI Gantt HtmlHelper
description: "Get started with the server-side wrapper for the Kendo UI Gantt widget for ASP.NET MVC."
slug: overview_gantthelper_aspnetmvc
position: 1
---

# Gantt

The Gantt HtmlHelper extension is a server-side wrapper for the [Kendo UI Gantt](/api/web/gantt) widget. It allows you to configure the Kendo UI gantt from server-side code, helps with data binding and editing.

## Getting Started

### Configuration

Below are listed the steps for you to follow when binding the Kendo UI Gantt to tasks and dependencies on the server.

**Step 1** Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).

**Step 2** Create two view models that will be used to transmit the Gantt data to the client side. One is used for the tasks, and the other one for the dependencies between the tasks.

###### Example

        public class TaskViewModel : IGanttTask
        {
            public int TaskID { get; set; }
            public int? ParentID { get; set; }

            public string Title { get; set; }

            private DateTime start;
            public DateTime Start
            {
                get { return start; }
                set { start = value.ToUniversalTime(); }
            }

            private DateTime end;
            public DateTime End
            {
                get { return end; }
                set { end = value.ToUniversalTime(); }
            }

            public bool Summary { get; set; }
            public bool Expanded { get; set; }
            public decimal PercentComplete { get; set; }
            public int OrderId { get; set; }
        }


        public class DependencyViewModel : IGanttDependency
        {
            public int DependencyID { get; set; }

            public int PredecessorID { get; set; }
            public int SuccessorID { get; set; }
            public int Type { get; set; }
        }

**Step 3** In the HomeController, create two action methods that return the tasks and dependencies as JSON.

###### Example

        public JsonResult Tasks([DataSourceRequest] DataSourceRequest request)
        {
            var tasks = new List<TaskViewModel> {
                new TaskViewModel { TaskID = 1, Title = "My Project", Start = new DateTime(2014,8,21,11,00,00), End = new DateTime(2014,8,25,18,30,00), Summary = true, Expanded = true, ParentID = null, OrderId = 1 },
                new TaskViewModel { TaskID = 2, ParentID = 1, Title = "Task 1", Start = new DateTime(2014,8,21,11,00,00), End = new DateTime(2014,8,23,14,30,00), OrderId = 2 },
                new TaskViewModel { TaskID = 3, ParentID = 1, Title = "Task 2", Start = new DateTime(2014,8,21,15,00,00), End = new DateTime(2014,8,25,18,00,00), OrderId = 3 }
            };

            return Json(tasks.AsQueryable().ToDataSourceResult(request));
        }

        public JsonResult Dependencies([DataSourceRequest] DataSourceRequest request)
        {
            var dependencies = new List<DependencyViewModel> {
                new DependencyViewModel { DependencyID = 100, PredecessorID = 2, SuccessorID = 3, Type = 0 }
            };

            return Json(dependencies.AsQueryable().ToDataSourceResult(request));
        }

**Step 4** Add a Gantt chart to the view and bind it to the above action methods through its two datasources.

###### Example

```tab-ASPX

        <%= Html.Kendo().Gantt<TelerikMvcApp14.Models.TaskViewModel, TelerikMvcApp14.Models.DependencyViewModel>()
            .Name("Gantt")
            .DataSource(ds => ds
                .Read(read => read
                    .Action("Tasks", "Home")
                )
                .Model(m =>
                {
                    m.Id(f => f.TaskID);
                    m.ParentId(f => f.ParentID);
                    m.OrderId(f => f.OrderId);
                    m.Field(f => f.Expanded).DefaultValue(true);
                })
            )
            .DependenciesDataSource(ds => ds
                .Read(read => read
                    .Action("Dependencies", "Home")
                )
                .Model(m =>
                {
                    m.Id(f => f.DependencyID);
                    m.PredecessorId(f => f.PredecessorID);
                    m.SuccessorId(f => f.SuccessorID);
                    m.Type(f => f.Type);
                })
            )
        %>
```
```tab-Razor

        @(Html.Kendo().Gantt<TelerikMvcApp14.Models.TaskViewModel, TelerikMvcApp14.Models.DependencyViewModel>()
            .Name("Gantt")
            .DataSource(ds => ds
                .Read(read => read
                    .Action("Tasks", "Home")
                )
                .Model(m =>
                {
                    m.Id(f => f.TaskID);
                    m.ParentId(f => f.ParentID);
                    m.OrderId(f => f.OrderId);
                    m.Field(f => f.Expanded).DefaultValue(true);
                })
            )
            .DependenciesDataSource(ds => ds
                .Read(read => read
                    .Action("Dependencies", "Home")
                )
                .Model(m =>
                {
                    m.Id(f => f.DependencyID);
                    m.PredecessorId(f => f.PredecessorID);
                    m.SuccessorId(f => f.SuccessorID);
                    m.Type(f => f.Type);
                })
            )
        )
```

## See Also

Other articles on Telerik UI for ASP.NET MVC and on the Gantt:

* [ASP.NET MVC API Reference: GanttBuilder](/api/aspnet-mvc/Kendo.Mvc.UI.Fluent/GanttBuilder)
* [Server Binding of the Gantt HtmlHelper]({% slug serverbinding_gantthelper_aspnetmvc %})
* [Overview of Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %})
* [Fundamentals of Telerik UI for ASP.NET MVC]({% slug fundamentals_aspnetmvc %})
* [Scaffolding in Telerik UI for ASP.NET MVC]({% slug scaffolding_aspnetmvc %})
* [Overview of the Kendo UI Gantt Widget]({% slug overview_kendoui_gantt_widget %})
* [Telerik UI for ASP.NET MVC API Reference Folder](/api/aspnet-mvc/Kendo.Mvc/AggregateFunction)
* [Telerik UI for ASP.NET MVC HtmlHelpers Folder]({% slug overview_autocompletehelper_aspnetmvc %})
* [Tutorials on Telerik UI for ASP.NET MVC]({% slug overview_timeefficiencyapp_aspnetmvc6 %})
* [Telerik UI for ASP.NET MVC Troubleshooting]({% slug troubleshooting_aspnetmvc %})
