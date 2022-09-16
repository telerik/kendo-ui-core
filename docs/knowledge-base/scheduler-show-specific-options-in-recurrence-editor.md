---
title: Show Specific Options In Recurrence Editor in Scheduler
description: An example on how to show only some of the options in Repeat DropDownList in Recurrence Editor of Scheduler .
type: how-to
page_title: Show Specific Repeat Options in Recurrence Editor | Kendo UI Scheduler for jQuery
slug: scheduler-show-specific-options-in-recurrence-editor
tags: kendo, kendoui, scheduler, recurrence, editor, show, hide, repeat
res_type: kb
component: scheduler
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Scheduler</td>
 </tr>
</table>

## Description

How can I display only some of the options in the Repeat DropDownList in the Recurring Editor of the Kendo Scheduler?

## Solution

1. Subscribe to the `edit` event of the Scheduler.
1. In the edit event handler get a reference to the Repeat DropDownList in the Recurrence Editor.
1. Get the Repeat DropDownList data. Filter the needed values. 

```dojo
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

* [API Reference of the Scheduler](https://docs.telerik.com/kendo-ui/api/javascript/ui/scheduler).
