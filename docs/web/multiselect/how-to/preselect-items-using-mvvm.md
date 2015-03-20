---
title: Preselect items using MVVM
page_title: Preselect items using MVVM
description: Preselect items using MVVM
---

# Preselect items using MVVM

The example below demonstrates how to preselect items using MVVM binding.

#### Example:

```html
    <div id="example" >
      <div class="demo-section k-header">
        <h4>Products</h4>
        <button id="set">Set Source</button>
        <select data-role="multiselect"
                data-text-field="ProductName"
                data-value-field="ProductID"
                data-bind="{source: source, value: products}"
                ></select>
      </div>
      <script>
        $(document).ready(function() {
          var model = kendo.observable({
            products: [
              { ProductName: "Chang", ProductID: 2 },
              { ProductName: "Uncle Bob's Organic Dried Pears", ProductID: 7 }
            ],
            source: []
          });

          kendo.bind(document.body, model);

          $("#set").click(function() {
            var source = new kendo.data.DataSource({
              type: "odata",
              serverFiltering: true,
              transport: {
                read: {
                  url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
                }
              }
            });

            source.one("change", function() {
              debugger;
              var products = model.products;

              model.set("products", []);                
              model.set("products", products);                
            });

            model.set("source", source);
          })
        });
      </script>
      <style scoped>
        .demo-section {
          width: 400px;
        }
      </style>
    </div>

```
