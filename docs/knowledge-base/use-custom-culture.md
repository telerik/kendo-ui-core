---
title: Use Custom Culture Script in the NumericTextBox
page_title: Use Custom Culture Script in the NumericTextBox
description: "Learn how to use a custom culture script in the Kendo UI NumericTextBox widget."
slug: howto_use_custom_culture_script_numerictextbox
previous_url: /controls/editors/numerictextbox/how-to/use-custom-culture
tags: telerik, kendo, jquery, numerictextbox, use, custom, culture, script
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

How can I use a custom culture script in the Kendo UI for jQuery NumericTextBox?

## Solution

The following example demonstrates how to extend an existing culture script, create a custom script, and use it with the NumericTextBox.



```dojo
<script src="https://kendo.cdn.telerik.com/{{ site.cdnVersion }}/js/cultures/kendo.culture.en-GB.min.js"></script>

<div id="example">
    <input id="initial" value="10" min="1"/>
    <script>
        //extend en-GB
        var customGB = $.extend(true, {}, kendo.culture(), {
            name: "custom-GB",
            numberFormat: {
              ",": " "
            }
        });

        //add a reference to the custom culture script
        kendo.cultures["custom-GB"] = customGB;
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

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
