---
title: Server filtering
page_title: Server filtering
description: "Get started with the Scheduler HtmlHelper for {{ site.framework }} and learn how to configure the component to work with server-side filtering."
slug: htmlhelpers_scheduler_server_filtering_aspnetcore
position: 6
---

# Server filtering

This article explains how to implement server-side filtering for the Scheduler component.

The server-side filtering allows the user to load only the events that are part of the currently loaded View without the need to fetch all the available data from the datasource. The server-side filtering approach is very useful for situations where there are a lot of events/meetings in the database allowing us to fetch the needed data only - leading to better performance and faster loading.

The code snippets below are extracted from a demo project of Scheduler with Server Filtering in {{ site.framework }} that can be downloaded from  [this repository]({% if site.core %}https://github.com/telerik/ui-for-aspnet-core-examples/blob/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Views/Scheduler/SchedulerServerFiltering.cshtml{% else %}https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/scheduler/scheduler-server-filtering{% endif %}). The current article discussed the more difficult steps of the server filtering implementation. For more details, please refer to the above-linked repository.

## Initializing the Scheduler

When initializing the Scheduler that will work with server filtering there are two important things to configure in its DataSource:
* Set the .ServerOperation configuration to ``true``
* Pass a Data parameter to the server when reading the events data
```Razor
.Read(read => read.Action("Read", "Scheduler").Data("getAdditionalData"))
```

Here is a sample definition:

```Razor
@(Html.Kendo().Scheduler<SqlServerDataBase.Models.TaskViewModel>()
	.Name("scheduler")
    .StartTime(6, 30, 0)
	.Height(600)
    .WorkWeekStart(1)
    .WorkWeekEnd(7)
	.Views(views =>
	{
		views.DayView();
		views.WorkWeekView(workWeekView => workWeekView.Selected(true));
		views.WeekView();
		views.MonthView();
		views.AgendaView();
		views.TimelineView();
	})
	.Timezone("Etc/UTC")
	.DataSource(d => d
		.Model(m =>
		{
			m.Id(f => f.TaskID);
			m.Field(f => f.Title).DefaultValue("No title");
			m.Field(f => f.Title).DefaultValue("No title");
			m.RecurrenceId(f => f.RecurrenceID);
		})
        .ServerOperation(true)
        .Read(read => read.Action("Read", "Scheduler").Data("getAdditionalData"))
		.Create("Create", "Scheduler")
		.Destroy("Destroy", "Scheduler")
		.Update("Update", "Scheduler")
	)
)
```

## Get the Start and End dates of the current Scheduler view

To be sure that the server will return only the events visible in the current Scheduler View, we have to pass to it the timespan that is currently visible. The timespan data is sent to the server using the Data parameter mentioned in the above section.

Here is a function that returns the current timespan boundries:

```
function getAdditionalData() {
    var scheduler = $("#scheduler").data("kendoScheduler");

    var timezone = scheduler.options.timezone;
    var startDate = kendo.timezone.convert(scheduler.view().startDate(), timezone, "Etc/UTC");
    var endDate = kendo.timezone.convert(scheduler.view().endDate(), timezone, "Etc/UTC");

    var startTime = 0;
    var endTime = 0;

    if (scheduler.view().startTime) {
        console.log('in')
        //optionally add startTime / endTime of the view
        startTime = kendo.date.getMilliseconds(scheduler.view().startTime());
        endTime = kendo.date.getMilliseconds(scheduler.view().endTime());
        endTime = endTime == 0 ? kendo.date.MS_PER_DAY : endTime;
    }

    var result = {
        Start: new Date(startDate.getTime() - (startDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE) + startTime),
        End: new Date(endDate.getTime() - (endDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE) + endTime)
    }

    return result;
}
```

## Configuration of the Read method on the server:

Once the result of the getAdditionalData function is passed to the server it receives it in the ``range`` variable in the below Read method definition:

```Razor
public virtual JsonResult Read([DataSourceRequest] DataSourceRequest request, FilterRange range)
{
    var data = taskService.GetRange(range.Start, range.End);
    return Json(data.ToDataSourceResult(request));
}
```

The Start and End properties of the range object are then passed to the GetRange method and it returns all events that are between the start and end date of the client View.

Here is the definition of the GetRange method:

```Razor
public virtual IEnumerable<TaskViewModel> GetRange(DateTime start, DateTime end)
{
    var result = GetAll().ToList().Where(t => (t.RecurrenceRule != null || (t.Start >= start && t.Start <= end) || (t.End >= start && t.End <= end)));

    return result;
}
```
