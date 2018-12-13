---
title: Disable Months in the Kendo UI Calendar Year View
description: An example how to disable months in year view of the Kendo UI Calendar
type: how-to
page_title: Disable Months in Calendar Year View | Kendo UI Calendar
slug: calender-disable-months
position: 
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

Is there any way to disable the months in the calendar for the year. My min and max dates are from 1st January 2017 to 31st August 2017. My requirement is to show the months from September 2017 - December 2017 but in the disabled state.

## Solution

At present, the Kendo UI Calendar does not have a year template, so to disable the dates, we need to select the cells from the generated table and add the `k-state-disabled` class to them and prevent the selection. We can stop the click from propagating and triggering change with the [`e.stopImmediatePropagation()`](https://api.jquery.com/event.stopimmediatepropagation/) method.

The Kendo UI Calendar has a [`navigate`](https://docs.telerik.com/kendo-ui/api/javascript/ui/calendar/events/navigate) event which is suitable to implement disabled months in the year view if the users will be allowed to navigate to other views.

###### Example:
  
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
