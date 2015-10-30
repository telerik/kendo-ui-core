---
title: Blur the ComboBox after Select
page_title: Blur the ComboBox after Select | Kendo UI ComboBox Widget
description: "Learn how to blur the Kendo UI ComboBox after it has been selected."
slug: howto_blur_after_select_combobox
position: 2
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

Other Kendo UI ComboBox how-to examples:

* [Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Prevent POST on ENTER Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [Open ComboBox When `onfocus` is Triggered]({% slug howto_open_onfocus_combobox %})
* [Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Select Items on TAB]({% slug howto_select_items_ontab_combobox %})
* [Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})