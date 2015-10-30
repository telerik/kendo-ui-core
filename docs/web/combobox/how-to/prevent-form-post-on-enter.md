---
title: Prevent POST on ENTER Key Press
page_title: Prevent POST on ENTER Key Press | Kendo UI ComboBox Widget
description: "Learn how to prevent POST on pressing the `Enter` key in the Kendo UI ComboBox widget."
slug: howto_prevent_post_onpressing_enter_combobox
position: 15
---

# Prevent POST on ENTER Key Press

The example below demonstrates how to prevent POST on ENTER key press.

###### Example

```html
<div id="example" role="application">
  <form>
      <h4>T-shirt Fabric</h4>
      <input id="fabric" placeholder="Select fabric..." />

      <h4>T-shirt Size</h4>
      <select id="size" placeholder="Select size...">
        <option>X-Small</option>
        <option>Small</option>
        <option>Medium</option>
        <option>Large</option>
        <option>X-Large</option>
        <option>2X-Large</option>
      </select>

      <br/>
      <button class="k-button" id="get">Post</button>
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

          // create ComboBox from select HTML element
          $("#size").kendoComboBox();

          var fabric = $("#fabric").data("kendoComboBox");
          var size = $("#size").data("kendoComboBox");

          function preventPost(e) {
            if (e.keyCode === 13) {
              e.preventDefault(); 
            }
          }

          fabric.input.keydown(preventPost);
          size.input.keydown(preventPost);
      });
  </script>
</div>
```

## See Also

Other Kendo UI ComboBox how-to examples:

* [Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [Open ComboBox When `onfocus` is Triggered]({% slug howto_open_onfocus_combobox %})
* [Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})
* [Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [Select Items on TAB]({% slug howto_select_items_ontab_combobox %})
* [Underline Matched Search]({% slug howto_underline_matched_search_combobox %})