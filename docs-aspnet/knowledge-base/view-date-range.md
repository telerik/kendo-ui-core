---
title: Retrieving the Current View Date Range of the Scheduler 
page_title: Retrieving the Current View Date Range of the Scheduler
description: "Learn how to retrieve the date range of the current Telerik UI for {{ site.framework }} Scheduler view."
slug: view-date-range
tags: telerik, kendo, core, mvc, scheduler, retrieve, the, current, view, date, range, calendar 
component: scheduler
res_type: kb
components: ["general"]
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress {{ site.product }} Scheduler</td>
 </tr>
 <tr>
  <td>Progress {{ site.product }} version</td>
  <td>Created with the 2023.2.606 version</td>
 </tr>
</table>

## Description

How can I retrieve the date range of the current {{ site.product }} Scheduler view?

## Solution

To achieve the desired scenario:

1. Define a common function which will be responsible for showing the Scheduler's date range. Inside, utilize the [`view()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/methods/view) client-side method of the Scheduler to retrieve the range.
1. To handle where the date range is being navigated **from**, subscribe to the [`Navigate`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulereventbuilder#navigatesystemstring) event and call the previously defined function.
1. To handle where the date range is being navigated **to**, subscribe to the [`DataBound`](https://docs.telerik.com/{{ site.platform }}/api/kendo.mvc.ui.fluent/schedulereventbuilder#databoundsystemstring) event and call the previously defined function.


```Razor Index.cshtml
    @(Html.Kendo().Scheduler<Kendo.Mvc.Examples.Models.Scheduler.Activity>()
        .Name("scheduler")
        .Date(new DateTime(2020, 10, 4))
        .StartTime(new DateTime(2020, 10, 4, 7, 00, 00))
        .EndTime(new DateTime(2020, 10, 4, 20, 00, 00))
        .Height(600)
        .Events(events => {
            events.Navigate("onNavigate");
            events.DataBound("onDataBound");
        })
        .EventTemplateId("event-template")
        .Views(views =>
        {
            views.DayView();
            views.WeekView(week =>
            {
                week.Selected(true);
            });
            views.WorkWeekView();
            views.MonthView();
            views.AgendaView();
        })
        .Resources(resource =>
        {
            resource.Add(m => m.Attendee)
            .Title("Attendee")
            .DataTextField("Text")
            .DataValueField("Value")
            .DataColorField("Color")
            .BindTo(new[] {
                new { Text = "Jason", Value = 1, Color = "#eaf8ff" },
                new { Text = "Maddie", Value = 2, Color = "#fdfdf4" }
            });
        })
        .DataSource(d => d
            .Model(m =>
            {
                m.Id(f => f.ID);
                m.Field(f => f.Title).DefaultValue("No title");
                m.Field(f => f.Attendee).DefaultValue(1);
            })
            .Read("Overview_Read", "Scheduler")
            .Create("Overview_Create", "Scheduler")
            .Destroy("Overview_Destroy", "Scheduler")
            .Update("Overview_Update", "Scheduler")
        )
    )
    <div class="console"></div>
```

```JS script.js
    // Handlers
    <script>
        function scheduler_view_range(e) { // Common function
            var view = e.sender.view();

            // The view has:
            // A startDate method which returns the start date of the view.
            // An endDate method which returns the end date of the view.

            $(".console").append("<p>"+kendo.format("view:: start: {0:d}; end: {1:d};", view.startDate(), view.endDate())+"</p>");
        }

        function onDataBound(e){
             $(".console").append("<p><strong>Navigated to:</strong></p>");
              scheduler_view_range(e);
        }

        function onNavigate(e){
            $(".console").append("<p><strong>Navigated from:</strong></p>");
            scheduler_view_range(e);
        }

    </script>    

    // External events template
    <script id="event-template" type="text/x-kendo-template">
        <div class="template-container">
            # if (Image) { #
            <img alt="Telerik UI for ASP.NET Core Scheduler #: title # icon" src="@Url.Content("~/shared/web/scheduler/" + "#=  Image #")" style="height:25px; width: 25px;" />
            # } #
            <h3 class="template-title-#= resources[0].value #">#: title #</h3>
        </div>
    </script>
```

For the complete implementation of the suggested approach, refer to the [Telerik REPL example on retrieving the current date range in the Scheduler view](https://netcorerepl.telerik.com/GRaAbdFG25bQxKS309).

## More {{ site.framework }} Scheduler Resources
* [{{ site.framework }} Scheduler Documentation]({% slug htmlhelpers_scheduler_aspnetcore %})
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
* [TagHelper Server-Side API Reference of the Scheduler for {{ site.framework }}](https://docs.telerik.com/aspnet-core/api/taghelpers/scheduler)
{% endif %}
* [Telerik REPL: Retrieve current date range in Scheduler view](https://netcorerepl.telerik.com/GRaAbdFG25bQxKS309)
* [Telerik UI for {{ site.framework }} Breaking Changes]({%slug breakingchanges_2023%})
* [Telerik UI for {{ site.framework }} Knowledge Base](https://docs.telerik.com/{{ site.platform }}/knowledge-base)
