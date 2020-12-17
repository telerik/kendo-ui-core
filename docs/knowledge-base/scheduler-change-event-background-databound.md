---
title: Change background color of event in the databound of the Scheduler
description: An example on how to change the color of the entire event of the Kendo UI Scheduler.
type: how-to
page_title: Change event background | Kendo UI Scheduler for jQuery
slug: scheduler-change-event-background-databound
tags: background, change, databound, scheduler
ticketid: 1494386
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
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
</table>


## Description

I want to change the color of the entire element of the Scheduler event.

## Solution

1. Subscribe to the `dataBound` event of the Scheduler.
1. In the dataBound event handler iterate over the rendered events and change the background of the needed events. 

```dojo
<div id="scheduler"></div> 

<script>
    $(function() {
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/13"),
        startTime: new Date("2013/6/13 10:00"),
        endTime: new Date("2013/6/13 23:00"),
        height: 600,
        views: ["day", "agenda"],
        editable: false,         
        dataBound: function(e){
          var view = this.view();
          var events = this.dataSource.view();
          var eventElement;
          var event;
    
          for (var idx = 0, length = events.length; idx < length; idx++) {
            event = events[idx];
	  		if(event.title === "The Help"){
            	eventElement = view.element.find("[data-uid=" + event.uid + "]");
              //set the background of the element
              eventElement.css("background-color", "lightgreen");
            }              
          }
        },
        dataSource: [
          {
            title: "Fast and furious 6",
            image: "../content/web/scheduler/fast-and-furious.jpg",
            imdb: "http://www.imdb.com/title/tt1905041/",
            start: new Date("2013/6/13 17:00"),
            end: new Date("2013/6/13 18:30")
          },
          {
            title: "The Internship",
            image: "../content/web/scheduler/the-internship.jpg",
            imdb: "http://www.imdb.com/title/tt2234155/",
            start: new Date("2013/6/13 14:00"),
            end: new Date("2013/6/13 15:30")
          },
          {
            title: "The Help",
            image: "../content/web/scheduler/the-help.jpg",
            imdb: "http://www.imdb.com/title/tt1454029/",
            start: new Date("2013/6/13 12:00"),
            end: new Date("2013/6/13 13:30")
          },
          {
            title: "The Perks of Being a Wallflower",
            image: "../content/web/scheduler/wallflower.jpg",
            imdb: "http://www.imdb.com/title/tt1659337/",
            start: new Date("2013/6/13 17:30"),
            end: new Date("2013/6/13 19:00")
          },
          {
            title: "The Help",
            image: "../content/web/scheduler/the-help.jpg",
            imdb: "http://www.imdb.com/title/tt1454029/",
            start: new Date("2013/6/13 13:30"),
            end: new Date("2013/6/13 15:00")
          }
        ]
      });
    });
</script>   
```

## See Also

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).
