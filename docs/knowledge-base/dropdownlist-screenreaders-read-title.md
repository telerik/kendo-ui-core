---
title: How To Make Screen Readers Read Either Label Or Title Of A DropDownList
description: Learn how to make Screen Readers read label or title of a Kendo UI DropDownList.
type: how-to
page_title: Screen Readers Read Title - Kendo UI DropDownList for jQuery
slug: dropdownlist-screenreaders-read-title
tags: dropdownlist, screenreaders, title
ticketid: 1142772
res_type: kb
component: dropdownlist, combobox, multiselect
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DropDownList for jQuery</td>
 </tr>
</table>

## Description

There are several widgets (DropDownList, ComboBox, MultiSelect, NumericTextBox) which need to be placed inside a label element, as described in [Label Element Support](https://docs.telerik.com/kendo-ui/accessibility/section-508-wcag#label-element-support) help section. Still JAWS, NVDA and ChromeVox read different things, depending with which browser they are used. Some prefer reading a label, others prefer reading a title attribute instead.

How can I make Screen Readers read label or title of a Kendo UI DropDownList?

## Solution
You could add a title attribute which holds the text from the label. JAWS and NVDA would read the title, while ChromeVox reads the label.

```dojo
  <label>
    Amount:   
  </label>
  <input id="dropdownlist" title=" Title Amount"/>

  <script>
    $(function() {
        $("#dropdownlist").kendoDropDownList();
    });
  </script>
```
