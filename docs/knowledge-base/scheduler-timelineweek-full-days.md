---
title: Show Full Days in Scheduler TimelineWeek View
description: An example on how to show full days in the TimelineWeek view of the Scheduler.
type: how-to
page_title: Show Full Days in the TimelineWeek View | Kendo UI Scheduler
slug: scheduler-timelineweek-full-days
tags: scheduler, timelineweek
ticketid: 1141234
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
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
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I show full days without hours in the `TimelineWeek` view of the Scheduler?

## Solution

1. Set the `majorTick` as equal to a full day in minutes and leave only one slot per `majorTick`.
1. Configure the `DateHeaderTemplate` to show the day of the week and, optionally, hide the hour display of the row.

```dojo
<div id="scheduler"></div>
<script>
$(document).ready(function(){
  	$("#scheduler").kendoScheduler({
  		date: new Date("2013/6/6"),
  		height: 500,
  		views: [
  		   	"day",
  		    {
  		 		type: "timelineWeek",
  		        selected: true,                		
  		 		majorTick: 1440,
  		 		minorTickCount: 1,
  		 		dateHeaderTemplate: kendo.template("<strong>#=kendo.toString(date, 'dddd')# </strong>"),
  		    }
  		],
  		dataSource: [
  		{
  		    id: 1,
  		    start: new Date("2013/6/6 08:00 AM"),
  		    end: new Date("2013/6/6 09:00 AM"),
  		    title: "Interview"
  		}]
	});
})
</script>
<style>
  .k-scheduler-layout.k-scheduler-timelineWeekview tr:nth-child(1) tr:nth-child(2)>th{
     display:none;
  }
</style>
```
