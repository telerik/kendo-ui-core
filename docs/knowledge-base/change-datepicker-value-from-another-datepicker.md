---
title: Change DatePicker Value from Another DatePicker in the Grid
page_title: Change DatePicker Value | Kendo UI Grid for jQuery
description: "An example on how to change a DatePicker value from another DatePicker in the Kendo UI Grid."
previous_url: /controls/data-management/grid/how-to/Editing/change-datepicker-value-from-another-datepicker
slug: howto_change_datepicker_value_from_another_datepicker_grid
tags: grid, datepicker, value, another
component: grid
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid for jQuery</td>
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

How can I change the value of one editor based on the value of another editor when working with the Kendo UI Grid?

## Solution

The following example demonstrates how to change a Kendo UI DatePicker value based on the modified value of another DatePicker by using the inline edit mode of the Kendo UI Grid. When the user selects a date from the first DatePicker, the following date is programmatically set to the second DatePicker.

```dojo

  <div id="grid"></div>

  <script>

    $("#grid").kendoGrid({  
      dataSource: {
        data: [
          { Date1: '2017-8-5', Date2: '2017-8-6' }
        ],
        schema: {
          model: {
            fields: {
              Date1: { type: "date" },
              Date2: { type: "date" }
            }
          }
        }
      },
      columns: [{
        field: "Date1",
        format: "{0: yyyy-MM-dd}"
      },{
        field: "Date2",
        title: "Date1 + 1 day",
        format: "{0: yyyy-MM-dd}",
      },{
        command: ["edit", "destroy"],
        title: "&nbsp;",
        width: "250px"
      }],  
      editable: "inline",
      edit: onEdit
    });
    function onEdit(e){
      var dp1 = e.container.find("[name='Date1']").data("kendoDatePicker");
      var dp2 = e.container.find("[name='Date2']").data("kendoDatePicker");

      dp1.bind("change", function(e){
        var nextDay = new Date(dp1.value());               
        nextDay.setDate(nextDay.getDate()+1);      
        dp2.value(nextDay);
        dp2.trigger("change");
      })
    }
  </script>

```

## See Also

* [JavaScript API Reference of the Grid](/api/javascript/ui/grid)
