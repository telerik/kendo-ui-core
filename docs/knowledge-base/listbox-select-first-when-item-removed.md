---
title: Select the First Item on Removal of Any Item in ListBox
description: Focus on the first item after any item is removed from the ListBox
type: how-to
page_title: Set Default Selection | Kendo UI ListBox
slug: listbox-select-first-when-item-removed
position: 
tags: listbox, remove, delete, first, focus, select, default, item, set
ticketid: 1447644
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1023</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>ListBox for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I select the first item in the Kendo UI ListBox whenever I remove any item from the ListBox?

## Solution
Use the [select method](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/methods/select) in the [remove event](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/events/remove). Make sure to use the [setTimeout() method](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) so that the first item is selected after the remove function is executed.

```javascript
  $("#listBox").kendoListBox({
    remove: function(e) {
      setTimeout(function() {
        var listBox = $("#listBox").data("kendoListBox");
        listBox.select(listBox.items().first());	
      })
    }
  });
```

#### Example

```dojo
  <select id="listBox">
    <option>Item 1</option>
    <option>Item 2</option>
    <option>Item 3</option>
    <option>Item 4</option>
  </select>
  <script>
    $("#listBox").kendoListBox({
      toolbar: {
          position: "right",
          tools: [ "moveUp", "moveDown", "remove" ]
      },
      remove: function(e) {
        setTimeout(function() {
          var listBox = $("#listBox").data("kendoListBox");
          listBox.select(listBox.items().first());	
        });
      }
    });
  </script>
```

## See Also
- [select](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/methods/select)
- [remove](https://docs.telerik.com/kendo-ui/api/javascript/ui/listbox/events/remove)
- [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout)
