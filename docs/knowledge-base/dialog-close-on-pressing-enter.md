---
title: Close Dialog on Pressing Enter
description: An example on how to close Kendo UI Dialog on pressing Enter key.
type: how-to
page_title: Close Dialog on Pressing Enter key | Kendo UI Dialog
slug: dialog-close-on-pressing-enter
tags: dialog, close, pressing, enter, key
ticketid: 1129150
res_type: kb
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

How can I close a Dialog by pressing Enter key?

## Solution

Attach a `keypress` handler to the document, in the handler check whether the Dialog is open and call its `close` method.

```html
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
