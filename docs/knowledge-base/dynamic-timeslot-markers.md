---
title: Set Custom Time Ruler Indicators in Gantt
description: An example on how to set custom time ruler indicators in the Kendo UI Gantt.
type: how-to
page_title: Define Custom Time Ruler Indicators in Gantt | Kendo UI Gantt
slug: custom-time-ruler-indicators-in-gantt
tags: time, ruler, indicators, gantt
res_type: kb
component: gantt
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Gantt</td>
 </tr>
</table>

## Description

By default, the Gantt charts display a red marker on top of the time slot for the current date/time.

How can I add this marker to any other time slot other than the current date?

## Solution

1. Override the `_renderCurrentTime()` method to allow the rendering of the ruler markup at a specific time slot.
1. Use the modified `_renderCurrentTime` method in the `dataBound` event of the Gantt to dynamically set the ruler indicators at specific time slots.

```dojo
<div id="example">
    <div class="demo-section k-content">
        <div id="gantt"></div>
    </div>
</div>

<script>
    kendo.ui.GanttView.prototype._renderCurrentTime = function (time) {
        if (time === undefined) {
            return;
        }
        var currentTime = time;
        var timeOffset = this._offset(currentTime);
        var element = $("<div class='k-current-time'></div>");
        var viewStyles = kendo.ui.GanttView.styles;
        var tablesWrap = $("." + viewStyles.tasksWrapper);
        var tasksTable = $("." + viewStyles.tasksTable);
        var slot;

        if (!this.content || !this._timeSlots().length) {
            return;
        }

        slot = this._timeSlots()[this._slotIndex("start", currentTime)];

        if (currentTime < slot.start || currentTime > slot.end) {
            return;
        }

        if (tablesWrap.length && tasksTable.length) {
            timeOffset += tasksTable.offset().left - tablesWrap.offset().left;
        }

        element.css({
            left: timeOffset + "px",
            top: "0px",
            width: "1px",
            height: this._contentHeight + "px"
        })
        .appendTo(this.content);
    };

    var gantt = $("#gantt").kendoGantt({
        dataSource: [{
            id: 1,
            orderId: 0,
            parentId: null,
            title: "Task1",
            start: new Date(2017, 9, 17),
            end: kendo.date.addDays(new Date(2017, 9, 17), 1)
        }],
        views: [ "day", "week", "month" ],
        dataBound: function (e) {
            e.sender.view().content.find(".k-current-time").remove();
            e.sender.view()._renderCurrentTime(new Date(2017, 9, 17, 10, 30));
            e.sender.view()._renderCurrentTime(new Date(2017, 9, 17, 11, 45));
            e.sender.view()._renderCurrentTime(new Date(2017, 9, 17, 12, 30));
        }
    }).data("kendoGantt");
  </script>

```
