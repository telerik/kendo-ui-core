---
title: Keep Trailing Zeros in NumericTextBox
description: An example on how to always display the entire decimal portion in the Kendo UI NumericTextBox.
type: how-to
page_title: Prevent Rounding of Decimals | Kendo UI NumercTextBox
slug: numerictextbox-keep-trailing-zeros
tags: numeric, numerictextbox, preserve, keep, trailing, zeros, rounding, decimals, round
ticketid: 1161653
res_type: kb
---

## Environment

<table>
	<tr>
		<td>Product Version</td>
		<td>2018.1 117</td>
	</tr>
	<tr>
		<td>Product</td>
		<td>NumericTextBox for Progress® Kendo UI®</td>
	</tr>
</table>


## Description

When I enter the `0.0010` value, it renders `0.001`. When the widget loses focus, it reformats the number to `0.0010`.

How can I format the number in a NumericTextBox so that it shows four decimal places?

## Solution

This functionality is not part of the built-in NumericTextBox settings but is already submitted as a feature request in the UserVoice forum. Popular requests get prioritized on the team's roadmap. To upvote the feature request, refer to [http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/6696197-numerictextbox-should-display-decimal-portion-even](http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/6696197-numerictextbox-should-display-decimal-portion-even).

## Suggested Workaround

Add the trailing zeros programmatically both on [`spin`](/api/javascript/ui/numerictextbox/events/spin) and on `focus` of the input. You can further elaborate on the example so it reflects the globalization practices and check if the decimals are properly rendered when used on multiple NumericTextBoxes.

###### Example

```dojo
	<input id="numerictextbox" />
	    <script>
	      var numeric = $("#numerictextbox").kendoNumericTextBox({
	        format: "n4",
	        decimals: 4,
	        step: 0.0001,
	        restrictDecimals: true,
	        spin: function(e){
	          var inputElement = this.element;
	         addTrailingZeros(inputElement,this);          
	        }
	      }).on("focus", function(e){
	        var inputElement = $(this);
	        addTrailingZeros(inputElement,numeric)
	      }).data("kendoNumericTextBox");

	      function addTrailingZeros(input, numeric){
	        // floats
	        if(input.val().split(".").length > 1
	           && input.val().split(".")[1].length < numeric.options.decimals){
	          var inputValue = input.val() + "0";
	          input.val(inputValue);
	        }
	        // integers
	        if(input.val() && input.val().split(".").length === 1){
	          var inputValue = input.val() + "." + Array(numeric.options.decimals + 1).join("0");
	          input.val(inputValue);
	        }          
	      }
	</script>
```
