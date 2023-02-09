---
title: Remove the Header From the DatePicker Calendar
page_title: Remove the Header From the DatePicker Calendar - Kendo UI DatePicker for jQuery
description: "An example demonstrating how to remove the header element from the calendar of the DatePicker widget."
type: how-to
slug: datepicker-remove-header-from-calendar
tags: datepicker, remove, hide, header, calendar, year, navigation, view
ticketid: 1549449
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2021.3.1207</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Progress® Kendo UI® DatePicker for jQuery</td>
	</tr>
</table>

## Description

How can I remove the header of the Calendar within the DatePicker widget?

## Solution

1. Attach a handler to the [`open event`](/api/javascript/ui/datepicker/events/open) of the DatePicker.
1. Obtain a reference to the Calendar widget inside the event.
1. Find the header element and remove it.

```dojo
<input id="datepicker" />
<script>
    $("#datepicker").kendoDatePicker({
        depth: "year",
        start: "year",
        open: function (e) {
            let calendar = this.dateView.calendar;
            calendar.wrapper.find(".k-header").remove();
        }
    });
</script>
```
