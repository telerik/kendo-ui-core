---
title: Start Typing in Unordered List in Editor
description: An example on how to start typing in a Kendo UI Editor and automatically create <ul> and <li> elements.
type: how-to
page_title: Set the Editor Value to Start as a Bullet List | Kendo UI Editor for jQuery
slug: editor-start-typing-in-unordered-list
tags: kendo, editor, list, unordered, bullets
ticketid: 1113496
res_type: kb
component: editor
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Editor</td>
 </tr>
</table>

## Description

How can I achieve the following behavior?

1. Have the first bullet in a list to appear automatically.
1. Type the data you need.
1. Open a new bullet line by pressing the `Enter` key after you finish typing.

## Solution

Handle the `select` event of the widget and execute the `insertUnorderedList` command.

````dojo
	<textarea id="editor"></textarea>

	<script>
	  var shouldInsertList = true;
	  $("#editor").kendoEditor({
	    // Implement an event handler for the select event
		select: function(e) {
		  // Set initially the Editor to start an unordered list
		  if(shouldInsertList) {
			shouldInsertList = false;
			e.sender.exec("insertUnorderedList");
		  }
		}
	  });
	</script>
````

## See Also

* [Kendo UI Editor JavaScript API Reference](https://docs.telerik.com/kendo-ui/api/javascript/ui/editor)
