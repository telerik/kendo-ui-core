---
title: Set DataSource dynamically 
page_title: Set DataSource dynamically 
description: Example that shows how to set DataSource dynamically 
---

# How to set DataSource dynamically  

Example that shows how to set DataSource dynamically 

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
