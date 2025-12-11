---
title: Getting the Date Range of the Current View in Kendo UI Calendar
description: Learn how to retrieve the date range of the currently displayed view in the Kendo UI Calendar component.
type: how-to
page_title: How to Get the Current View Date Range in a Kendo UI Calendar
slug: get-current-view-date-range-kendo-ui-calendar
tags: kendo-ui, calendar, date-range, view, javascript
res_type: kb
components: ["calendar"]
ticketid: 1660926
---

## Environment
<table>
<tbody>
<tr>
<td>Product</td>
<td>Calendar for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.2.514</td>
</tr>
</tbody>
</table>

## Description
When using the [Calendar](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar) component, you might need to get the date range of the current view, such as:

- From 08/01/2024 to 08/31/2024 for a month view
- From 01/01/2024 to 12/31/2024 for a year view
- From 01/01/2020 to 12/31/2029 for a decade view

This KB article also answers the following questions:
- How can I determine the start and end dates of the current Calendar view?
- Is it possible to get the visible date range in the Kendo UI Calendar?
- How do I find the date range of the currently selected view in a Calendar?

## Solution
To get the date range of the current view in a Kendo UI Calendar, use the [`view()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/methods/view) and [`current()`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/methods/current) methods.

Below is an example for the month view:

```javascript
$("#calendar").kendoCalendar();

var calendar = $("#calendar").data("kendoCalendar");
var current = calendar.current();
var view = calendar.view();
if(view.name == "month") {
  var firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
  var lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
  console.log(firstDay, lastDay)
}
```

This code snippet initializes a Kendo UI Calendar and calculates the first and last day of the month view based on the current date. You can adapt this approach for other views by adjusting the calculation of `firstDay` and `lastDay` accordingly.

For a complete example and to see the code in action, check the following Dojo demo: 

```dojo
    <div id="calendar"></div>
    <script>
      $("#calendar").kendoCalendar();

      var calendar = $("#calendar").data("kendoCalendar");
      var current = calendar.current();
      var view = calendar.view();
      if(view.name == "month") {
        var firstDay = new Date(current.getFullYear(), current.getMonth(), 1);
        var lastDay = new Date(current.getFullYear(), current.getMonth() + 1, 0);
        console.log(firstDay, lastDay)
      }
    </script>
```

## See Also
- [Calendar Overview](https://docs.telerik.com/kendo-ui/controls/editors/calendar/overview)
- [Calendar Methods API Documentation](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/calendar#methods)
- [Kendo UI Dojo - Interactive Examples](https://dojo.telerik.com/)
