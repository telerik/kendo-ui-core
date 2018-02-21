---
title: Change Order and Start Time in TimePicker Options List
description: An example on how set a different time as the start time of a TimePicker and change the order of the options in the list
type: how-to
page_title: Change Order and Start Time in TimePicker Options List
slug: timepicker-change-order-and-start
tags: timepicker, start, order, change, time, picker, list
ticketid: 1153029
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>TimePicker for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

I'm working on an application that uses the Kendo UI TimePicker and would like the options on its list to start at a specific time while showing the skipped ones at the end of the list.

## Solution

The described functionality can be implemented by subscribing to the `open` event of the Kendo UI TimePicker and traversing the items in the list while using jQuery to reorder them:

```html
<input id="timepicker" />

<script>
  $("#timepicker").kendoTimePicker({
    interval: 15,
    open: function(e) {
      var list = $("#" + e.sender.element.attr('id') + "_timeview");
      if (list.attr('fixed-time-labels') != 'true') {
        var elements = list.find('li:lt(24)');
        elements.insertAfter(list.find('li:last'));
        list.attr('fixed-time-labels', 'true');
      }
    }
  });
</script>
```

## See Also

* [open event API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker/events/open)
