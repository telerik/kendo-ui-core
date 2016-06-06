---
title: Make Visible Inputs Readonly
page_title: Make Visible Inputs Readonly | Kendo UI ComboBox
description: "Learn how to make a visible input readonly in the Kendo UI ComboBox widget."
slug: howto_make_visible_inputs_readonly_combobox
---

# Make Visible Inputs Readonly

The example below demonstrates how to make a visible input to the Kendo UI ComboBox readonly.

###### Example

```html
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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
