---
title: Start Typing in Unordered List in Editor
description: How to start typing in a Kendo UI Editor and automatically create <ul> and <li> elements.
type: how-to
page_title: Start Typing in Unordered List in Editor
slug: start_typing_in_unordered_list_editor
position: 0
tags: kendo, editor, list, unordered, bullets
teampulseid:
ticketid: 1113496
pitsid:
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Editor for Progress Kendo UI</td>
 </tr>
</table>

## Description

Your project might require the Kendo UI Editor to let you automatically start typing in an unordered list.

## Possible Solution

To achieve this behavior, handle the `select` event of the widget and execute the `insertUnorderedList` command.

````html
	<textarea id="editor"></textarea>

	<script>
	  var shouldInsertList = true;
	  $("#editor").kendoEditor({
	    // Implement an event handler for the select event
		select: function(e) {
		  // Set initially Editor to start an unordered list
		  if(shouldInsertList) {
			shouldInsertList = false;
			e.sender.exec("insertUnorderedList");
		  }
		}
	  });
	</script>
````

## See Also

* [Kendo UI Editor JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
