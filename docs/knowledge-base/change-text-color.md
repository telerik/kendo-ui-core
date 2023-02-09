---
title: Change the Text Color of the NumericTextBox
page_title: Change the Text Color of the NumericTextBox
description: "Learn how to change the text color in the Kendo UI NumericTextBox widget."
slug: howto_change_text_color_numerictextbox
previous_url: /controls/editors/numerictextbox/how-to/change-text-color
tags: telerik, kendo, jquery, numerictextbox, change, text, color
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

How can I change the color of a Kendo UI for jQuery NumericTextBox value?

## Solution

The following example demonstrates how to achieve the desired scenario.



```dojo
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

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
