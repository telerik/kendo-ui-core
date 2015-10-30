---
title: Underline Matched Search
page_title: Underline Matched Search | Kendo UI ComboBox Widget
description: "Learn how to underline a matched input field search in the Kendo UI ComboBox widget."
slug: howto_underline_matched_search_combobox
position: 18
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

Other Kendo UI ComboBox how-to examples:

* [Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Prevent POST on ENTER Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [Open ComboBox When `onfocus` is Triggered]({% slug howto_open_onfocus_combobox %})
* [Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Select Items on TAB]({% slug howto_select_items_ontab_combobox %})
* [Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})