---
title: Expand ComboBox Located in Bootstrap Layout
page_title: Expand ComboBox Located in Bootstrap Layout | Kendo UI ComboBox
description: "Learn how to expand Kendo UI ComboBox located in a Bootstrap layout."
slug: howto_expand_widget_bootstrap_widget_combobox
---

# Expand ComboBox Located in Bootstrap Layout

The example below demonstrates how to expand Kendo UI ComboBox located in a Bootstrap layout. Basically, the approach is to set the input width to 100%.

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

Other articles on Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Prevent POST on Enter Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [How to Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, browse the [articles in its how-to section]({% slug howto_define_virtual_option_combobox %}).
