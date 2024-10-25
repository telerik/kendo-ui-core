---
title: Setting Text Color for Scheduler Events Based on the Resource
description: Learn how to customize the text color of the text in the events within the Scheduler component depending on the resource.
type: how-to
page_title: How to Customize Scheduler Event Text Colors Based on the Resource in Kendo UI
slug: customize-scheduler-event-label-text-colors-kendo-ui
tags: scheduler, event, label, text, color, customization, kendo-ui
res_type: kb
ticketid: 1653968
---

## Environment

| Product | Version |
| --- | --- |
| Scheduler for Progress® Kendo UI® | 2024.2.514 |

## Description

I am trying to customize the text color of event labels within the Scheduler, not just the background color. The default configuration allows setting the background color of events, but I need to apply specific text colors to these events as well.

## Solution

To customize the text color of event labels in the Scheduler, use a custom [`eventTemplate`](/api/javascript/ui/scheduler/configuration/eventtemplate) along with the [`dataBound`](/api/javascript/ui/scheduler/events/databound) event to apply styles dynamically. Since the Scheduler resources do not directly support setting the text color, this custom approach involves adding a template for the events and then using a class to apply the desired text color.

1. Define a custom [`eventTemplate`](/api/javascript/ui/scheduler/configuration/eventtemplate) for Scheduler events. In this template, assign a class to the event's text based on its resources or color:

```html
<script id="event-template" type="text/x-kendo-template">    
  <div>Title: #: title #</div>
  <div>Attendees:
      # for (var i = 0; i < resources.length; i++) { #
          <span class="#: resources[i].text #">Attendees:
            #: resources[i].text #
          </span>
      # } #
      </div>
</script>
```

2. Use the [`dataBound`](/api/javascript/ui/scheduler/events/databound) event of the [Scheduler] to apply custom text colors based on the class added in the template:

```javascript
dataBound: function(e){
    $('.Alex').closest('.k-event').css('color', 'violet');
    $('.Bob').closest('.k-event').css('color', 'green');
},
```

```dojo
   <script id="event-template" type="text/x-kendo-template">		
  			<div>Title: #: title #</div>
  			<div>Atendees:
      		# for (var i = 0; i < resources.length; i++) { #
      		<span class="#: resources[i].text #">Atendees:
      		  #: resources[i].text #
      		</span>
      		# } #
      	</div>      
    </script>

    <div id="scheduler"></div>
    <script>
      $("#scheduler").kendoScheduler({
        date: new Date("2013/6/6"),
        eventTemplate: $("#event-template").html(),
        dataBound: function(e){
          $('.Alex').closest('.k-event').css('color', 'violet')
          $('.Bob').closest('.k-event').css('color', 'green')
        },
        dataSource: [
          {
            id: 1,
            start: new Date("2013/6/6 08:00 AM"),
            end: new Date("2013/6/6 09:00 AM"),
            title: "Interview",
            atendees: [1]
          },
          {
            id: 1,
            start: new Date("2013/6/6 11:00 AM"),
            end: new Date("2013/6/6 12:00 PM"),
            title: "Interview 2",
            atendees: [2]
          }
        ],
        resources: [
          {
            field: "atendees",
            dataSource: [
              { value: 1, text: "Alex", color: 'lightgreen'},
              { value: 2, text: "Bob" , color: 'lightblue'}
            ],
            multiple: true
          }
        ]
      });
    </script>
```

## See Also

- [Scheduler Overview](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/overview)
- [Scheduler Templates](https://docs.telerik.com/kendo-ui/controls/scheduling/scheduler/templates)
- [Scheduler dataBound Event](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler/events/databound)
