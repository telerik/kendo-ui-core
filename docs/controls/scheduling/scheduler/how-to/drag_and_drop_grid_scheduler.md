---
title: Drag and Drop between Kendo UI Grid and Scheduler
page_title: Drag and Drop between Kendo UI Grid and Scheduler | Kendo UI Scheduler
description: "Learn how to drag and drop items between Kendo UI Grid and Kendo UI Scheduler widgets."
slug: drag_and_drop_between_grid_and_scheduler
---

# Drag and Drop between Kendo UI Grid and Scheduler

The example below demonstrates how to implement the drag-and-drop functionality to move items between the Kendo UI Grid and Kendo UI Scheduler.

###### Example

```html

   <div style="width: 50%; margin-left: auto; margin-right: auto;">
    <div id="scheduler"></div>
    <h3>Drag events from the Grid to the Scheduler:</h3>
    <div id="grid" style="width: 800px"></div>
</div>

<script>
$(function() {
    var scheduler = $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 10:00"),
        endTime: new Date("2013/6/13 23:00"),
        height: 500,
        views: ["day", "agenda", "week", "month"],
        dataBound: function (e) {
            //create drop area from current View
            createDropArea(this);
        },
        dataSource: {
            transport: {
                read: function(e) { e.success([]); },
                update: function(e) { e.success(""); },
                destroy: function(e) { e.success(""); },
                create: function(e) {
                    var schedulerDS = $("[data-role=scheduler]").data("kendoScheduler").dataSource;
                    var lastItem = schedulerDS.data()[schedulerDS.data().length-1];
                    e.data.taskID = lastItem.taskID + 1;
                    e.success();
                }
            },
            schema: {
                model: {
                    id: "taskID",
                    fields: {
                        taskID: { type: "number" },
                        title: { type: "string" },
                        description: { type: "string" },
                        start: { type: "date" },
                        end: { type: "date" },
                        recurrenceRule: { type: "string" },
                        recurrenceID: { type: "number", defaultValue: null },
                        recurrenceException: { type: "string" },
                        isAllDay: { type: "boolean" },
                        image: { type: "string" },
                        imdb: { type: "string" }
                    }
                }
            }
        }
    }).data("kendoScheduler");

    var grid = $("#grid").kendoGrid({
        columns: [
            "taskID" , "title",
            {field: "start", format: "{0:yyyy/MM/dd HH:mm}"},
            {field: "end", format: "{0:D}"},
        ],
        selectable: "single row",
        dataSource: {
            transport: {
                read: function(e) { e.success(dataS); }
            }
        }
    }).data("kendoGrid");

    function  createDropArea(scheduler) {
        scheduler.view().content.kendoDropTargetArea({
            filter: ".k-scheduler-table td, .k-event",
            drop: function(e){

                var offset = $(e.dropTarget).offset();
                var slot = scheduler.slotByPosition(offset.left, offset.top);
                var dataItem = grid.dataItem(grid.select());

                if(dataItem && slot) {
                    var offsetMiliseconds = new Date().getTimezoneOffset() * 60000;
                    var newEvent = {
                        title: dataItem.title,
                        end: new Date(slot.startDate.getTime() + (dataItem.end - dataItem.start)),
                        start: slot.startDate ,
                        isAllDay: slot.isDaySlot,
                        description: dataItem.description,
                        imdb: dataItem.imdb,
                        image: dataItem.image
                    };

                    grid.dataSource.remove(dataItem);
                    scheduler.dataSource.add(newEvent);
                }

            }
        });
    }

     var grid = $("#grid").data("kendoGrid"),
        gridRowOffset = grid.tbody.find("tr:first").offset();

    grid.table.kendoDraggable({
        filter: "tbody > tr",
        dragstart: function (e) {
            //add margin to position correctly the tooltip under the pointer
            $("#dragTooltip").css("margin-left", e.clientX - gridRowOffset.left - 50);
        },
        hint: function (row) {

            //remove old selection
            row.parent().find(".k-state-selected").each(function () {
                $(this).removeClass("k-state-selected")
            })

            //add selected class to the current row
            row.addClass("k-state-selected");

            var dataItem = grid.dataItem(row);
            var tooltipHtml = "<div class='k-event' id='dragTooltip'><div class='k-event-template'>" +
                        kendo.format("{0:t} - {1:t}", dataItem.start, dataItem.end) +
                        "</div><div class='k-event-template'>" + dataItem.title +
                        "</div></div>";

            return $(tooltipHtml).css("width", 300);
        }
    });
});
</script>

<style scoped>
    #scheduler {
        width: 800px
    }

    body {
        font-family: Verdana;
        font-size: 10pt
    }
</style>

<script>
    //Local data
    window.dataS = [
            {
                taskID: 1,
                ownerId: 1,
                title: "Fast and furious 6",
                image: "../../content/web/scheduler/fast-and-furious.jpg",
                imdb: "http://www.imdb.com/title/tt1905041/",
                start: new Date("2013/6/13 17:00"),
                end: new Date("2013/6/13 18:30")
            },
            {
                taskID: 2,
                ownerId: 3,
                title: "The Internship",
                image: "../../content/web/scheduler/the-internship.jpg",
                imdb: "http://www.imdb.com/title/tt2234155/",
                start: new Date("2013/6/13 14:00"),
                end: new Date("2013/6/13 15:30")
            },
            {
                taskID: 3,
                ownerId: 2,
                title: "The Perks of Being a Wallflower",
                image: "../../content/web/scheduler/wallflower.jpg",
                imdb: "http://www.imdb.com/title/tt1659337/",
                start: new Date("2013/6/13 16:00"),
                end: new Date("2013/6/13 17:30")
            },
            {
                taskID: 4,
                ownerId: 1,
                title: "The Help",
                image: "../../content/web/scheduler/the-help.jpg",
                imdb: "http://www.imdb.com/title/tt1454029/",
                start: new Date("2013/6/13 12:00"),
                end: new Date("2013/6/13 13:30")
            },
            {
                taskID: 5,  
                ownerId: 2,
                title: "Now You See Me",
                image: "../../content/web/scheduler/now-you-see-me.jpg",
                imdb: "http://www.imdb.com/title/tt1670345/",
                start: new Date("2013/6/13 10:00"),
                end: new Date("2013/6/13 11:30")
            },
            {
                taskID: 6,
                ownerId: 1,
                title: "Fast and furious 6",
                image: "../../content/web/scheduler/fast-and-furious.jpg",
                imdb: "http://www.imdb.com/title/tt1905041/",
                start: new Date("2013/6/13 19:00"),
                end: new Date("2013/6/13 20:30")
            },
            {   
                taskID: 7,
                ownerId: 3,
                title: "The Internship",
                image: "../../content/web/scheduler/the-internship.jpg",
                imdb: "http://www.imdb.com/title/tt2234155/",
                start: new Date("2013/6/13 17:30"),
                end: new Date("2013/6/13 19:00")
            },
            {
                taskID: 8,
                ownerId: 1,
                title: "The Perks of Being a Wallflower",
                image: "../../content/web/scheduler/wallflower.jpg",
                imdb: "http://www.imdb.com/title/tt1659337/",
                start: new Date("2013/6/13 17:30"),
                end: new Date("2013/6/13 19:00")
            },
            {
                taskID: 9,
                ownerId: 2,
                title: "The Help",
                image: "../../content/web/scheduler/the-help.jpg",
                imdb: "http://www.imdb.com/title/tt1454029/",
                start: new Date("2013/6/13 13:30"),
                end: new Date("2013/6/13 15:00")
            },
            {
                taskID: 10,
                ownerId: 2,
                title: "Now You See Me",
                image: "../../content/web/scheduler/now-you-see-me.jpg",
                imdb: "http://www.imdb.com/title/tt1670345/",
                start: new Date("2013/6/13 12:30"),
                end: new Date("2013/6/13 14:00")
            }
        ];
</script>

```

