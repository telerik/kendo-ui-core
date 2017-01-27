---
title: Select All Text on Focus
page_title: Select All Text on Focus | Kendo UI NumericTextBox
description: "Learn how to select all the text when on focus in the Kendo UI NumericTextBox widget."
previous_url: /aspmvc/web/numerictextbox/how-to/select-all-on-focus, /asp-mvc/web/numerictextbox/how-to/select-all-on-focus
slug: howto_select_all_texton_focus_numerictextbox
---

# Select All Text on Focus

The example below demonstrates how to select the whole input value on focus in the Kendo UI NumericTextBox widget.

###### Example

```html
<input id="numeric" type="number" value="17" min="0" max="100" step="1" />
<script type="text/javascript">
$(function () {
	$("input").kendoNumericTextBox();

    //wire focus of all numerictextbox widgets on the page
    $("input[type=text]").bind("focus", function () {
        var input = $(this);
            clearTimeout(input.data("selectTimeId")); //stop started time out if any

            var selectTimeId = setTimeout(function()  {
                input.select();
            });

            input.data("selectTimeId", selectTimeId);
        }).blur(function(e) {
            clearTimeout($(this).data("selectTimeId")); //stop started timeout
        });
    })
</script>
```

## See Also

Other articles on the Kendo UI NumericTextBox:

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})

For more runnable examples on the Kendo UI NumericTextBox, browse its [**How To** documentation folder]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %}).
