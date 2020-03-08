---
title: Close Dialog on Pressing Enter
description: An example on how to close the Kendo UI Dialog on pressing the Enter key.
type: how-to
page_title: Close Dialog on Pressing Enter Key | Kendo UI Dialog for jQuery
slug: dialog-close-on-pressing-enter
tags: dialog, close, pressing, enter, key
ticketid: 1129150
res_type: kb
component: dialog
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Dialog</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I close a Kendo UI Dialog by pressing the `Enter` key?

## Solution

1. If the Dialog is open, in the handler check attach a `keypress` handler to the document.
1. Call its `close` method.

```dojo
	<script>
	   $(document).ready(function (e) {
			$(document).keypress(function (e) {
				if (e.which == 13) {
					if ($(".k-dialog").css("display") == "block") {
						$("#myDialogId").data("kendoDialog").close();
					}
				}
			});
		});
	});
	</script>
```
