---
title: Simulate Modal Behaviour of Kendo UI Tooltip
description: How to force the Kendo Tooltip to display a modal overlay over the page
type: how to
page_title: Make the Kendo Tooltip Modal
slug: simulate-modal-behaviour-of-kendo-ui-tooltip
position: 0
tags: kendo, tooltip, modal
teampulseid:
ticketid: 1112824
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Tooltip for Progress Kendo UI</td>
 </tr>
</table>


## Description 
The following article shows how to mimic modality of a Kendo Tooltip.

## Solution
This could be achieved by simply placing a semi-transparent &lth;div&gth; element as overlay of the entire HTML page. Note, that the Tooltip should be the only element to remain above (after) the overlay.

###### Example

````html
	<span id="target" title="Tooltip content">
	  Click me to show the Tooltip
	</span>
	<script>
	  $(document).ready(function() {
		$('#target').kendoTooltip({
		  // Show the Tooltip on click
		  showOn: 'click',
		  autoHide: false,
		  show: function(e) {
			// Create and add the overlay to the DOM
			var modalOverlay = $('<div class="overlay"></div>')
			modalOverlay.insertAfter('#target');
		  },
		  hide: function(e) {
		    // Remove the overlay from the DOM
			$('.overlay').remove();
		  }
		});
	  });
	</script>
	<style>
	  // Style the overlay and its parents to cover the entire page
	  html, body, .overlay {
		width: 100%;
		height: 100%;
		padding: 0;
		margin: 0;
	  }
	  
	  .overlay {
		background-color: rgba(0,0,0,0.3);
		position: absolute;
		top: 0;
	  }
	</style>
````

## See Also

* [Tooltip JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
