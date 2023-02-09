---
title: Focus the NumericTextBox on Label Click
page_title: Focus the NumericTextBox on Label Click
description: "Learn how to focus the Kendo UI NumericTextBox widget when the label element is clicked."
slug: howto_focus_widgeton_label_click_numerictextbox
previous_url: /controls/editors/numerictextbox/how-to/focus-on-label-click
tags: telerik, kendo, jquery, numerictextbox, focus, on, label, click
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

How can I focus the Kendo UI for jQuery NumericTextBox when the `label` element is clicked?

## Solution

The following example demonstrates how to achieve the desired scenario.



```dojo
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

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
