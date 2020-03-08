---
title: Show or Hide Grouped Resources with MultiSelect in Scheduler
description: An example on how to filter grouped resources in a Kendo UI Scheduler.
type: how-to
page_title: Show or Hide Grouped Resources | Kendo UI Scheduler for jQuery
slug: show-hide-grouped-resources-with-multiselect-in-scheduler
tags: show, hide, resources, grouped, scheduler, multiselect
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

How to filter the Kendo UI Scheduler resources and show or hide the filtered tasks in the DOM?

## Solution

1. Use the `change` event of the MultiSelect widget to define which of the loaded Scheduler resources are to be, first, filtered and, then, hidden or shown.
1. Use the `hideFilteredRows()` method to hide or show the rows from the Scheduler view which correspond to the deselected or selected MultiSelect items.

```dojo
<div id="example">
    <input type="text" id="multiselect" name="multiselect" />
    <br />
    <div id="scheduler"></div>
</div>

<script>
    $(function() {
    var selectedRes = { 1: false, 2: false, 3: false},
        hiddenRows = [];

    var schedDataSource= new kendo.data.SchedulerDataSource ({
        batch: true,
        transport: {
          read: {
            url: "//demos.telerik.com/kendo-ui/service/tasks",
            dataType: "jsonp"
          },
          update: {
            url: "//demos.telerik.com/kendo-ui/service/tasks/update",
            dataType: "jsonp"
          },
          create: {
            url: "//demos.telerik.com/kendo-ui/service/tasks/create",
            dataType: "jsonp"
          },
          destroy: {
            url: "//demos.telerik.com/kendo-ui/service/tasks/destroy",
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
            id: "taskId",
            fields: {
              taskId: { from: "TaskID", type: "number" },
              title: { from: "Title", defaultValue: "No title", validation: { required: true } },
              start: { type: "date", from: "Start" },
              end: { type: "date", from: "End" },
              startTimezone: { from: "StartTimezone" },
              endTimezone: { from: "EndTimezone" },
              description: { from: "Description" },
              recurrenceId: { from: "RecurrenceID" },
              recurrenceRule: { from: "RecurrenceRule" },
              recurrenceException: { from: "RecurrenceException" },
              ownerId: { from: "OwnerID", defaultValue: 1 },
              isAllDay: { type: "boolean", from: "IsAllDay" }
            }
          }
        }
    });

    var resSchedDataSource = new kendo.data.DataSource({
    	data: [{ text: "Alex", value: 1, color: "#f8a398" },
            { text: "Bob", value: 2, color: "#51a0ed" },
            { text: "Charlie", value: 3, color: "#56ca85" }
      ]
    });

    var sched = $("#scheduler").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
      views: [
        "timeline",
        "timelineWeek",
        { type: "timelineMonth", selected: false },
        { type: "month", selected: true }
      ],
      timezone: "Etc/UTC",
      dataSource: schedDataSource,
      resources: [{
      	field: "ownerId",
        dataSource: resSchedDataSource,
        title: "Owner"
      }],
      group: {
          resources: ["ownerId"],
          orientation: "vertical"
      },
      groupHeaderTemplate: $("#groupTemplate").html(),
    }).data("kendoScheduler");

    $("#multiselect").kendoMultiSelect({
      dataTextField: "text",
      dataValueField: "value",
      value: [1,2,3],
      change: function(e) {
        var values = this.value(),
            element = sched.element,
            content = sched.view().content,
            resElements = element.find('.resGroup'),
            resToHide = {},
            schedRes = resSchedDataSource.view();

        var filter = { logic: 'and', filters: [] };

        schedRes.forEach(function(res) {
          if ($.inArray(res.value, values) >= 0) {
       			selectedRes[res.value] = true;
            resToHide[res.value] = false;
          } else {
            selectedRes[res.value] = false;
            resToHide[res.value] = true;
          	filter.filters.push({ field: 'ownerId', operator: 'neq', value: res.value });
          }
        });

        hideFilterRows.call(this, resElements, content, sched.viewName() === "month" ? true : false);
        schedDataSource.filter(filter);
      },
      dataSource: {
        data: [
          { text: "Alex", value: 1, color: "#f8a398" },
          { text: "Bob", value: 2, color: "#51a0ed" },
          { text: "Charlie", value: 3, color: "#56ca85" }
        ]
      }
    });


    function hideFilterRows(resElements, content, isMonthView) {
        resElements.each(function (index, resElem) {
           var resValue = resElem.dataset.resValue;
           var founds = [];

           hiddenRows.forEach(function(obj) {
               if (obj.res === resValue)
                   founds.push(obj.elem);
           });
           if (!selectedRes[resValue] && founds.length === 0) {
               var groupRow = $(resElem).parent().parent();
               var start = isMonthView ? parseInt(resValue - 1) * 6 : parseInt(resValue - 1);
               var end = isMonthView ? start + 6 : start;
               for (var i = start; i <= end; i++) {
                 var viewRow = content.find('tr:eq(' + i  + ')');
                 viewRow.hide();

                 if (i % 6 && isMonthView)
                   groupRow = groupRow.next();

                 groupRow.hide();

                 hiddenRows.push({ elem: groupRow, res: resValue });
                 hiddenRows.push({ elem: viewRow, res: resValue});
               }
           }
           else if (selectedRes[resValue])
               founds.forEach(function(elem) {
                   elem.show();

                   hiddenRows = $.grep(hiddenRows, function(obj) {
                       return obj.res !== resValue;
                   });
               });
       });
    }
  });
</script>

```
