---
title: Select the Focused NumericTextBox Text
page_title: Select the Whole NumericTextBox Text on Focus
description: "Learn how to select all the text when on focus in the Kendo UI NumericTextBox widget."
previous_url: /aspmvc/web/numerictextbox/how-to/select-all-on-focus, /asp-mvc/web/numerictextbox/how-to/select-all-on-focus, /controls/editors/numerictextbox/how-to/select-all-on-focus
slug: howto_select_all_texton_focus_numerictextbox
tags: telerik, kendo, jquery, numerictextbox, select, all, text, when, on, focus
component: numerictextbox
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® NumericTextBox for jQuery</td>
 </tr>
 <tr>
  <td>Operating System</td>
  <td>Windows 10 64bit</td>
 </tr>
 <tr>
  <td>Visual Studio version</td>
  <td>Visual Studio 2017</td>
 </tr>
 <tr>
  <td>Preferred Language</td>
  <td>JavaScript</td>
 </tr>
</table>

## Description

How can I select the whole input value when on focus in the Kendo UI for jQuery NumericTextBox?

## Solution

> As of the 2020 R3 release, selecting the whole NumericTextBox input value on `focus` is available out of the box. For more information, refer to the [`selectOnFocus`](/api/javascript/ui/numerictextbox/configuration/selectonfocus) property.

The following example demonstrates how to achieve the desired scenario.



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
