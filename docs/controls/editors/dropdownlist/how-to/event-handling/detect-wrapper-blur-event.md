---
title: Detect Wrapper blur Events
page_title: Detect Wrapper blur Events | Kendo UI DropDownList
description: "Learn how to detect the blur event of the Kendo UI DropDownList wrapper."
previous_url: /controls/editors/dropdownlist/how-to/detect-wrapper-blur-event
slug: howto_detect_wrapper_blur_events_dropdownlist
---

# Detect Wrapper blur Events

The following example demonstrates how to detect the `blur` event of the Kendo UI DropDownList wrapper.

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
          $(".console").append("<p>event: open</p>");
        };

        function onClose() {
          $(".console").append("<p>event: close</p>");
        };

        function onChange() {
          $(".console").append("<p>event: change</p>");
        };

        function onSelect(e) {
          var dataItem = this.dataItem(e.item.index());
          $(".console").append("<p>event: select (" + dataItem.text + " : " + dataItem.value + ")</p>");
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
          $(".console").append("<p>event: wrapper blur</p>");
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

Other articles on the Kendo UI DropDownList:

* [DropDownList JavaScript API Reference](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
* [How to Validate DropDownLists by Using Required Attributes]({% slug howto_validate_using_required_attributes_dropdownlist %})

For more runnable examples on the Kendo UI DropDownList, browse its [**How To** documentation folder]({% slug howto_cascade_withngrepeat_distinct_values_dropdownlist %}).
