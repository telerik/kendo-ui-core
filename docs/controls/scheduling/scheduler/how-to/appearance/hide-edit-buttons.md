---
title: Hide Edit Buttons
page_title: Hide Edit Buttons | Kendo UI Scheduler
description: "Learn how to hide the Edit buttons of the Kendo UI Scheduler widget."
previous_url: /controls/scheduling/scheduler/how-to/hide-edit-buttons
slug: howto_hidethe_editbutons_scheduler
---

# Hide Edit Buttons

The following example demonstrates how to hide the **Edit** button of the Scheduler.

```dojo
    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [ "day", "month" ],
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ],
        edit: function(e) {
          var buttonsContainer = e.container.find(".k-edit-buttons");
          var cancelButton = buttonsContainer.find(".k-scheduler-cancel");
          cancelButton.text("Delete");
        }
      });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
