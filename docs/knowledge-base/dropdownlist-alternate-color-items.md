---
title: Alternate Colors of DropDownList Items
description: An example on how to implement alternating colors in a Kendo UI DropDownList.
type: how-to
page_title: Alternate Colors of Items | Kendo UI DropDownList for jQuery
slug: dropdownlist-alternate-color-items
tags: dropdownlist, dropdown, list, items, color, alternate, background
ticketid: 1141949
res_type: kb
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

How can I implement alternating colors in the items of a Kendo UI DropDownList?

## Solution

Use the following CSS rules:

````css
 #countries-list ul li:nth-of-type(odd) {
    background: lightblue;
 }
````

```dojo
<div id="example">
  <div class="demo-section k-content">
    <h4>Products</h4>
    <input id="products" style="width: 100%" />
  </div>

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
  <style>
    #products-list ul li:nth-of-type(odd) {
      background: lightblue;
    }
  </style>
</div>
```

## See Also

* [DropDownList Overview](https://docs.telerik.com/kendo-ui/controls/editors/dropdownlist/overview)
