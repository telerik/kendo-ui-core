---
title: Hide the Deafult Button
page_title: Hide the Deafult Button | Kendo UI DatePicker Widget
description: "Learn how to hide the default widget button in the Kendo UI DatePicker."
slug: howto_hide_default_button_datepicker
position: 4
---

# Hide the Deafult Button

The example below demonstrates how to hide the default button of the Kendo UI DatePicker widget by using CSS.

###### Example

```html
    <input id="datepicker" value="10/10/2011" style="width:150px;" />
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker();
      });
    </script>
    <style>
      .k-datepicker .k-select {
        display: none;
      }

      .k-datepicker .k-picker-wrap {
        padding: 0;
      }

      .k-datepicker .k-input {
        border-radius: 3px;
      }
    </style>
```

## See Also

Other Kendo UI DatePicker how-to examples:

* [Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [Disable Dates]({% slug howto_disable_dates_datepicker %})
* [Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})