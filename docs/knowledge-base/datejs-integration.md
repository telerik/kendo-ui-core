---
title: Integrate the DatePicker with the DateJS Library
page_title: Integrate the DatePicker with the DateJS Library
description: "Learn how to integrate the Kendo UI DatePicker widget with the DateJS library and use its syntactic sugar."
slug: howto_integrate_withdatejs_library_datepicker
previous_url: /controls/editors/datepicker/how-to/datejs-integration
tags: kendo, jquery, datepicker, integrate, with, datejs, library
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

How can I integrate the Kendo UI for jQuery DatePicker with DateJS?

## Solution

The following example demonstrates how to integrate the DatePicker with DateJS and use its syntactic sugar.

```dojo
    <div id="email-settings">
        <div class="display-picker">
            <input id="datepicker" placeholder="type 'next friday'" style="width:150px;" />
        </div>
        <div class="archive-picker">
            <input id="monthpicker" value="November 2011" style="width:150px" />
        </div>
        <p>Integration with the <a target="_blank" href="http://www.datejs.com/">DateJS</a> library</p>
    </div>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/datejs/1.0/date.min.js"></script>
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

            // parse the input value on blur by using DateJS
            $("[data-role=datepicker]").on("blur", function() {
                var element = $(this);
                var widget = element.data("kendoDatePicker");

                if (element.val()) {
                  widget.value(Date.parse(element.val()));
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
* [How to Make Input Elements Read-Only]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
