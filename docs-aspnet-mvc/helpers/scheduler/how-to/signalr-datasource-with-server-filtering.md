---
title: Configure SignalR Data Source with Server Filtering
page_title: Configure SignalR Data Source with Server Filtering | Kendo UI Scheduler HtmlHelper for ASP.NET MVC
description: "Configuring the Kendo UI Scheduler to work with SignalR data source by using local hub and server filtering in ASP.NET MVC applications."
slug: signalr_datasource_with_server_filtering
---

# Configure SignalR Data Source with Server Filtering

To see the example, refer to the project on how to [configure Scheduler SignalR DataSource to load events with server filtering](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/scheduler/scheduler-signalr-server-filtering) in ASP.NET MVC applications.

The scenario adopted by the project considers the following aspects of the implementation:
* You need to set the [`serverFiltering`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-serverFiltering) option of the DataSource in the Scheduler to `true`. This way, the widget automatically sends a `read` call to the local hub (service) upon each navigation which occurs in the Scheduler.
* The project applies a [`parameterMap`](http://docs.telerik.com/kendo-ui/api/javascript/data/datasource#configuration-transport.parameterMap) function for the transport object of the DataSource. If a `read` action occurs, this function sends the start and end dates of the visible range of the Scheduler. If other actions occur, the function only sends the edited or the new data.

    ```Setting-the-action
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
    ```
    ```Setting-the-function
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
    ```

* The project applies a `FilterRange` model class to ensure the proper parsing of the sent range of data. The setters of the `start` and `end` properties convert the dates to UTC.
* The SignalR `ProductHub Read` endpoint accepts one parameter of type `FilterRange` and returns the filtered results to the client.

    ###### Example

        public IEnumerable<MeetingViewModel> Read(FilterRange range)
        {
            var result = meetingService.GetAll().Where(t => t.Start < range.End && (t.End > range.Start || t.RecurrenceRule != null));
            return result;
        }

## See Also

* [Overview of the Scheduler HtmlHelper]({% slug overview_schedulerhelper_aspnetmvc %})
* [SchedulerBuilder API Reference](http://docs.telerik.com/aspnet-mvc/api/Kendo.Mvc.UI.Fluent/SchedulerBuilder)

For more runnable examples on the Kendo UI Scheduler in ASP.NET MVC applications, browse its [**How To** documentation folder](/helpers/scheduler/how-to/).
