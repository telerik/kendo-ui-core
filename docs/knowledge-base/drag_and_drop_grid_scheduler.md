---
title: Drag and Drop between the Grid and the Scheduler
page_title: Drag and Drop between the Grid and the Scheduler 
description: "Learn how to drag and drop items between Kendo UI Grid and Kendo UI for jQuery Scheduler widgets."
previous_url: /controls/scheduling/scheduler/how-to/drag_and_drop_grid_scheduler, /controls/scheduling/scheduler/how-to/interaction/drag_and_drop_grid_scheduler
slug: drag_and_drop_between_grid_and_scheduler
tags: telerik, kendo, jquery, scheduler, drag, ad, drop, between, the, grid 
component: scheduler
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler for jQuery</td>
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

How can I implement the drag-and-drop functionality to move items between the Kendo UI Grid and the Kendo UI Scheduler?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo

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
            // Create the drop area from the current View.
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
            // Add a margin to position correctly the tooltip under the pointer.
            $("#dragTooltip").css("margin-left", e.clientX - gridRowOffset.left - 50);
        },
        hint: function (row) {

            // Remove the old selection.
            row.parent().find(".k-selected").each(function () {
                $(this).removeClass("k-selected")
            })

            // Add the selected class to the current row.
            row.addClass("k-selected");

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

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
