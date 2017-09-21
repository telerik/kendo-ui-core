---
title: Scheduler SignalR Data Source Configured with Server Filtering
page_title: SignalR Data Source Server Filtering | Kendo UI Scheduler HtmlHelper
description: "Configuring the Kendo UI Scheduler to work with SignalR data source using local hub and server filtering in ASP.NET MVC applications."
slug: signalr_datasource_with_server_filtering
---

# Scheduler SignalR Data Source Configured with Server Filtering

To see the example, refer to the project on how to [configure Scheduler SignalR DataSource to load events with server filtering](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/scheduler/scheduler-signalr-server-filtering) in ASP.NET MVC applications.

The following are the important points in the suggested implementation:

* The **[serverFiltering](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverFiltering)** option of the Scheduler DataSource should be set to true. This way, the widget will automatically send a read call to the local hub (service) on each navigation occurred in the Scheduler;

* A **[parameterMap](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport.parameterMap)** function is implemented for the DataSource transport object. In case of a Read action, this function will send the start and end date of the Scheduler visible range. In case of any other action, it will simply sent the edited / new data:

````JavaScript
function onMap(data, type) {
    switch (type) {
        case "read": {
            return forRead(data, type);
        }
        default: {
            return data;
        }
    }
}
````

and

````JavaScript
function forRead(data, type) {
    var scheduler = $("#scheduler").data("kendoScheduler");

    var timezone = scheduler.options.timezone;
    var startDate = kendo.timezone.convert(scheduler.view().startDate(), timezone, "Etc/UTC");

    var initialEndDate = scheduler.view().endDate();
    var augmentedEndDate = new Date(initialEndDate.valueOf());
    augmentedEndDate.setDate(initialEndDate.getDate() + 1);
    var endDate = kendo.timezone.convert(augmentedEndDate, timezone, "Etc/UTC");

    var result = {
        Start: new Date(startDate.getTime() - (startDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE)),
        End: new Date(endDate.getTime() - (endDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE))
    }

    console.log(result);

    return result;
}
````

* A **FilterRange** model class is implemented, so the sent range data is properly parsed. Note, that the setters of the Start and End properties convert the dates to UTC;

* The SignalR **ProductHub Read** endpoint accepts one parameter of type **FilterRange** and returns the filtered results to the client:

````C#
public IEnumerable<MeetingViewModel> Read(FilterRange range)
{
    var result = meetingService.GetAll().Where(t => t.Start < range.End && (t.End > range.Start || t.RecurrenceRule != null));
    return result;
}
````

## See Also

* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [SchedulerBuilder API Reference](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder)

For more runnable examples on the Kendo UI Scheduler in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/scheduler/how-to/).
