---
title: Crop DropDownList Text
description: Learn how to crop the text in the Kendo UI DropDownList and show an ellipsis when the content is longer than the width of the drop-down.
type: how-to
page_title: Crop Text and Show Ellipsis for Longer Content - Kendo UI DropDownList for jQuery
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
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
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


```dojo
    <style>
        li.k-item {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
    </style>

    <h4>Products</h4>
    <input id="products" style="width: 200px" />

    <script>
      $(document).ready(function() {
        $("#products").kendoDropDownList({
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            transport: {
              read: {
                dataType: "jsonp",
                url: "https://demos.telerik.com/kendo-ui/service/Products",
              }
            }
          }
        });
      });
    </script>
```
