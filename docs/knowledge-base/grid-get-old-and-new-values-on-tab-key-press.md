---
title: Get Old and New Values On Tab Key Press
description: An example which shows how to get old and new values upon tabbing to another cell.
type: how-to
page_title: Retrieve Past and Current Row Data On Tab Key Press | Kendo UI Grid
slug: grid-get-old-and-new-values-on-tab-key-press
position: 
tags: grid, cell, tab, old, new, values, batch
ticketid: 1433308
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.917</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>Grid for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>

## Description

How can the user get the previous value, modified value, and row data when tabbing through a Kendo UI Grid with batch editing enabled?

## Solution

To gain access to the previous value, currently changed value, and row data, utilize the [save event's](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/save) arguments.  e.model will contain the previous values and row data, and e.values will hold the newly changed values.

```javascript
      function onSave(e) {
         console.log(e.model); //contains previous values/row data
         console.log(e.values);  //contains newly changed values 
      }
```

## See Also

* [Save - Documentation and API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/grid/events/save)
