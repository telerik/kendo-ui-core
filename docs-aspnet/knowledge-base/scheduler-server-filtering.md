---
title: Server Filtering of the Scheduler Events
description: Learn how to implement server filtering for the {{ site.product }} Scheduler to retrieve only events for the currently selected view.
type: how-to
page_title: Server Filtering of the Scheduler Events
previous_url: /helpers/scheduling/scheduler/how-to/server-filtering, /html-helpers/scheduling/scheduler/how-to/server-filtering
slug: scheduler-server-filtering
tags: scheduler, server, filter, events, dates, ranges, telerik, core, mvc
res_type: kb
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

How can I filter the events of the {{ site.framework }} Scheduler on the server based on the selected date range in the current view?

## Solution

1. Enable the [`ServerFiltering()`](/api/kendo.mvc.ui.fluent/signalrdatasourcebuilder#serverfilteringsystemboolean) option of the DataSource in the Scheduler. This way, the component automatically sends a Read request to the remote endpoint upon each navigation that occurs in the Scheduler.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<TaskViewModel>()
            .Name("scheduler")
            ...// Additional configuration.
            .DataSource(dataSource => dataSource
                .ServerFiltering(true)
                ...// Additional configuration.
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <!-- Other configuration -->
            <scheduler-datasource type="@DataSourceTagHelperType.Ajax" server-filtering="true">
                <!-- Other configuration -->
            </scheduler-datasource>
        </kendo-scheduler>
    ```
    {% endif %}

1. Set the [`Data()`](/api/kendo.mvc.ui.fluent/crudoperationbuilder#datasystemstring) option to the Read request configuration and [add a handler that will send the start and end dates](https://docs.telerik.com/{{ site.platform }}/html-helpers/datasource/getting-started#optional-pass-additional-data-to-action-methods) of the visible range of the Scheduler to the server. This will occur when the Read action is triggered.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<TaskViewModel>()
            .Name("scheduler")
            ...// Additional configuration.
            .DataSource(dataSource => dataSource
                .ServerFiltering(true)
                .Read(read => read.Action("Read", "Home").Data("getAdditionalData"))
                .Create("Create", "Home")
                .Destroy("Destroy", "Home")
                .Update("Update", "Home")
                    ...// Additional configuration.
            )
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <!-- Other configuration -->
            <scheduler-datasource type="@DataSourceTagHelperType.Ajax" server-filtering="true">
                <transport>
                    <read url="@Url.Action("Read", "Home")" data="getAdditionalData"/>
                    <create url="@Url.Action("Create", "Home")" />
                    <destroy url="@Url.Action("Destroy", "Home")" />
                    <update url="@Url.Action("Update", "Home")" />
                </transport>
                <!-- Other configuration -->
            </scheduler-datasource>
        </kendo-scheduler>
    ```
    {% endif %}
    ```JS scripts
    <script>
        function getAdditionalData() {
            var scheduler = $("#scheduler").data("kendoScheduler"); // Get a reference to the Scheduler.

            var timezone = scheduler.options.timezone; // Get the time zone from its options.
            var startDate = kendo.timezone.convert(scheduler.view().startDate(), timezone, "Etc/UTC"); // Add the time difference between the Schduler time zone and the "Etc/UTC" time zone.
            var endDate = kendo.timezone.convert(scheduler.view().endDate(), timezone, "Etc/UTC");

            var startTime = 0;
            var endTime = 0;

            if (scheduler.view().startTime) {
                // Optionally, add startTime / endTime of the view.
                startTime = kendo.date.getMilliseconds(scheduler.view().startTime());
                endTime = kendo.date.getMilliseconds(scheduler.view().endTime());
                endTime = endTime == 0 ? kendo.date.MS_PER_DAY : endTime;
            }

            var result = {
                Start: new Date(startDate.getTime() - (startDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE) + startTime),
                End: new Date(endDate.getTime() - (endDate.getTimezoneOffset() * kendo.date.MS_PER_MINUTE) + endTime)
            }

            return result; // Pass the current "Start" and "End" dates to the server.
        }
    </script>
    ```

1. Create a `FilterRange` Model to ensure the received date range is parsed correctly. Define the setters of the `start` and `end` properties to convert the dates to UTC.

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

1. Intercept the parameter of type `FilterRange` in the `Read` Action and return the filtered events data to the Scheduler.

    ```C# HomeController.cs
        public virtual JsonResult Read(DataSourceRequest request, FilterRange range)
        {
            var data = taskService.GetRange(range.Start, range.End);
            return Json(data.ToDataSourceResult(request));
        }
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerServerFiltering) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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

