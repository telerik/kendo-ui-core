---
title: Resize the DatePicker Calendar Based on Input Width
page_title: Resize the DatePicker Calendar Based on Input Width
description: "Learn how to resize the nested calendar based on the width of the input element of the Kendo UI DatePicker widget."
slug: howto_use_resize_calendar_basedon_input_width_datepicker
previous_url: /controls/editors/datepicker/how-to/resize-calendar-based-on-input-width
tags: kendo, jquery, datepicker, resise, calendar, based, on, input, width
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

How can I resize the nested Kendo UI Calendar based on the width of the DatePicker input element?

## Solution

The following example demonstrates how to achieve the desired scenario.

```dojo
    <div id="example">
      <div id="email-settings">
        <input id="datepicker" value="10/10/2011" style="width:140px;" />
        <input id="monthpicker" value="November 2011" style="width:180px" />
      </div>
      <script>
        $(document).ready(function() {
          // create DatePicker from input HTML element
          $("#datepicker").kendoDatePicker({
            open: function() {
              var calendar = this.dateView.calendar;

              calendar.wrapper.width(this.wrapper.width() - 6);
            }
          });

          $("#monthpicker").kendoDatePicker({
            // defines the start view
            start: "year",

            // defines when the calendar should return date
            depth: "year",

            // display month and year in the input
            format: "MMMM yyyy",
            open: function() {
              var calendar = this.dateView.calendar;

              calendar.wrapper.width(this.wrapper.width() - 6);
            }
          });
        });
      </script>
      <style scoped>
        #example h2 {
          font-weight: normal;
        }
        #email-settings {
          height: 135px;
          width: 595px;
          background: url('../content/web/datepicker/mailSettings.png') transparent no-repeat 0 0;
        }
        
        .k-calendar {
          overflow-x: scroll;
        }
      </style>
    </div>
```

## See Also

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug masks_kendoui_maskedtextbox_widget %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Default Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Read-Only]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
