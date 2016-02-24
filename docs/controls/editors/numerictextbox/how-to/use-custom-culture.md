---
title: Use Custom Culture Script
page_title: Use Custom Culture Script | Kendo UI NumericTextBox
description: "Learn how to use a custom culture script in the Kendo UI NumericTextBox widget."
slug: howto_use_custom_culture_script_numerictextbox
---

# Use Custom Culture Script

The example below demonstrates how to extend an existing culture script, create a custom script, and use it with the Kendo UI NumericTextBox widget.

###### Example

```html
<script src="http://kendo.cdn.telerik.com/2014.3.1119/js/cultures/kendo.culture.en-GB.min.js"></script>

<div id="example">
    <input id="initial" value="10" min="1"/>
    <script>
        //extend en-GB
        var customGB = $.extend({}, kendo.culture(), {
            name: "custom-GB",
            numberFormat: {
              ",": " "
            }
        });

        //add a reference to the custom culture script
        kendo.cultures["custom-GB"] = customGB";
    </script>
    <script>
        kendo.culture("en-GB");

        $(document).ready(function() {
            $("#initial").kendoNumericTextBox({
              culture: "custom-GB" //use custom culture
            });
        });
    </script>
</div>
```

## See Also

Other articles on Kendo UI NumericTextBox:

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Add Title Attribute]({% slug howto_add_title_attribute_numerictextbox %})
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Focus Widget on Label Click]({% slug howto_focus_widgeton_label_click_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Update Value on Keyup]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %})
* [How to Update Value on Spin]({% slug howto_update_valueon_spin_angularjs_numerictextbox %})
