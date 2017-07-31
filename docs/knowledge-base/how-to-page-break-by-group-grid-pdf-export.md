---
title: How to Page Break by Group PDF Export Grid
description: grid pdf export new page for each group
type: how-to
page_title: How To PDF Export Kendo UI Grid new page for each group 
slug: how-to-page-break-by-group-grid-pdf-export
position: 0
tags: kendo,grid,pdf,export,group,page,break
ticketid: 1120369

res_type: kb
---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr>
</table>


## Description

I am exporting a Kendo UI Grid to PDF. How can I add a page break by group? This group will change depending on what the user selects. 

## Solution

To get the Kendo UI PDF Export to break at each group, you can use the [`forcePageBreak`](http://docs.telerik.com/kendo-ui/framework/drawing/drawing-dom#configuration-Multi-Page) selector in the pdf options of the Kendo UI Grid. 

Runnable demo: http://dojo.telerik.com/uJIhA

The selector to use is:

```
pdf: { 
  forcePageBreak: ".k-grouping-row:not(:first-child)"
}
```
