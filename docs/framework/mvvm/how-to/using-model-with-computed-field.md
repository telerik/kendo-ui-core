---
title: Apply Source and Template Binding Using Model with Computed Field
page_title: Apply Source and Template Binding Using Model with Computed Field | Kendo UI MVVM
description: "Apply source and template binding by using a Model with a computed field in Kendo UI MVVM."
slug: howto_applysourceandtemplatebinding_usingmodelcomputedfield_mvvm
---

# Apply Source and Template Binding Using Model with Computed Field

The example below demonstrates how to apply source and template binding by using a Model with a computed field in Kendo UI MVVM.

###### Example

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

## See Also

Other articles on Kendo UI MVVM:

* [MVVM Overview]({% slug overview_mvvmpattern_kendoui %})
* [ObservableObject Overview]({% slug overview_observabeobject_kendoui %})
* [Tutorial on How to Build MVVM Bound Forms]({% slug mvvmboundforms_mvvmpattern_kendoui %})
* [How to Bind Container to Extended ObservableObject with Default Values]({% slug howto_bindacontainertoanextended_observableobjectwithdefaultvalues_mvvm %})

For detailed information on the bindings Kendo UI MVVM supports, refer to the section about [Kendo UI MVVM bindings]({% slug attributebinding_mvvm_kendoui %}).
