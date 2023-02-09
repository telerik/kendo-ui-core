---
title: Underline Matched Searches in the ComboBox
page_title: Underline Matched ComboBox Searches
description: "Learn how to underline a matched input-field search in a Kendo UI ComboBox widget."
previous_url: /controls/editors/combobox/how-to/underline-matched-search, /controls/editors/combobox/how-to/appearance/underline-matched-search
slug: howto_underline_matched_search_combobox
tags: telerik, kendo, jquery, combobox, underline, matched, searches
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

How can I underline a matched input-field search in a Kendo UI ComboBox?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
<input id="fabric" placeholder="Select fabric..." />
<script>
  function formatValue(value, text) {
    var textMatcher = new RegExp(text, "ig");

    return value.replace(textMatcher, function(match) {
      return "<u>" + match + "</u>";
    });
  }

  $(document).ready(function() {
    // create ComboBox from input HTML element
    var combo = $("#fabric").kendoComboBox({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: [
        { text: "Cotton", value: "1" },
        { text: "Polyester", value: "2" },
        { text: "Cotton/Polyester", value: "3" },
        { text: "Rib Knit", value: "4" }
      ],
      filter: "contains",
      suggest: true
    }).data("kendoComboBox");

    combo.setOptions({
      template: $.proxy(kendo.template("#= formatValue(text, this.text()) #"), combo)
    });
  });
</script>
```

## See Also

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onFocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
