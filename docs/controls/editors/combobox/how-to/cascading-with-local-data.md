---
title: Implement Cascading with Local Data
page_title: Implement Cascading with Local Data | Kendo UI ComboBox Widget
description: "Learn how to implement cascading with local data in Kendo UI ComboBox."
slug: howto_implement_cascading_local_data_combobox
---

# Implement Cascading with Local Data

The example below demonstrates how to implement cascading with local data.

###### Example

```html
category: <select id="category"></select>
product: <select id="product"></select>

<script>
    var category = $("#category").kendoComboBox({
        placeholder: "Select category...",
        dataSource: [
            { CategoryID: 1, CategoryName: "Beverages" },
            { CategoryID: 2, CategoryName: "Condiments" },
            { CategoryID: 3, CategoryName: "Confections" }
        ],
        dataValueField: "CategoryID",
        dataTextField: "CategoryName",
        filter: "contains"
    }).data("kendoComboBox");

    var product = $("#product").kendoComboBox({
        placeholder: "Select product...",
        dataSource: [
            {"ProductID":1,"ProductName":"Chai","CategoryID":1},
            {"ProductID":3,"ProductName":"Aniseed Syrup","CategoryID":2},
            {"ProductID":4,"ProductName":"Chef Anton's Cajun Seasoning","CategoryID":2},
            {"ProductID":16,"ProductName":"Pavlova","CategoryID":3},
            {"ProductID":19,"ProductName":"Teatime Chocolate Biscuits","CategoryID":3}              
        ],
        dataValueField: "ProductID",
        dataTextField: "ProductName",
        cascadeFrom: "category",
        filter: "contains"
    }).data("kendoComboBox");

    category.value("2");
    product.value("3");
</script>
```

## See Also

Other articles on Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [How to Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Prevent POST on Enter Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
