---
title: Focus Widget on Label Click
page_title: Focus Widget on Label Click | Kendo UI NumericTextBox
description: "Learn how to focus the Kendo UI NumericTextBox widget when the label element is clicked."
slug: howto_focus_widgeton_label_click_numerictextbox
---

# Focus Widget on Label Click

The example below demonstrates how to focus the Kendo UI NumericTextBox widget when the `label` element is clicked.

###### Example

```html
<label for="numerictextbox">Number: </label>
<input id="numerictextbox" />
<script>
  $(function() {
    $("#numerictextbox").kendoNumericTextBox();

    //global click handler for all label elements
    $("label").click(function(e) {
       var label = $(this);
       var id = label.attr("for");
       var widget;

       if (id) {
           widget = kendo.widgetInstance($("#" + id), kendo.ui);

           if (widget) {
               e.preventDefault();
               widget.focus();
           }
       }
    });
  });
</script>
```

## See Also

Other articles on the Kendo UI NumericTextBox:

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})

For more runnable examples on the Kendo UI NumericTextBox, browse its [**How To** documentation folder]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %}).
