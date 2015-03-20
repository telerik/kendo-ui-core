---
title: Detect when all widgets are bound
page_title: Detect when all widgets are bound
description: Example that shows how to use promises to detect when all widgets are bound
---

# How to use promises to detect when all widgets are bound

The example below demonstrates how to use promises to detect when all widgets are bound.

#### Example:

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>View Order Details</h4>
      <p>
        <label for="categories">Categories:</label><input id="categories" style="width: 270px" value="1"/>
      </p>
      <p>
        <label for="products">Products:</label><input id="products" style="width: 270px" />
      </p>
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
        var promises = [];

        var change = function() {
          this.deferred.resolve();   
        }

        var categories = $("#categories").kendoDropDownList({
          dataTextField: "CategoryName",
          dataValueField: "CategoryID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "http://demos.kendoui.com/service/Northwind.svc/Categories"
            },
            requestStart: function() {
              this.deferred = $.Deferred();
              promises.push(this.deferred.promise());
            }
          }
        }).data("kendoDropDownList");

        var products = $("#products").kendoDropDownList({
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: "http://demos.kendoui.com/service/Northwind.svc/Products"
            },
            requestStart: function() {
              this.deferred = $.Deferred();
              promises.push(this.deferred.promise());
            }
          }
        }).data("kendoDropDownList");

        categories.dataSource.bind("change", change);
        products.dataSource.bind("change", change);

        $.when.apply(null, promises)
        .done(function() {
          console.log("done");
          console.log(categories.value());
          console.log(products.value());
        });
      });
    </script>
  </div>
```
