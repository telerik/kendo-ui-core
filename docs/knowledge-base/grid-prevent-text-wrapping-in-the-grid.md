---
title: Stop Text Wrapping in the Grid
description: An example on how to prevent text wrapping in the Grid
type: how-to
page_title: Prevent Text Wrapping in the Grid
slug: grid-prevent-text-wrapping-in-the-grid
tags: grid, wrap, prevent
ticketid: 1141418
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
 </tr></table>


## Description
How to force the grid item into a single line stop text from wrapping? 

## Solution
This could be achieved with the following CSS:  
  
```
.k-grid td{
  white-space: nowrap;
}
```