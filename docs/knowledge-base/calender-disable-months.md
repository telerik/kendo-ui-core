---
title: Disable Months in the Kendo UI Calendar Year View
page_title: Disable Months in Calendar Year View | Kendo UI Calendar for jQuery
description: An example how to disable months in the year view of the Kendo UI Calendar.
type: how-to
slug: calender-disable-months
tags: calendar, disable, year view, month
ticketid: 1144828
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2017.3 1026</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>Calendar for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

How can I disable the months in the calendar for the year? My min and max dates are from 1st January 2017 to 31st August 2017 and I'd like to show the months from September 2017 to December 2017 but in the disabled state.

## Solution

The Kendo UI Calendar does not have a year template. As a result, to disable the dates:

1. Select the cells from the generated table.
1. Add the `k-state-disabled` class to them to prevent the selection.

You can stop the click from propagating and triggering a change with the [`e.stopImmediatePropagation()`](https://api.jquery.com/event.stopimmediatepropagation/) method.

The Calendar exposes a [`navigate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/events/navigate) event which is suitable for implementing disabled months in the year view if the users will be allowed to navigate to other views.

```dojo
<div id="monthpicker"></div>
<script>
   function disableDates(calendar){
     calendar.element.find("tr:last-child td")
       .addClass("k-state-disabled")
       .click(function(e){
       e.stopImmediatePropagation();
     });
   }
   var calendar = $("#monthpicker").kendoCalendar({
     start: "year",
     depth: "year",
     min: new Date(2017,0,1),
     max: new Date(2017,11,31),
     format: "MMMM yyyy",
     value: new Date(2017,7,31),
     navigate: function(e){
       var calendar = this;
       if(calendar.view().name === "year"){
         disableDates(calendar)
       }
     }
   }).data("kendoCalendar");
</script>      
```
