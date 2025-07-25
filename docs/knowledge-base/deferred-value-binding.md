---
title: Configure Deferred Value Binding in the ComboBox
page_title: Configure Deferred Value Binding in the ComboBox
description: "Learn how to configure a deferred value binding in a Kendo UI ComboBox."
previous_url: /controls/editors/combobox/how-to/deferred-value-binding, /controls/editors/combobox/how-to/mvvm/deferred-value-binding
slug: howto_configure_deffered_value_binding_combobox
tags: telerik, kendo, jquery, combobox, configure, deferred, value, binding
component: combobox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
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

How can I configure a deferred value binding in a Kendo UI ComboBox?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
  <h2>Combobox Server Side Filter</h2>

	<input id="productID" name="productID"
       data-role="combobox"
       data-auto-bind="false"
       data-placeholder="Select a product"
       data-filter="contains"
       data-text-field="ProductName"
       data-value-field="ProductID"
       data-min-length="3"
       data-bind="deferredValue: productID, source: products" />

  <script type="text/javascript">
    //create a custom binder that works only with Objects and honours "autoBind:false" state
    kendo.data.binders.widget.deferredValue = kendo.data.Binder.extend({
        init: function (widget, bindings, options) {
            kendo.data.Binder.fn.init.call(this, widget.element[0], bindings, options);
            this.widget = widget;
            this._change = $.proxy(this.change, this);
            this.widget.bind("change", this._change);
        },
        refresh: function () {
            if (!this._initChange) {
                var widget = this.widget;
                var binding = this.bindings.deferredValue;
                var source = binding.source;
                var value = binding.get();

                if (value) {
                  if (widget.options.autoBind === false) {
                    widget.element.val(value);
                    widget.input.val(source.productName);

                    //Use this approach instead if you would like to not make request to server on OPEN
                    //widget.dataSource.add({ ProductID: source.productID, ProductName: source.productName });
                  } else {
                  	widget.value(value);
                  }
                }
            }
        },
        change: function () {
            this._initChange = true;
            this.bindings.deferredValue.set(this.widget.dataItem() || null);
            this._initChange = false;
        },
        destroy: function () {
            this.widget.unbind("change", this._change);
        }
    });

	</script>

  <script>
    // Viewmodel
    var viewModel = kendo.observable({
      productID: null,
      products: null,

      initialize: function(productID, productName) {
        viewModel.set('productID', productID);
        viewModel.set('productName', productName);

        var ds = new kendo.data.DataSource({
          type: "odata-v4",
          serverFiltering: true,
          transport: {
              read: {
                  url: "https://demos.telerik.com/service/v2/odata/Products",
              }
          }
        });

        viewModel.set('products', ds);
      },
    });

    // Initialize
    viewModel.initialize(5, "Chef Anton's Gumbo Mix");

    // bind it all up
    kendo.bind(document.body, viewModel);
  </script>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
