---
title: Underline Matched Search
page_title: Underline Matched Search | Kendo UI ComboBox
description: "Learn how to underline a matched input field search in the Kendo UI ComboBox widget."
slug: howto_underline_matched_search_combobox
---

# Underline Matched Search

The example below demonstrates how to underline a matched input field search in the Kendo UI ComboBox widget.

###### Example

```html
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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
