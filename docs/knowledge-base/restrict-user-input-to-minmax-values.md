---
title: Restrict the DatePicker User Input to Min/Max Values
page_title: Restrict the DatePicker User Input to Min/Max Values
description: "Learn how to restrict user input by applying minimum and maximum values in the Kendo UI DatePicker widget."
slug: howto_restrict_user_input_minandmax_values_datepicker
previous_url: /controls/editors/datepicker/how-to/restrict-user-input-to-minmax-values
tags: kendo, jquery, datepicker, restrict, user, input, to, minimum, maximum, values
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

How can I restrict user input in the Kendo UI for jQuery DatePicker to minimum or maximum values?

## Solution

The following example demonstrates how to restrict user input to minimum or maximum values that are set through the widget configuration.

```dojo
    <input id="DOB" />
  	<script>
      $(function() {
        $("#DOB").kendoDatePicker({
          format: "dd/MM/yyyy",
          value: new Date(2020, 10, 04),
          min: new Date(2000, 10, 10),
          max: new Date(2020, 10, 10),
          change: onDOBChange
        });
      });
    </script>

    <script>
        function onDOBChange(e) {
            var dt = e.sender;
          	var value = dt.value();

          	if (value === null) {
              value = kendo.parseDate(dt.element.val(), dt.options.parseFormats);
            }

            if (value < dt.min()) {
                dt.value(dt.min());
            }else if (value > dt.max()) {
                dt.value(dt.max());
            }
        }
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
