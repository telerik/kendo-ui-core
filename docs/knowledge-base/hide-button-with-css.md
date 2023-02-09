---
title: Hide the Default DatePicker Button
page_title: Hide the Default DatePicker Button
description: "Learn how to hide the default widget button in the Kendo UI DatePicker."
slug: howto_hide_default_button_datepicker
previous_url: /controls/editors/datepicker/how-to/hide-button-with-css
tags: kendo, jquery, datepicker, hide, default, button, with, css
component: datepicker
type: how-to
res_type: kb
---

## Environment

<table>
 <tr>
  <td>Product</td>
  <td>Progress® Kendo UI® DatePicker for jQuery</td>
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

How can I hide the default button of the DatePicker in the Kendo UI for jQuery DatePicker?

## Solution

The following example demonstrates how to hide the default button of the DatePicker by using CSS.

```dojo
    <input id="datepicker" value="10/10/2011" style="width:150px;" />
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker();
      });
    </script>
    <style>
      .k-datepicker .k-button {
        display: none;
      }
    </style>
```

## See Also

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug masks_kendoui_maskedtextbox_widget %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Read-Only]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
