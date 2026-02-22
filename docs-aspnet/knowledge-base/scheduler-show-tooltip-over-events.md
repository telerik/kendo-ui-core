---
title: Show Tooltip over Scheduler Events
description: Learn how to use the {{ site.product }} Tooltip to show additional information when the user hovers over {{ site.product }} Scheduler events.
type: how-to
page_title: Show Tooltip over Scheduler Events
previous_url: /helpers/scheduling/scheduler/how-to/show-tooltip-with-additional-information-over-events, /html-helpers/scheduling/scheduler/how-to/show-tooltip-with-additional-information-over-events
slug: scheduler-show-tooltip-over-events
tags: scheduler, tooltip, hover, events, telerik, core, mvc
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

How can I show a Tooltip when hovering over the {{ site.framework }} Scheduler events to provide additional information like start and end time, description, and more?

## Solution

1. Define a [Tooltip]({% slug htmlhelpers_tooltip_aspnetcore %}) component that shows when the title of a specified event is hovered.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<MeetingViewModel>()
            .Name("scheduler")
            ...// Additional configuration.
        )

        @(Html.Kendo().Tooltip()
            .For("#scheduler")
            .Filter(".k-event:not(.k-event-drag-hint) > div, .k-task")
            .Position(TooltipPosition.Top)
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <!-- Other configuration -->
        </kendo-scheduler>

        <kendo-tooltip name="scheduler" filter=".k-event:not(.k-event-drag-hint) > div, .k-task" position="top">
        </kendo-tooltip>
    ```
    {% endif %}

1. Create an [external Kendo UI Template](https://docs.telerik.com/kendo-ui/framework/templates/get-started-external) for the content of the Tooltip. You can modify the template content based on your requirements.

    ```HtmlHelper
        @(Html.Kendo().Tooltip()
            .For("#scheduler")
            .Filter(".k-event:not(.k-event-drag-hint) > div, .k-task")
            .Position(TooltipPosition.Top)
            .Width(120)
            .ContentTemplateId("template")
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-tooltip name="scheduler" 
            filter=".k-event:not(.k-event-drag-hint) > div, .k-task" 
            position="top"
            width="120"
            content-template-id="template">
        </kendo-tooltip>
    ```
    {% endif %}
    ```JS Template
        <script id="template" type="text/x-kendo-template">
            #var element = target.is(".k-task") ? target : target.parent();# // Select the respective target element.
            #var uid = element.attr("data-uid");# // Access the "uid" of the hovered event.
            #var scheduler = target.closest("[data-role=scheduler]").data("kendoScheduler");# // Get a reference to the Scheduler.
            #var model = scheduler.occurrenceByUid(uid);# // Access the data of the hovered event.

            #if(model) {#
            <strong>event start:</strong> #=kendo.format('{0:d}',model.start)#
            <br />
            <strong>event end:</strong> #=kendo.format('{0:d}',model.end)#
            <br />
            <strong>event description:</strong> #=model.description#
            <br />
            #} else {#
            <strong>No event data is available</strong>
            #}#
        </script>
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerTooltip) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master) for how to show a Tooltip when hovering over a Scheduler event. {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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

