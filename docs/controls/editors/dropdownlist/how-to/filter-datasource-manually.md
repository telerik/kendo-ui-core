---
title: Filter DataSource Manually
page_title: Filter DataSource Manually| Kendo UI DropDownList
description: "Learn how to filter DataSource instance manually in the Kendo UI DropDownList widget."
slug: howto_filter_datasource_manually_dropdownlist
---

# Filter DataSource Manually

The example below demonstrates how to filter Kendo UI DropDownList datasource instance manually.

The widget has a built-in detection mechanism that checks whether the data is filtered or not. This information is used by the widget to decide when to persist selected value
that does not exist in the source. When source is filtered manually, widget will lose details about the DataSource state and hence could broke.

The demo below shows how to perform manual source filtration.

###### Example

```html
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

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
