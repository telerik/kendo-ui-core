---
title: Submit Forms on ENTER
page_title: Submit Forms on ENTER | Kendo UI DatePicker Widget
description: "Learn how to submit a form in the Kendo UI datePicker widget when users press `Enter`."
slug: howto_submmit_forms_onenter_datepicker
position: 11
---

# Submit Forms on ENTER

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

Other Kendo UI DatePicker how-to examples:

* [Create Date Masking]({% slug howto_create_date_masking_datepicker %})
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
* [Use AngularJS Copy Functionality]({% slug howto_use_angularjs_copy_functionality_datepicker %})