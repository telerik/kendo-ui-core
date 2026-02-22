---
title: Clearing ComboBox Value With Backspace in Kendo UI
description: Learn how to clear a ComboBox value using the backspace key without automatically selecting the first item in the list when filtering is applied.
type: how-to
page_title: How to Clear ComboBox Value Using Backspace Without Auto-Selecting First Item in Kendo UI
slug: clear-combobox-value-backspace-kendo-ui
tags: kendo-ui, combobox, clear, value, backspace, filter
res_type: kb
components: ["combobox"]
ticketid: 1665651
---

## Environment

<table>
<tbody>
<tr>
<td>Product</td>
<td>ComboBox for Progress® Kendo UI®</td>
</tr>
<tr>
<td>Version</td>
<td>2024.3.806</td>
</tr>
</tbody>
</table>

## Description

When I set the `filter: 'contains'` option in a [ComboBox](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox), and I try to clear the selected value using the backspace key, the focus moves to the first item in the dropdown list. If I press the Enter key at this point, the first item is automatically selected, but I want the ComboBox to be cleared and remain empty instead, similar to when the filter option is not set. How can I achieve this behavior?

This KB article also answers the following questions:
- How to prevent automatic selection of the first item in Kendo UI ComboBox after clearing the value?

## Solution

To ensure that the ComboBox does not automatically select the first item when you clear the input and press the Enter key, you can handle the `keydown` event. When the BackSpace key is pressed you can check the length of the current value of the ComboBox and set a flag based on it. Next, you can check if the Enter key is pressed and if the input field of the ComboBox is empty. If both conditions are met, you can set the value of the ComboBox to empty.

Here is how you can implement this:

```javascript

var combo = $("#combobox").data('kendoComboBox');
var isEmpty = false;

combo.input.on("keydown", function (e) {
          if(e.keyCode === kendo.keys.BACKSPACE && combo.text().length <= 1 ) {

            isEmpty = true; 
          }

          if(e.keyCode === kendo.keys.ENTER && isEmpty) {           
            combo.value('')
            isEmpty = false
          }
 });
```

Below you will find a runnable example:

```dojo
<input type="text" id="combobox" />
<script>

      $(document).ready(function() {       
        var dataSource = new kendo.data.DataSource({
          data: [
            { Id: 1, sportName: "Basketball"},
            { Id: 2, sportName: "Golf"},
            { Id: 3, sportName: "Baseball"},
            { Id: 4, sportName: "Table Tennis"},
            { Id: 5, sportName: "Volleyball"},
            { Id: 6, sportName: "Football"},
            { Id: 7, sportName: "Boxing"},
            { Id: 8, sportName: "Badminton"},
            { Id: 9, sportName: "Cycling"},
            { Id: 10, sportName: "Gymnastics"},
            { Id: 11, sportName: "Swimming"},
            { Id: 12, sportName: "Wrestling"},
            { Id: 13, sportName: "Snooker"},
            { Id: 14, sportName: "Skiing"},
            { Id: 15, sportName: "Handball"}
          ]
        });

        $("#combobox").kendoComboBox({
          dataTextField: "sportName",
          dataValueField: "Id",
          filter: 'contains',
          dataSource: dataSource,
          placeholder: "Please select your favourite sport..."
        });

        var combo = $("#combobox").data('kendoComboBox');
        var isEmpty = false

        combo.input.on("keydown", function (e) {
          if(e.keyCode === kendo.keys.BACKSPACE && combo.text().length <= 1 ) {

            isEmpty = true; 
          }

          if(e.keyCode === kendo.keys.ENTER && isEmpty) {           
            combo.value('')
            isEmpty = false
          }
        });

      });
</script>
```

## See Also

- [ComboBox API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/combobox)
- [ComboBox Keyboard Navigation (Demo)](https://demos.telerik.com/kendo-ui/combobox/keyboard-navigation)
