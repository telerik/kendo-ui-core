---
title: Add a Custom Time Marker in Gantt
description: An example on how to add a vertical line similar to the current time marker in the Kendo UI Gantt.
type: how-to
page_title: Add Custom Time Marker | Kendo UI Gantt for jQuery
slug: gantt-custom-time-marker
tags: kendo, kendoui, gantt, custom, time, marker, primavera, status
ticketid: 1343465
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Gantt</td>
 </tr>
</table>


## Description

How can I add a custom time marker to a specific time value, similar to the built-in current time marker of the Gantt?

## Solution

1. Add the `renderLine` function.
1. In the `dataBound` event of the Gantt, call the function with the desired options.
1. Add CSS styles by using the class for the line, or style the line element that is returned by the function.

```dojo
<style>
    .k-gantt .k-status-time {
        background-color: blue;
        position: absolute;
    }
</style>
<div id="gantt"></div>
<script>
    //https://stackoverflow.com/a/563442
    // implement addDays method for demonstration purposes
    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    Date.prototype.addHours = function (hours) {
        var date = new Date(this.valueOf());
        date.setHours(date.getHours() + hours);
        return date;
    }

    $("#gantt").kendoGantt({
        dataSource: [
            {
                id: 1,
                orderId: 0,
                title: "Task1",
                start: new Date().addHours(2),
                end: new Date().addDays(1)
            },
            {
                id: 2,
                orderId: 1,
                title: "Task2",
                start: new Date().addHours(2),
                end: new Date().addDays(1)
            }
        ],
        dataBound: function (e) {
            var statusLineDate = new Date().addHours(1);
            var $lineElement = renderLine(e.sender, statusLineDate);
        },
        dependencies: [
            {
                id: 1,
                predecessorId: 1,
                successorId: 2,
                type: 1
            }
        ]
    });

    function renderLine(gantt, date, lineClass) {
        var ganttView = gantt.view();
        lineClass = lineClass || "k-status-time"
        var currentTime = date;
        var timeOffset = ganttView._offset(currentTime);
        var element = $('<div class=\'' + lineClass + '\'></div>');
        var viewStyles = kendo.ui.GanttView.styles;
        var tablesWrap = $("." + viewStyles.tasksWrapper);
        var tasksTable = $("." + viewStyles.tasksTable);
        var slot;
        if (!ganttView.content || !ganttView._timeSlots().length) {
            return;
        }
        ganttView.content.find('.' + lineClass).remove();
        slot = ganttView._timeSlots()[ganttView._slotIndex('start', currentTime)];
        if (currentTime < slot.start || currentTime > slot.end) {
            return;
        }
        if (tablesWrap.length && tasksTable.length) {
            timeOffset += tasksTable.offset().left - tablesWrap.offset().left;
        }
        element.css({
            left: timeOffset + 'px',
            top: '0px',
            width: '1px',
            height: ganttView._contentHeight + 'px'
        }).appendTo(ganttView.content);

        return element;
    }
</script>
```
