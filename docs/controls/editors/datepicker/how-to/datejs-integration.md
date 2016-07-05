---
title: Integrate DatePicker with DateJS Library
page_title: Integrate DatePicker with DateJS Library | Kendo UI DatePicker
description: "Learn how to integrate the Kendo UI DatePicker widget with the DateJS library and use its syntactic sugar."
slug: howto_integrate_withdatejs_library_datepicker
---

# Integrate DatePicker with DateJS Library

The example below demonstrates how to integrate the Kendo UI DatePicker with DateJS and use its syntactic sugar.

###### Example

```html
    <div id="email-settings">
        <div class="display-picker">
            <input id="datepicker" placeholder="type 'next friday'" style="width:150px;" />
        </div>
        <div class="archive-picker">
            <input id="monthpicker" value="November 2011" style="width:150px" />
        </div>
        <p>Integration with the <a target="_blank" href="http://www.datejs.com/">DateJS</a> library</p>
    </div>
    <script>
        $(document).ready(function() {
            // create DatePicker from input HTML element
            $("#datepicker").kendoDatePicker();

            $("#monthpicker").kendoDatePicker({
                // defines the start view
                start: "year",

                // defines when the calendar should return date
                depth: "year",

                // display month and year in the input
                format: "MMMM yyyy"
            });

            //Parse input value on blur using DateJS
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

Other articles on the Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).
