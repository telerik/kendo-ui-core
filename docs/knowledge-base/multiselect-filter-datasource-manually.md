---
title: Filter the MultiSelect DataSource Manually
page_title: Filter the DataSource of the MultiSelect Manually
description: "Learn how to manually filter the DataSource instance in the Kendo UI MultiSelect widget."
previous_url: /controls/editors/multiselect/how-to/filter-datasource-manually, /controls/editors/multiselect/how-to/filtering/filter-datasource-manually
slug: howto_filter_datasource_manually_multiselect
tags: telerik, kendo, jquery, multiselect, filter, data, source, instance, manually
component: multiselect
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® MultiSelect for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I manually filter the `dataSource` instance of the MultiSelect?

## Solution

The Kendo UI MultiSelect has a built-in detection mechanism that checks whether the data is filtered or not. The widget uses this information to decide when to persist the selected value that does not exist in the source. When the source is manually filtered, the widget loses the details about the state of the DataSource, which might lead to inconsistent behavior.

The following example demonstrates how to achieve the desired scenario.

```dojo
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

* [MultiSelect JavaScript API Reference](/api/javascript/ui/multiselect)
* [How to Cascade from DropDownList]({% slug howto_cascade_froma_dropdownlist_multiselect %})
* [How to Filter Values in Widgets Sharing the Same Data]({% slug howto_filter_valuesin_widgetswith_shared_data_multiselect %})
* [How to Preselect Items Using MVVM Binding]({% slug howto_preselect_items_byusing_mvvm_binding_multiselect %})
* [How to Select All Values with Single Selection]({% slug howto_select_allvalues_witha_single_selection_multiselect %})
* [How to Use MultiSelect with Bootstrap Modal Window]({% slug howto_use_multiselect_with_bootstrap_modal_window_multiselect %})
* [How to Wire Blur Event of the Filter Input]({% slug howto_wire_blur_event_ofthe_filtеr_input_multiselect %})
