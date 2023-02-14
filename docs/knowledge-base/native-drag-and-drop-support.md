---
title: Search for ComboBox Items by Dragging to Input
page_title: Search for ComboBox Items by Dragging to Input
description: "Learn how to support the search for an external item by dragging it to the input field of a Kendo UI ComboBox widget."
previous_url: /controls/editors/combobox/how-to/native-drag-and-drop-support, /controls/editors/combobox/how-to/filtering/native-drag-and-drop-support
slug: howto_search_items_dragging_toinput_combobox
tags: telerik, kendo, jquery, combobox, search, for, items, by, dragging, to, input
component: combobox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® ComboBox for jQuery</td>
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

How can I make a read-only text visible in the input field of a Kendo UI ComboBox widget?

## Solution

The following example demonstrates how to achieve the desired scenario.

To see how the example works:

1. Select `Chai` from the `Drag: Chai` field.

1. Drag it to the input field of the ComboBox.

1. Release the mouse.


```dojo
  <div id="example">
    <div class="demo-section k-header">
      <h4>Products</h4>
      <div> Drag: Chai </div>
      <input id="products" style="width: 400px" />
    </div>
    <script>
      $(document).ready(function() {
        $("#products").kendoComboBox({
          placeholder: "Select product",
          dataTextField: "ProductName",
          dataValueField: "ProductID",
          filter: "contains",
          autoBind: false,
          minLength: 3,
          dataSource: {
            type: "odata",
            serverFiltering: true,
            transport: {
              read: {
                url: "https://demos.telerik.com/kendo-ui/service/Northwind.svc/Products",
              }
            }
          }
        });

        //Wire the drop event
        var combobox = $("#products").data("kendoComboBox");

        combobox.input.on("drop", function(e) {
          var input = e.currentTarget;
          var droppedText = e.originalEvent.dataTransfer.getData("text");

          setTimeout(function() {
            input.value = droppedText;
            combobox.search(droppedText);
          });
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

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
