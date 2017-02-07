---
title: Detect Wrapper focus Events
page_title: Detect Wrapper focus Events | Kendo UI DropDownList
description: "Learn how to detect the Kendo UI DropDownList wrapper focus event."
previous_url: /controls/editors/dropdownlist/how-to/detect-wrapper-focus-event
slug: howto_detect_wrapper_focus_events_dropdownlist
---

# Detect Wrapper focus Events

The following example demonstrates how to detect the `focus` event of the Kendo UI DropDownList wrapper.

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
        console.log("focus");
      });
    });
  </script>
```

## See Also

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
