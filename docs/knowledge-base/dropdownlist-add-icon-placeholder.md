---
title: Add an icon in the DropDownList placeholder
description: Learn how to Add an icon in the DropDownList placeholder.
type: how-to
page_title: Add an icon in the DropDownList placeholder - Kendo UI DropDownList for jQuery
slug: dropdownlist-add-icon-placeholder
tags: kendoui, kendo, dropdownlist, icon, placeholder
res_type: kb
component: dropdownlist
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
 </tr>
</table>

## Description

How can I add an icon in the DropDownList placeholder?

## Solution

```dojo
    <link href="https://netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
    <input id="dropdownlist" />
    <script>
      $("#dropdownlist").kendoDropDownList({
        dataSource: [
          { productName: "Product 1", productId: 1 },
          { productName: "Product 2", productId: 2 }
        ],
        dataTextField: "productName",
        dataValueField: "productId",
        optionLabel: {
          productName: "Select a product...",
          productId: ""
        },
        optionLabelTemplate: "<span class='k-icon k-i-twitter'></span>"
      });
    </script>
```

## See Also

* [API Reference of the DropDownList](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist)
