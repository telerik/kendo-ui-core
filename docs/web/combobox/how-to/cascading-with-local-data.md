---
title: Implement Cascading with Local Data
page_title: Implement Cascading with Local Data | Kendo UI ComboBox Widget
description: "Learn how to implement cascading with local data in Kendo UI ComboBox."
slug: howto_implement_cascading_local_data_combobox
position: 11
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

Other Kendo UI ComboBox how-to examples:

* [Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Prevent POST on ENTER Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [Open ComboBox When `onfocus` is Triggered]({% slug howto_open_onfocus_combobox %})
* [Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Select Items on TAB]({% slug howto_select_items_ontab_combobox %})
* [Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})