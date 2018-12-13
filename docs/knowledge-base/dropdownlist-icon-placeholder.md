---
title: Place Icon in DropDownList Placeholder
description: An example on how to place an icon in the placeholder of the Kendo UI DropDownList.
type: how-to
page_title: Place Icon in the Placeholder | Kendo UI DropDownList
slug: dropdownlist-icon-placeholder
tags: dropdownlist, icon, placeholder, place, web, font
ticketid: 1153026
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>DropDownList for Progress® Kendo UI®</td>
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

How can I show a custom icon in the placeholder of the DropDownList?

## Solution

1. Use the `optionLabelTemplate` property of the DropDownList.
1. By using the Kendo UI templates, include an element which displays one of the available Kendo UI web font icons.

```dojo
<input id="dropdownlist" />

<script>
  $("#dropdownlist").kendoDropDownList({
    dataSource: [{
        productName: "Product 1",
        productId: 1
      },
      {
        productName: "Product 2",
        productId: 2
      }
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

* [API Reference of the optionLabelTemplate Property](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/configuration/optionlabeltemplate)
* [Overview of the Kendo UI Templates](https://docs.telerik.com/kendo-ui/framework/templates/overview)
* [List of the Kendo UI Web Font Icons](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
