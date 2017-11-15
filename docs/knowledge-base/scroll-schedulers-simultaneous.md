---
title: Apply Simultaneous Scroll to Schedulers
description: An example on how to implement simultaneous scroll across Kendo UI Schedulers.
type: how-to
page_title: Implement Simultaneous Scroll across Schedulers in Timeline View | Kendo UI Scheduler
slug: scroll-schedulers-simultaneous
tags: kendoui, kendo, scheduler, scroll, simultaneous
ticketid: 1133971
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
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

I am trying to use two Kendo UI Schedulers in a timeline view to display the related data.

How can I control the scroll bar of the Schedulers so that when I scroll one of the Schedulers, the other Scheduler scrolls accordingly?

## Solution

1. Hook the `scroll` event with jQuery by getting a reference to the element with the `.k-scheduler-content` class in the Schedulers.
1. To set it to the other Scheduler, acquire the `scrollLeft` value of the scrolled element.
1. To avoid recursion when you use the [`scrollLeft`](https://api.jquery.com/scrollleft/) method, make sure that the `scroll` events are unbound.

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
