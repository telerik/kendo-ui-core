---
title: Using local observable data object
page_title: Using local observable data object
description: Using local observable data object
---

# Using local observable data object

The example below demonstrates how to bind the widget to a local observableObject and change properties at run time.

#### Example:

```html
    <div id="example">
      <button id="update">Update</button>
      <div id="scheduler"></div>
    </div>
    <script>
      $(function() {
        var data = [{
          title: "Test",
          start: new Date(2013, 5, 13, 10),
          end: new Date(2013, 5, 13, 11)
        }];

        var observableData = new kendo.data.ObservableArray(data);

        $("#scheduler").kendoScheduler({
          date: new Date("2013/6/13"),
          startTime: new Date("2013/6/13 07:00 AM"),
          height: 600,
          views: [
            "day"
          ],
          dataSource: observableData
        });

        $("#update").click(function(e) {
          observableData[0].set("end", new Date(2013, 5, 13, 13));
        });
      });
    </script>
```
