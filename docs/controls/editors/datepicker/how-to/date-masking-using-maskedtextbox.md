---
title: Create Date Masking
page_title: Create Date Masking | Kendo UI DatePicker
description: "Learn how to create date masking by using the MaskedTextBox in Kendo UI DatePicker."
slug: howto_create_date_masking_datepicker
---

# Create Date Masking

The following example demonstrates how to create a date-masking functionality in the DatePicker by using the Kendo UI MaskedTextBox.

To achieve this behavior:
* Initialize the MaskedTextBox first.
* Match the mask of the MaskedTextBox and the format of the DatePicker.

> **Important**
>
> This approach is not officially supported and might lead to undesired side-effects. As of the Kendo UI R2 2017 release, the DatePicker supports the [`dateInput`](/api/javascript/ui/datepicker/configuration/dateinput) property which provides a built-in mask. 

###### Example

```dojo
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

        datepicker2.kendoDatePicker({
            format: "MM/dd/yyyy"
        });

        datepicker2.closest(".k-datepicker")
        .add(datepicker2)
        .removeClass("k-textbox");
      });
    </script>
```

## See Also

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Default Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_localize_datepicker_using_angular_translate %}).
