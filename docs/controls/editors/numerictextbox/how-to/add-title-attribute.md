---
title: Add Title Attribute
page_title: Add Title Attribute | Kendo UI NumericTextBox
description: "Learn how to add a title attribute in the Kendo UI NumericTextBox widget."
slug: howto_add_title_attribute_numerictextbox
---

# Add Title Attribute

The example below demonstrates how to add a title attribute to the input element of Kendo UI NumericTextBox.

###### Example

```html
<input id="numerictextbox" value="10" title="this is the numerictextbox title"/>
<script>
  $(function() {
    var widget = $("#numerictextbox").kendoNumericTextBox().data("kendoNumericTextBox");

    widget.wrapper
          .find(".k-formatted-value")
          .attr("title", widget.element.attr("title"));
  });
</script>
```

## See Also

Other articles on Kendo UI NumericTextBox:

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Focus Widget on Label Click]({% slug howto_focus_widgeton_label_click_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Update Value on Keyup]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %})
* [How to Update Value on Spin]({% slug howto_update_valueon_spin_angularjs_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
