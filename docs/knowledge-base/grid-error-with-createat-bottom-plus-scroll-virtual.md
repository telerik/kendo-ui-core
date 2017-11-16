---
title: Error with CreateAt Bottom and Scroll Virtual Occurs
description: When I update to the 2017.3.917 Kendo UI version and try to add a new record, the Kendo UI Grid fails with no error.
type: troubleshooting
page_title: Error With CreateAt Bottom and Scroll Virtual | Kendo UI Grid
slug: grid-error-with-createat-bottom-plus-scroll-virtual
tags: grid, editing, virtual, scroll, create
previous_url: /knowledge-base/grid-error-with-createat-bottom-plues-scoll-virtual.md
ticketid: 1137381
res_type: kb
component: grid
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI Grid</td>
 </tr> <tr>
  <td>Version</td>
  <td>2017.3.917</td>
 </tr>
</table>


## Description

My Grid features the following options:

```
editable: { createAt: "bottom"},  
scrollable: { virtual: true }
```

When I update to the 2017.3.917 Kendo UI version and try to add a new record, the Grid fails with no error.

## Cause

To enable the scroll, the virtual scrolling requires that the initial records take more space than the viewport. You also need to set the `pageSize` and it needs to be around three times the visible items.  

## Solution

Make sure that you meet all [requirements and the specifics](https://docs.telerik.com/kendo-ui/controls/data-management/grid/appearance#virtual-scrolling) of the virtual scrolling functionality.
