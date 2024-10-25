---
title: Set the DropDownList DataSource Dynamically
page_title: Set the DropDownList DataSource Dynamically
description: "Learn how to dynamically set the DataSource in a Kendo UI DropDownList component."
previous_url: /controls/editors/dropdownlist/how-to/set-datasource-dynamically, /controls/editors/dropdownlist/how-to/binding/set-datasource-dynamically
slug: howto_set_datasource_dynamically_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, set, data, source, dynamically
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
  <td>Visual Studio Version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I dynamically set the data source of a Kendo UI DropDownList widget?

## Solution

The following example demonstrates how to achieve the desired scenario.



```dojo
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
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
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
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Order_Details?$expand=Order"
            }
          }
        }).data("kendoDropDownList");

        $("#set").click(function() {
          products.setDataSource({
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            }
          });
        });
      });
    </script>
  </div>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [Remove Items]({% slug howto_remove_items_dropdownlist %})
* [Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
