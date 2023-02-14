---
title: Refocus the NumericTextBox after Switching to a Different Browser Tab
description: "Refocus the Kendo UI NumericTextBox after the browser tab has been changed."
type: how-to
page_title: Refocus the NumericTextBox after Switching to a Different Browser Tab - Kendo UI NumericTextBox for jQuery
slug: numerictextbox-refocus-on-browser-tab-change
tags: numerictextbox, refocus, activelement, focus, tab, browser, change, window, input, visibilitychange
res_type: kb
---

## Environment
<table>
	<tbody>
		<tr>
			<td>Product</td>
			<td>Progress® Kendo UI® NumericTextBox for jQuery</td>
		</tr>
	</tbody>
</table>


## Description

I have focused a NumericTextBox input but after switching to a different browser tab and coming back to the page containing the NumericTextBox, the focus is lost. How can I prevent the Kendo UI NumericTextBox from losing its focus when I switch to a different tab?

## Solution

1. Attach the [`focusin`](https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event) JavaScript event to the input elements and save the last focused element.
1. Add an event listener to the [`visibilitychange`](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilitychange_event) JavaScript event.
1. Check if the last focused element before switching the tab was a Kendo UI NumericTextBox.
1. If the above condition is `true`, call the [`focus`](https://docs.telerik.com/kendo-ui/api/javascript/ui/numerictextbox/methods/focus) method of the NumericTextBox.

```dojo
<input id="numeric" />
</br>
</br>
<input id="numeric2" />
<script>
    window.prevActiveElement = $();
    $(document).on('focusin', 'input', function () {
        window.prevActiveElement = $(this);
    });

    document.addEventListener("visibilitychange", function(e) {
        let tabActive = document.visibilityState === "visible";
        let prevElementWasNumeric = window.prevActiveElement.is($("[data-role='numerictextbox']"));
        if(tabActive && prevElementWasNumeric) {
             window.prevActiveElement.data("kendoNumericTextBox").focus();
        }
    });
  
    $("#numeric").kendoNumericTextBox();
    $("#numeric2").kendoNumericTextBox();
</script>
``` 
