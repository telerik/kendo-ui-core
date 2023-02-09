---
title: Blur the ComboBox after Selection
page_title: Blur the ComboBox after Selection
description: "Learn how to blur the input in a Kendo UI ComboBox after an option has been selected."
previous_url: /controls/editors/combobox/how-to/blur-on-select, /controls/editors/combobox/how-to/customize/blur-on-select
slug: howto_blur_after_select_combobox
tags: telerik, kendo, jquery, combobox, blur, after, selection
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

How can I blur the input in a Kendo UI ComboBox after an option has been selected?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
  <div id="example">
    <div class="demo-section k-header">
      <h4>ComboBox</h4>
      <input id="combobox" style="width: 400px;"/>
    </div>
    <script>
      $(document).ready(function() {
        function onSelect(e) {
          //blur input
          this.input.blur();
        };

        var data = [
          { text: "Item 1", value:"1" },
          { text: "Item 2", value:"2" },
          { text: "Item 3", value:"3" }
        ];

        $("#combobox").kendoComboBox({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          select: onSelect
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
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
