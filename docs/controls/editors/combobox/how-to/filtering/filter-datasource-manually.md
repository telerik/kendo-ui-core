---
title: Filter DataSource Manually
page_title: Filter DataSource Manually | Kendo UI ComboBox
description: "Learn how to manually filter the Data Source instance in a Kendo UI ComboBox widget."
previous_url: /controls/editors/combobox/how-to/filter-datasource-manually
slug: howto_filter_datasource_manually_combobox
---

# Filter DataSource Manually

The Kendo UI ComboBox has a built-in detection mechanism that checks whether the data is filtered or not.

This information is used by the widget to decide when to persist the selected value that does not exist in the source. When the source is manually filtered, the ComboBox loses the details about the state of the Data Source and, as a result, might fail to operate.

The following example demonstrates how to manually filter the Data Source instance of the Kendo UI ComboBox.

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
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
