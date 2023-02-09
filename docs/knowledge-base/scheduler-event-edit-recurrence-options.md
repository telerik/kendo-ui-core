---
title: Change Recurrence settings in Scheduler events
description: Get a custom subset of Recurrence properties when editing Scheduler events  
type: how-to
page_title: Custom recurrence options in Scheduler event editor
slug: scheduler-event-edit-recurrence-options
tags: scheduler, event, edit, recurrence, custom, settings
ticketid: 1470383
res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Scheduler for jQuery</td>
 </tr>
 <tr>
  <td>Product Version</td>
  <td>2021.1.224</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How to get a subset of the default Recurrence options?

## Solution

 1. Subscribe to the `edit` event of the Scheduler
 1. Select the button instances of the Recurrence editor's ButtonGroup with jQuery
 1. Use the [jQuery hide](https://api.jquery.com/hide/) method to hide the selected buttons

 ``` dojo
  <script id="event-template" type="text/x-kendo-template">
    <div>Title: #: title #</div>
    <div>Atendees:
      # for (var i = 0; i < resources.length; i++) { #
        #: resources[i].text #
      # } #
      </div>
  </script>
  <div id="scheduler"></div>
  <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      eventTemplate: $("#event-template").html(),
      edit: function(e){
        $('span[data-value="daily"]').hide();
        $('span[data-value="weekly"]').hide();
        $('span[data-value="monthly"]').hide();
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
            { value: 1, text: "Alex" },
            { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
  </script>
 ```

### For versions prior to Kendo UI 2020 R3

Prior to Kendo UI 2020 R3, the Scheduler RecurrenceEditor used a DropDownList. Refer to the example below for details on the customization of the Scheduler RecurrenceEditor prior to Kendo UI 2020 R3:

 1. Get the `data` of Recurrence editor's DropDownList widget 
 1. Get the `dataSource` of the of the DropDownList
 1. Use `filter` to return only the desired recurrence options
 1. Set the dataSource of the DropDownList

```
  <script id="event-template" type="text/x-kendo-template">
    <div>Title: #: title #</div>
    <div>Atendees:
      # for (var i = 0; i < resources.length; i++) { #
        #: resources[i].text #
      # } #
      </div>
  </script>

  <div id="scheduler"></div>
  <script>
    $("#scheduler").kendoScheduler({
      date: new Date("2013/6/6"),
      eventTemplate: $("#event-template").html(),
      edit: function(e){
        var ddl = $('input[title="Recurrence editor"]').data('kendoDropDownList')
        if(ddl){
          var data = ddl.dataSource.data();
          var newData = data.filter(function(e){
            console.log(e)
            return e.text == "Never" || e.text == "Yearly"
          })           
          ddl.setDataSource(newData)   
        }
      },
      dataSource: [
        {
          id: 1,
          start: new Date("2013/6/6 08:00 AM"),
          end: new Date("2013/6/6 09:00 AM"),
          title: "Interview",
          atendees: [1,2]
        }
      ],
      resources: [
        {
          field: "atendees",
          dataSource: [
            { value: 1, text: "Alex" },
            { value: 2, text: "Bob" }
          ],
          multiple: true
        }
      ]
    });
</script>
```

## See Also

* [JavaScript API Reference of the Scheduler](/api/javascript/ui/scheduler)
* [JavaScript API Reference of the ButtonGroup](api/javascript/ui/buttongroup)
