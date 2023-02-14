---
title: Create Custom Restrictions in the Scheduler 
page_title: Create Custom Restrictions in the Scheduler
description: "Learn how to create a custom restriction for the events of the Kendo UI for jQuery  Scheduler."
previous_url: /controls/scheduling/scheduler/how-to/custom-restriction, /controls/scheduling/scheduler/how-to/editing/custom-restriction
slug: howto_create_custom_restrivtions_scheduler
tags: telerik, kendo, jquery, scheduler, create, custom, restrictions 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I create a custom restriction for Scheduler events?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
     <div id="scheduler"></div>
    <script>
      $(function() {
        $("#scheduler").kendoScheduler({
          date: kendo.date.today(),
          dateHeaderTemplate: "<strong class='k-nav-day'>#=kendo.toString(date, 'ddd d/M')#</strong>",
          views: [
            "day",
            { type: "week", selected: true },
            "month"
          ],
          timezone: "Etc/UTC",
          allDaySlot: true,
          majorTick: 720,
          majorTimeHeader: "<strong>#=kendo.toString(date, 'tt')#</strong>",
          editable: {
            update: false,
            destroy: false
          },
          dataBound: appointment_databound,
          save: appointment_save,
          add: appointment_add,
          edit: appointment_edit,
          dataSource: {
            batch: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings",
                dataType: "jsonp"
              },
              update: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings/update",
                dataType: "jsonp"
              },
              create: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings/create",
                dataType: "jsonp"
              },
              destroy: {
                url: "https://demos.telerik.com/kendo-ui/service/meetings/destroy",
                dataType: "jsonp"
              },
              parameterMap: function(options, operation) {
                if (operation !== "read" && options.models) {
                  return {models: kendo.stringify(options.models)};
                }
              }
            },
            schema: {
              model: {
                id: "meetingID",
                fields: {
                  meetingID: { from: "MeetingID", type: "number" },
                  title: { from: "Title", defaultValue: "No title", validation: { required: true } },
                  start: { type: "date", from: "Start" },
                  end: { type: "date", from: "End" },
                  startTimezone: { from: "StartTimezone" },
                  endTimezone: { from: "EndTimezone" },
                  description: { from: "Description" },
                  recurrenceId: { from: "RecurrenceID" },
                  recurrenceRule: { from: "RecurrenceRule" },
                  recurrenceException: { from: "RecurrenceException" },
                  roomId: { from: "RoomID", nullable: true },
                  attendees: { from: "Attendees", nullable: true },
                  isAllDay: { type: "boolean", from: "IsAllDay" }
                }
              }
            }
          }
        });
      });

      var saving = false;
      function appointment_databound(e) {
        if (saving == true) {
          // Ignore this functionality for simplicity.
          return;

          if ('@Model.IsEdit.ToString()' == 'True') {
            window.location.href = "/Repairs/Job/Details?repairId=" + $("#ID").val();
          }
          else {
            $.ajax({
              url: '@Url.Action("AppointmentList", "Job")',
              type: "Get",
              success: function (result) {

                var count = $("#appointmentListCount").val();
                count++;
                $("#appointmentListCount").val(count);
                $("#appointmentList").html(result);
              },
              error: function (xhr, ajaxOptions, thrownError) {
                alert(xhr.status + " " + thrownError + " " + ajaxOptions);
              }
            });
            saving = false;
          }
        }
      }

      function appointment_save(e) {
        saving = true;
        $("#addAppointmentView").hide();
        $("#addAppointmentButton").hide();
        $("#mostRecentJobView").hide();
        $("#newContractorView").hide();
        $('#newApointmentButton').show();
      }

      function appointment_edit(e) {
        if (e.event.isNew) {
          var scheduler = $("#scheduler").data("kendoScheduler");
          var startDate = new Date(e.event.start.getFullYear(), e.event.start.getMonth(), e.event.start.getDate());
          var endDate = new Date(e.event.start.getFullYear(), e.event.start.getMonth(), e.event.start.getDate(), 23, 59, 59);
          var events = scheduler.occurrencesInRange(startDate, endDate);
          var morningTotalEstimatedTime = 0;
          var afternoonTotalEstimatedTime = 0;
          var allDayTotalEstimatedTime = 0;
          var jobPriorityId = $("#JobPriorityID").val();
          var outOfHour = 4;
          var estimate = $("#NewEstimatedTime").val();

          for (var i = 0; i < events.length; i++) {
            if (events[i].Timeslot == 1) {
              morningTotalEstimatedTime += events[i].EstimatedTime;
            } else if (events[i].Timeslot == 2) {
              afternoonTotalEstimatedTime += events[i].EstimatedTime;
            } else if (events[i].Timeslot == 3) {
              allDayTotalEstimatedTime += events[i].EstimatedTime;
            }
          }

          var totalEstimateTime = afternoonTotalEstimatedTime + morningTotalEstimatedTime + allDayTotalEstimatedTime;

          if (totalEstimateTime == 0) {
            e.container.find("#allDayRadioButton").show();
            e.container.find("#allDayLabel").show();
          }
          else {
            e.container.find("#allDayRadioButton").hide();
            e.container.find("#allDayLabel").hide();
          }

          var totalMorning = morningTotalEstimatedTime + parseInt(estimate);
          var totalAfternoon = afternoonTotalEstimatedTime + parseInt(estimate);

          if (jobPriorityId != outOfHour && allDayTotalEstimatedTime >= 480) {
            alert("An all-day appointment has already been logged");
            e.preventDefault();
          } else if (jobPriorityId != outOfHour && totalAfternoon > 240 && totalMorning > 240 && totalEstimateTime > 0 || allDayTotalEstimatedTime >= 480) {
            alert("You are exceeding total number of minutes for this day. " + "\nMorning: " + morningTotalEstimatedTime + "\nAfternon: " + afternoonTotalEstimatedTime + "\nNew Estimate: " + estimate);
            e.preventDefault();
          } else if (jobPriorityId != outOfHour && parseInt(estimate) > 240 && totalEstimateTime == 0) {
            e.container.find("#afternoonRadioButton").hide();
            e.container.find("#afternoonLabel").hide();
            e.container.find("#morningRadioButton").hide();
            e.container.find("#morningLabel").hide();
          } else if (jobPriorityId != outOfHour && totalMorning > 240) {
            alert("Morning schedule are already full." + "\nMorning: " + morningTotalEstimatedTime + "\nNew Estimate: " + estimate);
            e.container.find("#morningRadioButton").hide();
            e.container.find("#morningLabel").hide();
          } else if (jobPriorityId != outOfHour && totalAfternoon > 240) {
            alert("Afternoon schedule are already full. " + "\nAfternon: " + afternoonTotalEstimatedTime + "\nNew Estimate: " + estimate);
            e.container.find("#afternoonRadioButton").hide();
            e.container.find("#afternoonLabel").hide();
          }

        }
        else {
          alert("Appointment can't be edited");
          e.preventDefault();
        }
      }

      function appointment_add(e) {
        // Skipped for simplicity.
        return;
        var list = []; //repairCodeMultiSelect.value();
        var operativeId = $("#NewOperativeID").val().toString();
        var estimate = $("#NewEstimatedTime").val();

        if (list.toString() == "") {
          alert("Please select Repair Code first");
          e.preventDefault();
        }
        else if (operativeId.length == 0) {
          alert("Please select Operative first");
          e.preventDefault();
        }
        else if (estimate < 30) {
          alert("Estimated time should not be less than 30 mins");
          e.preventDefault();
        }
      }

    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
