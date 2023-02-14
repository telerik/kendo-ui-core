---
title: Update MVVM-Bound Models on Loading the DropDownList
page_title: Update MVVM-Bound Models on Loading the DropDownList
description: "Learn how to update MVVM bound models on load in a Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/how-to/update-model-on-load, /controls/editors/dropdownlist/how-to/binding/update-model-on-load
slug: howto_update_mvvm_model_onload_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, update, mvvm, bound, models, on, loading
component: dropdownlist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
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

How can I update an MVVM-bound model on load in a Kendo UI DropDownList?

## Solution

The following example demonstrates how to achieve the desired scenario.



```dojo
  <div id="example">
    <div class="demo-section k-header">

      <div class="box-col">
        <h4>Choose a product e.g. 'Chai'</h4>
        <input data-role="dropdownlist"
               data-auto-bind="false"
               data-bound="updateModel"
               data-text-field="ProductName"
               data-value-field="ProductID"
               data-bind="value: selectedProduct,
                          source: products,
                          events: {
                          change: onChange,
                          open: onOpen,
                          close: onClose
                          }"
               style="width: 300px"
               /><button data-bind="click: onChange">click for selected value</button>
      </div>
      <div class="box-col console-section">
        <h4>Console</h4>
        <div class="console"></div>
      </div>
    </div>

    <script>
      function updateModel(e) {
        var widget = e.sender;

        setTimeout(function() {
          widget.trigger("change");
        });
      };

      var viewModel = kendo.observable({
        selectedProduct: null,
        displaySelectedProduct: function() {
          var selectedProduct = this.get("selectedProduct");
          return kendo.stringify(selectedProduct, null, 4);
        },
        onOpen: function() {
          $(".console").append("<p>event :: open</p>");
        },
        onChange: function() {
          $(".console").append("<p>event :: change (" + this.displaySelectedProduct() + ")</p>");
        },
        onClose: function() {
          $(".console").append("<p>event :: close</p>");
        },
        products: [{ProductName: "test title", ProductID: "1"}]
      });
      kendo.bind($("#example"), viewModel);
    </script>
  </div>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
