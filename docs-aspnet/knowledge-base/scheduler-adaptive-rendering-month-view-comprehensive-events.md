---
title: More Comprehensive Month Events in Scheduler Adaptive Rendering
description: The Scheduler Adaptive Rendering transforms the events in the Month View into dots so they fit on small-screen devices. The event's appearance limits user interaction. Learn how to utilize the Tooltip Component and the DataBound Event of the Scheduler to make the events within the Month View more interactive.
type: how-to
page_title: Comprehensive Month Events in Scheduler Adaptive Rendering
slug: scheduler-adaptive-rendering-month-view-comprehensive-events
tags: scheduler, month view, adaptive rendering, events, tooltip, interactive
ticketid: 1631720
res_type: kb
---

## Environment
<table>
    <tbody>
        <tr>
            <td>Product Version</td>
            <td>2023.3.1114</td>
        </tr>
        <tr>
            <td>Product</td>
            <td>{{ site.product }} Scheduler</td>
        </tr>
    </tbody>
</table>


## Description
I am using Adaptive Rendering mode for the Scheduler in Month View. The users need to interact with the events that are represented by dots in the event slots. How can I achieve that?

## Solution
1.  Subscribe to the [DataBound Event](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulereventbuilder#databoundsystemstring) of the Scheduler
2. In the **onDataBound** JavaScript handler, subscribe to the `click` event over the `.k-event` elements. These elements represent the event dots. Then, within the `click` event handler, use the [`occurrenceByUid()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/occurrencebyuid) method to get the [kendo.data.SchedulerEvent](https://docs.telerik.com/kendo-ui/api/javascript/data/schedulerevent) item, and save it into a global variable.

    ```JavaScript
        var schedulerEvent;
        function onDataBound(e){
            var scheduler = e.sender;
            var view = e.sender.viewName();      

            if(view="month"){
                $(".k-event").off().on("click", function(ev){
                    var uid = $(ev.currentTarget).attr("data-uid");
                    var event = scheduler.occurrenceByUid(uid);
                    schedulerEvent = event;
                })
            }
        }
    ```

3. Initialize a [Tooltip]({% slug htmlhelpers_tooltip_aspnetcore %}) component and use the **schedulerEvent** global variable to populate its content with additional information about the event.

    ```HtmlHelper
        @(Html.Kendo().Tooltip()
            .For("#scheduler")
            .Filter(".k-event")
            .ShowOn(TooltipShowOnEvent.Click)
            .Position(TooltipPosition.Bottom)
            .Width(120)
            .ContentHandler("tooltipContent")
        )
    ```

4. (Optionally) Add an **Edit Event** button in the Tooltip's content. Handle its `onclick` event and utilize the [`editEvent()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/editevent) method to start editing the particular Scheduler event.

    ```JavaScript
        function tooltipContent(e){
            var content = `<div>
            <p> ${schedulerEvent.title} </p>
            <p> Start: ${kendo.toString(schedulerEvent.start, "dd/MMM/yyyy hh:mm")} 
                End: ${kendo.toString(schedulerEvent.end, "dd/MMM/yyyy hh:mm")} </p>
            <button onclick="editEvent()"> Edit Event </button>
            </div>`;
            return content;
            
        }
        function editEvent(e){
            var scheduler = $("#scheduler").data("kendoScheduler");
            scheduler.editEvent(schedulerEvent);
            $("#scheduler").data("kendoTooltip").hide();
        }
    ```

Refer to [this Telerik REPL sample](https://netcorerepl.telerik.com/QRPFmsPf10mKzlqK18) that showcases the suggested approach.
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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
