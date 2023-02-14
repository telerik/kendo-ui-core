---
title: Cascade the DropDownList from Multiple Parents
page_title: Cascade the DropDownList from Multiple Parents
description: "Learn how to cascade Kendo UI DropDownList widgets from multiple parents."
previous_url: /controls/editors/dropdownlist/how-to/cascade-from-multiple-parents, /controls/editors/dropdownlist/how-to/cascade/cascade-from-multiple-parents
slug: howto_cascade_multiple_parents_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, cascade, from, multiple, parents
component: dropdownlist
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
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

How can I cascade Kendo UI for jQuery DropDownLists from multiple parents?

## Solution

The following example demonstrates how to achieve this behavior.



```dojo
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

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
