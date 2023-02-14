---
title: Detect Input change Events in the DropDownList
page_title: Detect Input change Events in the DropDownList
description: "Learn how to detect the Kendo UI DropDownList input change event."
previous_url: /controls/editors/dropdownlist/how-to/detect-input-change-event, /controls/editors/dropdownlist/how-to/event-handling/detect-input-change-event
slug: howto_detect_input_change_events_dropdownlist
tags: telerik, kendo, jquery, dropdownlist, detect, input, change, events
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

The `change` event of the DropDownList fires when the value of the widget is changed by the user. How can I detect changes in the input of the Kendo UI DropDownList?

## Solution

The following example demonstrates how to achieve the desired scenario.



```dojo
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
        function widgetChange(е) {
          var value = this.value();
          $(".console").append("<p>event: change (widget) -- selected value: " + value + "</p>");
        };

        function inputChange() {
          var val = $("#dropdownlist").val()
          $(".console").append("<p>event: change (input)-- selected value: " + val + "</p>");
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
          change: widgetChange
        });

        $("#dropdownlist").change(inputChange);
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

* [JavaScript API Reference of the DropDownList](/api/javascript/ui/dropdownlist)
* [How to Automatically Adjust the Width of a DropDownList]({% slug howto_automatically_adjust_width_dropdownlist %})
* [How to Create DropDownLists with Long Items]({% slug howto_create_listswith_long_items_dropdownlist %})
* [How to Detect Wrapper Focus Events]({% slug howto_detect_wrapper_focus_events_dropdownlist %})
* [How to Move the Group Label on Top of Items]({% slug howto_move_group_label_ontopof_items_dropdownlist %})
* [How to Prevent Popup Closure on Scroll]({% slug howto_prevent_popup_closure_onscroll_dropdownlist %})
* [How to Remove Items]({% slug howto_remove_items_dropdownlist %})
* [How to Set DataSource Dynamically]({% slug howto_set_datasource_dynamically_dropdownlist %})
* [How to Update MVVM Bound Models on Load]({% slug howto_update_mvvm_model_onload_dropdownlist %})
