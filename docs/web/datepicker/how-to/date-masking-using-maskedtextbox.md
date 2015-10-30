---
title: Create Date Masking
page_title: Create Date Masking | Kendo UI DatePicker Widget
description: "Learn how to create date masking by using the MaskedTextBox in Kendo UI DatePicker."
slug: howto_create_date_masking_datepicker
position: 1
---

# Create Date Masking

The example below demonstrates how to create a date masking functionality for the Kendo UI DatePicker by using the Kendo UI MaskedTextBox.

###### Example

```html
    <input id="datepicker1" />
    <input id="datepicker2" />
    <script>
      $(function() {
        $("#datepicker1").kendoDatePicker({
          parseFormats: ["MMddyyyy"]
        });

        //combine MaskedTextBox with DatePicker (officially unsupported)
        var datepicker2 = $("#datepicker2");

        datepicker2.kendoMaskedTextBox({
          mask: "00/00/0000"
        });

        datepicker2.kendoDatePicker();

        datepicker2.closest(".k-datepicker")
        .add(datepicker2)
        .removeClass("k-textbox");
      });
    </script>
```

## See Also

Other Kendo UI DatePicker how-to examples:

* [Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})
* [Select Ranges between DatePickers]({% slug howto_select_ranges_between_datepicker %})
* [Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [Disable Dates]({% slug howto_disable_dates_datepicker %})
* [Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [Restrict User Input to Min/Max Values]({% slug howto_restrict_user_input_minandmax_values_datepicker %})
* [Show Out-of-Range Dates as Disabled]({% slug howto_show_outofrange_dates_disabled_datepicker %})
* [Submit Forms on ENTER]({% slug howto_submmit_forms_onenter_datepicker %})
