---
title: MaskedTextBox Does Not Allow Input
description: The MaskedTextBox widget does not allow any input when the maxlength attribute is set on the input.
type: troubleshooting
page_title: Input Is Prevented When maxlength Is the Same Length as the Mask | Kendo UI MaskedTextBox for jQuery
slug: maskedtextbox-does-not-allow-input-with-maxlength-attribute
tags: maskedtextbox, input, prevents, kendo, maxlength, attribute, length, update, bug
ticketid: 1116721
res_type: kb
component: maskedtextbox
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI MaskedTextBox</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>From 2017.2.504</td>
 </tr>
</table>

 
## Description

How can I enter a chunk of text if the `maxlength` attribute on the input element of the MaskedTextBox is set to the same length as the mask? [This approach](https://dojo.telerik.com/@bubblemaster/eXEsi) worked in version 2017.1.223 and earlier.

## Solution

Remove the `minlength` attribute.

As of the [Kendo UI R2 2017](https://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r2-2017) release, the mask restricts the length of the input value. The implementation of the MaskedTextBox is now able to work with the `input` event instead of `keypress`.

This updates that are implemented with the release improve customer experience because users can:
* Use the widget on all browsers, including mobile windows and Android.
* Write special characters, which otherwise required several keypresses.
* Paste content.  
