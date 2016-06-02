---
title: Filter DataSource Manually
page_title: Filter DataSource Manually| Kendo UI MultiSelect
description: "Learn how to filter DataSource instance manually in the Kendo UI MultiSelect widget."
slug: howto_filter_datasource_manually_multiselect
---

# Filter DataSource Manually

The example below demonstrates how to filter Kendo UI MultiSelect datasource instance manually.

The widget has a built-in detection mechanism that checks whether the data is filtered or not. This information is used by the widget to decide when to persist selected value
that does not exist in the source. When source is filtered manually, widget will lose details about the DataSource state and hence could broke.

The demo below shows how to perform manual source filtration.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>MultiSelect</h4>
        <select id="multiselect" multiple="multiple"></select>
    </div>
    <script>
        $(function() {
            var ms = $("#multiselect").kendoMultiSelect({
                dataTextField: "name",
                dataValueField: "value",
                dataSource: {
                    data: [{ name: "One", value: 1 }, { name: "Two", value: 2 }]
                }
            }).data('kendoMultiSelect');

            //Filter the source manually
            ms.dataSource.filter({
                field: 'value',
                operator: 'eq',
                value: 1
            });

            <!-- IMPORTANT: Update filter state of the widget -->
            ms.listView.setDSFilter(ms.dataSource.filter());

            ms.value(1);
        });
    </script>
</div>
```

## See Also

Other articles on Kendo UI MultiSelect:

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Create Cascading MultiSelects]({% slug howto_create_cascading_widgets_multiselect %})
* [How to Create Checkbox Custom Item Template]({% slug howto_checkbox_custom_item_template_multiselect %})
* [How to Create Scrollable Data Items]({% slug howto_create_scrollable_data_items_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items on Load in AngularJS]({% slug howto_preselect_itemson_load_angular_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Reorder Selected Items]({% slug howto_reorder_selected_items_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Select or Deselect All Items]({% slug howto_select_and_deselect_allitems_multiselect %})
* [How to Select the First Item on TAB]({% slug howto_select_thefirst_itemon_tab_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
