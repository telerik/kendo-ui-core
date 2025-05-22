---
title: Set Different Colors for Every Working Day in Scheduler Week View
description: Learn how to dynamically color the background of working days in Kendo UI Scheduler.
type: how-to
page_title: How toSet Different Colors for Every Working Day in Scheduler Week View
slug: color-scheduler-background-kendo-ui
tags: kendo-ui, scheduler, color, background, working hours, customization
res_type: kb
ticketid: 1665622
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>Scheduler for Progress® Kendo UI®</td>
</tr>
</table>

## Description

I want to set different colors for the working hours on each day in the Week View.

This KB article also answers the following questions:
- How can I customize the background color of Scheduler days based on dynamic conditions?
- Is it possible to set different background colors for each day in the Week view in the Kendo UI Scheduler?


## Solution

To customize the background color of Scheduler days based on working hours, you can use the `.k-scheduler-content td:not(.k-nonwork-hour)` selector. 

For different colors each day, use the [`slotTemplate`](/api/javascript/ui/scheduler/configuration/views.slottemplate) option in the Scheduler's configuration. This allows adding a different class based on the day rendered:

```javascript
{
  type: "week", 
  selected: true,
  slotTemplate: function(data){
    let currentDay = data.date.getDay();
    let myclass;

    switch(currentDay) {
      case 1:
        myclass = 'monday';
        break;
      case 2:
        myclass = 'tuesday';
        break;
      // Add more cases for other days
      default:
        myclass = 'custom';
        break;
    }
    return `<span class=${myclass}></span>`;
  }
}
```

Then, style the slots with different colors in the [`dataBound`](/api/javascript/ui/scheduler/events/databound) event handler:

```javascript
dataBound: function(e){      
  if(e.sender.viewName() == 'week'){
    $('.monday').parent('td:not(.k-nonwork-hour)').css('background-color', 'lightyellow');
    $('.tuesday').parent('td:not(.k-nonwork-hour)').css('background-color', 'orange');
    // Style other days similarly
  } else{
    $('.k-scheduler-content td:not(.k-nonwork-hour)').css('background-color', 'defaultColor');
  }
}
```

This approach allows you to dynamically set different background color  for each day in Week view in the Scheduler slots based on the working hours.

Below is a runnable example:

```dojo
<div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        views: [
          "day",       
          "timelineWeek",
          "month",
          { 
            type: "week", 
            selected: true,
            slotTemplate: function(data){
              let currentDay = data.date.getDay();
              let myclass;

              switch(currentDay) {
                case 1:
                  myclass = 'monday';
                  break;
                case 2:
                  myclass = 'tuesday'
                  break;
                case 3:
                  myclass = 'wednesday'
                  break;
                case 4:
                  myclass = 'thirsday'
                  break;
                case 5:
                  myclass = 'friday'
                  break;                 

                default:
                  myclass = 'custom'
                  break;
              }
              return `<span class=${myclass}></span>`
            }
          },
          "agenda"
        ],
        dataBound: function(e){      
          if(e.sender.viewName() == 'week'){
            $('.monday').parent('td:not(.k-nonwork-hour)').css('background-color', 'lightyellow')
            $('.tuesday').parent('td:not(.k-nonwork-hour)').css('background-color', 'orange')
            $('.wednesday').parent('td:not(.k-nonwork-hour)').css('background-color', 'violet')
            $('.thirsday').parent('td:not(.k-nonwork-hour)').css('background-color', 'lightblue')
            $('.friday').parent('td:not(.k-nonwork-hour)').css('background-color', 'lightgreen')
          } else{
             $('.k-scheduler-content td:not(.k-nonwork-hour)').css('background-color', 'lightyellow')
          }
        },
        startTime: new Date("2013/1/1 08:00"),
        workDayStart: new Date("2013/1/1 11:00"),
        workDayEnd: new Date("2013/1/1 14:00"),
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview"
          }
        ]
      });
    </script>
```

## See Also

- [Scheduler Configuration - slotTemplate](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/configuration/views.slottemplate)
- [Scheduler Event - dataBound](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound)
