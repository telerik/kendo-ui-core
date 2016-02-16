---
title: Detect Wrapper Focus Events
page_title: Detect Wrapper Focus Events | Kendo UI DropDownList
description: "Learn how to detect the Kendo UI DropDownList wrapper focus event."
slug: howto_detect_wrapper_focus_events_dropdownlist
---

# Detect Wrapper Focus Events

The example below demonstrates how to detect the Kendo UI DropDownList wrapper focus event.

###### Example

```html
  <input id="ddl1" class="ddl" />
  <input id="ddl2" class="ddl" />
  <input id="ddl3" class="ddl" />
  <input id="ddl4" class="ddl" />

  <script>
    $(function() {
      $(".ddl").kendoDropDownList();

      $(".ddl").on("focus", function() {
        alert("focus");
      });
    });
  </script>
```

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
