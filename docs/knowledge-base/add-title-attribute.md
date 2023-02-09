---
title: Add a Title Attribute in the NumericTextBox
page_title: Add a Title Attribute in the NumericTextBox
description: "Learn how to add a title attribute in the Kendo UI NumericTextBox widget."
slug: howto_add_title_attribute_numerictextbox
previous_url: /controls/editors/numerictextbox/how-to/add-title-attribute
tags: telerik, kendo, jquery, numerictextbox, add, title, attribute
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

How can I  add a `title` attribute to the input element of the Kendo UI for jQuery NumericTextBox?

## Solution

The following example demonstrates how to achieve the desired scenario.


```dojo
<input id="numerictextbox" value="10" title="this is the numerictextbox title"/>
<script>
  $(function() {
    var widget = $("#numerictextbox").kendoNumericTextBox().data("kendoNumericTextBox");

    widget.wrapper
          .find(".k-formatted-value")
          .attr("title", widget.element.attr("title"));
  });
</script>
```

## See Also

* [NumericTextBox JavaScript API Reference](/api/javascript/ui/numerictextbox)
* [How to Change Text Color]({% slug howto_change_text_color_numerictextbox %})
* [How to Persist Old Value]({% slug howto_persist_old_value_numerictextbox %})
* [How to Select All Text on Focus]({% slug howto_select_all_texton_focus_numerictextbox %})
* [How to Use Custom Culture Script]({% slug howto_use_custom_culture_script_numerictextbox %})
