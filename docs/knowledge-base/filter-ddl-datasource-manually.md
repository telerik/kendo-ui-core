---
title: Filter the DataSource of the DropDownList Manually
page_title: Filter the DataSource of the DropDownList Manually
description: "Learn how to filter DataSource instance manually in the Kendo UI DropDownList widget."
previous_url: /controls/editors/dropdownlist/how-to/filter-datasource-manually, /controls/editors/dropdownlist/how-to/filtering/filter-datasource-manually
slug: howto_filter_datasource_manually_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, filter, data, source, manually
component: dropdownlist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress Kendo UI DropDownList for jQuery</td>
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

How can I manually filter the `dataSource` instance of the DropDownList?

## Solution

The Kendo UI DropDownList has a built-in detection mechanism that checks whether the data is filtered or not.

The widget uses this information to decide when to persist the selected value that does not exist in the source. When the source is manually filtered, the widget loses the details about the state of the DataSource, which might lead to inconsistent behavior.

The following example demonstrates how to achieve the desired scenario.


```dojo
<div id="example">
    <div class="demo-section k-header">
        <h4>DropDownList</h4>
        <select id="dropdownlist"></select>
    </div>
    <script>
        $(function() {
            var dropdownlist = $("#dropdownlist").kendoDropDownList({
                dataTextField: "name",
                dataValueField: "value",
                dataSource: {
                    data: [{ name: "One", value: 1 }, { name: "Two", value: 2 }]
                }
            }).data('kendoDropDownList');

            //Filter the source manually
            dropdownlist.dataSource.filter({
                field: 'value',
                operator: 'eq',
                value: 1
            });

            <!-- IMPORTANT: Update filter state of the widget -->
            dropdownlist.listView.setDSFilter(dropdownlist.dataSource.filter());

            dropdownlist.value(1);
        });
    </script>
</div>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
