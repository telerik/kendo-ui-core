---
title: Update MVVM Bound Models on Load
page_title: Update MVVM Bound Models on Load | Kendo UI DropDownList
description: "Learn how to update MVVM bound models on load in a Kendo UI DropDownList widget."
slug: howto_update_mvvm_model_onload_dropdownlist
---

# Update MVVM Bound Models on Load

The example below demonstrates how to update an MVVM bound model on load in a Kendo UI DropDownList.

###### Example

```html
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
          kendoConsole.log("event :: open");
        },
        onChange: function() {
          kendoConsole.log("event :: change (" + this.displaySelectedProduct() + ")");
        },
        onClose: function() {
          kendoConsole.log("event :: close");
        },
        products: [{ProductName: "test title", ProductID: "1"}]
      });
      kendo.bind($("#example"), viewModel);
    </script>
  </div>
```

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
