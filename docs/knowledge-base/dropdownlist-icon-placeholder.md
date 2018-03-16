---
title: Place Icon in DropDownList Placeholder
description: An example on how to place an icon in a DropDownList placeholder
type: how-to
page_title: Place Icon in DropDownList Placeholder
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

I'm working on an application that takes advantage of the Kendo UI DropDownList and would like to show a custom icon in its placeholder.

## Solution

The described functionality can be implemented by taking advantage of the `optionLabelTemplate` property of the DropDownList API. Using Kendo UI Templates, include an element that displays one of the available Kendo UI Web Font Icons:

```html
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

* [optionLabelTemplate property API Reference.](https://docs.telerik.com/kendo-ui/api/javascript/ui/dropdownlist/configuration/optionlabeltemplate)
* [Kendo UI Templates Overview.](https://docs.telerik.com/kendo-ui/framework/templates/overview)
* [Kendo UI Web Font Icons Reference.](https://docs.telerik.com/kendo-ui/styles-and-layout/icons-web)
