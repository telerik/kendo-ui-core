---
title: Disable DropDownList Items for Selection
page_title: Disable DropDownList Items for Selection
description: "Learn how to disable items for selection within a Kendo UI DropDownList."
previous_url: /controls/editors/dropdownlist/how-to/disable-items-for-selection, /controls/editors/dropdownlist/how-to/selection/disable-items-for-selection
slug: howto_disable_items_for_selection_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, disable, items, for, selection
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

How can I display list items in the Kendo UI for jQuery DropDownList as inactive?

## Solution

A possible approach to make items appear as disabled is to apply the `k-disabled` CSS class in a Kendo UI Template.

To prevent the future selection of disabled items, add an event handler to the [`select`](/api/javascript/ui/dropdownlist/events/select) event and call `e.preventDefault()`.



```dojo
    <input id="dropdownlist" /> <button class="k-button"> Mark Oranges as deleted</button>
    <script id="template" type="text/x-kendo-template">
    <span class="#: isDeleted ? 'k-disabled': ''#">
       #: name #
    </span>
    </script>
    <script>
      $("#dropdownlist").kendoDropDownList({
        dataSource: [
          { id: 1, name: "Apples", isDeleted: false},
          { id: 3, name: "Mangoes", isDeleted: false},
          { id: 2, name: "Oranges" , isDeleted: false}
        ],
        dataTextField: "name",
        dataValueField: "id",
        select: function(e){
          if(e.dataItem.isDeleted){
            e.preventDefault();
          }
        },
        template: kendo.template($("#template").html())
      });

      $(".k-button").click(function(){
        var dropdown = $("#dropdownlist").data("kendoDropDownList");
        var oranges = dropdown.dataSource.get(2);
        oranges.set("isDeleted", true);
      })
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
