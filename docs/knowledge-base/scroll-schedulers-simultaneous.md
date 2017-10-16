---
title: Kendo Schedulers Simontanious Scroll
description: An example on how to implement simontanious scroll between Schedulers
type: how-to
page_title: Implement Simontanious Scroll Between Schedulers in Timeline View | Kendo UI Scheduler
slug: scroll-schedulers-simultaneous
position: 0
tags: kendoui, kendo, scheduler, scroll, simontanious
ticketid: 1133971
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Scheduler for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>Google Chrome</td>
 </tr>
 <tr>
  <td>Browser Version</td>
  <td>61.0.3163.100</td>
 </tr>
</table>


## Description

I am trying to use two Kendo Schedulers in Timeline View to display related Data. I want to control the scroll bar so that when I scroll the one
scheduler, the other should scroll accordingly. 

## Solution

1. Get a reference to the element with class **.k-scheduler-content** in the schedulers, in order to hook the scroll event with jQuery.
1. Acquire the **scrollLeft** value of the scrolled element, in order to set it to the other.
1. Make sure that the scroll events are unbound, when you use the [scrollLeft](https://api.jquery.com/scrollleft/) method, in order to avoid recursion.

``` html 
<div id="scheduler"></div>

<div id="scheduler1"></div>

<script>
    $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        allDaySlot: false,
        views: [
            "day",
            {
                type: "timeline",
                selected: true
            }
        ],
        dataSource: [{
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
        }]
    });

    $("#scheduler1").kendoScheduler({
        date: new Date("2013/6/6"),
        allDaySlot: false,
        views: [
            "day",
            {
                type: "timeline",
                selected: true
            }
        ],
        dataSource: [{
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
        }]
    });

    $(document).ready(function(e) {
        $("#scheduler .k-scheduler-content, #scheduler1 .k-scheduler-content").on('scroll', sync);
    })

    var sync = function() {
        var $elements = $("#scheduler .k-scheduler-content, #scheduler1 .k-scheduler-content");
        var $other = $elements.not(this).off('scroll');
        var other = $other.get(0);
        other.scrollLeft = this.scrollLeft;
        setTimeout(function() {
            $other.on('scroll', sync);
        }, 10);
    }
</script>

```
