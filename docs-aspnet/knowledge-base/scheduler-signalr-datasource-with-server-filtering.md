---
title: Configuring the Scheduler with SignalR DataSource and Server Filtering
description: Learn how to set up the {{ site.product }} Scheduler to work with SignalR DataSource and filter the events on the server by the currently selected start and end dates of the view.
type: how-to
page_title: Configuring the Scheduler with SignalR DataSource and Server Filtering
previous_url: /helpers/scheduling/scheduler/how-to/signalr-datasource-with-server-filtering, /html-helpers/scheduling/scheduler/how-to/signalr-datasource-with-server-filtering
slug: scheduler-signalr-datasource-with-server-filtering
tags: scheduler, signalr, datasource, server, dates, ranges, filter, telerik, core, mvc
res_type: kb
components: ["general"]
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>Created with version 2024.4.1112</td>
 </tr>
</table>

## Description

How can I filter the events of the {{ site.framework }} Scheduler that uses SignalR DataSource on the server based on the selected date range in the current view?

## Solution

* Enable the [`ServerFiltering()`](/api/kendo.mvc.ui.fluent/signalrdatasourcebuilder#serverfilteringsystemboolean) option of the DataSource in the Scheduler. This way, the component automatically sends a `read` call to the local hub (service) upon each navigation that occurs in the Scheduler.

    ```Razor Scheduler
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            ...// Additional configuration.
            .DataSource(dataSource => dataSource
                .SignalR()
                .ServerFiltering(true)
                ...// Additional configuration.
            )
        )
    ```

* Specify the [`ParameterMap()`](/api/kendo.mvc.ui.fluent/signalrdatasourcetransportbuilder#parametermapsystemstring) option to send
  the start and end dates of the visible range of the Scheduler to the server when a Read action occurs. In the case of Create, Update, or Destroy action, the function will only send the respective new, edited, or deleted event data.

    ```Razor Scheduler
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            ...// Additional configuration.
            .DataSource(dataSource => dataSource
                .SignalR()
                .ServerFiltering(true)
                .Transport(tr => tr
                    .ParameterMap("onMap")
                    .Promise("hubStart")
                    .Hub("meetingHub")
                    .Client(c => c
                        .Read("read")
                        .Create("create")
                        .Update("update")
                        .Destroy("destroy"))
                    .Server(s => s
                        .Read("read")
                        .Create("create")
                        .Update("update")
                        .Destroy("destroy")))
                    ...// Additional configuration.
            )
        )
    ```
    ```JS
        <script>
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

            function forRead(data, type) {
                var scheduler = $("#scheduler").data("kendoScheduler"); // Get a reference to the Scheduler.

                var timezone = scheduler.options.timezone; // Access the specified time zone option.
                var startDate = kendo.timezone.convert(scheduler.view().startDate(), timezone, "Etc/UTC"); // Add the time difference to the "Start" date between the Schduler time zone and the "Etc/UTC" time zone.

                var initialEndDate = scheduler.view().endDate(); // Get the "End" date from the current view.
                var augmentedEndDate = new Date(initialEndDate.valueOf()); // Parse it to Date() object.
                augmentedEndDate.setDate(initialEndDate.getDate() + 1);
                var endDate = kendo.timezone.convert(augmentedEndDate, timezone, "Etc/UTC");

                var result = {
                    Start: new Date(startDate.getTime() - (startDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE)),
                    End: new Date(endDate.getTime() - (endDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE))
                }

                return result; // Pass the current "Start" and "End" dates to the server.
            }
        </script>
    ```

* Create a `FilterRange` Model to ensure the received date range is parsed correctly. Define the setters of the `start` and `end` properties to convert the dates to UTC.

    ```C# FilterRange.cs
        using System;
        using System.Collections.Generic;
        using System.Linq;
        using System.Web;

        public class FilterRange
        {
            private DateTime start;
            public DateTime Start
            {
                get { return start; }
                set
                {
                    start = value.ToUniversalTime();
                }
            }

            private DateTime end;
            public DateTime End
            {
                get { return end; }
                set
                {
                    end = value.ToUniversalTime();
                }
            }
        }
    ```

* Intercept the parameter of type `FilterRange` in the `Read` Action in the `ProductHub.cs` and return the filtered events data to the client.

    ```C# ProductHub.cs
        public class ProductHub : Hub
        {
            private SchedulerMeetingService meetingService;

            public ProductHub()
            {
                meetingService = new SchedulerMeetingService(new SampleEntities1());
            }

            public IEnumerable<MeetingViewModel> Read(FilterRange range)
            {
                var result = meetingService.GetAll().Where(t => t.Start < range.End && (t.End > range.Start || t.RecurrenceRule != null));

                return result;
            }
        }
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerSignalRServerFiltering) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

## More {{ site.framework }} Scheduler Resources

* [{{ site.framework }} Scheduler Documentation]({%slug htmlhelpers_scheduler_aspnetcore%})

* [{{ site.framework }} Scheduler Demos](https://demos.telerik.com/{{ site.platform }}/scheduler/index)

{% if site.core %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-core-ui/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiforcore%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-core-ui)

{% else %}
* [{{ site.framework }} Scheduler Product Page](https://www.telerik.com/aspnet-mvc/scheduler)

* [Telerik UI for {{ site.framework }} Video Onboarding Course (Free for trial users and license holders)]({%slug virtualclass_uiformvc%})

* [Telerik UI for {{ site.framework }} Forums](https://www.telerik.com/forums/aspnet-mvc)
{% endif %}

## See Also

* [Client-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler)
* [Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/scheduler)
{% if site.core %}
* [Server-Side TagHelper API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/{{ site.platform }}/api/taghelpers/scheduler)
{% endif %}
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2024%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

