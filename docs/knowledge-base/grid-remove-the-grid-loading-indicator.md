---
title: Hide the Grid Loading Indicator
description: An example on how to hide the Grid loading indicator
type: how-to
page_title: Remove the Grid Loading Indicator | Kendo UI Grid
slug: grid-remove-the-grid-loading-indicator
tags: grid, loading, hide
ticketid: 1141398
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® Grid for ASP.NET MVC</td>
 </tr> <tr>
  <td>Made with Version</td>
  <td>2017.3.1026</td>
 </tr>
</table>


## Description
I am currently refreshing the grid every 3 seconds on my page using the Javascript SetInterval function.  The Grid is then reloading and displaying a loading indicator. How can I hide the loading indicator?

## Solution
The described effect is caused by the loading mask and it can be removed by hiding the mask DOM element.  
  
```
 .k-loading-mask{
  display: `none`;
 }
```
