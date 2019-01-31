---
title: Drag and Drop Events between Schedulers
page_title: Drag and Drop Events between Schedulers | Kendo UI Scheduler
description: "Learn how to implement the drag-and-drop functionality in a Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/drag-events-between-schedulers
slug: howto_drag-events-between-schedulers_scheduler
---

# Drag and Drop Events between Schedulers

The following example demonstrates how to implement the drag-and-drop functionality in a Kendo UI Scheduler.

###### Example

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

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Create Custom Views Inheriting Built-In Views]({% slug howto_create_custom_view_inheriting_builtinview_scheduler %})
* [How to Create Custom month View with Event Count in Show More Button]({% slug howto_create_custom_monthview_eventcount_showmore_button_scheduler %})
* [How to Create Custom Restrictions]({% slug howto_create_custom_restrivtions_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Implement Custom Editing in agenda View]({% slug howto_implement_custom_editing_inagenda_view_scheduler %})
* [How to Nest Editors inside Event Templates]({% slug howto_nest_editorsinside_event_templates_scheduler %})
* [How to Create and Set ObservableArray Events]({% slug howto_createand_set_observablearray_events_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_customize_editand_events_templates_angularjs_scheduler %}).
