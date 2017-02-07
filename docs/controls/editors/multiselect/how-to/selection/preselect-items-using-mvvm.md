---
title: Preselect Items by Using MVVM Binding
page_title: Preselect Items by Using MVVM Binding | Kendo UI MultiSelect
description: "Learn how to preselect items by using MVVM in the Kendo UI Multiselect widget."
previous_url: /controls/editors/multiselect/how-to/preselect-items-using-mvvm
slug: howto_preselect_items_byusing_mvvm_binding_multiselect
---

# Preselect Items by Using MVVM Binding

The following example demonstrates how to preselect items by using MVVM binding in the Kendo UI MultiSelect widget.

###### Example

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

## See Also

Other articles on the Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})

For more runnable examples on the Kendo UI MultiSelect, browse its [**How To** documentation folder]({% slug howto_preselect_itemson_load_angular_multiselect %}).
