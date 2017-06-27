---
title: Start Typing in Unordered List in Editor
description: How to start typing in Kendo Editor and automatically create ul li elements
type: troubleshooting
page_title: Kendo Editor value to start as bulleted list
slug: start-typing-in-unordered-list-in-editor
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
How to force the Editor to automatically start typing in unordered list (bullets).

## Solution
To achieve the above, you could handle the **select** event of the widget and execute the **insertUnorderedList** command:

###### Example

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

* [Editor JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/editor)

