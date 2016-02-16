---
title: Detect Wrapper Blur Events
page_title: Detect Wrapper Blur Events | Kendo UI DropDownList
description: "Learn how to detect the Kendo UI DropDownList wrapper blur event."
slug: howto_detect_wrapper_blur_events_dropdownlist
---

# Detect Wrapper Blur Events

The example below demonstrates how to detect the Kendo UI DropDownList wrapper blur event.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
      <h4 class="title">DropDownList</h4>
      <input id="dropdownlist" style="width: 400px;"/>
    </div>
    <div class="box">                
      <h4>Console log</h4>
      <div class="console"></div>
    </div>
    <script>
      $(document).ready(function() {
        function onOpen() {
          kendoConsole.log("event: open");
        };

        function onClose() {
          kendoConsole.log("event: close");
        };

        function onChange() {
          kendoConsole.log("event: change");
        };

        function onSelect(e) {
          if ("kendoConsole" in window) {
            var dataItem = this.dataItem(e.item.index());
            kendoConsole.log("event :: select (" + dataItem.text + " : " + dataItem.value + ")" );
          }
        };

        var data = [
          {text: "Item1", value:"1"},
          {text: "Item2", value:"2"},
          {text: "Item3", value:"3"}
        ];

        $("#dropdownlist").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          select: onSelect,
          change: onChange,
          close: onClose,
          open: onOpen
        });

        var wrapper = $("#dropdownlist").data("kendoDropDownList").wrapper;

        wrapper.blur(function() {
          kendoConsole.log("wrapper blur");
        });
      });
    </script>            
    <style scoped>
      .demo-section {
        width: 400px;
      }
    </style>   
  </div>
```

## See Also

Other articles on Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Detect Input Change Events]({% slug howto_detect_input_change_events_dropdownlist %})
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
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
