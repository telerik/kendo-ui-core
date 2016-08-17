---
title: Submit Forms on Enter
page_title: Submit Forms on Enter | Kendo UI DatePicker
description: "Learn how to submit a form in the Kendo UI datePicker widget when users press `Enter`."
slug: howto_submmit_forms_onenter_datepicker
---

# Submit Forms on Enter

The example below demonstrates how to submit a form when the `Enter` key is pressed by the user.

###### Example

```html
    <form id="form1" style="border: 1px solid red">
   	    <input id="datepicker" />
        <button>Submit</button>
    </form>

    <script>
        $(function() {
          var form = $("#form1");

          $("#datepicker").kendoDatePicker();

          form.on("submit", function(e) {
            e.preventDefault();
                alert("submit!");    
          });
        });
    </script>
```

## See Also

Other articles on the Kendo UI DatePicker:

* [DatePicker JavaScript API Reference](/api/javascript/ui/datepicker)
* [How to Set the First Weekday]({% slug howto_set_first_weekday_datepicker %})
* [How to Create Date Masking]({% slug howto_create_date_masking_datepicker %})
* [How to Globally Modify Default Options]({% slug howto_globally_modify_default_options_datepicker %})
* [How to Hide the Deafult Button]({% slug howto_hide_default_button_datepicker %})
* [How to Integrate DatePicker with DateJS Library]({% slug howto_integrate_withdatejs_library_datepicker %})
* [How to Make Input Elements Readonly]({% slug howto_make_input_elements_readonly_datepicker %})
* [How to Persist Entered Dates]({% slug howto_persist_entered_dates_datepicker %})
* [How to Resize Calendar Based on Input Width]({% slug howto_use_resize_calendar_basedon_input_width_datepicker %})

For more runnable examples on the Kendo UI DatePicker, browse its [**How To** documentation folder]({% slug howto_select_ranges_between_datepicker %}).
