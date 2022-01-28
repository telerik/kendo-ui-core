---
title: Persist Entered Dates
page_title: Persist Entered Dates | Kendo UI DatePicker
description: "Learn how to persist an entered date in the Kendo UI DatePicker upon user navigation between pages for Internet Explorer 9 or older."
slug: howto_persist_entered_dates_datepicker
---

# Persist Entered Dates

The following example demonstrates how to persist the date that is already entered in the DatePicker when the user navigates to another page and then comes back.

While supported by default in modern browsers, this functionality is not provided by Internet Explorer 9 and earlier.



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
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Default Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_localize_datepicker_using_angular_translate %}).
