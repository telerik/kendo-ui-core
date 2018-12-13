---
title: Change Order and Start Time in TimePicker Options List
description: An example on how set a different time value as the start time of a kendo UI TimePicker and change the order of the options in its list.
type: how-to
page_title: Change Order and Start Time in the Options List | Kendo UI TimePicker
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

How can I make the options on the TimePicker list start at a specific time while the TimePicker still shows the skipped ones at the end of its options list?

## Solution

1. Subscribe to the `open` event of the TimePicker.
1. Traverse the items in the list while you use jQuery to reorder them.

```dojo
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

* [API Reference of the open Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/timepicker/events/open)
