---
title: Bind MultiSelect Values to Templates
page_title: Bind MultiSelect Values to Templates
description: "Learn how to bind values to a template by using MVVM in the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/how-to/bind-values-to-template, /controls/editors/multiselect/how-to/templates/bind-values-to-template
slug: howto_bind_values_totemplate_multiselect
tags: telerik, kendo, jquery, multiselect, bind, values, to, templates
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

How can I bind the Kendo UI MultiSelect value to a template by using MVVM?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example">
      <div class="demo-section k-header">
        <div class="box-col" data-bind="visible: isPrimitive">
          <h4>MultiSelect</h4>
          <select data-role="multiselect"
                  data-placeholder="Type a product e.g. 'Chai'"
                  data-value-primitive="false"
                  data-text-field="ProductName"
                  data-value-field="ProductID"
                  data-bind="value: selectedProduct,
                             source: products,
                             visible: isVisible,
                             enabled: isEnabled,
                             events: {
                             change: onChange,
                             open: onOpen,
                             close: onClose
                             }"
                  style="width: 300px"
                  ></select>
        </div>

        <table>
          <tbody data-template="row-template" data-bind="source: selectedProduct"></tbody>
        </table>
        <script id="row-template" type="text/x-kendo-template">
            <tr>
                <td data-bind="text: ProductName"></td>
                <td data-bind="text: ProductID"></td>
          </tr>
        </script>
      </div>
    </div>

    <script>
      var viewModel = kendo.observable({
        selectedProduct: null,
        isPrimitive: true,
        isVisible: true,
        isEnabled: true,
        primitiveChanged: function() {
          this.set("selectedProduct", null);
        },
        displaySelectedProduct: function() {
          var selectedProduct = this.get("selectedProduct");
          return kendo.stringify(selectedProduct, null, 4);
        },
        onOpen: function() {
          $(".console").append("<p>event :: open</p>");
        },
        onChange: function() {
          var selectedProduct = this.get("selectedProduct");
          viewModel.set("selectedProduct",selectedProduct)
          $(".console").append("<p>event :: change (" + this.displaySelectedProduct() + ")</p>");
        },
        onClose: function() {
          $(".console").append("<p>event :: close</p>");
        },
        products: new kendo.data.DataSource({
          transport: {
            read: {
              url: "https://demos.telerik.com/kendo-ui/service/products",
              dataType: "jsonp"
            }
          }
        })
      });
      kendo.bind($("#example"), viewModel);
    </script>
    </div>
```

## See Also

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
