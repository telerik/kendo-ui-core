---
title: Drag and Drop Events between Schedulers
page_title: Drag and Drop Events between Schedulers 
description: "Learn how to implement the drag-and-drop functionality in a Kendo UI for jQuery Scheduler component."
previous_url: /controls/scheduling/scheduler/how-to/drag-events-between-schedulers, /controls/scheduling/scheduler/how-to/interaction/drag-events-between-schedulers
slug: howto_drag-events-between-schedulers_scheduler
tags: telerik, kendo, jquery, scheduler, drag, and, drop, between 
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I implement the drag-and-drop functionality and move events between two Schedulers?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
   <div id="scheduler1"></div>
    <div id="scheduler2"></div>
    <div class="dragZone">
    </div>
    <script>

    $("#scheduler1").kendoScheduler({
      date: new Date("2013/6/6"),
      startTime: new Date("2013/6/6 07:00 AM"),
       views: [
        "day"
       ],
       height: 400,
       width: 800,
       moveStart: moveStart,
       moveEnd: moveEnd,
       dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview"
        },
        {
          id: 2,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Meeting"
        }
      ]
    });

      $("#scheduler2").kendoScheduler({
      date: new Date("2013/6/6"),
       views: [
        "day"
       ],
        height: 400,
        width:700,
      dataSource: []
    });


      var movingFlag = false;
      var moveEndFlag = false;

      function moveStart(e) {
           var draggerdEvent = e.event;
           var senderScheduler = e.sender.element;
           var DroppedOnScheduler = $("#scheduler2");
           var dragZone = $(".dragZone");

           var clonedElement = $('[data-uid*="'+ e.event.uid +'"]').clone();

            movingFlag = true;
            $(document)
                .on("mousemove", function (e) {
                    if (movingFlag) {
                        if (($(e.target).hasClass("k-event") || $(e.target).hasClass("k-event-template")
                            || $(e.target).closest("#scheduler1").length > 0)
                            && $(e.target).closest("#scheduler2").length == 0) {

                            clonedElement.hide();
                        } else {
                            moveEndFlag = true;
                            clonedElement.show().css("position", "fixed").css("left", e.pageX + 5).css("top", e.pageY + 5);
                        }
                    }
                })
                .on("mouseup", function (e) {
                    if (movingFlag) {
                        clonedElement.hide().removeAttr("style");
                        if ($(e.target).closest(DroppedOnScheduler).length > 0) {
                            var offset = $(e.target).offset();
                            var scheduler = DroppedOnScheduler.data("kendoScheduler");
                            var slot = scheduler.slotByPosition(offset.left, offset.top);

                            if(slot) {
                                var newEvent = {
                                    title: draggerdEvent.title,
                                    end: new Date(slot.startDate.getTime() + (draggerdEvent.end - draggerdEvent.start)),
                                    start: slot.startDate ,
                                    isAllDay: slot.isDaySlot
                                };
                                scheduler.dataSource.add(newEvent);
                            }
                        }
                    }

                    movingFlag = false;
                    moveEndFlag = false;
                    $(document).off();
                    dragZone.empty();
                });

            if (dragZone.find(".rsApt").length == 0) {
                clonedElement.hide();
                dragZone.append(clonedElement);
            }
       }

      function moveEnd(e) {
            if (moveEndFlag) {
                e.preventDefault();
            }
      }
    </script>

```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
