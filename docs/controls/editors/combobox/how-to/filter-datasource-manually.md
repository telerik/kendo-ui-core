---
title: Filter DataSource Manually
page_title: Filter DataSource Manually| Kendo UI ComboBox
description: "Learn how to filter DataSource instance manually in the Kendo UI ComboBox widget."
slug: howto_filter_datasource_manually_combobox
---

# Filter DataSource Manually

The example below demonstrates how to filter Kendo UI ComboBox datasource instance manually.

The widget has a built-in detection mechanism that checks whether the data is filtered or not. This information is used by the widget to decide when to persist selected value
that does not exist in the source. When source is filtered manually, widget will lose details about the DataSource state and hence could broke.

The demo below shows how to perform manual source filtration.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>ComboBox</h4>
        <select id="combobox"></select>
    </div>
    <script>
        $(function() {
            var combobox = $("#combobox").kendoComboBox({
                dataTextField: "name",
                dataValueField: "value",
                dataSource: {
                    data: [{ name: "One", value: 1 }, { name: "Two", value: 2 }]
                }
            }).data('kendoComboBox');

            //Filter the source manually
            combobox.dataSource.filter({
                field: 'value',
                operator: 'eq',
                value: 1
            });

            <!-- IMPORTANT: Update filter state of the widget -->
            combobox.listView.setDSFilter(combobox.dataSource.filter());

            combobox.value(1);
        });
    </script>
</div>
```

## See Also

Other articles on Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
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
