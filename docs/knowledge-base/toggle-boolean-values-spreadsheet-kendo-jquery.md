---
title: Toggling Boolean Values in Kendo UI for jQuery Spreadsheet Cells
description: Learn how to capture the click event on a Kendo UI for jQuery Spreadsheet cell and toggle its boolean value.
type: how-to
page_title: Toggle Boolean Values on Cell Click in Kendo UI for jQuery Spreadsheet
meta_title: Toggle Boolean Values on Cell Click in Kendo UI for jQuery Spreadsheet
slug: toggle-boolean-values-spreadsheet-kendo-jquery
tags: kendo-ui-for-jquery, spreadsheet, select-event, toggle-values, boolean
res_type: kb
components: ["spreadsheet"]
ticketid: 1696644
---

## Environment
<table>
<tbody>
<tr>
<td> Product </td>
<td> Kendo UI for jQuery Spreadsheet </td>
</tr>
<tr>
<td> Version </td>
<td> 2025.3.812 </td>
</tr>
</tbody>
</table>

## Description

I want to toggle the boolean value of a cell in the [Kendo UI for jQuery Spreadsheet](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet) when the cell is clicked or focused. This functionality should eliminate the need for additional user clicks to toggle the value.

This knowledge base article also answers the following questions:
- How to handle boolean value toggling in Spreadsheet cells on selection?
- Is it possible to automate value toggling in Kendo UI Spreadsheet?

## Solution

To toggle boolean values (`true/false`) in a Kendo UI for jQuery Spreadsheet cell on selection, handle the [`select`](https://www.telerik.com/kendo-jquery-ui/documentation/api/javascript/ui/spreadsheet/events/select) event of the Spreadsheet component. Use the event handler to check the current value of the selected range and toggle it. Follow the steps below:

1. Bind the `select` event to the Spreadsheet.
2. Use the `e.range.value()` method to retrieve the current value of the selected range.
3. Check if the value is `true` or `false`.
4. Use the `e.range.value(!current)` method to toggle the value.

Here is an example:

```javascript
$("#spreadsheet").kendoSpreadsheet({
    select: function(e) {
        // Check if the selected cell contains a boolean value
        if (e.range.value() === true || e.range.value() === false) {
            console.log("Current Value: ", e.range.value());
            var current = e.range.value();
            // Toggle the boolean value
            e.range.value(!current);
        }
    }
});
```

This implementation toggles the boolean value (`true/false`) whenever a cell containing such a value is selected.

Below is a runnable example:

```dojo
<div id="spreadsheet"></div>
    <script>
      $("#spreadsheet").kendoSpreadsheet({
        select: function(e){
          if(e.range.value() == true || e.range.value() == false){
            console.log(e.range.value())
            var current = e.range.value()
            e.range.value(!current)
          }
        },
        sheets: [{
          rows: [
            {
              cells: [                                            
                {
                  value: true, background: '#fcd8d6'
                },             
                {
                  value: false, background: '#fcd8d6'
                }
              ]
            }
          ],
          columns: [
            {
              width: 200
            },

          ]
        }]
      });     
      
    </script>
```

## See Also

- [Kendo UI for jQuery Spreadsheet Overview](https://www.telerik.com/kendo-jquery-ui/documentation/controls/spreadsheet/overview)
- [Spreadsheet API](https://docs.telerik.com/kendo-ui/api/javascript/ui/spreadsheet)
