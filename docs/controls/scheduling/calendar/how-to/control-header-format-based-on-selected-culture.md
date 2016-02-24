---
title: Control the Header Format
page_title: Control the Header Format | Kendo UI Calendar
description: "Learn how to control the header format of the Kendo UI Calendar widget."
slug: howto_control_header_format_calendar
---

# Control the Header Format

The example below demonstrates how to control the header format of Kendo UI Calendar widget based on a selected culture.

###### Example

```html
    <script src="http://kendo.cdn.telerik.com/2014.1.528/js/cultures/kendo.culture.ko-KR.min.js"></script>
    <script>
      kendo.culture("ko-KR");
      kendo.calendar.views[0].title = function(date) {
        var culture = kendo.culture();
        var cultureName = culture.name;

        var month = culture.calendar.months.names[date.getMonth()];
        var year = date.getFullYear();

        var title;

        switch(culture.name) {
          case "zh-TW":
          case "ko-KR":
          case "ja-JS":
            title = year + " " + month;
            break;
          case "fr-CA":
            title = month + ", " + year;
            break;
          default:
            title = month + " " + year;
        }

        return title;
      };

    </script>
    <div id="example">
      <div class="demo-section k-header" style="width: 300px; text-align: center;">
        <div id="calendar"></div>
      </div>
      <script>
        $(document).ready(function() {
          // create Calendar from div HTML element
          $("#calendar").kendoCalendar();
        });
      </script>
    </div>
```

## See Also

Other articles on Kendo UI Calendar:

* [Calendar JavaScript API Reference](/api/javascript/ui/calendar)
