---
title: Make Visible ComboBox Inputs Read-Only
page_title: Make Visible ComboBox Inputs Read-Only
description: "Learn how to make a visible input read-only in the Kendo UI ComboBox widget."
previous_url: /controls/editors/combobox/how-to/readonly-visible-input, /controls/editors/combobox/how-to/customize/readonly-visible-input
slug: howto_make_visible_inputs_readonly_combobox
tags: telerik, kendo, jquery, combobox, make, visible, inputs, read, only
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

How can I make a visible input of a Kendo UI ComboBox read-only?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
<div id="example" role="application">
<form>
  <h4>T-shirt Fabric</h4>
  <input id="fabric" placeholder="Select fabric..." />
</form>
<script>
  $(document).ready(function() {
    // create ComboBox from input HTML element
    $("#fabric").kendoComboBox({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
        { text: "Cotton", value: "1" },
        { text: "Polyester", value: "2" },
        { text: "Cotton/Polyester", value: "3" },
        { text: "Rib Knit", value: "4" }
      ],
      filter: "contains",
      suggest: true,
      index: 3
    });

    var fabric = $("#fabric").data("kendoComboBox");

    fabric.input.attr("readonly", true)
    .on("keydown", function(e) {
      if (e.keyCode === 8) {
        e.preventDefault();
      }
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
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
