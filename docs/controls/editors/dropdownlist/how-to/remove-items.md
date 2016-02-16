---
title: Remove Items
page_title: Remove Items | Kendo UI DropDownList
description: "Learn how to remove items from a Kendo UI DropDownList widget."
slug: howto_remove_items_dropdownlist
---

# Remove Items

The example below demonstrates how to remove items from a Kendo UI DropDownList.

###### Example

```html
  <div id="example">
    <div id="cap-view" class="demo-section k-header">
      <h2>Customize your Kendo Cap</h2>
      <div id="cap" class="black-cap"></div>
      <div id="options">

        <input id="color" />
        <button class="k-button" id="remove">Remove items</button>
      </div>
    </div>
    <style scoped>
      .demo-section {
        width: 460px;
        height: 300px;
      }
      .demo-section h2 {
        text-transform: uppercase;
        font-size: 1em;
        margin-bottom: 30px;
      }
      #cap {
        float: left;
        width: 242px;
        height: 225px;
        margin: 20px 30px 30px 0;
        background-image: url('../content/web/dropdownlist/cap.png');
        background-repeat: no-repeat;
        background-color: transparent;
      }
      .black-cap {
        background-position: 0 0;
      }
      .grey-cap {
        background-position: 0 -225px;
      }
      .orange-cap {
        background-position: 0 -450px;
      }
      #options {
        padding: 1px 0 30px 30px;
      }
      #options h3 {
        font-size: 1em;
        font-weight: bold;
        margin: 25px 0 8px 0;
      }
      #get {
        margin-top: 25px;
      }
    </style>

    <script>
      $(document).ready(function() {
        var data = [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ];

        // create DropDownList from input HTML element
        $("#color").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data
        });

        $("#remove").click(function() {
          var ddl =  $("#color").data("kendoDropDownList");

          var oldData = ddl.dataSource.data();

          ddl.dataSource.remove(oldData[0]); //remove first item
          ddl.dataSource.remove(oldData[oldData.length - 1]); //remove last item
        });
      });
    </script>
  </div>
```

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
* [How to Detect Wrapper Blur Events]({% slug howto_detect_wrapper_blur_events_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Cascade DropDownLists Using `ng-repeat`]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Cascade from Multiple Parents]({% slug howto_cascade_multiple_parents_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Preselect Items]({% slug howto_preselect_items_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
