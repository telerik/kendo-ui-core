---
title: Crop DropDownList Text
description: An example on how to crop the text in the Kendo UI DropDownList and show an ellipsis when the content is longer than the width of the drop-down.
type: how-to
page_title: Crop Text and Show Ellipsis for Longer Content | Kendo UI DropDownList
slug: crop-dropdown-text-and-show-ellipsis
tags: crop, dropdownlist, dropdown, ellipsis, overflow
ticketid: 1084518
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList</td>
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
  <td>Browser Version</td>
  <td>All</td>
 </tr>
</table>

## Description

How can the I crop the text of items in a DropDownList and show an ellipsis if they are longer than the width of the drop-down?

## Solution

Use the `white-space`, `overflow`, and `text-overflow` CSS properties.

```css
li.k-item {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
}
```

For the full implementation, refer to [this Dojo example](http://dojo.telerik.com/IPOga).
