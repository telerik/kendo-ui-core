---
title: Using different date formats
page_title: Using different date formats
description: Using different date formats
---

# Using different date formats

The example below demonstrates how to use different date formats for the Scheduler events.

#### Example:

```html
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
