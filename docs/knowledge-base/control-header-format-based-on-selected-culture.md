---
title: Control the Header Format of the Calendar
page_title: Manage the Header Format of the Calendar
description: "Learn how to control the header format of the Kendo UI for jQuery Calendar widget."
slug: howto_control_header_format_calendar
previous_url: /controls/scheduling/calendar/how-to/control-header-format-based-on-selected-culture
tags: telerik kendo, jquery, calendar, control, header, format, based, on, selected, culture
component: calendar
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Calendar for jQuery</td>
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

How can I control the header format of the Kendo UI for jQuery Calendar based on the selected culture?

## Solution

The following example demonstrates how to achieve the desired behavior.

```dojo
    <script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/cultures/kendo.culture.ko-KR.min.js"></script>
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

* [JavaScript API Reference of the Calendar](/api/javascript/ui/calendar)
