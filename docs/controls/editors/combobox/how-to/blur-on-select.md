---
title: Blur the ComboBox after Select
page_title: Blur the ComboBox after Select | Kendo UI ComboBox
description: "Learn how to blur the Kendo UI ComboBox after it has been selected."
slug: howto_blur_after_select_combobox
---

#  Blur the ComboBox after Select

The example below demonstrates how to blur the ComboBox after select.

###### Example

```html
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

Other articles on the Kendo UI ComboBox:

* [ComboBox JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Define Virtual Configuration Declaratively]({% slug howto_define_virtual_option_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Open ComboBox When onfocus is Triggered]({% slug howto_open_onfocus_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Select Items on Tab]({% slug howto_select_items_ontab_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})

For more runnable examples on the Kendo UI ComboBox, check its [how-to articles]({% slug howto_define_virtual_option_combobox %}).
