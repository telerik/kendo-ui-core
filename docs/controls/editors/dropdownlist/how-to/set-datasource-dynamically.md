---
title: Set DataSource Dynamically
page_title: Set DataSource Dynamically | Kendo UI DropDownList
description: "Learn how to dynamically set DataSource in a Kendo UI DropDownList widget."
slug: howto_set_datasource_dynamically_dropdownlist
---

# Set DataSource Dynamically

The example below demonstrates how to dynamically set the DataSource in a Kendo UI DropDownList widget.

###### Example

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>View Order Details</h4>
      <p>
        <label for="categories">Categories:</label><input id="categories" style="width: 270px" />
      </p>
      <p>
        <label for="products">Products:</label><input id="products" disabled="disabled" style="width: 270px" />
      </p>
      <p>
        <label for="orders">Orders:</label><input id="orders" disabled="disabled" style="width: 270px" />
      </p>

      <button class="k-button" id="set">Set DataSource</button>
    </div>

    <style scoped>
      .demo-section {
        width: 400px;
      }
      .demo-section p {
        margin-top: 1em;
      }
      .demo-section label {
        display: inline-block;
        width: 100px;
        padding-right: 5px;
        text-align: right;
      }
      .demo-section .k-button {
        margin: 1em 0 0 105px;
      }
      .k-readonly
      {
        color: gray;
      }
    </style>

    <script>
      $(document).ready(function() {
        var categories = $("#categories").kendoDropDownList({
          optionLabel: "Select category...",
          dataTextField: "CategoryName",
          dataValueField: "CategoryID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
            }
          }
        }).data("kendoDropDownList");

        var products = $("#products").kendoDropDownList({
          autoBind: false,
          cascadeFrom: "categories",
          optionLabel: "Select product...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
        }).data("kendoDropDownList");

        var orders = $("#orders").kendoDropDownList({
          autoBind: false,
          cascadeFrom: "products",
          optionLabel: "Select order...",
          dataTextField: "Order.ShipCity",
          dataValueField: "OrderID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Order_Details?$expand=Order"
            }
          }
        }).data("kendoDropDownList");

        $("#set").click(function() {
          products.setDataSource({
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            }
          });
        });
      });
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
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
