---
title: Show Out-of-Range Dates as Disabled
page_title: Show Out-of-Range Dates as Disabled | Kendo UI DatePicker Widget
description: "Learn how to show dates that are out of range in a disabled style in the Kendo UI datePicker widget."
slug: howto_show_outofrange_dates_disabled_datepicker
---

# Show Out-of-Range Dates as Disabled

The example below demonstrates how to show the dates that are out of min/max range as disabled by using the `k-disabled` class.

###### Example

```html
    <input id="datepicker" style="width:200px;" />
    <script>
      $(document).ready(function() {
        $("#datepicker").kendoDatePicker({
          value: new Date(2014, 10, 20),
          min: new Date(2014, 10, 10),
          max: new Date(2014, 11, 10),
          month: {
            empty: '<span class="k-state-disabled">#= data.value #</span>'
          }
        });
      });
    </script>
```

## See Also

Other articles on Kendo UI DatePicker:

* [JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [How to Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [How to Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})
