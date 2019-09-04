---
title: Overview
page_title: Gantt Overview | Telerik UI for ASP.NET MVC HTML Helpers
description: "Learn the basics when working with the Telerik UI Gantt HtmlHelper for ASP.NET MVC."
slug: overview_gantthelper_aspnetmvc
position: 1
---

# Gantt

The Telerik UI Gantt HtmlHelper for ASP.NET MVC is a server-side wrapper for the Kendo UI Gantt widget.

The Gantt displays a set of tasks and dependencies which are used to visualize project-planning data. It provides a TreeList section where the user can edit the tasks, and sort and reorder them in a grid-like fashion, and a Timeline section where the tasks and dependencies are visualized under an adjustable time ruler. The user can resize, move, edit and remove them. The Gantt also supports the display of the Timeline section in the day, week, and month views.

* [Demo page for the Gantt](https://demos.telerik.com/aspnet-mvc/gantt)

## Basic Configuration

1. Make sure you followed all the steps from the [introductory article on Telerik UI for ASP.NET MVC]({% slug overview_aspnetmvc %}).
1. Create two view models that will be used to transmit the Gantt data to the client side. One is used for the tasks, and the other one for the dependencies between the tasks.

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

1. In the HomeController, create two action methods that return the tasks and dependencies as JSON.

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

1. Add a Gantt chart to the view and bind it to the above action methods through its two data sources.

    ```ASPX
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
    ```Razor
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

## Functionality and Features

The Gantt enables you to perform [server binding]({% slug serverbinding_gantthelper_aspnetmvc %}).

## Events

For a complete example on basic Gantt events, refer to the [demo on using the events of the Gantt](https://demos.telerik.com/aspnet-mvc/gantt/events).

## See Also

* [Basic Usage of the Gantt HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/gantt)
* [Using the API of the Gantt HtmlHelper for ASP.NET MVC (Demo)](https://demos.telerik.com/aspnet-mvc/gantt/api)
* [GanttBuilder Server-Side API](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/GanttBuilder)
* [Gantt Server-Side API](/api/gantt)