## See Also

Other articles and how-to examples on the Kendo UI Scheduler:

* [Scheduler JavaScript API Reference](/api/javascript/ui/scheduler)
* [How to Add Events Programmatically]({% slug howto_add_events_programatically_scheduler %})
* [How to Calculate Scheduler Height Dynamically on Mobile]({% slug howto_calculate_scheduler_height_dunamically_onmobile_scheduler %})
* [How to Clone Events on Ctrl + move]({% slug howto_clone_eventson_ctrlplus_move_scheduler %})
* [How to Customize Edit and Events Templates]({% slug howto_customize_editand_event_templates_scheduler %})
* [How to Create External Editor Form]({% slug howto_create_external_editor_form_scheduler %})
* [How to Edit Records on touchend]({% slug howto_edit_records_using_touchendonmobile_scheduler %})
* [How to Edit Using ContextMenu]({% slug howto_edit_using_kendouicontextmenu_scheduler %})
* [How to Expand Scheduler to 100% Width and Height]({% slug howto_expand_scheduler_to100percent_widthandheight_scheduler %})
* [How to Filter Events by Resource Using MultiSelect]({% slug howto_filter_eventsby_resourceusing_multiselect_scheduler %})
* [How to Get next Occurrence]({% slug howto_getthe_next_occurance_scheduler %})

How-to examples on the Kendo UI Scheduler in AngularJS:

* [How to Show Тooltip on hover]({% slug howto_show_tooltipon_hover_angularjs_scheduler %})
* [How to Wrap Scheduler in Custom Directives]({% slug howto_wrap_schedulerin_custom_directives_angularjs_scheduler %})

For more runnable examples on the Kendo UI Scheduler, browse its [**How To** documentation folder]({% slug howto_add_controlsto_custom_event_editor_scheduler %}).
