---
title: Add Page Breaks by Group When Exporting the Grid to PDF
description: An example on how to add a new page for each group when exporting the Kendo UI Grid to PDF.
type: how-to
page_title: Add New Page for Each Group When Exporting the Grid to PDF | Kendo UI Grid
previous_url: /knowledge-base/how-to-page-break-by-group-grid-pdf-export
slug: page-break-by-group-grid-pdf-export
tags: kendo, grid, pdf, export, group, page, break
ticketid: 1120369
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr>
</table>

## Description

I am exporting a Kendo UI Grid to PDF. How can I add a page break by group, which will change depending on what the user selects? 

## Solution

To get the Kendo UI PDF Export to break at each group, use the [`forcePageBreak`](http://docs.telerik.com/kendo-ui/framework/drawing/drawing-dom#configuration-Multi-Page) selector in the PDF options of the Grid:

```
pdf: { 
  forcePageBreak: ".k-grouping-row:not(:first-child)"
}
```

For the complete implementation of this approach, refer to [this runnable example](http://dojo.telerik.com/uJIhA).
