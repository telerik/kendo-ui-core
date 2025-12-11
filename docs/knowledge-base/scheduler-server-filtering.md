---
title: Scheduler Server Filtering
description: Learn how to implement server-side filtering for the Scheduler component.
type: how-to
page_title: Scheduler Server Filtering - Kendo UI Scheduler for jQuery
slug: scheduler-server-filtering
tags: scheduler, server, filtering, kendo, datasource
res_type: kb
components: ["scheduler"]
---
## Environment
| Product | Version |
|-----------|----------------|
| Scheduler for Progress® Kendo UI®  | 2024.1.319 |

## Description

You can implement server-side filtering for the Scheduler component by using the [`parameterMap`](/api/javascript/data/datasource/configuration/transport.parametermap) method of the DataSource to send the range to the backend.

## Solution

The following code snippets give sample view and controller implementation for the Scheduler server-side filtering.

View:

```
  $("#scheduler").kendoScheduler({
            startTime: new Date("2013/6/13 7:00"),
            date: new Date("2013/6/13"),
            height: 600,
            timezone: "Etc/UTC",
            views: [
                "day",
                { type: "week", selected: true },
                "month",
                "agenda"
            ],
            dataSource: {                
                transport: {
                    read: {
                        url: "@Url.Action("Read", "Home")",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST"                      
                    },
                    update: {
                        url: "@Url.Action("Update", "Home")",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST"
                    },
                    create: {
                        url: "@Url.Action("Create", "Home")",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST"
                    },
                    destroy: {
                        url: "@Url.Action("Destroy", "Home")",
                        dataType: "json",
                        contentType: "application/json; charset=utf-8",
                        type: "POST"
                    },
                    parameterMap: function (options, operation) {
                        if (operation === "read") {
                            var scheduler = $("#scheduler").data("kendoScheduler");

                            var result = {
                                start: scheduler.view().startDate(),
                                end: scheduler.view().endDate()
                            }

                            return kendo.stringify(result);
                        }

                        return kendo.stringify(options);
                    }
                },
                serverFiltering: true,
                schema: {
                    model: {
                        id: "taskID",
                        fields: {
                            taskID: { from: "TaskID", type: "number" },
                            title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                            start: { type: "date", from: "Start" },
                            end: { type: "date", from: "End" },
                            startTimezone: { from: "StartTimezone" },
                            endTimezone: { from: "EndTimezone" },
                            description: { from: "Description" },
                            recurrenceId: { from: "RecurrenceID" },
                            recurrenceRule: { from: "RecurrenceRule" },
                            recurrenceException: { from: "RecurrenceException" },
                            ownerId: { from: "OwnerID", defaultValue: 1 },
                            isAllDay: { type: "boolean", from: "IsAllDay" }
                        }
                    }
                }
            }
        });
```

Controller:

```
﻿using System;
using System.Linq;
using System.Web.Mvc;
using KendoUI_Scheduler_Server_Filtering.Models;

namespace KendoUI_Scheduler_Server_Filtering.Controllers
{
    public class HomeController : Controller
    {        

        private SchedulerTaskService taskService;

        public HomeController()
        {
            taskService = new SchedulerTaskService();
        }

        public ActionResult Index()
        {
            return View();
        }

        public virtual JsonResult Read(DateTime start, DateTime end)
        {     
            return Json(taskService.GetRange(start, end));
        }
    }
}
```

A full ASP.Net MVC project utilizing the above approach you can find in [`this repo`](https://github.com/telerik/kendo-examples-asp-net-mvc/blob/master/scheduler-server-filtering/KendoUI_Scheduler_Server_Filtering/Views/Home/Index.cshtml).

## See Also

* [Scheduler API Reference](/api/javascript/ui/scheduler)
* [DataSource API Reference)](/api/javascript/data/datasource)
