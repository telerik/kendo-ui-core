---
title: Validate Timeslot Availability against Existing Recurrence Rules
description: Learn how to validate the Timeslot availability against the existing recurrence rules of the {{ site.product }} Scheduler.
type: how-to
page_title: Validate Timeslot Availability against Existing Recurrence Rules
previous_url: /helpers/scheduling/scheduler/how-to/validate-timeslot-against-recurrence-rules, /html-helpers/scheduling/scheduler/how-to/validate-timeslot-against-recurrence-rules
slug: scheduler-validate-timeslot-against-recurrence-rules
tags: scheduler, timeslot, validate, recurrence, rules, telerik, core, mvc
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

How can I validate if the Timeslot of a new event is available based on the existing recurrence rules of the {{ site.framework }} Scheduler?

## Solution

The following example shows how to validate server-side when a new event is about to be created. If the validation fails, the event is not saved, and the user receives an error message that the selected time does not have available slots.

1. Validate the data of the new event in the Create action based on your requirements, and add a {% if site.core %}[ModelState error](https://learn.microsoft.com/en-us/dotnet/api/microsoft.aspnetcore.mvc.modelbinding.modelstatedictionary.addmodelerror?view=aspnetcore-9.0){% else %}[ModelState error](https://learn.microsoft.com/en-us/dotnet/api/system.web.mvc.modelstatedictionary.addmodelerror?view=aspnet-mvc-5.2){% endif %} if the current timeslot is not available. Return a collection with the created event and pass the ModelState to the [`ToDataSourceResult()`](/api/kendo.mvc.extensions/queryableextensions#todatasourceresultsystemcollectionsienumerablekendomvcuidatasourcerequestmicrosoftaspnetcoremvcmodelbindingmodelstatedictionary) method.

    ```C#
        public virtual JsonResult Meetings_Create([DataSourceRequest] DataSourceRequest request, MeetingViewModel meeting)
        {
            if (ModelState.IsValid)
            {
                if (CheckEventSlot(meeting)) // Validate the timeslot availability.
                {
                    meetingService.Insert(meeting, ModelState);
                }
                else
                {
                    ModelState.AddModelError("start", "The new event is not allowed because the timeslot is unavailable.");
                }
            }
            return Json(new[] { meeting }.ToDataSourceResult(request, ModelState));
        }

        private bool CheckEventSlot(MeetingViewModel newMeeting)
        {
            foreach (var meeting in meetingService.GetAll())
            {
                if (!string.IsNullOrEmpty(meeting.RecurrenceRule))
                {
                    var start = meeting.Start;
                    var end = meeting.End;
                    var recRule = meeting.RecurrenceRule;

                    var condition = false; // Here you can use 3rd party software like iCal.Net to build up the condition.
                    if (condition)
                    {
                        return false;
                    }
                }
            }
            return true;
        }
    ```

1. Handle the [`Error`](/api/kendo.mvc.ui.fluent/datasourceeventbuilder#errorsystemstring) event of the Scheduler DataSource and display the error message to the user.

    ```HtmlHelper
            @(Html.Kendo().Scheduler<MeetingViewModel>()
                .Name("scheduler")
                ...// Additional configuration.
                .DataSource(d => d
                    .Events(e => e.Error("onError"))
                    ...// Additional configuration.
                )
            )
    ```
    {% if site.core %}
    ```TagHelper
        @addTagHelper *, Kendo.Mvc

        <kendo-scheduler name="scheduler">
            <!-- Other configuration -->
            <scheduler-datasource type="@DataSourceTagHelperType.Ajax" on-error="onError">
                <!-- Other configuration -->
            </scheduler-datasource>
        </kendo-scheduler>
    ```
    {% endif %}
    ```JS
    <script type="text/javascript">
        function onError(args) { // The event will fire when there are Model State errors.
            var errors = args.errors; // Get the received errors.
            var message = "";
            var scheduler = $("#scheduler").data("kendoScheduler");
            if (errors) {
                scheduler.one("dataBinding", function (e) { // Subscribe to the "dataBinding" event of the Scheduler once.
                    e.preventDefault(); // Prevent the default event action.
                    $.each(errors, function (key, value) { // Loop through the errors.
                        if ('errors' in value) {
                            $.each(value.errors, function() {
                                message += this + "\n"; // Store the messages in a variable.
                            });
                        }
                    });
                    alert(message); // Display the message.
                });
            }
        }
    </script>
    ```

For a runnable example, refer to the [ASP.NET MVC application](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master/Telerik.Examples.Mvc/Telerik.Examples.Mvc/Areas/SchedulerValidatingTimeslot) in the [UI for ASP.NET MVC Examples repository](https://github.com/telerik/ui-for-aspnet-mvc-examples/tree/master). {% if site.core %}You can use this as a starting point to configure the same behavior in an ASP.NET Core project.{% endif %}

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

