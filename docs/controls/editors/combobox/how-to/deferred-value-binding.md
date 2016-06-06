---
title: Configure Deferred Value Binding
page_title: Configure Deferred Value Binding | Kendo UI ComboBox
description: "Learn how to configure deferred value binding in Kendo UI ComboBox."
slug: howto_configure_deffered_value_binding_combobox
---

# Configure Deferred Value Binding

The example below demonstrates how to configure deferred value binding.

###### Example

```html
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
          type: "odata",
          serverFiltering: true,
          transport: {
              read: {
                  url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
