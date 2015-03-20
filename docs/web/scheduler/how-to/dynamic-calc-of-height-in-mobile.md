---
title: Dynamic calculation of the widget height in mobile
page_title: Dynamic calculation of the widget height in mobile
description: Dynamic calculation of the widget height in mobile
---

# Dynamic calculation of the widget height in mobile

The example below demonstrates how to calculate widgets height dynamically in mobile.

#### Example:

```html
<div data-init="initLoginView" data-role="view" id="login">
<header data-role="header">
  <div data-role="navbar">
    <div>TEST</div>
   </div>
</header>
<div data-role="content">
  <div id="scheduler"></div>
<footer data-role="footer">
  <div>footer</div>
</footer>
</div>

<script type="text/javascript">
    var kendoMobileApp = new kendo.mobile.Application($(document.body), {
      skin: "flat"
    });

    function initLoginView(e) {
      $("#scheduler").kendoScheduler({
          date: new Date(),
          height: 100,
          views: [
              {type: "day"},
              {type: "month", selected: true},
              {type: "agenda", selectedDateFormat: "{0:ddd, M/dd/yyyy} - {1:ddd, M/dd/yyyy}"},
          ],
          mobile: "phone",
          timezone: "Etc/UTC",
          dataSource: {
              batch: true,
              transport: {
                  read: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks",
                      dataType: "jsonp"
                  },
                  update: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/update",
                      dataType: "jsonp"
                  },
                  create: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/create",
                      dataType: "jsonp"
                  },
                  destroy: {
                      url: "http://demos.telerik.com/kendo-ui/service/tasks/destroy",
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
          },
          resources: [
              {
                  field: "ownerId",
                  title: "Owner",
                  dataSource: [
                      { text: "Alex", value: 1, color: "#f8a398" },
                      { text: "Bob", value: 2, color: "#51a0ed" },
                      { text: "Charlie", value: 3, color: "#56ca85" }
                  ]
              }
          ]
      });

      function fitWidget() {
        var widget = $("#scheduler").data("kendoScheduler");
        var height = $(".km-content").height();

        height = (height * 80) / 100;

        //size widget to take the whole view
        widget.element.height(height);
        widget.element.closest(".km-pane-wrapper").height(height);

        widget.resize(true);
      }

      $(window).resize(function() {
        fitWidget();
      });

      fitWidget();
    }
</script>
```
