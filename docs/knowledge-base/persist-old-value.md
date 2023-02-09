---
title: Persist the Old NumericTextBox Value
page_title: Persist the Old NumericTextBox Value
description: "Learn how to persist the old value of the Kendo UI NumericTextBox widget."
slug: howto_persist_old_value_numerictextbox
previous_url: /controls/editors/numerictextbox/how-to/persist-old-value
tags: telerik, kendo, jquery, numerictextbox, persist, old, values
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

How can I persist the old value of the Kendo UI for jQuery NumericTextBox?

## Solution

The following example demonstrates how to achieve the desired scenario.



```dojo
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
