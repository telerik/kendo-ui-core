---
title: Globally Modify Default DatePicker Options
page_title: Globally Modify Default DatePicker Options
description: "Learn how to globally modify default options in the Kendo UI DatePicker widget."
slug: howto_globally_modify_default_options_datepicker
previous_url: /controls/editors/datepicker/how-to/modify-default-options-globally
tags: kendo, jquery, datepicker, modify, default, options, globally
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

How can I globally modify the default options in the Kendo UI for jQuery DatePicker?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <input id="datepicker" value="10/10/2011" style="width:150px;" />
    <br />
    <br />
    <input id="monthpicker" value="November 2011" style="width:150px" />
    <script>
      kendo.ui.DatePicker.fn.options.parseFormats = ["MMMM yyyy"];
    </script>
    <script>
      $(document).ready(function() {
        // create the DatePicker from an input HTML element
        var datepicker = $("#datepicker").kendoDatePicker().getKendoDatePicker();

        $("#monthpicker").kendoDatePicker({
          // defines the start view
          start: "year",

          // defines when the calendar will return the date
          depth: "year",

          // display the month and year in the input
          format: "MMMM yyyy"
        });
        console.log(datepicker.options.parseFormats); // display the set options
      });
    </script>
```

## See Also

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug masks_kendoui_maskedtextbox_widget %})
* [How to Hide the Default Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Read-Only]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
