---
title: Preselect items
page_title: Preselect items
description: Example that shows how to preselect items in Kendo UI DropDownList
---

# How to preselect items

Example that shows how to preselect items

#### Example:

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

      <button class="k-button" id="get">View Order</button>
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
          },
          dataBound: function() {
            this.search("Grains/Cereals");
            this.select(this.selectedIndex);
          }
        }).data("kendoDropDownList");

        var products = $("#products").kendoDropDownList({
          autoBind: false,
          cascadeFrom: "categories",
          optionLabel: "Select product...",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products"
            }
          },
          dataBound: function() {
            this.search("Gnocchi di nonna Alice");
            this.select(this.selectedIndex);
          }
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
          },
          dataBound: function() {
            this.search("Albuquerque");
          }
        }).data("kendoDropDownList");
      });

    </script>
  </div>
```
