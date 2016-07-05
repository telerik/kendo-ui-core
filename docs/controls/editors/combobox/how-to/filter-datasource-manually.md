---
title: Filter DataSource Manually
page_title: Filter DataSource Manually| Kendo UI ComboBox
description: "Learn how to filter DataSource instance manually in the Kendo UI ComboBox widget."
slug: howto_filter_datasource_manually_combobox
---

# Filter DataSource Manually

The widget has a built-in detection mechanism which checks whether the data is filtered or not. This information is used by the widget to decide when to persist selected value, not existing in the source. When the source is filtered manually, the widget loses details about the DataSource state and, as a result, might fail to operate.

The example below demonstrates how to filter the Kendo UI ComboBox datasource instance manually.

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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
