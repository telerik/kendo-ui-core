---
title: Globally Modify Default Options
page_title: Globally Modify Default Options | Kendo UI DatePicker
description: "Learn how to globally modify default options in the Kendo UI DatePicker widget."
slug: howto_globally_modify_default_options_datepicker
---

# Globally Modify Default Options

The example below demonstrates how to globally modify the default options in Kendo UI DatePicker.

###### Example

```html
    <input id="datepicker" value="10/10/2011" style="width:150px;" />
    <br />
    <br />
    <input id="monthpicker" value="November 2011" style="width:150px" />
    <script>
      kendo.ui.DatePicker.fn.options.parseFormats = ["MMMM yyyy"];
    </script>
    <script>
      $(document).ready(function() {
        // create DatePicker from input HTML element
        var datepicker = $("#datepicker").kendoDatePicker().getKendoDatePicker();

        $("#monthpicker").kendoDatePicker({
          // defines the start view
          start: "year",

          // defines when the calendar should return date
          depth: "year",

          // display month and year in the input
          format: "MMMM yyyy"
        });
        console.log(datepicker.options.parseFormats); // display the set options
      });
    </script>
```

## See Also

Other articles on the Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).
