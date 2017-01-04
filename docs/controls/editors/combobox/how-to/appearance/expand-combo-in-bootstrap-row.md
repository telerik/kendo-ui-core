---
title: Expand ComboBoxes in Bootstrap Layouts
page_title: Expand ComboBoxes in Bootstrap Layouts | Kendo UI ComboBox
description: "Learn how to expand Kendo UI ComboBox located in a Bootstrap layout."
previous_url: /controls/editors/combobox/how-to/expand-combo-in-bootstrap-row
slug: howto_expand_widget_bootstrap_widget_combobox
---

# Expand ComboBoxes in Bootstrap Layouts

The following example demonstrates how to expand a Kendo UI ComboBox located in a Bootstrap layout.

Basically, the approach is to set the input width to 100%.

###### Example

```html
  <div class="row">
    <div class="col-md-8"><input id="categories" style="width: 100%" /></div>
    <div class="col-md-4">.col-md-4</div>
  </div>
  <script>
    $(document).ready(function() {
        $("#categories").kendoComboBox({
            dataTextField: "CategoryName",
            dataValueField: "CategoryID",
            dataSource: {
                type: "odata",
                serverFiltering: true,
                transport: {
                    read: "http://demos.telerik.com/kendo-ui/service/Northwind.svc/Categories"
                }
            }
        });
    });
  </script>
</div>
```

## See Also

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
