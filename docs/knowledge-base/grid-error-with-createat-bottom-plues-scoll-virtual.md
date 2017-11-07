---
title: Error With CreateAt Bottom Plus Scroll Virtual
description: Why the Loading Indicator Stays After Adding New Record
type: troubleshooting
page_title: Error With CreateAt Bottom Plus Scroll Virtual
slug: grid-error-with-createat-bottom-plues-scoll-virtual
tags: grid, editing, virtual, scroll, create
ticketid: 1137381
res_type: kb

---

## Environment
<table>
 <tr>
  <td>Product</td>
  <td>Grid for Progress® Kendo UI®</td>
 </tr> <tr>
  <td>Version</td>
  <td>2017.3.917</td>
 </tr>
</table>


## Description

With the new version (2017.3.917), all our grids fail without error when you try to add a new record when we have set this two options:

```
editable: { createAt: "bottom"},  
scrollable: { virtual: true }
```


## Solution
  
The issue occurs because the virtual scrolling requires the initial records to be more than the viewport in order to scroll. Also, the pageSize has to be set and to be around 3 times the visible items.  
  
Please check all of the [requirements and the specifics](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#virtual-scrolling) of the virtual scrolling.
