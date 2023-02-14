---
title: Show Out-of-Range DatePicker Dates as Disabled
page_title: Show Out-of-Range DatePicker Dates as Disabled
description: "Learn how to show dates that are out of range in a disabled style in the Kendo UI datePicker widget."
slug: howto_show_outofrange_dates_disabled_datepicker
previous_url: /controls/editors/datepicker/how-to/show-out-of-range-dates-in-disabled-style
tags: kendo, jquery, datepicker, show, out, of, range, dates, as, disabled, inactive
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

How can I show the dates that are out of the min-max range as disabled in the Kendo UI for jQuery DatePicker?

## Solution

The following example demonstrates how to show the dates that are out of the min-max range as disabled by using the `k-disabled` class.

```dojo
    <input id="datepicker" style="width:200px;" />
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker({
          value: new Date(2014, 10, 20),
          min: new Date(2014, 10, 10),
          max: new Date(2014, 11, 10),
          month: {
            empty: '<span class="k-disabled">#= data.value #</span>'
          }
        });
      });
    </script>
```

## See Also

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug masks_kendoui_maskedtextbox_widget %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Default Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Read-Only]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
