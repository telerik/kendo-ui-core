---
title: Preselect MultiSelect Items by Using MVVM Binding
page_title: Preselect MultiSelect Items by Using MVVM Binding
description: "Learn how to preselect items by using MVVM in the Kendo UI Multiselect widget."
previous_url: /controls/editors/multiselect/how-to/preselect-items-using-mvvm, /controls/editors/multiselect/how-to/selection/preselect-items-using-mvvm
slug: howto_preselect_items_byusing_mvvm_binding_multiselect
tags: telerik, kendo, jquery, multiselect, preselect, items, by, using, mvvm, binding
component: multiselect
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I preselect items by using MVVM binding in the Kendo UI MultiSelect widget?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
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
                  url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
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

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
