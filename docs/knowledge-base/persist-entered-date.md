---
title: Persist the Entered Dates of the DatePicker
page_title: Persist the Entered Dates of the DatePicker
description: "Learn how to persist an entered date in the Kendo UI DatePicker upon user navigation between pages for Internet Explorer 9 or older."
slug: howto_persist_entered_dates_datepicker
previous_url: /controls/editors/datepicker/how-to/persist-entered-date
tags: kendo, jquery, datepicker, persist, entered, dates, and, navigation, between, pages
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

How can I persist the date that is already entered in the Kendo UI for jQuery DatePicker when the user navigates to another page and then comes back?

## Solution

The following example demonstrates how to achieve the desired scenario. While supported by default in modern browsers, this functionality is not provided by Internet Explorer 9 and earlier.

```dojo
    <div id="example">
      <div id="cap-view" class="demo-section k-header">
        <input id="color" name="color" />

        <input id="datepicker" name="datepicker" />
      </div>
    </div>
    <script>
      $(document).ready(function() {
        // Get the datePicker value from the local storage of the browser.
        var datePickerValue = localStorage.getItem("datePickerValue");

        $("#datepicker").kendoDatePicker({
          value: datePickerValue,
          change: function() {
            // Save the datePicker value in the local storage of the browser.
            localStorage.setItem("datePickerValue", this.element.val());
          }
        });

        var data = [
          { text: "Black", value: "1" },
          { text: "Orange", value: "2" },
          { text: "Grey", value: "3" }
        ];

        var colorValue = localStorage.getItem("colorValue");

        $("#color").kendoDropDownList({
          dataTextField: "text",
          dataValueField: "value",
          dataSource: data,
          value: colorValue,
          change: function() {
            localStorage.setItem("colorValue", this.value());
          },
          index: 0
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
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
