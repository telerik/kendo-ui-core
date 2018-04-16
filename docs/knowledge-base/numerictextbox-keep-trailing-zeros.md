---
title: Keep trailing zeros in the NumericTextBox
description: How to always display the entire decimal portion in the NumericTextBox
type: how-to
page_title: How to prevent rounding of decimals in the NumercTextBox
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

I want to format number in numericttextbox to show 4 decimal places. But when I editing value via spin buttons format of number is wrong when I enter value `0.0010` I see only `0.001`. But when the numeric text box loses focus it reformats number to `0.0010`. 

## Solution

This is actually not part of the widgets built-in settings and is already in our UserVoice forum as a feature request. Requests which are popular, get onto the teams future tasks for implementation so you can upvote the item at:

[http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/6696197-numerictextbox-should-display-decimal-portion-even](http://kendoui-feedback.telerik.com/forums/127393-kendo-ui-feedback/suggestions/6696197-numerictextbox-should-display-decimal-portion-even)

You can add the trailing zeros programmatically both on [`spin`](/api/javascript/ui/numerictextbox/events/spin) and also on "focus" of the input. You could develop the example further to reflect globalization and check if decimals is set (when using on multiple NumericTextBoxes).

###### Example:

```html
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
