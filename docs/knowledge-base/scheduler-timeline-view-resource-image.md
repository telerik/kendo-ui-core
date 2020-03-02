---
title: Add Image to Resource on Timeline View
description: An example on how to insert an image on the Timeline view resources in the Kendo UI Scheduler.
type: how-to
page_title: Add Image to Resource on Timeline View | Kendo UI Scheduler for jQuery
slug: scheduler-timeline-view-resource-image
tags: scheduler, timeline, view, resource, add, image
ticketid: 1155292
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
</table>

## Description

How can I add an image to the resources on the left-hand side of the week view of the Scheduler?

## Solution

Extend the view and override the functions that are responsible for rendering the title.

```dojo
<div id="example" class="k-content">
  <h3>Resource titles are rendered using template with link and image:</h3>
  <div id="scheduler"></div>
</div>

<script>
  kendo.ui.WeekView = kendo.ui.WeekView.extend({

    _createColumnsLayout: function(resources, inner) {
      return customCreateLayoutConfiguration("columns", resources, inner);
    },

    _createRowsLayout: function(resources, inner) {
      return customCreateLayoutConfiguration("rows", resources, inner);
    },

  });

  function customCreateLayoutConfiguration(name, resources, inner) {
    var resource = resources[0];
    if (resource) {
      var configuration = [];

      var data = resource.dataSource.view();

      for (var dataIndex = 0; dataIndex < data.length; dataIndex++) {
        var defaultText = kendo.htmlEncode(kendo.getter(resource.dataTextField)(data[dataIndex]));
        var template = kendo.template("<a href='javascript: void(0)'>#=data#</a><br/><img src='https://demos.telerik.com/kendo-ui/content/shared/icons/sports/golf.png'/>");
        var obj = {
          text: template(defaultText),
          className: "k-slot-cell"
        };
        obj[name] = customCreateLayoutConfiguration(name, resources.slice(1), inner);

        configuration.push(obj);
      }
      return configuration;
    }
    return inner;
  }

  $(function() {
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/13"),
      startTime: new Date("2013/6/13 07:00 AM"),
      height: 600,
      views: [{
        type: "week",
        selected: true
      }],
      timezone: "Etc/UTC",
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
              return {
                models: kendo.stringify(options.models)
              };
            }
          }
        },
        schema: {
          model: {
            id: "meetingID",
            fields: {
              meetingID: {
                from: "MeetingID",
                type: "number"
              },
              title: {
                from: "Title",
                defaultValue: "No title",
                validation: {
                  required: true
                }
              },
              start: {
                type: "date",
                from: "Start"
              },
              end: {
                type: "date",
                from: "End"
              },
              startTimezone: {
                from: "StartTimezone"
              },
              endTimezone: {
                from: "EndTimezone"
              },
              description: {
                from: "Description"
              },
              recurrenceId: {
                from: "RecurrenceID"
              },
              recurrenceRule: {
                from: "RecurrenceRule"
              },
              recurrenceException: {
                from: "RecurrenceException"
              },
              roomId: {
                from: "RoomID",
                nullable: true
              },
              attendees: {
                from: "Attendees",
                nullable: true
              },
              isAllDay: {
                type: "boolean",
                from: "IsAllDay"
              }
            }
          }
        }
      },
      group: {
        resources: ["Rooms", "Attendees"],
        orientation: "vertical"
      },
      resources: [{
          field: "roomId",
          name: "Rooms",
          dataSource: [{
              text: "Meeting Room 101",
              value: 1,
              color: "#6eb3fa"
            },
            {
              text: "Meeting Room 201",
              value: 2,
              color: "#f58a8a"
            }
          ],
          title: "Room"
        },
        {
          field: "attendees",
          name: "Attendees",
          dataSource: [{
              text: "Alex",
              value: 1,
              color: "#f8a398"
            },
            {
              text: "Bob",
              value: 2,
              color: "#51a0ed"
            },
            {
              text: "Charlie",
              value: 3,
              color: "#56ca85"
            }
          ],
          multiple: true,
          title: "Attendees"
        }
      ]
    });
  });
</script>
```

## See Also

* [Demo on Creating Custom Views through Inheriting Built-In Views](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/how-to/custom-views/custom-view)
