---
title: Dynamically Highlighting Specified Dates within the Month View of the Scheduler
description: An example on how to highlight specified dates within the month view of the Telerik UI for {{ site.framework }} Scheduler.
type: how-to
page_title: Dynamically Highlighting Specified Dates within the Month View of the Scheduler
slug: scheduler-highlight-specific-month-days
tags: scheduler, highlight, dates, month, view, slots, dynamically, telerik, core, mvc
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>{{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.3.1010 version</td>
 </tr>
</table>

## Description

How can I highlight dynamically specific dates within the Scheduler month view on load?

## Solution

1. Handle the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulereventbuilder#databoundsystemstring) event of the Scheduler.
1. Create an array of dates, which must be highlighted within the month view.
1. Check if the current view is the month view.
1. Select the Scheduler month table with jQuery and loop through the `td` elements.
1. Get the time slot of the current table cell to access the `startDate` field by using the [`slotByElement()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/slotbyelement) method.
1. Check if the `startDate` matches the dates from the external collection of dates and add a custom `highlightedDay` class to the table cell element.
1. Add the desired background color to the `highlightedDay` with CSS.

    ```HtmlHelper
        @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.TaskViewModel>()
            .Name("scheduler")
            .Views(views =>
            {
                views.DayView();
                views.WeekView();
                views.MonthView(mView =>
                {
                    mView.Selected(true);
                });
                views.YearView();
            })
            .Events(ev => ev.DataBound("onDataBound"))
            ...
        )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler" on-data-bound="onDataBound">
            <views>
                <view type="day"></view>
                <view type="week"></view>
                <view type="month" selected="true"></view>
                <view type="year"></view>
            </views>
            <!-- Other configuration -->
        </kendo-scheduler>
    ```
    {% endif %}
    ```Script
        <script>
            var highlightedDays = [
            {
                "startDate": new Date(2022, 5, 2),
                "endDate": new Date(2022, 5, 4),
            },
            {
                "startDate": new Date(2022, 5, 6),
                "endDate": new Date(2022, 5, 7),
            },
                    {
                "startDate": new Date(2022, 5, 16),
                "endDate": new Date(2022, 5, 17),
            },
                    {
                "startDate": new Date(2022, 5, 20),
                "endDate": new Date(2022, 5, 20),
            },
            {
                "startDate": new Date(2022, 5, 30),
                "endDate": new Date(2022, 5, 30)
            }];

            function onDataBound(e) {
                var scheduler = e.sender;
                if(scheduler.viewName() == "month") {
                    setHighlightedDays(scheduler, highlightedDays);
                }
            }

            function setHighlightedDays(scheduler, highlightedDays) {
                var monthDaysSlots = $('.k-scheduler-content').find('td'); // Get all month days.
                for(var i = 0; i < monthDaysSlots.length; i++) { // Loop through them.
                    let day_slot = scheduler.slotByElement($(monthDaysSlots[i])); // Get the day slot.
                    let daySlotDateStart = new Date(day_slot.startDate); // Get the "startDate" field.
                    $.each(highlightedDays, function(indx, value) { // Loop through the collection of dates.
                        if((daySlotDateStart >= value["startDate"] && daySlotDateStart <= value["endDate"])){
                            $(monthDaysSlots[i]).addClass("highlightedDay");    
                        }
                    });
                }
            }
        </script>
    ```
    ```Styles
        <style>
            .highlightedDay {
                background-color: yellow;
            }
        </style>
    ```

{% if site.core %}
For a runnable example based on the code above, refer to the following REPL samples:

* [Sample code with the Scheduler HtmlHelper](https://netcorerepl.telerik.com/cdbkQZPF27hhvWpb40)
* [Sample code with the Scheduler TagHelper](https://netcorerepl.telerik.com/QHFkGDvb27y1NNeZ59)
{% else %}
For a runnable example based on the code above, refer to the [REPL example on highlighting specified dates within the Scheduler month view](https://netcorerepl.telerik.com/cdbkQZPF27hhvWpb40).
{% endif %}

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
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)

