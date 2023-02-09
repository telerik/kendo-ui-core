---
title: Make DatePicker Input Elements Read-Only
page_title: Make DatePicker Input Elements Read-Only
description: "Learn how to make input elements of the Kendo UI for jQuery DatePicker read-only."
slug: howto_make_input_elements_readonly_datepicker
previous_url: /controls/editors/datepicker/how-to/readonly-input
tags: kendo, jquery, datepicker, make, input, elements, readonly
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

How can I make an input element of the Kendo UI for jQuery DatePicker read-only and prevent the user from typing?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example">
        <div class="demo-section k-content">

            <h4>Show e-mails from:</h4>
            <input id="datepicker" value="10/10/2011" style="width: 100%" />

            <h4 style="margin-top: 2em;">Add to archive mail from:</h4>
            <input id="monthpicker" value="November 2011" style="width: 100%" />
            </p>
        </div>
    <script>
        $(document).ready(function() {
            // create the DatePicker from an input HTML element
            $("#datepicker").kendoDatePicker();

            $("#monthpicker").kendoDatePicker({
                // defines the start view
                start: "year",

                // defines when the calendar will return the date
                depth: "year",

                // display the month and year in the input
                format: "MMMM yyyy"
            });


            // DISABLE inputs
            $("#datepicker").attr("readonly", true);
            $("#monthpicker").attr("readonly", true);
        });
    </script>
    </div>

```

## See Also

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug masks_kendoui_maskedtextbox_widget %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Default Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
