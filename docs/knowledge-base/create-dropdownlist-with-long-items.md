---
title: Create DropDownLists with Long Items
page_title: Create Long-Item DropDownLists
description: "Learn how to create Kendo UI DropDownLists with long items."
previous_url: /controls/editors/dropdownlist/how-to/create-dropdownlist-with-long-items, /controls/editors/dropdownlist/how-to/appearance/create-dropdownlist-with-long-items
slug: howto_create_listswith_long_items_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, create, lists, with, long, items
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

How can I render long items by showing just a part of them and keeping the current width of the DropDownList widget?

## Solution

The following example demonstrates how to create a Kendo UI DropDownLists with long items.


```dojo
<div id="div">
    <select id="ddl">
        <option>lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum</option>
        <option>item 2</option>
        <option>item 3</option>
    </select>
</div>
<script>
    $("#ddl").kendoDropDownList().parent().css("width", "100%");
</script>
<style>
html { font: 12px sans-serif; }

#div { width: 300px; }

.k-list-container .k-item {
    white-space: nowrap;
    float: left;
    clear: left;
    min-width: 100%;
    box-sizing: border-box;
}
</style>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
