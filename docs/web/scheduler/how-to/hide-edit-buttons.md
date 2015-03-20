---
title: Hide edit buttons
page_title: Hide edit buttons
description: Hide edit buttons
---

# Hide edit buttons

The example below demonstrates how to hide the edit buttons in a Kendo UI Scheduler.

#### Example:

```html
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
