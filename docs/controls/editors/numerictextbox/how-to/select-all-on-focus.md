---
title: Select All Text on Focus
page_title: Select All Text on Focus | Kendo UI NumericTextBox
description: "Learn how to select all the text when on focus in the Kendo UI NumericTextBox widget."
previous_url: /aspmvc/web/numerictextbox/how-to/select-all-on-focus, /asp-mvc/web/numerictextbox/how-to/select-all-on-focus
slug: howto_select_all_texton_focus_numerictextbox
---

# Select All Text on Focus

The following example demonstrates how to select the whole NumericTextBox input value on `focus`.

###### Example

```dojo
<input id="numeric" type="number" value="17" min="0" max="100" step="1" />
<script type="text/javascript">
$(function () {
	$("input").kendoNumericTextBox();

    //wire focus of all numerictextbox widgets on the page
    $("input[type=text]").on("focus", function () {
        var input = $(this);
            clearTimeout(input.data("selectTimeId")); //stop started time out if any

            var selectTimeId = setTimeout(function()  {
                input.select();
                // To make this work on iOS, too, replace the above line with the following one. Discussed in https://stackoverflow.com/q/3272089
                // input[0].setSelectionRange(0, 9999);
            });

            input.data("selectTimeId", selectTimeId);
        }).blur(function(e) {
            clearTimeout($(this).data("selectTimeId")); //stop started timeout
        });
    })
</script>
```

## See Also

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})

For more runnable examples on the Kendo UI NumericTextBox, browse its [**How To** documentation folder]({% slug howto_update_valueon_keyup_angularjs_numerictextbox %}).
