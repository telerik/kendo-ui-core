---
title: Source and template binding using Model with computed field
page_title: Source and template binding using Model with computed field
description: Source and template binding using Model with computed field
---

# Source and template binding using Model with computed field

The example below demonstrates how to use source and template binding using Model with computed field.

#### Example:

```html
  <div data-bind="source: data" data-template="tmp"></div>
  <script id="tmp" type="text/x-kendo-template">
    <div>
      <input data-bind="value: quantity" />
      <span data-bind="text: price"></span>
      <span data-bind="text: total"></span>
    </div>
  </script>
  <script>

    var Product = kendo.data.Model.define({
      fields: {
        "quantity": {
          type: "number"
        },
        "price": {
          type: "number"
        }
      },
      total: function() { //define the calculated field
        return this.get("quantity") * this.get("price");
      }
    });

    var viewModel = kendo.observable({
      data: [
        new Product({ "quantity": 1, "price": 2 })
      ]
    });
    kendo.bind($(document.body), viewModel);
  </script>
```
