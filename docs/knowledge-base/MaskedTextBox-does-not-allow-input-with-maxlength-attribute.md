---
title: MaskedTextBox does not allow input
description:  MaskedTextBox doesn't allow input when maxlength attribute is set on the input
type: troubleshooting
page_title: MaskedTextBox prevents input when maxlength attribute is same length as the mask
slug: MaskedTextBox-does-not-allow-input-with-maxlength-attribute
position: 0
tags: MaskedTextBox,input,prevents,kendo,maxlength,attribute,length,update,bug
teampulseid:
ticketid: 1116721
pitsid:

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>MaskedTextBox for Progress® Kendo UI®</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>From 2017.2.504</td>
 </tr>
</table>

 
## Description

I've encountered a problem with MaskedTextBox where I cannot enter text if the maxlength attribute on the input element is set to the same size as the mask. This worked in prior versions (2017.1.223 and earlier). You can see the behavior [here](http://dojo.telerik.com/@bubblemaster/eXEsi).  

## Solution

Remove minlength attribute. The mask restricts the length of the input value.This behaviour is expected since [R2 2017](http://www.telerik.com/support/whats-new/kendo-ui/release-history/kendo-ui-r2-2017) when we changed the MaskedTextBox implementation to work with the input event instead of keypress.

This brings many benefits to users such as:

- the ability to use the widget on all browsers, including mobile windows and android
- the ability to write special characters which require several keypresses
- paste  
