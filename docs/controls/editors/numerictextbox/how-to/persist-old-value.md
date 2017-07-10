---
title: Persist Old Value
page_title: Persist Old Value | Kendo UI NumericTextBox
description: "Learn how to persist the old value of the Kendo UI NumericTextBox widget."
slug: howto_persist_old_value_numerictextbox
---

# Persist Old Value

The following example demonstrates how to persist the old value of the NumericTextBox.

###### Example

```html
<div id="example">
    <div class="demo-section k-header">
        <h4>Set value</h4>
        <input id="numerictextbox"/>
    </div>
    <div class="box">
        <h4>Console log</h4>
        <div class="console"></div>
    </div>
    <script>
        $(document).ready(function() {
            var old = ""; //variable that persists the old value

            function onChange() {
                $(".console").append("<p>Change :: " + this.value() + ", old: " + old + "<p>");
                old = this.value(); //get value of the widget
            }

            $("#numerictextbox").kendoNumericTextBox({
                change: onChange
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

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})

For more runnable examples on the Kendo UI NumericTextBox, browse its [**How To** documentation folder]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %}).
