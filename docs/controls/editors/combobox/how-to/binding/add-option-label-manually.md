---
title: Add Option Labels Manually
page_title: Add Option Labels Manually | Kendo UI ComboBox
description: "Learn how to add option label manually in Kendo UI ComboBox."
previous_url: /controls/editors/combobox/how-to/add-option-label-manually
slug: howto_add_option_label_manually_combobox
---

# Add Option Labels Manually

The following example demonstrates how to manually add an option label in a Kendo UI ComboBox.

###### Example

```html
  <div id="example">
    <div class="demo-section k-header">
      <h4>Products</h4>
      <input id="products" style="width: 400px" />
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          filter: "contains",
          index: 0,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            },
            requestEnd: function(e) {
              e.response.d.results.unshift({ ProductID:'', ProductName:'All' });
            }
          }
        });
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

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_bindobjectstongmodel_combobox %}).
