---
title: Open the ComboBox When onfocus Is Triggered
page_title: Open the ComboBox When onfocus Is Triggered
description: "Learn how to make the Kendo UI ComboBox widget open when the `onfocus` event is triggered by the user."
previous_url: /controls/editors/combobox/how-to/open-on-focus, /controls/editors/combobox/how-to/customize/open-on-focus
slug: howto_open_onfocus_combobox
tags: telerik, kendo, jquery, combobox, open, when, onfocus, is, triggered
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

How can I make the dropdown list of a Kendo UI ComboBox open when the user triggers the `onfocus` event?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
  <div id="example">
    <div class="demo-section k-header">
      <h4>Fabrics</h4>
      <input id="fabric" style="width: 400px" />
    </div>
    <script>
    $(document).ready(function() {
        $("#fabric").kendoComboBox({
            dataTextField: "text",
            dataValueField: "value",
            dataSource: [
                { text: "Cotton", value: "1" },
                { text: "Polyester", value: "2" },
                { text: "Cotton/Polyester", value: "3" },
                { text: "Rib Knit", value: "4" }
            ]
        });
    });
    </script>

    <script>
      //Open on focus logic
      $(function() {
        $("[data-role=combobox]").each(function() {
          var widget = $(this).getKendoComboBox();
          widget.input.on("focus", function() {
                widget.open();
          });
        });
      });
    </script>
  </div>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
