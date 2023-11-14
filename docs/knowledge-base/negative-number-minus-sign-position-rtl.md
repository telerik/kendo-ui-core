---
title: Minus Sign Shows to the Right of Negative Numbers When Using Right-to-Left (RTL) Languages
description: Cannot override the default behavior and display the minus sign of negative numbers to the left, instead of to the right, when using Right-to-Left (RTL) languages.
type: troubleshooting
page_title: Minus Sign Appears to the Right of Negative Numbers When Using Right-to-Left (RTL) Languages 
slug: negative-number-minus-sign-position-rtl
tags: RTL, right-to-left, languages, negative, number, position
teampulseid:ticketid: 996114
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Browser</td>
  <td>All</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>


## Description

I'm using right-to-left languages in my project and when working with negative numbers, the minus sign appears to the right of the digits instead of to their left.

## Solution

Utilize and modify the number format pattern in the Kendo UI culture which is in use.

```dojo
kendo.culture().numberFormat.pattern[0] = "n-";
```

For the full implementation of the approach, refer to [this Dojo example](https://dojo.telerik.com/EcIgE).

## See Also

* [Globalization in Kendo UI](https://docs.telerik.com/kendo-ui/framework/globalization/overview).
* [Culture Definition in Kendo UI](https://docs.telerik.com/kendo-ui/framework/globalization/definecultureinfo).
* [Right-to-Left (RTL) Support in Kendo UI](https://docs.telerik.com/kendo-ui/globalization/supporting-rtl-languages)
