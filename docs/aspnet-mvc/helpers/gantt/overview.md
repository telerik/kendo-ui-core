---
title: Overview
page_title: How to use the Kendo UI Gantt HtmlHelper extension, server-side ASP.NET MVC wrapper for Kendo UI Gantt widget
description: Learn how to bind Kendo UI Gantt for ASP.NET MVC, handle Kendo UI Gantt Events, access an existing gantt with the Gantt HtmlHelper extension documentation.
position: 1
---

# Gantt

The Gantt HtmlHelper extension is a server-side wrapper for the [Kendo UI Gantt](/api/web/gantt) widget. It allows you to configure the Kendo UI gantt from server-side code, helps with data binding and editing.

## Getting started

Here is how to bind a Kendo Gantt to tasks and dependencies on the server:

1.  Make sure you have followed all the steps from the [Introduction](/aspnet-mvc/introduction) help topic.

1. Create two view models that will be used to transmit the gantt data to the client-side. One is used for the tasks, and one for the dependencies between tasks.

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

1. In the HomeController, create a two action methods that return the tasks and dependencies as JSON

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

1. Add a gantt chart to the view, and bind it to the above action methods via its two datasources
    - Razor

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

    - WebForms

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
