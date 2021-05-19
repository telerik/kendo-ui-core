---
title: Change the DatePicker Icon with Web Font Icon
description: Replace the default icon of the Kendo UI DatePicker with a Web Font Icon.
type: how-to
page_title: Modify the Default Icon | Kendo UI DatePicker
slug: datepicker-change-icon-web-font
position: 
tags: change, icon, datepicker
ticketid: 1434944
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product Version</td>
			<td>2019.3.1016</td>
		</tr>
		<tr>
			<td>Product</td>
			<td>DatePicker for Progress® Kendo UI®</td>
		</tr>
	</tbody>
</table>


## Description
How can I use a Web Font Icon in place of the default icon in the Kendo UI DatePicker?

## Solution
In order to replace the default icon, use the [.removeClass()](https://api.jquery.com/removeClass/) and the [.addClass()](https://api.jquery.com/addClass/) method respectively as seen in the following snippet:

```javascript
$(".k-icon").removeClass("k-i-calendar");
$(".k-icon").addClass('k-i-calendar-date');
``` 
#### Example

```dojo
<input id="datePicker"/>

<script>
	$(document).ready(function(){
		$("#datePicker").kendoDatePicker();
		$(".k-icon").removeClass("k-i-calendar");
		$(".k-icon").addClass('k-i-calendar-date');
	});
</script>
```
## See Also
- [.removeClass()](https://api.jquery.com/removeClass/)
- [.addClass()](https://api.jquery.com/addClass/)
