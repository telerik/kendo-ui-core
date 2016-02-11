---
title: Hide the Deafult Button
page_title: Hide the Deafult Button | Kendo UI DatePicker Widget
description: "Learn how to hide the default widget button in the Kendo UI DatePicker."
slug: howto_hide_default_button_datepicker
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

Other articles on Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [How to Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [How to Submit Forms on Enter]({% slug howto_submmit_forms_onenter_datepicker %})
