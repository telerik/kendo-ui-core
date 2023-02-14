---
title: Detect Wrapper focus Events in the DropDownList
page_title: Detect Wrapper focus Events in the DropDownList
description: "Learn how to detect the Kendo UI DropDownList wrapper focus event."
previous_url: /controls/editors/dropdownlist/how-to/detect-wrapper-focus-event, /controls/editors/dropdownlist/how-to/event-handling/detect-wrapper-focus-event
slug: howto_detect_wrapper_focus_events_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, detect, wrapper, focus, events
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

How can I detect the `focus` event of the Kendo UI DropDownList wrapper?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
  <input id="ddl1" class="ddl" />
  <input id="ddl2" class="ddl" />
  <input id="ddl3" class="ddl" />
  <input id="ddl4" class="ddl" />

  <script>
    $(function() {
      $(".ddl").kendoDropDownList();

      $(".ddl").on("focus", function() {
        console.log("focus");
      });
    });
  </script>
```

## See Also

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
