---
title: Control header format
page_title: Control header format based on the selected culture
description: Control header format based on selected culture
---

# Control header format based on selected culture

The example below demonstrates how to control header format of the Kendo UI Calendar based on the selected culture

#### Example:

```html
    <script src="http://cdn.kendostatic.com/2014.1.528/js/cultures/kendo.culture.ko-KR.min.js"></script>
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
