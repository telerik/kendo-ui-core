---
title: Cascade from Multiple Parents
page_title: Cascade from Multiple Parents | Kendo UI DropDownList
description: "Learn how to cascade Kendo UI DropDownList widgets from multiple parents."
slug: howto_cascade_multiple_parents_dropdownlist
---

# Cascade from Multiple Parents

The example below demonstrates how to cascade Kendo UI DropDownLists from multiple parents.

###### Example

```html
<select id="region" name="" id="region"></select><br />
<select id="category" name="" id="category"></select><br />
<select id="manufacturer" name="" id="manufacturer"></select><br />
<select id="model" name="" id="models"></select>
<script>
    //sample data
    var regions = [ { text: "US", value: 1 }, { text: "Europe", value: 2 } ];
    var categories = [ { text: "Car", value: 1 }, { text: "Trunk", value: 2 } ];
    var manufacturers = [ { text: "Ford", value: 1 }, { text: "GM", value: 2 } ];
    var models = [
        { text: "Model1", value: 1, region: 0, category: 1, manufacturer: 1 },
        { text: "Model2", value: 2, region: 1, category: 1, manufacturer: 1 },
        { text: "Model3", value: 3, region: 2, category: 2, manufacturer: 2 },
        { text: "Model4", value: 4, region: 2, category: 2, manufacturer: 2 }
    ];

    //cascade event handler
    function cascade() {
        if(region.value() && category.value() && manufacturer.value()) { //check if parents have value
            model.enable(true); //enable the widget
            model.dataSource.filter([ //filter the dataSource
                { field: "region", operator: "eq", value: parseInt(region.value()) },
                { field: "category", operator: "eq", value: parseInt(category.value()) },
                { field: "manufacturer", operator: "eq", value: parseInt(manufacturer.value()) }
            ]);
        } else {
            model.value(""); //clear the value
            model.enable(false); //disable the widget
        }
    }

    var region = $("#region").kendoDropDownList({
        dataSource: { data: regions },
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select region"
    }).data("kendoDropDownList");

    var category = $("#category").kendoDropDownList({
        dataSource: { data: categories },
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select category"
    }).data("kendoDropDownList");

    var manufacturer = $("#manufacturer").kendoDropDownList({
        dataSource: { data: manufacturers },
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select manufacturer"
    }).data("kendoDropDownList");

    var model = $("#model").kendoDropDownList({
        dataSource: { data: models },
        autoBind: false,
        dataTextField: "text",
        dataValueField: "value",
        optionLabel: "Select models",
        enable: false
    }).data("kendoDropDownList");

    //bind events
    region.bind("cascade", cascade);
    category.bind("cascade", cascade);
    manufacturer.bind("cascade", cascade);

</script>
```

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
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
