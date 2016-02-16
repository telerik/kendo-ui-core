---
title: Change Text Color
page_title: Change Text Color | Kendo UI NumericTextBox
description: "Learn how to change the text color in the Kendo UI NumericTextBox widget."
slug: howto_change_text_color_numerictextbox
---

# Change Text Color

The example below demonstrates how to change the color of Kendo UI NumericTextBox value.

###### Example

```html
<input id="numeric" value="10" />
<script>
$(function() {
    var widget = $("#numeric").kendoNumericTextBox().data("kendoNumericTextBox");

    //find the wrapper of the widget
    //get all input elements, as the widget creates two - for formatted value and real value
    //set text color

    widget.wrapper.find("input").css("color", "red");
});
</script>
```

## See Also

Other articles on Kendo UI NumericTextBox:

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Add Title Attribute]({% slug howto_add_title_attribute_numerictextbox %})
* [How to Focus Widget on Label Click]({% slug howto_focus_widgeton_label_click_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Update Value on Keyup]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %})
* [How to Update Value on Spin]({% slug howto_update_valueon_spin_angularjs_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
