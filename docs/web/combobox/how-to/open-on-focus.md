---
title: Open ComboBox When `onfocus` is Triggered
page_title: Open ComboBox When `onfocus` is Triggered | Kendo UI ComboBox Widget
description: "Learn how to make the Kendo UI ComboBox widget open when the `onfocus` event is triggered by the user."
slug: howto_open_onfocus_combobox
---

# Open ComboBox When `onfocus` is Triggered

The example below demonstrates how to make the dropdown list of a ComboBox open when users trigger the `onfocus` event. 

#### Example:

```html
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

Other articles on Kendo UI ComboBox:

* [JavaScript API Reference](/api/javascript/ui/combobox)
* [How to Add Option Label Manually]({% slug howto_add_option_label_manually_combobox %})
* [How to Initialize ComboBox with Templates]({% slug howto_declaratively_initialize_with_templates_combobox %})
* [How to Prevent Adding Custom Values]({% slug howto_prevent_adding_custom_values_combobox %})
* [How to Prevent POST on ENTER Key Press]({% slug howto_prevent_post_onpressing_enter_combobox %})
* [How to Detect When All Widgets Are Bound]({% slug howto_detect_when_widgets_bound_combobox %})
* [How to Bypass Boundary Detection]({% slug howto_bypass_boudary_detection_combobox %})
* [How to Make Visible Input Readonly]({% slug howto_make_visible_inputs_readonly_combobox %})
* [How to Search for Items by Dragging to Input]({% slug howto_search_items_dragging_toinput_combobox %})
* [How to Underline Matched Search]({% slug howto_underline_matched_search_combobox %})
* [How to Clear Filter on Open]({% slug howto_clear_filter_open_combobox %})
* [How to Configure Deferred Value Binding]({% slug howto_configure_deffered_value_binding_combobox %})
* [How to Expand Background of Long List Items]({% slug howto_expand_background_longlist_items_combobox %})
* [How to Expand ComboBox Located in Bootstrap Layout]({% slug howto_expand_widget_bootstrap_widget_combobox %})
* [How to Implement Cascading with Local Data]({% slug howto_implement_cascading_local_data_combobox %})
* [How to Select Items on TAB]({% slug howto_select_items_ontab_combobox %})
* [How to Blur the ComboBox after Select]({% slug howto_blur_after_select_combobox %})
* [How to Disable Child Cascading ComboBoxes]({% slug howto_disable_child_cascading_combobox %})