---
title: Simulate Modal Behavior of the Tooltip
description: How to make the Kendo UI Tooltip display a modal overlay over the page.
type: how to
page_title: Simulate Modal Behavior of the Tooltip
slug: simulate_modal_behaviour_of_kendo_tooltip
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

Your project might require you to mimic modality in a Kendo UI Tooltip.

## Possible Solution

To simulate modality in a Kendo UI Tooltip, place a semi-transparent &lth;div&gth; element as an overlay over the entire HTML page. Make sure that the Tooltip is the only element to remain above the overlay.

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

* [Kendo UI Tooltip JavaScript API Reference](http://docs.telerik.com/kendo-ui/api/javascript/ui/tooltip)
