---
title: Implementing Custom Views for Scheduler
description: Learn how to create a custom view for the {{ site.product }} Scheduler.
type: how-to
page_title: Implementing Custom Views for Scheduler
previous_url: /helpers/scheduling/scheduler/how-to/custom-view, /html-helpers/scheduling/scheduler/how-to/custom-view
slug: scheduler-custom-view
tags: scheduler, custom, view, telerik, core, mvc
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

How can I create a custom view for the {{ site.framework }} Scheduler component?

## Solution

By design, the Scheduler provides a variety of built-in views. For more information on the default views, refer to the [Scheduler Views documentation]({% slug htmlhelpers_scheduler_views_aspnetcore %}).

To create a custom Agenda view that shows the events for one month (31 days), follow the steps below.

1. Define the custom view within the [`Views()`](/api/kendo.mvc.ui.fluent/schedulerbuilder#viewssystemaction) configuration by specifying its name and title.

    ```HtmlHelper
            @(Html.Kendo().Scheduler<MeetingViewModel>()
                .Name("scheduler")
                .Views(views => {
                    views.DayView();
                    views.WeekView();
                    views.MonthView();
                    views.AgendaView();
                    views.CustomView("CustomAgenda", view => view.Title("Custom Agenda").Selected(true));
                })
                ...// Additional configuration.
            )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <views>
                <view type="day"></view>
                <view type="week"></view>
                <view type="month"></view>
                <view type="agenda"></view>
                <view type="CustomAgenda" title="Custom Agenda" selected="true"></view>
            </views>
            <!-- Other configuration -->
        </kendo-scheduler>
    ```
    {% endif %}

1. Include the following JavaScript logic before the Scheduler declaration that extends the built-in Agenda view by adding 31 days to its default end date. The name of the JavaScript variable must match the type of the custom view in the Scheduler declaration (for example, **CustomAgenda**).

    ```JS
        <script>
            var CustomAgenda = kendo.ui.AgendaView.extend({
                endDate: function () {
                    var date = kendo.ui.AgendaView.fn.endDate.call(this);
                    return kendo.date.addDays(date, 31);
                }
            });
        </script>
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerCustomView) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master) on how to implement a custom view for the Scheduler. {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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

