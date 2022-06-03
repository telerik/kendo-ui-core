---
title: Widgets Cannot Be Initialized in Internet Explorer Compatibility Mode
page_title: Widgets Cannot Be Initialized in Internet Explorer Compatibility Mode
description: "Learn how to handle the problem when the widgets cannot be initialized in the Internet Explorer Compatibility Mode when working with Kendo UI for jQuery."
slug: widgets_cannot-initialize_ie_compatibility
tags: telerik, kendoui, jquery, troubleshooting, widgets, cannot, be, initialized, in, internet, explorer, compatibility, mode
type: troubleshooting
res_type: kb
component: kendoui
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Kendo Version</td>
  <td>2017.2.621</td>
 </tr>
</table>

## Description 

Kendo UI widgets cannot be initialized in the Internet Explorer Compatibility Mode and an error is thrown. 

## Cause

Kendo UI widgets provide WAI-ARIA support, which means that some ARIA-specific attributes are added to the HTML element. 

When a widget tries to add a WAI-ARIA attribute using the [`attr` jQuery method](https://api.jquery.com/attr/), which in turn calls the [`Element.setAttribute` method](https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute), the Internet Explorer in Compatibility mode will raise a JavaScript error.

>This issue affects all Kendo UI widgets that add WAI-ARIA attributes to HTML elements.

## Error Message 

`SCRIPT3: Member not found (in Internet Explorer 10+ in Compatibility Mode)`

## Solution

The problem is reported to Microsoft on `https://connect.microsoft.com/IE/feedback/details/774078` and a [jQuery bug report](http://bugs.jquery.com/ticket/12577) is submitted.

To handle this issue, use any of the following solutions: 

* Force the Internet Explorer to use the Edge mode:

   ```
   <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
   ```

* Path jQuery. For more information about the possible path, refer to the [jQuery bug report](http://bugs.jquery.com/ticket/12577).

