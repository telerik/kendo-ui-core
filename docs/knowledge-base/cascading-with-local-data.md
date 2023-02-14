---
title: Implement Cascading with Local Data in the ComboBox
page_title: Implement a Cascading Feature with Local Data in the ComboBox
description: "Learn how to cascade Kendo UI ComboBoxes when working with local data."
previous_url: /controls/editors/combobox/how-to/cascading-with-local-data, /controls/editors/combobox/how-to/cascade/cascading-with-local-data
slug: howto_implement_cascading_local_data_combobox
tags: telerik, kendo, jquery, combobox, implement, cascading, with, local, data
component: combobox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I cascade Kendo UI ComboBoxes when working with local data?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
category: <select id="category"></select>
product: <select id="product"></select>

<script>
    var category = $("#category").kendoComboBox({
        placeholder: "Select category...",
        dataSource: [
            { CategoryID: 1, CategoryName: "Beverages" },
            { CategoryID: 2, CategoryName: "Condiments" },
            { CategoryID: 3, CategoryName: "Confections" }
        ],
        dataValueField: "CategoryID",
        dataTextField: "CategoryName",
        filter: "contains"
    }).data("kendoComboBox");

    var product = $("#product").kendoComboBox({
        placeholder: "Select product...",
        dataSource: [
            {"ProductID":1,"ProductName":"Chai","CategoryID":1},
            {"ProductID":3,"ProductName":"Aniseed Syrup","CategoryID":2},
            {"ProductID":4,"ProductName":"Chef Anton's Cajun Seasoning","CategoryID":2},
            {"ProductID":16,"ProductName":"Pavlova","CategoryID":3},
            {"ProductID":19,"ProductName":"Teatime Chocolate Biscuits","CategoryID":3}              
        ],
        dataValueField: "ProductID",
        dataTextField: "ProductName",
        cascadeFrom: "category",
        filter: "contains"
    }).data("kendoComboBox");

    category.value("2");
    product.value("3");
</script>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
