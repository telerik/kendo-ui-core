---
title: Use Different Date Formats
page_title: Use Different Date Formats | Kendo UI Scheduler
description: "Learn how to use different date formats for the Kendo UI Scheduler events."
previous_url: /controls/scheduling/scheduler/how-to/using-different-date-formats
slug: howto_usedifferentdateformats_scheduler
---

# Use Different Date Formats

The following example demonstrates how to use different date formats for the Scheduler events.

```dojo
    <div id="scheduler"></div>
    <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/10"),
      views: [ "day", "month" ],
      dataSource: {
        transport: {
          read: function(options) {
           var data = [
                {
                id: 1,
                start: "/Date(1370826000000)/",
                end: "/Date(1370827800000)/",
                title: "/Date(1370826000000)/"
              },
                {
                id: 2,
                start: "2013-06-10T04:00:00",
                end: "2013-06-10T04:30:00",
                title: "2013-06-10T04:00:00"
              },
                {
                id: 3,
                start: "2013-06-10T04:00:00Z",
                end: "2013-06-10T04:30:00Z",
                title: "2013-06-10T04:00:00Z"
              }
           ];

           options.success(data);
          }
        }

      }
    });
    </script>
```

## See Also

* [Basic Usage of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/index)
* [Using the API of the Scheduler (Demo)](https://demos.telerik.com/kendo-ui/scheduler/api)
* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
